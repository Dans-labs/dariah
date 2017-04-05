import json, datetime
from bottle import request, install, JSONPlugin
from pymongo import MongoClient
from bson.objectid import ObjectId
from datetime import datetime

def oid(oidstr):
    return ObjectId() if oidstr == None else ObjectId(oidstr) 

def now(): return datetime.utcnow()

def dtm(isostr):
    try:
        date = datetime.strptime(isostr, "%Y-%m-%dT%H:%M:%S.%f")
    except:
        date = datetime.strptime(isostr, "%Y-%m-%dT%H:%M:%S")
    return date

def json_string(obj):
    if isinstance(obj, datetime):
        return obj.isoformat()
    elif isinstance(obj, ObjectId):
        return str(obj)
    raise TypeError('Not sure how to serialize %s' % (obj,))

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

    def userFind(self, eppn, authority): return _DBM.user.find_one({'eppn': eppn, 'authority': authority})
    def userLocal(self): return _DBM.user.find({'authority': 'local'})
    def userInGroup(self): return _DBM.inGroup.find({})
    def userAdd(self, record): _DBM.user.insert_one(record)
    def userMod(self, record): _DBM.user.update_one({'eppn': record['eppn']}, {'$set': record})

    def validate(self, table, itemValues, uFields):
        fieldSpecs = dict(x for x in self.DM.tables.get(table, {}).get('fieldSpecs', {}).items() if x[0] in itemValues)
        valItemValues = dict()
        for (f, values) in itemValues.items():
            valType = fieldSpecs[f]['valType']
            multiple = fieldSpecs[f]['multiple']
            fvalidation = fieldSpecs[f]['validation']
            nonEmpty = fvalidation.get('nonEmpty', False)

            if multiple: values = [] if values == None else values
            else: values = [values] if values != None else []
            valid = True
            valValues = []
            msgs = []
            if f not in uFields:
                valid = False
                msgs.append([dict(kind='error', text='table {} field {} not accessible'.format(table, field))])
            elif values == []: 
                if nonEmpty:
                    valid = False
                    msgs.append([dict(kind='error', text='table {} field {} may not be empty'.format(table, field))])
            elif type(valType) is str:
                if valType == 'datetime':
                    valValues = [dtm(v) for v in values]
                else:
                    valValues = [v for v in values]
            else: 
                (good, thisMsgs, tables, valueLists) = self.getValueLists(table, noTables=True)
                if not good:
                    valid = False
                    msgs.extend(thisMsgs)
                else:
                    allowNew = valType['allowNew']
                    if not allowNew:
                        for v in values:
                            if v not in valueLists.get(f, {}):
                                valid = False
                                msgs.append([dict(kind='error', text='table {} field {}: Unknown value "{}"'.format(table, field, v))])
                            else:
                                valValues.append[v]

            if not multiple: valValues = None if valValues == [] else valValues[0]
            valItemValues[f] = (valid, valValues)
        return valItemValues

    def getList(
            self, controller, table, action,
            rFilter=None, sort=None, titleOnly=False,
            withValueLists=False, withFilters=False,
        ):
        Perm = self.Perm
        title = self.DM.tables.get(table, {}).get('title', None)
        (mayInsert, iFields) = Perm.may(table, 'insert')
        perm = dict(insert=mayInsert)
        none = {table: dict(order=[], entities={}, fields={}, perm={})}
        (good, result) = Perm.getPerm(controller, table, action)
        if not good:
            return self.stop(data=none, text=result)
        (rowFilter, fieldFilter) = result
        fieldOrder = [x for x in self.DM.tables.get(table, {}).get('fieldOrder', []) if x in fieldFilter]
        fieldSpecs = dict(x for x in self.DM.tables.get(table, {}).get('fieldSpecs', {}).items() if x[0] in fieldOrder)
        if titleOnly:
            filters = {f['field'] for f in self.DM.tables[table].get('filters', None)}
            getFields = set(fieldFilter)
            for f in getFields:
                if f != title and (filters == None or f not in filters): del fieldFilter[f] 
        if rFilter != None:
            rowFilter.update(rFilter)
        if sort == None:
            documents = list(_DBM[table].find(rowFilter, fieldFilter))
        else:
            (sortField, sortDir) = sort
            sortField = self.DM.tables[table][sortField[1:]] if sortField[0] == '*' else sortField
            documents = list(_DBM[table].find(rowFilter, fieldFilter).sort(sortField, sortDir))
        order=[d['_id'] for d in documents]
        entities=dict((str(d['_id']), dict(values=d, complete=not titleOnly)) for d in documents)
        if withValueLists:
            (good, thisMsgs, tables, valueLists) = self.getValueLists(table)
            if not good:
                return self.stop(data=none, msgs=thisMsgs)

        data = {
            table: dict(
                order=order,
                entities=entities,
                fields=fieldFilter,
                valueLists=valueLists,
                title=title,
                perm=perm,
                fieldOrder=fieldOrder,
                fieldSpecs=fieldSpecs,
            )
        }
        for (t, tdata) in tables.items():
            data[t] = tdata
        if withFilters:
            data[table]['filterList'] = self.DM.tables[table]['filters']
        return self.stop(data=data)

    def getValueLists(self, table, field=None, noTables=False):
        Perm = self.Perm
        (good, result) = Perm.getPerm('list', table, 'read')
        valueLists = {}
        if not good: return dict()
        (rowFilter, fieldFilter) = result
        getFields = set(fieldFilter)
        fieldOrder = [x for x in self.DM.tables.get(table, {}).get('fieldOrder', []) if x in fieldFilter]
        fieldSpecs = dict(x for x in self.DM.tables.get(table, {}).get('fieldSpecs', {}).items() if x[0] in fieldOrder)

        values = list(_DBM['values'].find(dict(table=table), dict(values=True)))
        for vl in values:
            for f in vl:
                if (field != None and f != field) or f not in getFields: continue
                for v in vl[f]:
                    valueLists.setdefault(f, {})[v] = True
        skimFields = [f for (f, fSpec) in fieldSpecs.items() if type(fSpec['valType']) is dict and fSpec['valType']['values'] == 'values']  
        for f in skimFields:
            if (field != None and f != field) or f not in getFields: continue
            values = list(_DBM[table].distinct(f))
            for v in values:
                valueLists.setdefault(f, {})[v] = True
        relFields = [
            f for (f, fSpec) in fieldSpecs.items()\
                if (field == None or f == field) and\
                f in getFields and\
                type(fSpec['valType']) is dict and\
                fSpec['valType']['values'] != 'values'
        ]  
        relTables = {fieldSpecs[f]['valType']['values'] for f in relFields}
        tables = dict()
        msgs = []
        good = True
        if not noTables:
            for t in relTables:
                result = self.getList('list', t, 'read', withValueLists=True)
                if result['good']:
                    tables[t] = result['data'][t]
                else:
                    msgs.extend(result['msgs'])
                    good = False

        for f in relFields:
            fSpec = fieldSpecs[f]['valType']
            t = fSpec['values']
            select = fSpec.get('select', {})
            rows = list(_DBM[t].find(select, dict(_id=True)))
            for row in rows: valueLists.setdefault(f, {})[str(row['_id'])] = True
        return (good, msgs, tables, valueLists if field == None else valueLists[field])

    def getItem(self, controller, table, ident, action):
        Perm = self.Perm
        none = {}
        (good, result) = Perm.getPerm(controller, table, action)
        if not good:
            return self.stop(text=result)
        (rowFilter, fieldFilter) = result
        fieldOrder = [x for x in self.DM.tables.get(table, {}).get('fieldOrder', []) if x in fieldFilter]
        fieldSpecs = dict(x for x in self.DM.tables.get(table, {}).get('fieldSpecs', {}).items() if x[0] in fieldOrder)
        rowFilter.update({'_id': oid(ident)})
        documents = list(_DBM[table].find(rowFilter, fieldFilter))

        ldoc = len(documents)
        if ldoc == 0:
            return self.stop(data=none, text='{} item does not exist'.format(table))
        document = documents[0]
        (mayDelete, dFields) = Perm.may(table, 'delete', document=document)
        (mayUpdate, uFields) = Perm.may(table, 'update', document=document)
        perm = dict(update=uFields, delete=mayDelete)
        fillIn = 'getValues'
        for (fName, specs) in fieldSpecs.items():
            if fillIn in specs: specs[fillIn] = specs[fillIn].format(table=table, field=fName) 
        return self.stop(data=dict(values=document, complete=True, perm=perm, fields=fieldFilter))

    def modList(self, controller, table, action):
        Perm = self.Perm
        (good, result) = Perm.getPerm(controller, table, action)
        none = '' if action == 'insert' else {}
        if not good:
            return self.stop(data=none, text=result)

        (rowFilter, fieldFilter) = result

        if action == 'insert':
            title = self.DM.tables[table]['title']
            modDate = self.DM.generic['modDate']
            modBy = self.DM.generic['modBy']
            createdDate = self.DM.generic['createdDate']
            createdBy = self.DM.generic['createdBy']
            insertVals = {
                title: ['no title'],
                createdDate: [now()],
                createdBy: [{'_id': self.uid}],
                modDate: [now()],
                modBy: [{'_id': self.uid}],
            }
            result = _DBM[table].insert_one(insertVals)
            return self.stop(data=result.inserted_id)

        elif action == 'delete':
            newData = request.json
            ident = newData.get('_id', None)
            if ident == None:
                return self.stop(data=none, text='Not specified which item to delete')
            rowFilter.update({'_id': oid(ident)})
            documents = list(_DBM[table].find(rowFilter, {'_id': True}))
            if len(documents) != 1:
                return self.stop(data=none, text='Unidentified item to delete')
            document = documents[0]
            (mayDelete, dFields) = Perm.may(table, 'delete', document=document)
            if not mayDelete:
                return self.stop(data=none, text='Not allowed to delete this item')
            else:
                _DBM[table].delete_one(rowFilter)
                return self.stop(data={'_id': ident})

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
            (mayUpdate, uFields) = Perm.may(table, 'update', document=document)
            if not mayUpdate:
                return self.stop(data=none, text='Not allowed to update this item')
            newValues = dict(x for x in newData.get('values', {}).items())
            valItemValues = self.validate(table, newValues, uFields)
            if any(not valid for (f, (valid, vals)) in valItemValues):
                fields = ','.join(f for (f, (valid, vals)) in valItemValues if not valid)
                return self.stop(data=none, text='Validation errors in {}'.format(fields))
            fieldSpecs = self.DM.tables[table]['fieldSpecs'].get(field, None)
            if fieldSpecs == None:
                return self.stop(data=none, text='field {} has unknown type'.format(field))
            if not valid:
                documents = list(_DBM[table].find(rowFilter, {field: True}))
                if len(documents) != 1:
                    return self.stop(data=none, text='error during update of field {}'.format(field))
                document = documents[0]
                values = document.get(field, [])
                return dict(
                    data={field: values},
                    good=True,
                    msgs=[dict(kind='warning', text='restored field {} because validation failed'.format(field))],
                )
            else:
                modDate = self.DM.generic['modDate']
                modBy = self.DM.generic['modBy']
                changeVals = {'$set': {name: valValues} }
                if name != modDate and name != modBy:
                    changeVals.update({
                        '$push': {
                            modDate: now(),
                            modBy: {'_id': self.uid},
                        },
                    })
                _DBM[table].update_one(rowFilter, changeVals)
                documents = list(_DBM[table].find(rowFilter, {name: True, modDate: True, modBy: True}))
                if len(documents) != 1:
                    return self.stop(data=none, text='item not properly identified after update')
                document = documents[0]
                changedVals = {
                    name: document[name],
                    modDate: document[modDate],
                    modBy: document[modBy],
                }
                return self.stop(data=changedVals)

    def stop(self, data=None, text=None, msgs=None):
        good = text == None and msgs == None
        msgs = [] if good else [dict(kind='error', text=text)] if msgs == None else msgs
        return dict(data=data, msgs=msgs, good=good)

