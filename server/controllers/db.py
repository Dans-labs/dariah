import json
from functools import reduce
from bottle import request, install, JSONPlugin
from pymongo import MongoClient

from controllers.utils import oid, now, dtm, json_string
from controllers.workflow import detailInsert

PRISTINE = 'isPristine'

# We store the mongo db connection here as a module global variable
# No other module is supposed to import the connection
# Only the DbAccess methods are supposed to eaccess the db.
# All methods in DbAccess perform access control, based on the data model and the permission model.
# So: if these methods are fully debugged, and all Db access goes through these methods,
# it is guaranteed that every bit of data coming out of the Db and being sent to the client,
# complies with the configured permissions.

_DBM = None 

class DbAccess(object):
    def __init__(self, DM):
        global _DBM
        self.DM = DM
        install(JSONPlugin(json_dumps=lambda body: json.dumps(body, default=json_string)))
        clientm = MongoClient()
        _DBM = clientm.dariah
# the fields 'creator', 'dateCreated' and 'modified' are under system control.
        self.SYSTEM_FIELDS = {
            self.DM.generic['createdDate'],
            self.DM.generic['createdBy'],
            self.DM.generic['modified'],
        }
        self.CREATOR = self.DM.generic['createdBy']

        # this function is a simple table getter from mongoDB, but it does respect the permissions.
        # The workflow module needs to read tables, but we do not want code for the reading
        # in that module.
        # All db access is here, through _DBM, and all _DBM access is guarded by permission calculation.
        # Other modules can safely call basicList, it will never return results that are not permitted.

        def basicList(table, rowFilter, fieldFilter, sort=None):
            Perm = self.Perm
            (mayRead, readFields, warnings) = Perm.may(table, 'read')
            theFieldFilter = readFields if fieldFilter == True else dict(x for x in fieldFilter.items() if x[0] in readFields)
            if sort == None:
                result = list(_DBM[table].find(rowFilter, theFieldFilter))
            else:
                result = list(_DBM[table].find(rowFilter, theFieldFilter).sort(sort))
            return result

        self.basicList = basicList

    def getGroups(self, dest):
        dest.idFromGroup = dict()
        dest.groupFromId = dict()
        for doc in _DBM.permissionGroup.find():
            gid = doc['_id']
            group = doc['rep']
            dest.idFromGroup[group] = gid
            dest.groupFromId[gid] = group

    def userFind(self, eppn, authority): return _DBM.user.find_one({'eppn': eppn, 'authority': authority})
    def userLocal(self): return _DBM.user.find({'authority': 'local'})
    def userAdd(self, record): _DBM.user.insert_one(record)
    def userMod(self, record):
        if PRISTINE in record: del record[PRISTINE]
        _DBM.user.update_one(
            {'eppn': record['eppn']},
            {'$set': record, '$unset': {PRISTINE: ''}},
        )

    def validate(self, table, itemValues, uFields):
        tableInfo = self.DM.tables.get(table, {})
        modified = self.DM.generic['modified']
        (fieldOrder, fieldSpecs, allFields) = self.theseFields(table, True)
        valItemValues = dict()
        newValues = []
        for (f, values) in itemValues.items():
            if f == '_id':
                valItemValues[f] = (True, {}, [], oid(values))
                continue
            valType = fieldSpecs[f]['valType']
            multiple = fieldSpecs[f]['multiple']

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
                if valType == 'datetime':
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
                if 'relTable' not in valType: continue
                valueLists = self.getValueLists(table, {}, msgs, noTables=True)
                if len(msgs):
                    valid = False
                    diags.append('Could not get the valuelists')
                else:
                    allowNew = valType['allowNew']
                    relTable = valType['relTable']
                    for v in values:
                        if v not in valueLists.get(f, {}):
                            if not allowNew:
                                valid = False
                                diags.append('Unknown value "{}"'.format(v))
                            else:
                                result = _DBM[f].insert_one(dict(rep=v))
                                _id = result.inserted_id
                                valValues.append(result.inserted_id)
                                newValues.append(dict(_id=_id, rep=v, relTable=relTable, field=f))
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
        tableInfo = self.DM.tables.get(table, {})
        title = tableInfo.get('title', self.DM.generic['title'])
        item = tableInfo.get('item', self.DM.generic['item'])
        sort =  tableInfo.get('sort', None)
        (mayInsert, iFields, warnings) = Perm.may(table, 'insert')
        perm = dict(insert=mayInsert, needMaster=tableInfo.get('needMaster', False))
        orderKey = 'myIds' if my else 'allIds' 
        none = {table: {orderKey: [], 'entities': {}, 'fields': {}, 'perm': {}}}
        (good, result) = Perm.getPerm(controller, table, 'list')
        if not good:
            if result == None:
                msgs.append(dict(kind='warning', text='{} list is empty'.format(table)))
            else:
                msgs.append(dict(kind='error', text=result or 'Cannot list {}'.format(table)))
            return
        (rowFilter, fieldFilter) = result
        details = tableInfo.get('details', {})
        detailOrder = tableInfo.get('detailOrder', [])
        (fieldOrder, fieldSpecs, fieldFilter) = self.theseFields(table, fieldFilter)
        coreFields = dict(_id=True)
        getFields = set(fieldFilter)
        for f in getFields:
            coreFields[f] = True

        theFieldFilter = coreFields if titleOnly else fieldFilter 
        creatorField = self.CREATOR
        theFieldFilter[creatorField] = True
        if rFilter != None:
            rowFilter.update(rFilter)
        if sort == None:
            documents = list(_DBM[table].find(rowFilter, theFieldFilter))
        else:
            documents = list(_DBM[table].find(rowFilter, theFieldFilter).sort(sort))
        allIds=[d['_id'] for d in documents]
        entities=dict((str(d['_id']), dict(values=dict((f, d[f]) for f in d if (
                (not titleOnly or f in coreFields) and
                (f != creatorField or f in fieldFilter)
            )))) for d in documents)
        if not titleOnly:
            for d in documents:
                (mayDelete, dFields, warnings) = Perm.may(table, 'delete', document=d)
                (mayUpdate, uFields, warnings) = Perm.may(table, 'update', document=d)
                thisPerm = dict(update=uFields, delete=mayDelete)
                entities[str(d['_id'])]['perm'] = thisPerm

        result = dict(
            entities=entities,
            fields=theFieldFilter,
            title=title,
            item=item,
            perm=perm,
            fieldOrder=fieldOrder,
            fieldSpecs=fieldSpecs,
            details=details,
            detailOrder=detailOrder,
            complete=not titleOnly,
        )
        if my: result['myIds'] = allIds
        else: result['allIds'] = allIds

        data[table] = result
        data[table]['filterList'] = tableInfo.get('filters', [])
        if withValueLists: data[table]['valueLists'] = self.getValueLists(table, data, msgs)
        if withDetails: self.getDetails(table, data, msgs)
        return

    def getList(
            self, controller, table,
            rFilter=None, titleOnly=False,
            withValueLists=True, withDetails=True,
            my=False,
        ):
        data = dict()
        msgs = []
        self._getList(
            controller, table,
            data,
            msgs,
            rFilter=rFilter, titleOnly=titleOnly,
            withValueLists=withValueLists, withDetails=withDetails,
            my=my,
        )
        return self.stop(data=data, msgs=msgs)

    def getValueLists(self, table, data, msgs, noTables=False):
        Perm = self.Perm
        (good, result) = Perm.getPerm('list', table, 'list')
        if not good: return dict()
        tableInfo = self.DM.tables.get(table, {})
        valueLists = {}
        (rowFilter, fieldFilter) = result
        getFields = set(fieldFilter)
        fieldOrder = [x for x in tableInfo.get('fieldOrder', self.DM.generic['fieldOrder']) if x in fieldFilter]
        fieldSpecs = dict(x for x in tableInfo.get('fieldSpecs', self.DM.generic['fieldSpecs']).items() if x[0] in fieldOrder)

        relFields = [
            f for (f, fSpec) in fieldSpecs.items()\
                if f in getFields and\
                type(fSpec['valType']) is dict and\
                'relTable' in fSpec['valType']
        ]  
        relTables = {fieldSpecs[f]['valType']['relTable'] for f in relFields}
        good = True
        if not noTables:
            for t in relTables:
                self._getList('list', t, data, msgs, titleOnly=False)

        for f in relFields:
            fSpec = fieldSpecs[f]['valType']
            t = fSpec['relTable']
            thisTableInfo = self.DM.tables.get(t, {})
            select = fSpec.get('select', {})
            valueOrder = thisTableInfo.get('sort', self.DM.generic['sort'])
            rows = [str(row['_id']) for row in _DBM[t].find(select, dict(_id=True)).sort(valueOrder)]
            valueLists[f] = rows
        return valueLists

    def getDetails(self, table, data, msgs):
        Perm = self.Perm
        tableInfo = self.DM.tables.get(table, {})
        details = tableInfo.get('details', {})
        msgs = []
        for (name, detailProps) in details.items():
            t = detailProps['table']
            self._getList('list', t, data, msgs, titleOnly=False)

    def getItem(self, controller, table, ident):
        Perm = self.Perm
        (good, result) = Perm.getPerm(controller, table, 'read')
        if not good:
            return self.stop(text=result or 'Cannot read {}'.format(table))
        tableInfo = self.DM.tables.get(table, {})
        (rowFilter, fieldFilter) = result
        (fieldOrder, fieldSpecs, fieldFilter) = self.theseFields(table, fieldFilter)

        if ident != None:
            rowFilter.update({'_id': oid(ident)})
            return self.findDoc(table, rowFilter, fieldFilter, {}, '{} item does not exist'.format(table))
        else:
            rowFilter.update({'_id': {'$in': [oid(i) for i in request.json]}})
            return self.findDoc(table, rowFilter, fieldFilter, {}, '{} cannot find items'.format(table), multiple=True)

    def _insertItem(self, controller, table, newData, records):
        masterId = newData.get('masterId', None)
        linkField = newData.get('linkField', None)
        tableInfo = self.DM.tables.get(table, {})
        title = tableInfo.get('title', self.DM.generic['title'])
        noTitle = tableInfo.get('noTitle', self.DM.generic['noTitle'])
        item = tableInfo.get('item')[0]
        sort = tableInfo.get('title', self.DM.generic['sort'])
        none = None
        (readGood, readResult) = self.Perm.getPerm(controller, table, 'read')
        if not readGood:
            return self.stop(data=none, text=readResult or 'Cannot read table {}'.format(table))
        (readRowFilter, readFieldFilter) = readResult
        modDate = now()
        modBy = self.eppn
        createdDate = self.DM.generic['createdDate']
        createdBy = self.DM.generic['createdBy']
        modified = self.DM.generic['modified']
        insertValues = {
            createdDate: now(),
            createdBy: self.uid,
            modified: ['{} on {}'.format(modBy, modDate)],
        }
        masterDocument = None
        masterTitle = None
        if masterId != None and linkField != None:
            (fieldOrder, fieldSpecs, fieldFilter) = self.theseFields(table, readFieldFilter)
            oMasterId = oid(masterId)
            insertValues[linkField] = oMasterId
            linkFieldSpecs = fieldSpecs[linkField]
            masterTable = linkFieldSpecs['valType']['relTable']
            masterDocument = list(_DBM[masterTable].find({'_id': oMasterId}))[0]
            masterTableInfo = self.DM.tables.get(masterTable, {})
            masterTitle = masterTableInfo.get('title', self.DM.generic['title'])
        for (field, value) in newData.items():
            if field != 'linkField' and field != 'masterId':
                insertValues[field] = value

        if title not in insertValues:
            insertValues[title] = '{} of {}'.format(item, masterDocument[masterTitle]) if masterDocument else noTitle

        # hook for workflow-specific actions: extra fields, extra details
        (extraGood, extraText, extraData) = detailInsert(self.basicList,
            table=table,
            masterDocument=masterDocument,
        )
        if not extraGood:
            return self.stop(data=none, text=extraText)

        # use the extra fields, if any
        if extraData and 'insertValues' in extraData:
            insertValues.update(extraData['insertValues'])

        result = _DBM[table].insert_one(insertValues)
        ident = result.inserted_id
        records.append((table, ident, readFieldFilter))

        # use the extra details, if any
        if extraData and 'detailData' in extraData:
            for (detailTable, detailRecords) in extraData['detailData'].items():
                for detailRecord in detailRecords:
                    detailRecord['masterId'] = ident
                    result = self._insertItem(controller, detailTable, detailRecord, records)
                    if not result['good']:
                        return result
        return self.stop(data=none)

    def _deleteItem(self, controller, table, newData, records, errors):
        Perm = self.Perm
        ident = newData.get('_id', None)
        if ident == None:
            errors.append('Not specified which item to delete from table {}'.format(table))
            return
        (good, result) = Perm.getPerm(controller, table, 'delete')
        (rowFilter, fieldFilter) = result
        rowFilter.update({'_id': oid(ident)})
        documents = list(_DBM[table].find(rowFilter))
        if len(documents) != 1:
            errors.append('Unidentified item to delete')
            return
        document = documents[0]
        (mayDelete, dFields, warnings) = Perm.may(table, 'delete', document=document)
        if not mayDelete:
            errors.append('Not allowed to delete item {} from {}'.format(ident, table))
            return
        else:
            # first delete detail records
            tableInfo = self.DM.tables.get(table, {})
            details = tableInfo.get('details', {})
            for detail in details.values():
                cascade = detail.get('cascade', False)
                if not cascade: continue
                detailTable = detail['table']
                linkField = detail['linkField']
                (good, result) = self.Perm.getPerm(controller, detailTable, 'delete')
                if not good: continue
                (detailRowFilter, fieldFilter) = result
                detailRowFilter.update({linkField: oid(ident)})
                detailDocuments = list(_DBM[detailTable].find(detailRowFilter, {'_id': True}))
                for detailDoc in detailDocuments:
                    self._deleteItem(controller, detailTable, {'_id': detailDoc['_id']}, records, errors)
            # finally delete the main record
            _DBM[table].delete_one(rowFilter)
            records.append((table, str(ident)))

    def modList(self, controller, table, action):
        Perm = self.Perm
        modified = self.DM.generic['modified']
        (good, result) = Perm.getPerm(controller, table, action)
        none = '' if action == 'insert' else {}
        if not good:
            return self.stop(data=none, text=result or 'Cannot do {} in table {}'.format(table, action))

        (rowFilter, fieldFilter) = result

        if action == 'insert':
            newData = request.json
            records = []
            result = self._insertItem(controller, table, newData, records)
            if not result['good']: return result
            return self.findDocs(records)

        elif action == 'delete':
            newData = request.json
            records = []
            errors = []
            self._deleteItem(controller, table, newData, records, errors)
            if errors:
                return self.stop(
                    data=records,
                    text='\n'.join(errors),
                )
            return self.stop(data=records)
        elif action == 'update':
            newData = request.json
            ident = newData.get('_id', None)
            if ident == None:
                return self.stop(data=none, text='Not specified which item to update')
            rowFilter.update({'_id': oid(ident)})
            documents = list(_DBM[table].find(rowFilter))
            if len(documents) != 1:
                return self.stop(data=none, text='Unidentified item to update')
            document = documents[0]
            (mayUpdate, updFields, warnings) = Perm.may(table, 'update', document=document, newValues=newData.get('values', {}))
            permMsgs = [dict(kind='warning', text=warning) for warning in warnings]
            (fieldOrder, fieldSpecs, fieldFilter) = self.theseFields(table, fieldFilter)
            uFields = set()
            for uField in updFields:
                valType = fieldSpecs[uField]['valType']
                if type(valType) is not dict or not valType.get('fixed', False):
                    uFields.add(uField)
            if not mayUpdate:
                text = 'Not allowed to update this item' if len(warnings) == 0 else None
                return self.stop(data=none, text=text, msgs=permMsgs)
            newValues = dict(x for x in newData.get('values', {}).items())
            (valItemValues, newValues) = self.validate(table, newValues, uFields)
            validationMsgs = []
            validationDiags = {}
            updateValues = dict()
            stop = False
            for (f, (valid, diags, msgs, vals)) in sorted(valItemValues.items()):
                if valid:
                    updateValues[f] = vals
                else:
                    stop = True
                    validationMsgs.extend(msgs)
                    validationDiags[f] = diags
            if stop:
                invalidFields = ', '.join(sorted(validationDiags))
                validationDiags['_error'] = 'invalid values in fields {}'.format(invalidFields)
                validationMsgs.append(dict(kind='warning', text='table {}, item {}: invalid values in {}'.format(table, ident, invalidFields)))
                return self.stop(data=validationDiags, msgs=validationMsgs)


            modDate = now()
            modBy = self.eppn
            updateSaveValues = {}
            updateSaveValues.update(updateValues) # shallow copy of updateValues
            for sysField in self.SYSTEM_FIELDS:
                if sysField not in updateValues or updateValues[sysField] == None:
                        updateSaveValues[sysField] = document[sysField] # add the system field

            updateSaveValues[modified].append('{} on {}'.format(modBy, modDate))
            if PRISTINE in updateSaveValues: del updateSaveValues[PRISTINE]
            _DBM[table].update_one(
                rowFilter,
                {'$set': updateSaveValues, '$unset': {PRISTINE: ''}},
            )
            # here system values are updated in the database
            return self.stop(data=dict(values=updateSaveValues, newValues=newValues), msgs=permMsgs) # ??? but modified is not always returned

    def stop(self, data=None, text=None, msgs=None):
        good = text == None and (msgs == None or all(msg['kind'] != 'error' for msg in msgs))
        msgs = [dict(kind='error', text=text)] if msgs == None and text != None else msgs
        return dict(data=data, msgs=msgs, good=good)

    def findDoc(self, table, rowFilter, fieldFilter, failData, failText, multiple=False):
        Perm = self.Perm
        creatorField = self.CREATOR
        theFieldFilter = dict(x for x in fieldFilter.items())
        theFieldFilter[creatorField] = True
        documents = list(_DBM[table].find(rowFilter, theFieldFilter))
        ldoc = len(documents)
        if ldoc == 0:
            return self.stop(data=failData, text=failText)
        if multiple:
            data = []
            for document in documents:
                (mayDelete, dFields, warnings) = Perm.may(table, 'delete', document=document)
                (mayUpdate, uFields, warnings) = Perm.may(table, 'update', document=document)
                perm = dict(update=uFields, delete=mayDelete)
                data.append(dict(
                    values=dict((f,v) for (f,v) in document.items() if f != creatorField or f in fieldFilter),
                    perm=perm,
                    fields=fieldFilter,
                ))
            return self.stop(data=data)
        else:
            document = documents[0]
            (mayDelete, dFields, warnings) = Perm.may(table, 'delete', document=document)
            (mayUpdate, uFields, warnings) = Perm.may(table, 'update', document=document)
            perm = dict(update=uFields, delete=mayDelete)
            return self.stop(data=dict(
                values=dict((f,v) for (f,v) in document.items() if f != creatorField or f in fieldFilter),
                perm=perm,
                fields=fieldFilter),
            )

    def findDocs(self, records):
        Perm = self.Perm
        creatorField = self.CREATOR
        errors = []
        data = []
        for (table, ident, fieldFilter) in records:
            rowFilter = dict(_id=ident)
            theFieldFilter = dict(x for x in fieldFilter.items())
            theFieldFilter[creatorField] = True
            documents = list(_DBM[table].find(rowFilter, theFieldFilter))
            ldoc = len(documents)
            if ldoc == 0:
                errors.append('Could not find back record {} in table {}'.format(ident, table))
                continue
            document = documents[0]
            (mayDelete, dFields, warnings) = Perm.may(table, 'delete', document=document)
            (mayUpdate, uFields, warnings) = Perm.may(table, 'update', document=document)
            perm = dict(update=uFields, delete=mayDelete)
            data.append(dict(
                table=table,
                values=dict((f,v) for (f,v) in document.items() if f != creatorField or f in fieldFilter),
                perm=perm,
                fields=fieldFilter,
            ))
        if errors:
            return self.stop(
                data=data,
                text='\n'.join(errors),
            )
        return self.stop(data=data)

    def consolidateDocs(self, table, documents, level=0, withDetails=False):
        tableInfo = self.DM.tables.get(table, {})
        fieldOrder = [x for x in tableInfo.get('fieldOrder', self.DM.generic['fieldOrder'])]
        fieldSpecs = dict(x for x in tableInfo.get('fieldSpecs', self.DM.generic['fieldSpecs']).items() if x[0] in fieldOrder)
        detailOrder = tableInfo.get('detailOrder', None)
        details = tableInfo.get('details', None)
        title = tableInfo.get('title', self.DM.generic['title'])
        item = tableInfo.get('item', self.DM.generic['item'])
        consolidatedDocs = []
        docs = documents if type(documents) is list else [documents]
        nDocs = len(docs)
        for document in docs:
            consDoc = dict()
            for field in fieldOrder:
                if field not in document:
                    consDoc[field] = None
                    continue
                fieldSpec = fieldSpecs[field]
                valType = fieldSpec['valType']
                multiple = fieldSpec['multiple']
                docVal = document[field]
                if type(valType) is str:
                    consDoc[field] = [simpleVal(valType, val) for val in docVal] if multiple else simpleVal(valType, docVal)
                    continue
                else:
                    valueTable = valType['relTable']
                    relatedDocs = list(_DBM[valueTable].find(
                        {'_id': {'$in': [_id for _id in (docVal if multiple else [docVal])]}}
                    ))
                    if len(relatedDocs) == 0:
                        valRep = None
                    else:
                        valRep = [self.head(valueTable, doc) for doc in relatedDocs] if multiple else  self.head(valueTable, relatedDocs[0])
                    consDoc[field] = valRep
                    continue
            if withDetails and detailOrder and details:
                for detail in detailOrder:
                    detailSpec = details[detail]
                    detailTable = detailSpec['table']
                    linkField = detailSpec['linkField']
                    detailDocs = list(_DBM[detailTable].find({linkField: document['_id']}))
                    consDoc.setdefault('details', []).append((detail, self.consolidateDocs(
                        detailTable, detailDocs,
                        level=level+1,
                        withDetails=False,
                    )))
            consolidatedDocs.append(consDoc)
        return consolidatedDocs if type(documents) is list else consolidatedDocs[0]

    def head(self, table, doc):
        methodName = 'head_{}'.format(table)
        if hasattr(self, methodName):
            return getattr(self, methodName)(doc)
        tableInfo = self.DM.tables.get(table, {})
        title = tableInfo.get('title', self.DM.generic['title'])
        return str(doc.get(title, 'no {}'.format(title))).rstrip('\n')

    def head_user(self, doc):
        firstName = doc.get('firstName', '')
        lastName = doc.get('lastName', '')
        email = doc.get('email', '')
        email = doc.get('email', '')
        eppn = doc.get('eppn', '')
        authority = doc.get('authority', '')
        nameSection = '{}{}{}'.format(firstName, ' ' if firstName and lastName else '', lastName)
        emailSection = '[{}](mailto:{})'.format(email, email) if email else ''
        identitySection = '{}{}{}{}'.format('identified as ' if eppn else '', eppn, ' authorized by ' if authority else '', authority)
        return '{} {} {}'.format(
            nameSection,
            emailSection,
            identitySection,
        )
        return 'user'
        
    def head_country(self, doc):
        return '{} = {}, {}a DARIAH member'.format(
            doc.get('iso', ''),
            doc.get('name', ''),
            '' if doc.get('isMember', False) else 'not ',
        )
        
    def head_typeContribution(self, doc):
        mainType = doc.get('mainType', '')
        subType = doc.get('subType', '')
        sep = ' / ' if mainType and subType else ''
        return '{}{}{}'.format(
            mainType,
            sep,
            subType,
        )
        
    def head_score(self, doc):
        score = doc.get('score', 'N/A')
        level = doc.get('level', 'N/A')
        description = doc.get('description', '')
        return '{} - {}'.format(score, level) if score or level else description

    def theseFields(self, table, fieldFilter):
        tableInfo = self.DM.tables.get(table, {})
        fieldOrder = [x for x in tableInfo.get('fieldOrder', self.DM.generic['fieldOrder']) if fieldFilter == True or x in fieldFilter]
        fieldSpecs = dict(
            x for x in tableInfo.get('fieldSpecs', self.DM.generic['fieldSpecs']).items() if x[0] in fieldOrder
        )
        fieldFilterPost = dict(
            (f, True) for f in fieldOrder
        )
        return (fieldOrder, fieldSpecs, fieldFilterPost)

def simpleVal(valType, val):
    result = \
        '[{}](mailto:{})'.format(val, val) if valType == 'email' \
    else '[{}]({})'.format(val, val) if valType == 'url' \
    else str(val).split('.', 1)[0] if valType == 'datetime' \
    else ('Yes' if val else 'No') if valType == 'bool' \
    else str(val) if valType == 'number' \
    else val
    return result.rstrip('\n')

