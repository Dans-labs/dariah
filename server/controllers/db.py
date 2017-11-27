import json
from functools import reduce
from copy import deepcopy
from bottle import request, install, JSONPlugin
from pymongo import MongoClient

from controllers.utils import oid, now, dtm, json_string, fillInSelect
from controllers.workflow import detailInsert, readWorkflow, adjustWorkflow, enforceWorkflow
from models.data import DataModel as DM
from models.names import *

# We store the mongo db connection here as a module global variable
# No other module is supposed to import the connection
# Only the DbAccess methods are supposed to eaccess the db.
# All methods in DbAccess perform access control, based on the data model and the permission model.
# So: if these methods are fully debugged, and all Db access goes through these methods,
# it is guaranteed that every bit of data coming out of the Db and being sent to the client,
# complies with the configured permissions.

_DBM = None 

NA = 'N/A'

class DbAccess(object):
    def __init__(self):
        global _DBM
        install(JSONPlugin(json_dumps=lambda body: json.dumps(body, default=json_string)))
        clientm = MongoClient()
        _DBM = clientm.dariah

        # this function is a simple table getter from mongoDB, but it does respect the permissions.
        # The workflow module needs to read tables, but we do not want code for the reading
        # in that module.
        # All db access is here, through _DBM, and all _DBM access is guarded by permission calculation.
        # Other modules can safely call basicList, it will never return results that are not permitted.

        def basicList(table, rowFilter, fieldFilter, sort=None):
            Perm = self.Perm
            (mayRead, readFields, warnings) = Perm.may(table, N_read)
            theFieldFilter = readFields if fieldFilter == True else dict(x for x in fieldFilter.items() if x[0] in readFields)
            if sort == None:
                result = list(_DBM[table].find(rowFilter, theFieldFilter))
            else:
                result = list(_DBM[table].find(rowFilter, theFieldFilter).sort(sort))
            return result

        self.basicList = basicList

    # DIRECTLY CALLED BY A CONTROLLER

    def getList(
            self, controller, table,
            rFilter=None, titleOnly=False,
            withValueLists=True, withDetails=True,
            my=False,
        ):
        data = {}
        msgs = []
        self._getList(
            controller, table,
            data,
            msgs,
            rFilter=rFilter, titleOnly=titleOnly,
            withValueLists=withValueLists, withDetails=withDetails,
            my=my,
        )
        return self.stop({N_data: data, N_msgs: msgs})

    def getItem(self, controller, table, ident):
        Perm = self.Perm
        (good, result) = Perm.getPerm(controller, table, N_read)
        if not good:
            return self.stop({N_text: result or 'Cannot read {}'.format(table)})
        tableInfo = DM[N_tables].get(table, {})
        (rowFilter, fieldFilter) = result
        (fieldOrder, fieldSpecs, fieldFilter) = self._theseFields(table, fieldFilter)

        if ident == None:
            rowFilter.update({N__id: {'$in': [oid(i) for i in request.json]}})
            return self._findDoc(table, rowFilter, fieldFilter, {}, '{} cannot find items'.format(table), multiple=True)
        else:
            rowFilter.update({N__id: oid(ident)})
            return self._findDoc(table, rowFilter, fieldFilter, {}, '{} item does not exist'.format(table))

    def modList(self, controller, table, action):
        Perm = self.Perm
        (good, result) = Perm.getPerm(controller, table, action)
        none = '' if action == N_insert else {}
        if not good:
            return self.stop({N_data: none, N_text: result or 'Cannot do {} in table {}'.format(table, action)})

        (rowFilter, fieldFilter) = result

        newData = request.json
        records = []
        msgs = []
        workflow = []

        if action == N_insert:
            self._insertItem(controller, table, newData, records, msgs, workflow)
            if not self._hasErrors(msgs):
                self._findDocs(records, msgs, workflow)
        elif action == N_delete:
            self._deleteItem(controller, table, newData, rowFilter, records, msgs, workflow)
        elif action == N_update:
            self._updateItem(controller, table, newData, rowFilter, fieldFilter, records, msgs, workflow)

        return self.stop({
            N_data: {'records': records, N_workflow: workflow},
            N_msgs: msgs,
        })

    # UTILITY FUNCTIONS FOR OTHER MODULES

    def getGroups(self, dest):
        dest.idFromGroup = {}
        dest.groupFromId = {}
        for doc in _DBM.permissionGroup.find():
            gid = doc[N__id]
            group = doc[N_rep]
            dest.idFromGroup[group] = gid
            dest.groupFromId[gid] = group

    def userFind(self, eppn, email, authority):
        eppnCrit =  {N_eppn: eppn, N_authority: authority}
        emailCrit = {N_email: email, N_eppn: {'$exists': False}, N_authority: {'$exists': False}}
        criterion = eppnCrit if email == None else {'$or': [eppnCrit, emailCrit]}
        return _DBM.user.find_one(criterion)

    def userLocal(self): return _DBM.user.find({N_authority: N_local})
    def userAdd(self, record): _DBM.user.insert_one(record)
    def userMod(self, record):
        if N_isPristine in record: del record[N_isPristine]
        criterion = {N__id: record[N__id]} if N__id in record else {N_eppn: record[N_eppn]}
        if N__id in record: del record[N__id]
        _DBM.user.update_one(
            criterion,
            {'$set': record, '$unset': {N_isPristine: ''}},
        )

    def stop(self, info):
        data = info.get(N_data, None)
        text = info.get(N_text, None)
        msgs = info.get(N_msgs, None)
        good = text == None and (msgs == None or all(msg[N_kind] != N_error for msg in msgs))
        msgs = [{N_kind: N_error, N_text: text}] if msgs == None and text != None else msgs
        return {N_data: data, N_msgs: msgs, N_good: good}

    def _hasErrors(self, msgs): return any(msg[N_kind] == N_error for msg in msgs)

    # IMPLEMENTATION METHODS

    def _validate(self, table, itemValues, uFields):
        tableInfo = DM[N_tables].get(table, {})
        (fieldOrder, fieldSpecs, allFields) = self._theseFields(table, True)
        valItemValues = {}
        newValues = []
        for (f, values) in itemValues.items():
            if f == N__id:
                valItemValues[f] = (True, {}, [], oid(values))
                continue
            valType = fieldSpecs[f][N_valType]
            multiple = fieldSpecs[f][N_multiple]

            if multiple: values = [] if values == None else values
            else: values = [values] if values != None else []
            valid = True
            valValues = []
            diags = []
            msgs = []
            if f not in uFields:
