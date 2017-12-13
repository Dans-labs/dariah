import json
from copy import deepcopy
from bottle import request, install, JSONPlugin
from pymongo import MongoClient

from controllers.utils import (
    oid, now, dtm, json_string, fillInSelect, filterModified, mongoFields,
    mongoRows, andRows
)
from controllers.workflow import WorkflowApi
from models.compiled.model import model as M
from models.compiled.names import N

DM = M[N.tables]
DMG = M[N.generic]
PM = M[N.permissions]

# N.info

# Only the DbAccess methods are supposed to eaccess the db.
# All methods in DbAccess perform access control,
# based on the data model and the permission model.
# So: if these methods are fully debugged,
# and all Db access goes through these methods,
# it is guaranteed that every bit of data coming out of the Db
# and being sent to the client,
# complies with the configured permissions.

NA = 'N/A'


def _theseFields(table, fieldSet):
    tableInfo = DM.get(table, {})
    fieldOrder = tableInfo[N.fieldOrder]
    fieldSpecs = tableInfo[N.fieldSpecs]
    return (
        [f for f in fieldOrder if f in fieldSet],
        {x: y
         for (x, y) in fieldSpecs.items() if x in fieldSet},
        mongoFields(fieldSet),
    )


def _allFields(table):
    tableInfo = DM.get(table, {})
    return set(tableInfo[N.fieldSpecs])