# if the current user has no update access to a system field, the received value is discarded.
# later on, the system will append the correct value
                continue
            elif type(valType) is str:
                if valType == N_datetime:
                    good = True
                    valValues = []
                    for v in values:
                        (err, dv) = dtm(v)
                        if err:
                            good = False
                            diags.append('not a valid datetime [{}] ({})'.format(dv, err))
                        else:
                            diags.append(None)
                            valValues.append(dv)
                    if not good:
                        valid = False
                else:
                    valValues = [v for v in values]
            else: 
                if N_relTable not in valType: continue
                valueLists = self._getValueLists(table, {}, msgs, noTables=True)
                if len(msgs):
                    valid = False
                    diags.append('Could not get the valuelists')
                else:
                    allowNew = valType[N_allowNew]
                    relTable = valType[N_relTable]
                    for v in values:
                        if v not in valueLists.get(f, {}):
                            if not allowNew:
                                valid = False
                                diags.append('Unknown value "{}"'.format(v))
                            else:
                                repName = DM[N_tables].get(relTable, {}).get(N_title, DM[N_generic][N_title]) if allowNew == True else allowNew 
                                existing = list(_DBM[relTable].find({repName: v}))
                                if existing and len(existing) > 1:
                                    _id = existing[0][N__id]
                                else:
                                    result = _DBM[relTable].insert_one({repName: v})
                                    _id = result.inserted_id
                                    newValues.append({N__id: _id, N_repName: repName, N_rep: v, N_relTable: relTable, N_field: f})
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
            self, controller, table,
            data, msgs,
            rFilter=None, titleOnly=False,
            withValueLists=True, withDetails=True,
            my=False,
        ):
        if table in data: return
        Perm = self.Perm
        tableInfo = DM[N_tables].get(table, {})
        title = tableInfo.get(N_title, DM[N_generic][N_title])
        item = tableInfo.get(N_item, DM[N_generic][N_item])
        sort =  tableInfo.get(N_sort, None)
        (mayInsert, iFields, warnings) = Perm.may(table, N_insert)
        perm = {N_insert: mayInsert, N_needMaster: tableInfo.get(N_needMaster, False)}
        orderKey = N_myIds if my else N_allIds 
        none = {table: {orderKey: [], N_entities: {}, N_fields: {}, N_perm: {}}}
        (good, result) = Perm.getPerm(controller, table, N_list)
        if not good:
            if result == None:
                msgs.append({N_kind: N_info, N_text: '{} list is empty'.format(table)})
                good = True
            else:
                msgs.append({N_kind: N_error, N_text: result or 'Cannot list {}'.format(table)})
                return
        (rowFilter, fieldFilter) = result
        details = tableInfo.get(N_details, {})
        detailOrder = tableInfo.get(N_detailOrder, [])
        (fieldOrder, fieldSpecs, fieldFilter) = self._theseFields(table, fieldFilter)
        coreFields = {N__id: True}
        getFields = set(fieldFilter)
        for f in getFields:
            coreFields[f] = True

        theFieldFilter = coreFields if titleOnly else fieldFilter 
        theFieldFilter[N_creator] = True
        if rFilter != None:
            rowFilter.update(rFilter)
        if sort == None:
            documents = list(_DBM[table].find(rowFilter, theFieldFilter))
        else:
            documents = list(_DBM[table].find(rowFilter, theFieldFilter).sort(sort))
        allIds=[d[N__id] for d in documents]
        entities=dict((str(d[N__id]), {N_values: dict((f, d[f]) for f in d if (
                (not titleOnly or f in coreFields) and
                (f != N_creator or f in fieldFilter)
            ))}) for d in documents)
        if not titleOnly:
            for d in documents:
                (mayDelete, dFields, warnings) = Perm.may(table, N_delete, document=d)
                (mayUpdate, uFields, warnings) = Perm.may(table, N_update, document=d)
                thisPerm = {N_update: uFields, N_delete: mayDelete}
                entities[str(d[N__id])][N_perm] = thisPerm

        result = {
            N_entities: entities,
            N_fields: theFieldFilter,
            N_title: title,
            N_item: item,
            N_perm: perm,
            N_fieldOrder: fieldOrder,
            N_fieldSpecs: fieldSpecs,
            N_details: details,
            N_detailOrder: detailOrder,
            N_complete: not titleOnly,
        }
        if my: result[N_myIds] = allIds
        else: result[N_allIds] = allIds

        data[table] = result
        data[table][N_filterList] = tableInfo.get(N_filters, [])
        if withValueLists: data[table][N_valueLists] = self._getValueLists(table, data, msgs)
        if withDetails: self._getDetails(table, data, msgs)
        return

    def _getValueLists(self, table, data, msgs, noTables=False):
        Perm = self.Perm
        (good, result) = Perm.getPerm(N_list, table, N_list)
        if not good: return {}
        tableInfo = DM[N_tables].get(table, {})
        valueLists = {}
        (rowFilter, fieldFilter) = result
        getFields = set(fieldFilter)
        fieldOrder = [x for x in tableInfo.get(N_fieldSpecs, DM[N_generic][N_fieldSpecs]) if x in fieldFilter]
        fieldSpecs = dict(x for x in tableInfo.get(N_fieldSpecs, DM[N_generic][N_fieldSpecs]).items() if x[0] in fieldOrder)

        relFields = [
            f for (f, fSpec) in fieldSpecs.items()\
                if f in getFields and\
                type(fSpec[N_valType]) is dict and\
                N_relTable in fSpec[N_valType]
        ]  
        relTables = {fieldSpecs[f][N_valType][N_relTable] for f in relFields}
        good = True
        if not noTables:
            for t in relTables:
                self._getList(N_list, t, data, msgs, titleOnly=False)

        for f in relFields:
            fSpec = fieldSpecs[f][N_valType]
            t = fSpec[N_relTable]
            thisTableInfo = DM[N_tables].get(t, {})
            select = deepcopy(fSpec.get(N_select, {}))
            fillInSelect(select)
            valueOrder = thisTableInfo.get(N_sort, DM[N_generic][N_sort])
            rows = [str(row[N__id]) for row in _DBM[t].find(select, {N__id: True}).sort(valueOrder)]
            valueLists[f] = rows
        return valueLists

    def _getDetails(self, table, data, msgs):
        Perm = self.Perm
        tableInfo = DM[N_tables].get(table, {})
        details = tableInfo.get(N_details, {})
        for (name, detailProps) in details.items():
            t = detailProps[N_table]
            self._getList(N_list, t, data, msgs, titleOnly=False)

    def _insertItem(self, controller, table, newData, records, msgs, workflow):
        masterId = newData.get(N_masterId, None)
        linkField = newData.get(N_linkField, None)
        tableInfo = DM[N_tables].get(table, {})
        title = tableInfo.get(N_title, DM[N_generic][N_title])
        noTitle = tableInfo.get(N_noTitle, DM[N_generic][N_noTitle])
        item = tableInfo.get(N_item)[0]
        sort = tableInfo.get(N_title, DM[N_generic][N_sort])
        (readGood, readResult) = self.Perm.getPerm(controller, table, N_read)
        if not readGood:
            msgs.append({N_kind: N_error, N_text: readResult or 'Cannot read table {}'.format(table)})
            return False
        (readRowFilter, readFieldFilter) = readResult
        modDate = now()
        modBy = self.eppn
        insertValues = {
            N_dateCreated: now(),
            N_creator: self.uid,
            N_modified: ['{} on {}'.format(modBy, modDate)],
        }
        masterDocument = None
        masterTitle = None
        if masterId != None and linkField != None:
            (fieldOrder, fieldSpecs, fieldFilter) = self._theseFields(table, readFieldFilter)
            oMasterId = oid(masterId)
            insertValues[linkField] = oMasterId
            linkFieldSpecs = fieldSpecs[linkField]
            masterTable = linkFieldSpecs[N_valType][N_relTable]
            masterDocument = list(_DBM[masterTable].find({N__id: oMasterId}))[0]
            masterTableInfo = DM[N_tables].get(masterTable, {})
            masterTitle = masterTableInfo.get(N_title, DM[N_generic][N_title])
        for (field, value) in newData.items():
            if field != N_linkField and field != N_masterId:
                insertValues[field] = value

        if title not in insertValues:
            insertValues[title] = '{} of {}'.format(item, masterDocument[masterTitle]) if masterDocument else noTitle

        # hook for workflow-specific actions: extra fields, extra details
        (extraGood, extraText, extraData) = detailInsert(
            self.basicList,
            self._head,
            table=table,
            masterDocument=masterDocument,
        )
        if not extraGood:
            msgs.append({N_kind: N_error, N_text: extraText})
            return False

        # use the extra fields, if any
        if extraData and N_insertValues in extraData:
            insertValues.update(extraData[N_insertValues])

        # enforce the workflow
        ownWorkflow = readWorkflow(self.basicList, table, insertValues).get(None, {}) 
        if not enforceWorkflow(ownWorkflow, {}, insertValues, N_insert, msgs):
            return False

        result = _DBM[table].insert_one(insertValues)
        ident = result.inserted_id
        records.append((table, ident, readFieldFilter))

        # use the extra details, if any
        if extraData and N_detailData in extraData:
            for (detailTable, detailRecords) in extraData[N_detailData].items():
                for detailRecord in detailRecords:
                    detailRecord[N_masterId] = ident
                    good = self._insertItem(controller, detailTable, detailRecord, records, msgs, workflow)
                    if not good:
                        msgs.append({N_kind: N_error, N_text: result})
                        return False

        # check for updates in the workflow information
        workflow.extend(adjustWorkflow(self.basicList, table, {}, insertValues))

        return not self._hasErrors(msgs)

    def _deleteItem(self, controller, table, newData, rowFilter, records, msgs, workflow):
        Perm = self.Perm
        ident = newData.get(N__id, None)
        if ident == None:
            msgs.append({N_kind: N_error, N_text: 'Not specified which item to delete from table {}'.format(table)})
            return False
        rowFilter.update({N__id: oid(ident)})
        documents = list(_DBM[table].find(rowFilter))
        if len(documents) != 1:
            msgs.append({N_kind: N_error, N_text: 'Unidentified item to delete'})
            return False
        document = documents[0]
        (mayDelete, dFields, warnings) = Perm.may(table, N_delete, document=document)
        if not mayDelete:
            msgs.append({N_kind: N_error, N_text: 'Not allowed to delete item {} from {}'.format(ident, table)})
            return False

        # enforce the workflow
        ownWorkflow = readWorkflow(self.basicList, table, [document]).get(document[N__id], {}) 
        if not enforceWorkflow(ownWorkflow, document, {}, N_delete, msgs):
            return False

        # first cascade delete detail records that are marked for it
        # if there are remaining detail records, prevent delete!
        tableInfo = DM[N_tables].get(table, {})
        details = tableInfo.get(N_details, {})
        detailsToKeep = {}
        detailsToRemove = []

        # first check if everything is OK without deleting anything
        for detail in details.values():
            cascade = detail.get(N_cascade, False)
            detailTable = detail[N_table]
            linkField = detail[N_linkField]
            (good, result) = Perm.getPerm(controller, detailTable, N_read)
            if good:
                (detailRowFilter, fieldFilter) = result
            else:
                msgs.append({N_kind: N_error, N_text: result or 'Cannot read details in table {}'.format(detailTable)})
                continue
            detailRowFilter.update({linkField: oid(ident)})
            detailDocuments = list(_DBM[detailTable].find(detailRowFilter, {N__id: True}))
            nDetails = len(detailDocuments)
            if nDetails == 0: continue
            if cascade:
                # in this case: check whether we have permission to delete
                (good, result) = Perm.getPerm(controller, detailTable, N_delete)
                if not good:
                    msgs.append({N_kind: N_error, N_text: result or 'Cannot delete details in table {}'.format(detailTable)})
                    continue
                (detailRowFilter, fieldFilter) = result
                detailsToRemove.append((detailDocuments, detailRowFilter))
            else:
                # in this case: check whether there is nothing to delete
                n = detailsToKeep.setdefault(detailTable, 0)
                detailsToKeep[detailTable] += nDetails

        # if there is any error so far, we do not proceed
        if self._hasErrors(msgs): return False

        # if there are non-cascaded details, we do not proceed
        if detailsToKeep:
            eText = ', '.join('{}({}x)'.format(*x) for x in sorted(detailsToKeep.items())) 
            msgs.extend([
                {N_kind: N_warning, N_text: 'Cannot delete record with dependent details:'},
                {N_kind: N_warning, N_text: eText},
            ])
            return False
        
        # only here we start removing details, but we stop if something goes wrong
        for (detailDocuments, detailRowFilter) in detailsToRemove:
            for detailDoc in detailDocuments:
                good = self._deleteItem(controller, detailTable, {N__id: detailDoc[N__id]}, detailRowFilter, records, msgs, workflow)
                if not good:
                    return False

        # only if all details have been deleted, we proceed with deleting the main record
        if not self._hasErrors(msgs):
            # finally delete the main record
            _DBM[table].delete_one(rowFilter)
            workflow.extend(adjustWorkflow(self.basicList, table, document, {}))
            records.append((table, str(ident)))

        return not self._hasErrors(msgs)

    def _updateItem(self, controller, table, newData, rowFilter, fieldFilter, records, msgs, workflow):
        Perm = self.Perm
        ident = newData.get(N__id, None)
        if ident == None:
            msgs.append({N_kind: N_error, N_text: 'Not specified which item to update in table {}'.format(table)})
            return
        rowFilter.update({N__id: oid(ident)})
        documents = list(_DBM[table].find(rowFilter))
        if len(documents) != 1:
            msgs.append({N_kind: N_error, N_text: 'Unidentified item to update'})
            return
        document = documents[0]
        (mayUpdate, updFields, warnings) = Perm.may(table, N_update, document=document, newValues=newData.get(N_values, {}))
        msgs.extend([{N_kind: N_warning, N_text: warning} for warning in warnings])
        (fieldOrder, fieldSpecs, fieldFilter) = self._theseFields(table, fieldFilter)
        uFields = set()
        for uField in updFields:
            valType = fieldSpecs[uField][N_valType]
            if type(valType) is not dict or not valType.get(N_fixed, False):
                uFields.add(uField)
        if not mayUpdate:
            if len(warnings == 0):
                msgs.append({N_kind: N_error, N_text: 'Not allowed to update this item'})
            return
        newValues = dict(x for x in newData.get(N_values, {}).items())
        (valItemValues, newValues) = self._validate(table, newValues, uFields)
        validationDiags = {}
        updateValues = {}
        hasInvalid = False
        for (f, (valid, diags, valMsgs, vals)) in sorted(valItemValues.items()):
            if valid:
                updateValues[f] = vals
            else:
                hasInvalid = True
                msgs.extend(valMsgs)
                validationDiags[f] = diags
        if hasInvalid:
            invalidFields = ', '.join(sorted(validationDiags))
            validationDiags[N__error] = 'invalid values in fields {}'.format(invalidFields)
            msgs.append({N_kind: N_warning, N_text: 'table {}, item {}: invalid values in {}'.format(table, ident, invalidFields)})

        modDate = now()
        modBy = self.eppn
        updateSaveValues = {}
        updateSaveValues.update(updateValues) # shallow copy of updateValues

        # hook for recording custom timing fields
        # only for single value fields!

        for (field, newVal) in updateValues.items():
            if document.get(field, None) == newVal: continue
            if fieldSpecs[field][N_multiple]: continue
            timingField = DM[N_timing].get(table, {}).get(field, {}).get(newVal, None)
            if timingField != None:
                updateSaveValues[timingField] = now()

        for sysField in DM[N_generic][N_systemFields]:
            if (sysField not in updateValues or updateValues[sysField] == None) and sysField in document:
                    updateSaveValues[sysField] = document[sysField] # add the system field

        updateSaveValues.setdefault(N_modified, []).append('{} on {}'.format(modBy, modDate))
        if N_isPristine in updateSaveValues: del updateSaveValues[N_isPristine]

        newDocument = {}
        newDocument.update(document)
        newDocument.update(updateValues)

        # enforce the workflow
        ownWorkflow = readWorkflow(self.basicList, table, [document]).get(document[N__id], {})
        if not enforceWorkflow(ownWorkflow, document, newDocument, N_update, msgs):
            return False

        # here system values are updated in the database
        _DBM[table].update_one(
            rowFilter,
            {'$set': updateSaveValues, '$unset': {N_isPristine: ''}},
        )

        # check for updates in the workflow information
        ownWorkflow = readWorkflow(self.basicList, table, [newDocument]).get(document[N__id], {})
        workflow.extend(adjustWorkflow(self.basicList, table, document, newDocument)) 
        records.append({
            N_values: updateSaveValues,
            N_newValues: newValues,
            N_diags: validationDiags,
            N_workflow: ownWorkflow,
        })

    def _findDoc(self, table, rowFilter, fieldFilter, failData, failText, multiple=False):
        Perm = self.Perm
        theFieldFilter = dict(x for x in fieldFilter.items())
        theFieldFilter[N_creator] = True
        documents = list(_DBM[table].find(rowFilter, theFieldFilter))
        ldoc = len(documents)
        if ldoc == 0:
            return self.stop({N_data: failData, N_text: failText})
        workflow = readWorkflow(self.basicList, table, documents) 
        if multiple:
            data = []
            for document in documents:
                (mayDelete, dFields, warnings) = Perm.may(table, N_delete, document=document)
                (mayUpdate, uFields, warnings) = Perm.may(table, N_update, document=document)
                perm = {N_update: uFields, N_delete: mayDelete}
                data.append({
                    N_values: dict((f,v) for (f,v) in document.items() if f != N_creator or f in fieldFilter),
                    N_perm: perm,
                    N_fields: fieldFilter,
                    N_workflow: workflow.get(document[N__id], {})
                })
            return self.stop({N_data: data})
        else:
            document = documents[0]
            (mayDelete, dFields, warnings) = Perm.may(table, N_delete, document=document)
            (mayUpdate, uFields, warnings) = Perm.may(table, N_update, document=document)
            perm = {N_update: uFields, N_delete: mayDelete}
            return self.stop({
                N_data: {
                    N_values: dict((f,v) for (f,v) in document.items() if f != N_creator or f in fieldFilter),
                    N_perm: perm,
                    N_fields: fieldFilter,
                    N_workflow: workflow.get(document[N__id], {})
                },
            })

    def _findDocs(self, records, msgs, workflow):
        Perm = self.Perm
        tables = []
        for (table, ident, fieldFilter) in records:
            rowFilter = {N__id: ident}
            theFieldFilter = dict(x for x in fieldFilter.items())
            theFieldFilter[N_creator] = True
            documents = list(_DBM[table].find(rowFilter, theFieldFilter))
            ldoc = len(documents)
            if ldoc == 0:
                msgs.append({N_kind: N_error, N_text: 'Could not find back record {} in table {}'.format(ident, table)})
                continue
            document = documents[0]
            (mayDelete, dFields, warnings) = Perm.may(table, N_delete, document=document)
            (mayUpdate, uFields, warnings) = Perm.may(table, N_update, document=document)
            perm = {N_update: uFields, N_delete: mayDelete}
            ownWorkflow = readWorkflow(self.basicList, table, [document]).get(document[N__id], {})
            tables.append({
                N_table: table,
                N_values: dict((f,v) for (f,v) in document.items() if f != N_creator or f in fieldFilter),
                N_perm: perm,
                N_fields: fieldFilter,
                N_workflow: ownWorkflow
            })
        records.clear()
        records.extend(tables)

    def _consolidateDocs(self, table, documents, level=0, withDetails=False):
        tableInfo = DM[N_tables].get(table, {})
        fieldOrder = [x for x in tableInfo.get(N_fieldOrder, DM[N_generic][N_fieldOrder])]
        fieldSpecs = dict(x for x in tableInfo.get(N_fieldSpecs, DM[N_generic][N_fieldSpecs]).items() if x[0] in fieldOrder)
        detailOrder = tableInfo.get(N_detailOrder, None)
        details = tableInfo.get(N_details, None)
        title = tableInfo.get(N_title, DM[N_generic][N_title])
        item = tableInfo.get(N_item, DM[N_generic][N_item])
        consolidatedDocs = []
        docs = documents if type(documents) is list else [documents]
        nDocs = len(docs)
        for document in docs:
            consDoc = {}
            for field in fieldOrder:
                if field not in document:
                    consDoc[field] = None
                    continue
                fieldSpec = fieldSpecs[field]
                valType = fieldSpec[N_valType]
                multiple = fieldSpec[N_multiple]
                docVal = document[field]
                if type(valType) is str:
                    consDoc[field] = [_simpleVal(valType, val) for val in docVal] if multiple else _simpleVal(valType, docVal)
                    continue
                else:
                    valueTable = valType[N_relTable]
                    relatedDocs = list(_DBM[valueTable].find(
                        {N__id: {'$in': [_id for _id in (docVal if multiple else [docVal])]}}
                    ))
                    if len(relatedDocs) == 0:
                        valRep = None
                    else:
                        valRep = [self._head(valueTable, doc) for doc in relatedDocs] if multiple else  self._head(valueTable, relatedDocs[0])
                    consDoc[field] = valRep
                    continue
            if withDetails and detailOrder and details:
                for detail in detailOrder:
                    detailSpec = details[detail]
                    detailTable = detailSpec[N_table]
                    linkField = detailSpec[N_linkField]
                    detailDocs = list(_DBM[detailTable].find({linkField: document[N__id]}))
                    consDoc.setdefault(N_details, []).append((detail, self._consolidateDocs(
                        detailTable, detailDocs,
                        level=level+1,
                        withDetails=False,
                    )))
            consolidatedDocs.append(consDoc)
        return consolidatedDocs if type(documents) is list else consolidatedDocs[0]

    def _head(self, table, doc):
        methodName = '_head_{}'.format(table)
        if hasattr(self, methodName):
            return getattr(self, methodName)(doc)
        tableInfo = DM[N_tables].get(table, {})
        title = tableInfo.get(N_title, DM[N_generic][N_title])
        return str(doc.get(title, 'no {}'.format(title))).rstrip('\n')

    def _head_user(self, doc):
        name = doc.get(N_name, '')
        org = doc.get(N_org, '')
        if org: org = ' ({})'.format(org)
        if name:
            return name + org
        firstName = doc.get(N_firstName, '')
        lastName = doc.get(N_lastName, '')
        if firstName or lastName:
            return '{}{}{}{}'.format(firstName, ' ' if firstName and lastName else '', lastName, org)
        email = doc.get(N_email, '')
        if email:
            return email + org
        eppn = doc.get(N_eppn, '')
        authority = doc.get(N_authority, '')
        if authority: authority = ' - {}'.format(authority)
        if eppn:
            return '{}{}{}'.format(eppn, authority, org)
        return '!unidentified user!'
        
    def _head_country(self, doc):
        return '{} = {}, {}a DARIAH member'.format(
            doc.get(N_iso, ''),
            doc.get(N_name, ''),
            '' if doc.get(N_isMember, False) else 'not ',
        )
        
    def _head_typeContribution(self, doc):
        mainType = doc.get(N_mainType, '')
        subType = doc.get(N_subType, '')
        sep = ' / ' if mainType and subType else ''
        return '{}{}{}'.format(
            mainType,
            sep,
            subType,
        )
        
    def _head_score(self, doc):
        score = doc.get(N_score, NA)
        level = doc.get(N_level, NA)
        description = doc.get(N_description, '')
        return '{} - {}'.format(score, level) if score or level else description

    def _theseFields(self, table, fieldFilter):
        tableInfo = DM[N_tables].get(table, {})
        fieldOrder = [x for x in tableInfo.get(N_fieldOrder, DM[N_generic][N_fieldOrder]) if fieldFilter == True or x in fieldFilter]
        fieldSpecs = dict(
            x for x in tableInfo.get(N_fieldSpecs, DM[N_generic][N_fieldSpecs]).items() if x[0] in fieldOrder
        )
        fieldFilterPost = dict(
            (f, True) for f in fieldOrder
        )
        return (fieldOrder, fieldSpecs, fieldFilterPost)

def _simpleVal(valType, val):
    result = \
        '[{}](mailto:{})'.format(val, val) if valType == N_email \
    else '[{}]({})'.format(val, val) if valType == N_url \
    else str(val).split('.', 1)[0] if valType == N_datetime \
    else (N_Yes if val else N_No) if valType == N_bool \
    else str(val) if valType == N_number \
    else val
    return result.rstrip('\n')