class DbAccess(object):
    def __init__(self):
        install(
            JSONPlugin(
                json_dumps=lambda body: json.dumps(body, default=json_string)
            )
        )
        clientm = MongoClient()
        MONGO = clientm.dariah
        self.MONGO = MONGO
        self.WF = WorkflowApi(MONGO)

        self.idFromGroup = {}
        self.groupFromId = {}
        for doc in MONGO.permissionGroup.find():
            gid = doc[N._id]
            group = doc[N.rep]
            self.idFromGroup[group] = gid
            self.groupFromId[gid] = group

    # DIRECTLY CALLED BY A CONTROLLER

    def getList(
        self,
        controller,
        table,
        titleOnly=False,
        withValueLists=True,
        withDetails=True,
        my=False,
    ):
        data = {}
        msgs = []
        self._getList(
            controller,
            table,
            data,
            msgs,
            titleOnly=titleOnly,
            withValueLists=withValueLists,
            withDetails=withDetails,
            my=my,
        )
        return self.stop({N.data: data, N.msgs: msgs})

    def getItem(self, controller, table, ident):
        Perm = self.Perm
        msgs = []

        (good, rowFilter, fieldSet) = Perm.allow(
            table,
            N.read,
            msgs,
            controller=controller,
        )
        if not good:
            return self.stop({N.msgs: msgs})

        if ident is None:
            thisRowFilter = andRows(
                rowFilter,
                {N._id: {
                    '$in': [oid(i) for i in request.json]
                }},
            )
            data = self._findDoc(
                table,
                thisRowFilter,
                fieldSet,
                {},
                '{} cannot find items'.format(table),
                msgs,
                multiple=True,
            )
            return self.stop({N.data: data, N.msgs: msgs})
        else:
            thisRowFilter = andRows(
                rowFilter,
                {N._id: oid(ident)},
            )
            data = self._findDoc(
                table,
                thisRowFilter,
                fieldSet,
                {},
                '{} item does not exist'.format(table),
                msgs,
            )
            return self.stop({N.data: data, N.msgs: msgs})

    def modList(self, controller, table, action):
        Perm = self.Perm
        msgs = []

        (good, rowFilter, fieldSet) = Perm.allow(
            table,
            action,
            msgs,
            controller=controller,
        )
        none = '' if action == N.insert else {}
        if not good:
            return self.stop({N.data: none, N.msgs: msgs})

        newData = request.json
        records = []
        workflow = []

        if action == N.insert:
            self._insertItem(
                controller, table, newData, records, msgs, workflow
            )
            if not self._hasErrors(msgs):
                self._findDocs(records, msgs, workflow)
        elif action == N.delete:
            self._deleteItem(
                controller, table, newData, rowFilter, records, msgs, workflow
            )
        elif action == N.update:
            self._updateItem(
                controller, table, newData, rowFilter, fieldSet, records, msgs,
                workflow
            )

        return self.stop({
            N.data: {
                'records': records,
                N.workflow: workflow
            },
            N.msgs: msgs,
        })

    # UTILITY FUNCTIONS FOR OTHER MODULES

    def addGroupInfo(self, userInfo):
        unauth = self.idFromGroup[PM[N.unauth]]
        groups = PM[N.groups]
        groupId = userInfo.get(N.group, unauth)
        group = self.groupFromId[groupId]
        userInfo[N.groupRep] = group
        userInfo[N.groupDesc] = groups.get(group, '??')

    def userFind(self, eppn, email, authority):
        eppnCrit = {N.eppn: eppn, N.authority: authority}
        emailCrit = {
            N.email: email,
            N.eppn: {
                '$exists': False
            },
            N.authority: {
                '$exists': False
            }
        }
        criterion = eppnCrit if email is None else {
            '$or': [eppnCrit, emailCrit]
        }
        return self.MONGO.user.find_one(criterion)

    def userLocal(self):
        return self.MONGO.user.find({N.authority: N.local})

    def userAdd(self, record):
        self.MONGO.user.insert_one(record)

    def userMod(self, record):
        if N.isPristine in record:
            del record[N.isPristine]
        criterion = {
            N._id: record[N._id]
        } if N._id in record else {
            N.eppn: record[N.eppn]
        }
        if N._id in record:
            del record[N._id]
        self.MONGO.user.update_one(
            criterion,
            {'$set': record,
             '$unset': {
                 N.isPristine: ''
             }},
        )

    def stop(self, info):
        data = info.get(N.data, None)
        msgs = info.get(N.msgs, None)
        good = (msgs is None or all(msg[N.kind] != N.error for msg in msgs))
        return {N.data: data, N.msgs: msgs, N.good: good}

    def _hasErrors(self, msgs):
        return any(msg[N.kind] == N.error for msg in msgs)

    # IMPLEMENTATION METHODS

    def _getPerm(self, table, doc, msgs):
        Perm = self.Perm
        (mayDelete, dummyRD, dummyRD) = Perm.allow(
            table,
            N.delete,
            msgs,
            document=doc,
            verbose=False,
        )
        (mayUpdate, dummyRU, fieldSetU) = Perm.allow(
            table,
            N.update,
            msgs,
            document=doc,
            verbose=False,
        )
        uFields = mongoFields(fieldSetU) if mayUpdate else {}
        return {N.update: uFields, N.delete: mayDelete}

    def _validate(self, table, itemValues, uFields):
        MONGO = self.MONGO
        (fieldOrder, fieldSpecs,
         allFields) = _theseFields(table, _allFields(table))
        valItemValues = {}
        newValues = []
        for (f, values) in itemValues.items():
            if f == N._id:
                valItemValues[f] = (True, {}, [], oid(values))
                continue
            valType = fieldSpecs[f][N.valType]
            multiple = fieldSpecs[f][N.multiple]

            if multiple:
                values = [] if values is None else values
            else:
                values = [] if values is None else [values]
            valid = True
            valValues = []
            diags = []
            msgs = []
            if f not in uFields:
                # if the current user has no update access to a system field,
                # the received value is discarded.
                # later on, the system will append the correct value
                continue
            elif type(valType) is str:
                if valType == N.datetime:
                    good = True
                    valValues = []
                    for v in values:
                        (err, dv) = dtm(v)
                        if err:
                            good = False
                            diags.append(
                                'not a valid datetime [{}] ({})'.format(
                                    dv, err
                                )
                            )
                        else:
                            diags.append(None)
                            valValues.append(dv)
                    if not good:
                        valid = False
                else:
                    valValues = [v for v in values]
            else:
                if N.relTable not in valType:
                    continue
                valueLists = self._getValueLists(
                    table, {}, msgs, noTables=True
                )
                if len(msgs):
                    valid = False
                    diags.append('Could not get the valuelists')
                else:
                    allowNew = valType[N.allowNew]
                    relTable = valType[N.relTable]
                    for v in values:
                        if v not in valueLists.get(f, {}):
                            if not allowNew:
                                valid = False
                                diags.append('Unknown value "{}"'.format(v))
                            else:
                                repName = DM.get(
                                    relTable, {}
                                )[N.title] if allowNew is True else allowNew
                                existing = list(
                                    MONGO[relTable].find({
                                        repName: v
                                    })
                                )
                                if existing and len(existing) > 1:
                                    _id = existing[0][N._id]
                                else:
                                    result = MONGO[relTable].insert_one({
                                        repName: v
                                    })
                                    _id = result.inserted_id
                                    newValues.append({
                                        N._id: _id,
                                        N.repName: repName,
                                        N.rep: v,
                                        N.relTable: relTable,
                                        N.field: f
                                    })
                                valValues.append(_id)
                                diags.append(None)
                        else:
                            valValues.append(oid(v))
                            diags.append(None)

            if not multiple:
                valValues = None if valValues == [] else valValues[0]
                diags = None if diags == [] else diags[0]
            valItemValues[f] = (valid, diags, msgs, valValues)
        return (valItemValues, newValues)

    def _getList(
        self,
        controller,
        table,
        data,
        msgs,
        titleOnly=False,
        withValueLists=True,
        withDetails=True,
        my=False,
        verbose=True,
    ):
        if table in data:
            return

        MONGO = self.MONGO
        Perm = self.Perm
        extraMy = my if type(my) is list else None

        (good, rowFilter, fieldSet) = Perm.allow(
            table,
            N.list,
            msgs,
            controller=controller,
            extraMy=extraMy,
            verbose=verbose,
        )

        if not good:
            return

        (fieldOrder, fieldSpecs, fieldFilter) = _theseFields(table, fieldSet)

        tableInfo = DM.get(table, {})
        title = tableInfo[N.title]
        item = tableInfo[N.item]
        sort = tableInfo[N.sort]
        mayInsert = Perm.allow(
            table,
            N.insert,
            msgs,
            verbose=False,
        )[0]
        perm = {
            N.insert: mayInsert,
            N.needMaster: tableInfo.get(N.needMaster, False)
        }
        theRowFilter = mongoRows(rowFilter)
        if sort is None:
            documents = list(MONGO[table].find(theRowFilter, fieldFilter))
        else:
            documents = list(
                MONGO[table].find(theRowFilter, fieldFilter).sort(sort)
            )
        allIds = [doc[N._id] for doc in documents]
        entities = {str(doc[N._id]): {N.values: doc} for doc in documents}
        if not titleOnly:
            for doc in documents:
                entities[str(doc[N._id])][N.perm] = self._getPerm(
                    table, doc, msgs
                )

        details = tableInfo.get(N.details, {})
        detailOrder = tableInfo.get(N.detailOrder, [])

        result = {
            N.entities: entities,
            N.fields: fieldFilter,
            N.title: title,
            N.item: item,
            N.perm: perm,
            N.fieldOrder: fieldOrder,
            N.fieldSpecs: fieldSpecs,
            N.details: details,
            N.detailOrder: detailOrder,
            N.complete: not titleOnly,
        }
        if my:
            result[N.myIds] = allIds
        else:
            result[N.allIds] = allIds

        data[table] = result
        data[table][N.filterList] = tableInfo.get(N.filters, [])
        if withValueLists:
            data[table][N.valueLists] = self._getValueLists(table, data, msgs)
        if withDetails:
            self._getDetails(table, data, msgs)
        return

    def _getValueLists(self, table, data, msgs, noTables=False):
        MONGO = self.MONGO
        Perm = self.Perm
        (good, rowFilter, fieldSet) = Perm.allow(
            table,
            N.list,
            msgs,
            controller=N.list,
            verbose=False,
        )
        if not good:
            return {}

        valueLists = {}
        (fieldOrder, fieldSpecs, fieldFilter) = _theseFields(table, fieldSet)

        relFields = [
            f for (f, fSpec) in fieldSpecs.items()
            if f in fieldSet and type(fSpec[N.valType]) is dict
            and N.relTable in fSpec[N.valType]
        ]
        relTables = {fieldSpecs[f][N.valType][N.relTable] for f in relFields}
        good = True
        if not noTables:
            for t in relTables:
                self._getList(N.list, t, data, msgs, titleOnly=False)

        for f in relFields:
            fSpec = fieldSpecs[f][N.valType]
            t = fSpec[N.relTable]
            thisTableInfo = DM.get(t, {})
            select = deepcopy(fSpec.get(N.select, {}))
            fillInSelect(select)
            valueOrder = thisTableInfo[N.sort]
            rows = [
                str(row[N._id])
                for row in MONGO[t].find(select, {
                    N._id: True
                }).sort(valueOrder)
            ]
            valueLists[f] = rows
        return valueLists

    def _getDetails(self, table, data, msgs):
        tableInfo = DM.get(table, {})
        details = tableInfo.get(N.details, {})
        for (name, detailProps) in details.items():
            t = detailProps[N.table]
            self._getList(
                N.list, t, data, msgs, titleOnly=False, verbose=False
            )

    def _insertItem(self, controller, table, newData, records, msgs, workflow):
        MONGO = self.MONGO
        WF = self.WF
        Perm = self.Perm
        masterId = newData.get(N.masterId, None)
        linkField = newData.get(N.linkField, None)
        tableInfo = DM.get(table, {})
        title = tableInfo[N.title]
        noTitle = tableInfo.get(N.noTitle, DMG[N.noTitle])
        item = tableInfo[N.item][0]
        (readGood, readRowFilter, readFieldSet) = Perm.allow(
            table,
            N.read,
            msgs,
            controller=controller,
        )
        if not readGood:
            return False

        modDate = now()
        modBy = self.eppn
        insertValues = {
            N.dateCreated: now(),
            N.creator: self.uid,
            N.modified: ['{} on {}'.format(modBy, modDate)],
        }
        masterDocument = None
        masterTitle = None
        (dummyO, fieldSpecs,
         readFieldFilter) = _theseFields(table, readFieldSet)
        if masterId is not None and linkField is not None:
            oMasterId = oid(masterId)
            insertValues[linkField] = oMasterId
            linkFieldSpecs = fieldSpecs[linkField]
            masterTable = linkFieldSpecs[N.valType][N.relTable]
            masterDocument = list(MONGO[masterTable].find({
                N._id: oMasterId
            }))[0]
            masterTableInfo = DM.get(masterTable, {})
            masterTitle = masterTableInfo[N.title]
        for (field, value) in newData.items():
            if field != N.linkField and field != N.masterId:
                insertValues[field] = value

        if title not in insertValues:
            insertValues[title] = '{} of {}'.format(
                item, masterDocument[masterTitle]
            ) if masterDocument else noTitle

        # hook for workflow-specific actions: extra fields, extra details
        (extraGood, extraData) = WF.detailInsert(
            msgs,
            self._head,
            table=table,
            masterDocument=masterDocument,
        )
        if not extraGood:
            return False

        # use the extra fields, if any
        if extraData and N.insertValues in extraData:
            insertValues.update(extraData[N.insertValues])

        # enforce the workflow
        myWorkflow = WF.readWorkflow(
            msgs,
            table,
            {
                None: insertValues
            },
        ).get(None, {})
        if not WF.enforceWorkflow(
            myWorkflow, {}, insertValues, N.insert, msgs
        ):
            return False

        result = MONGO[table].insert_one(insertValues)
        ident = result.inserted_id
        records.append((table, ident, readFieldFilter))

        # use the extra details, if any
        if extraData and N.detailData in extraData:
            for (detailTable,
                 detailRecords) in extraData[N.detailData].items():
                for detailRecord in detailRecords:
                    detailRecord[N.masterId] = ident
                    good = self._insertItem(
                        controller, detailTable, detailRecord, records, msgs,
                        workflow
                    )
                    if not good:
                        msgs.append({N.kind: N.error, N.text: result}, )
                        return False

        # check for updates in the workflow information
        workflow.extend(WF.adjustWorkflow(msgs, table, {}, insertValues))

        return not self._hasErrors(msgs)

    def _deleteItem(
        self, controller, table, newData, rowFilter, records, msgs, workflow
    ):
        MONGO = self.MONGO
        WF = self.WF
        Perm = self.Perm
        ident = newData.get(N._id, None)
        if ident is None:
            msgs.append({
                N.kind:
                    N.error,
                N.text:
                    'Not specified which item to delete from table {}'
                    .format(table)
            }, )
            return False
        theRowFilter = andRows(rowFilter, {N._id: oid(ident)})
        documents = list(MONGO[table].find(theRowFilter))
        if len(documents) != 1:
            msgs.append({
                N.kind: N.error,
                N.text: 'Unidentified item to delete'
            }, )
            return False
        document = documents[0]
        (mayDelete, dummyR, dummyF) = Perm.allow(
            table,
            N.delete,
            msgs,
            controller=controller,
            document=document,
        )
        if not mayDelete:
            return False

        # enforce the workflow
        myWorkflow = WF.readWorkflow(
            msgs,
            table,
            {
                document[N._id]: document
            },
        ).get(document[N._id], {})
        if not WF.enforceWorkflow(myWorkflow, document, {}, N.delete, msgs):
            return False

        # first cascade delete detail records that are marked for it
        # if there are remaining detail records, prevent delete!
        tableInfo = DM.get(table, {})
        details = tableInfo.get(N.details, {})
        detailsToKeep = {}
        detailsToRemove = []

        # first check if everything is OK without deleting anything
        for detail in details.values():
            cascade = detail.get(N.cascade, False)
            detailTable = detail[N.table]
            linkField = detail[N.linkField]
            (good, detailRowFilter, dummyF) = Perm.allow(
                detailTable,
                N.read,
                msgs,
                controller=controller,
            )
            if not good:
                continue
            theDetailRowFilter = andRows(
                detailRowFilter, {
                    linkField: oid(ident)
                }
            )
            detailDocuments = list(
                MONGO[detailTable].find(theDetailRowFilter, {
                    N._id: True
                })
            )
            nDetails = len(detailDocuments)
            if nDetails == 0:
                continue
            if cascade:
                # in this case: check whether we have permission to delete
                (good, dummyR, dummyF) = Perm.allow(
                    detailTable,
                    N.delete,
                    msgs,
                    controller=controller,
                )
                if not good:
                    continue
                detailsToRemove.append(
                    (detailTable, detailDocuments, theDetailRowFilter)
                )
            else:
                # in this case: check whether there is nothing to delete
                detailsToKeep.setdefault(detailTable, 0)
                detailsToKeep[detailTable] += nDetails

        # if there is any error so far, we do not proceed
        if self._hasErrors(msgs):
            return False

        # if there are non-cascaded details, we do not proceed
        if detailsToKeep:
            eText = ', '.join(
                '{}({}x)'.format(*x) for x in sorted(detailsToKeep.items())
            )
            msgs.extend([
                {
                    N.kind: N.warning,
                    N.text: 'Cannot delete record with dependent details:',
                },
                {
                    N.kind: N.warning,
                    N.text: eText,
                },
            ])
            return False

        # only here we start removing details,
        # but we stop if something goes wrong
        for (detailTable, detailDocuments, detailRowFilter) in detailsToRemove:
            for detailDoc in detailDocuments:
                good = self._deleteItem(
                    controller, detailTable, {N._id: detailDoc[N._id]},
                    detailRowFilter, records, msgs, workflow
                )
                if not good:
                    return False

        # only if all details have been deleted,
        # we proceed with deleting the main record
        if not self._hasErrors(msgs):
            # finally delete the main record
            MONGO[table].delete_one(theRowFilter)
            workflow.extend(WF.adjustWorkflow(msgs, table, document, {}))
            records.append((table, str(ident)))

        return not self._hasErrors(msgs)

    def _updateItem(
        self, controller, table, newData, rowFilter, fieldSet, records, msgs,
        workflow
    ):
        MONGO = self.MONGO
        WF = self.WF
        Perm = self.Perm
        ident = newData.get(N._id, None)
        if ident is None:
            msgs.append({
                N.kind:
                    N.error,
                N.text:
                    'Not specified which item to update in table {}'
                    .format(table),
            })
            return
        theRowFilter = andRows(rowFilter, {N._id: oid(ident)})
        documents = list(MONGO[table].find(theRowFilter))
        if len(documents) != 1:
            msgs.append({
                N.kind: N.error,
                N.text: 'Unidentified item to update'
            }, )
            return
        document = documents[0]
        (mayUpdate, dummyR, fieldSetU) = Perm.allow(
            table,
            N.update,
            msgs,
            document=document,
            newValues=newData.get(N.values, {}),
        )
        if not mayUpdate:
            return

        fieldSpecs = _theseFields(table, fieldSet)[1]
        uFields = set()
        for uField in fieldSetU:
            valType = fieldSpecs[uField][N.valType]
            if type(valType) is not dict or not valType.get(N.fixed, False):
                uFields.add(uField)
        (valItemValues, newValues) = self._validate(
            table, newData.get(N.values, {}), uFields
        )
        validationDiags = {}
        updateValues = {}
        hasInvalid = False
        for (f, (valid, diags, valMsgs,
                 vals)) in sorted(valItemValues.items()):
            if valid:
                updateValues[f] = vals
            else:
                hasInvalid = True
                msgs.extend(valMsgs, )
                validationDiags[f] = diags
        if hasInvalid:
            invalidFields = ', '.join(sorted(validationDiags))
            validationDiags[
                N._error
            ] = 'invalid values in fields {}'.format(invalidFields)
            msgs.append({
                N.kind:
                    N.warning,
                N.text:
                    'table {}, item {}: invalid values in {}'
                    .format(table, ident, invalidFields)
            }, )

        modDate = now()
        modBy = self.eppn
        updateSaveValues = {}
        updateSaveValues.update(updateValues)  # shallow copy of updateValues

        # hook for recording custom timing fields
        # only for single value fields!

        for (field, newVal) in updateValues.items():
            if document.get(field, None) == newVal:
                continue
            if fieldSpecs[field][N.multiple]:
                continue
            timingField = DM.get(table, {}).get(N.timing,
                                                {}).get(field, None)
            if timingField is not None:
                if type(timingField) is str:
                    thisTimingField = timingField
                else:
                    thisTimingField = timingField.get(newVal, None)
                if thisTimingField is not None:
                    updateSaveValues[thisTimingField] = now()

        for sysField in DMG[N.systemFields]:
            if (
                sysField not in updateValues or updateValues[sysField] is None
            ) and sysField in document:
                updateSaveValues[sysField] = document[sysField
                                                      ]  # add the system field

        modified = filterModified(updateSaveValues.get(N.modified, []))
        modified.append('{} on {}'.format(modBy, modDate))
        updateSaveValues[N.modified] = modified
        if N.isPristine in updateSaveValues:
            del updateSaveValues[N.isPristine]

        newDocument = {}
        newDocument.update(document)
        newDocument.update(updateValues)

        # enforce the workflow
        myWorkflow = WF.readWorkflow(
            msgs,
            table,
            {
                document[N._id]: document
            },
        ).get(document[N._id], {})
        if not WF.enforceWorkflow(
            myWorkflow, document, newDocument, N.update, msgs
        ):
            return False

        # here the record, including system values are updated in the database
        MONGO[table].update_one(
            theRowFilter,
            {'$set': updateSaveValues,
             '$unset': {
                 N.isPristine: ''
             }},
        )

        # check for updates in the workflow information
        myWorkflow = WF.readWorkflow(
            msgs, table, {
                newDocument[N._id]: newDocument
            }
        ).get(document[N._id], {})
        workflow.extend(WF.adjustWorkflow(msgs, table, document, newDocument))

        recordInfo = {
            N.values: updateSaveValues,
            N.newValues: newValues,
            N.diags: validationDiags,
            N.workflow: myWorkflow,
        }

        # if we happen to modify a user record,
        # we add group info to the information
        # to be returned to the client,
        # in a separate key: groupValues
        if table == N.user:
            group = updateSaveValues.get(N.group, None)
            if group:
                groupValues = {N.group: group}
                self.addGroupInfo(groupValues)
                recordInfo[N.groupValues] = groupValues

        records.append(recordInfo)

    def _findDoc(
        self,
        table,
        rowFilter,
        fieldSet,
        failData,
        failText,
        msgs,
        multiple=False
    ):
        MONGO = self.MONGO
        WF = self.WF
        Perm = self.Perm
        theRowFilter = mongoRows(rowFilter)
        fieldFilter = mongoFields(fieldSet)
        documents = list(MONGO[table].find(theRowFilter, fieldFilter))
        ldoc = len(documents)
        if ldoc == 0:
            msgs.append({N.kind: N.error, N.text: failText}, )
            return failData
        workflow = WF.readWorkflow(
            msgs,
            table,
            {doc[N._id]: doc
             for doc in documents},
        )
        if multiple:
            data = []
            for document in documents:
                (mayRead, dummyRU, fieldSet) = Perm.allow(
                    table,
                    N.read,
                    msgs,
                    document=document,
                    verbose=True,
                )
                if not mayRead:
                    continue
                perm = self._getPerm(table, document, msgs)
                data.append({
                    N.values: {
                        f: v
                        for (f, v) in document.items()
                        if f != N.creator or f in fieldSet
                    },
                    N.perm: perm,
                    N.fields: mongoFields(fieldSet),
                    N.workflow: workflow.get(document[N._id], {})
                })
            return data
        else:
            document = documents[0]
            (mayRead, dummyRU, fieldSet) = Perm.allow(
                table,
                N.read,
                msgs,
                document=document,
                verbose=True,
            )
            if not mayRead:
                return failData
            perm = self._getPerm(table, document, msgs)
            return {
                N.values: {
                    f: v
                    for (f, v) in document.items()
                    if f != N.creator or f in fieldSet
                },
                N.perm: perm,
                N.fields: mongoFields(fieldSet),
                N.workflow: workflow.get(document[N._id], {})
            }

    def _findDocs(self, records, msgs, workflow):
        MONGO = self.MONGO
        WF = self.WF
        tables = []
        for (table, ident, fieldFilter) in records:
            theRowFilter = {N._id: ident}
            # we make a shallow copy (intentionally)
            theFieldFilter = {x: y for (x, y) in fieldFilter.items()}
            theFieldFilter[N.creator] = True
            documents = list(MONGO[table].find(theRowFilter, theFieldFilter))
            ldoc = len(documents)
            if ldoc == 0:
                msgs.append({
                    N.kind:
                        N.error,
                    N.text:
                        'Could not find back record {} in table {}'
                        .format(ident, table),
                })
                continue
            document = documents[0]
            perm = self._getPerm(table, document, msgs)
            myWorkflow = WF.readWorkflow(
                msgs,
                table,
                {
                    document[N._id]: document
                },
            ).get(document[N._id], {})
            tables.append({
                N.table: table,
                N.values: {
                    f: v
                    for (f, v) in document.items()
                    if f != N.creator or f in fieldFilter
                },
                N.perm: perm,
                N.fields: fieldFilter,
                N.workflow: myWorkflow
            })
        records.clear()
        records.extend(tables)

    def _consolidateDocs(
        self,
        controller,
        table,
        documents,
        msgs,
        consolidatedDocs,
        level=0,
        withDetails=False
    ):
        MONGO = self.MONGO
        Perm = self.Perm
        (good, rowFilter, fieldSet) = Perm.allow(
            table,
            N.read,
            msgs,
            controller=controller,
        )

        if not good:
            return

        tableInfo = DM.get(table, {})
        (fieldOrder, fieldSpecs, fieldFilter) = _theseFields(table, fieldSet)
        detailOrder = tableInfo.get(N.detailOrder, None)
        details = tableInfo.get(N.details, None)
        docs = documents if type(documents) is list else [documents]
        for document in docs:
            consDoc = {}
            for field in fieldOrder:
                if field not in document:
                    consDoc[field] = None
                    continue
                fieldSpec = fieldSpecs[field]
                valType = fieldSpec[N.valType]
                multiple = fieldSpec[N.multiple]
                docVal = document[field]
                if type(valType) is str:
                    consDoc[field] = [
                        _simpleVal(valType, val) for val in docVal
                    ] if multiple else _simpleVal(valType, docVal)
                    continue
                else:
                    valueTable = valType[N.relTable]
                    relatedDocs = list(
                        MONGO[valueTable].find({
                            N._id: {
                                '$in': [
                                    _id
                                    for _id in
                                    (docVal if multiple else [docVal])
                                ]
                            }
                        })
                    )
                    if len(relatedDocs) == 0:
                        valRep = None
                    else:
                        valRep = [
                            self._head(valueTable, doc) for doc in relatedDocs
                        ] if multiple else self._head(
                            valueTable, relatedDocs[0]
                        )
                    consDoc[field] = valRep
                    continue
            if withDetails and detailOrder and details:
                for detail in detailOrder:
                    detailSpec = details[detail]
                    detailTable = detailSpec[N.table]
                    linkField = detailSpec[N.linkField]
                    detailDocs = list(
                        MONGO[detailTable].find({
                            linkField: document[N._id]
                        })
                    )
                    consDoc.setdefault(N.details, []).append((
                        detail,
                        self._consolidateDocs(
                            detailTable,
                            detailDocs,
                            msgs,
                            level=level + 1,
                            withDetails=False,
                        )
                    ))
            consolidatedDocs.append(consDoc)

    def _head(self, table, doc):
        methodName = '_head_{}'.format(table)
        if hasattr(self, methodName):
            return getattr(self, methodName)(doc)
        tableInfo = DM.get(table, {})
        title = tableInfo[N.title]
        return str(doc.get(title, 'no {}'.format(title))).rstrip('\n')

    def _head_user(self, doc):
        name = doc.get(N.name, '')
        org = doc.get(N.org, '')
        if org:
            org = ' ({})'.format(org)
        if name:
            return name + org
        firstName = doc.get(N.firstName, '')
        lastName = doc.get(N.lastName, '')
        if firstName or lastName:
            return '{}{}{}{}'.format(
                firstName, ' ' if firstName and lastName else '', lastName, org
            )
        email = doc.get(N.email, '')
        if email:
            return email + org
        eppn = doc.get(N.eppn, '')
        authority = doc.get(N.authority, '')
        if authority:
            authority = ' - {}'.format(authority)
        if eppn:
            return '{}{}{}'.format(eppn, authority, org)
        return '!unidentified user!'

    def _head_country(self, doc):
        return '{} = {}, {}a DARIAH member'.format(
            doc.get(N.iso, ''),
            doc.get(N.name, ''),
            '' if doc.get(N.isMember, False) else 'not ',
        )

    def _head_typeContribution(self, doc):
        mainType = doc.get(N.mainType, '')
        subType = doc.get(N.subType, '')
        sep = ' / ' if mainType and subType else ''
        return '{}{}{}'.format(
            mainType,
            sep,
            subType,
        )

    def _head_score(self, doc):
        score = doc.get(N.score, NA)
        level = doc.get(N.level, NA)
        description = doc.get(N.description, '')
        return '{} - {}'.format(
            score, level
        ) if score or level else description


def _simpleVal(valType, val):
    result = (
        '[{}](mailto:{})'.format(val, val)
        if valType == N.email else '[{}]({})'.format(val, val)
        if valType == N.url else str(val).split('.', 1)[0]
        if valType == N.datetime else (N.Yes if val else N.No)
        if valType == N.bool else str(val) if valType == N.number else val
    )
    return result.rstrip('\n')
