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

    def validate(self, values, fieldSpecs):
        valType = fieldSpecs['valType']
        fvalidation = fieldSpecs['validation']
        nonEmpty = fvalidation.get('nonEmpty', False)
        idField = self.DM.generic['idField']
        valField = self.DM.generic['valField']

        if values == None: return (not nonEmpty, [])
        if valType == 'datetime':
            valValues = [dtm(v) for v in values]
        elif valType == 'rel':
            seenIds = set()
            seenVals = set()
            valValues = []
            for v in values:
                vId = v.get(idField, None)
                vVal = v.get(valField, None)
                if v == None or vId in seenIds or (vVal != None and vVal) in seenVals: continue
                seenIds.add(vId)
                seenVals.add(vVal)
                valValues.append(dict((k, oid(m) if k == idField else m) for (k, m) in v.items()))
        else:
            valValues = [v for v in values]
        return (True, valValues)


    def getValues(self, controller, table, field, action):
        Perm = self.Perm
        (good, result) = Perm.getPerm(controller, table, action)
        if not good:
            return self._stop(text=result)
        (rowFilter, fieldFilter) = result
        if field not in fieldFilter:
            return self._stop(text='no visible field {} in {}'.format(field, table))
        documents = list(_DBM[table].distinct(field))
        return self._stop(data=documents)

    def getList(self, controller, table, action, rFilter=None, sort=None, withFilters=False):
        Perm = self.Perm
        idField = self.DM.generic['idField']
        (mayInsert, iFields) = Perm.may(table, 'insert')
        perm = dict(insert=mayInsert)
        none = dict(records=[], fields={}, perm={})
        (good, result) = Perm.getPerm(controller, table, action)
        if not good:
            return self._stop(data=none, text=result)
        (rowFilter, fieldFilter) = result
        if rFilter != None:
            rowFilter.update(rFilter)
        if sort == None:
            documents = list(_DBM[table].find(rowFilter, fieldFilter))
        else:
            (sortField, sortDir) = sort
            sortField = self.DM.tables[table][sortField[1:]] if sortField[0] == '*' else sortField
            documents = list(_DBM[table].find(rowFilter, fieldFilter).sort(sortField, sortDir))
        title = self.DM.tables.get(table, {}).get('title', None)
        data = dict(
            order=[d[idField] for d in documents],
            records=dict((str(d[idField]), d) for d in documents),
            fields=fieldFilter,
            title=title,
            perm=perm,
        )
        if withFilters:
            data['filterList'] = self.DM.tables[table]['filters']
        return self._stop(data=data)

    def getItem(self, controller, table, ident, action):
        Perm = self.Perm
        idField = self.DM.generic['idField']
        none = {}
        (good, result) = Perm.getPerm(controller, table, action)
        if not good:
            return self._stop(text=result)
        (rowFilter, fieldFilter) = result
        rowFilter.update({idField: oid(ident)})
        documents = list(_DBM[table].find(rowFilter, fieldFilter))

        ldoc = len(documents)
        if ldoc == 0:
            return self._stop(data=none, text='{} item does not exist'.format(table))
        document = documents[0]
        (mayDelete, dFields) = Perm.may(table, 'delete', document=document)
        (mayUpdate, uFields) = Perm.may(table, 'update', document=document)
        perm = dict(update=uFields, delete=mayDelete)
        fieldOrder = [x for x in self.DM.tables[table]['fieldOrder'] if x in fieldFilter]
        fieldSpecs = dict(x for x in self.DM.tables[table]['fieldSpecs'].items() if x[0] in fieldOrder)
        fillIn = 'getValues'
        for (fName, specs) in fieldSpecs.items():
            if fillIn in specs: specs[fillIn] = specs[fillIn].format(table=table, field=fName) 
        return self._stop(data=dict(
            row=document,
            fields=fieldFilter,
            title=self.DM.tables[table]['title'],
            perm=perm,
            fieldOrder=fieldOrder,
            fieldSpecs=fieldSpecs,
        ))

    def modList(self, controller, table, action):
        idField = self.DM.generic['idField']
        Perm = self.Perm
        (good, result) = Perm.getPerm(controller, table, action)
        none = '' if action == 'insert' else {}
        if not good:
            return self._stop(data=none, text=result)

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
                createdBy: [{idField: self.uid}],
                modDate: [now()],
                modBy: [{idField: self.uid}],
            }
            result = _DBM[table].insert_one(insertVals)
            return self._stop(data=result.inserted_id)

        elif action == 'delete':
            newData = request.json
            ident = newData.get(idField, None)
            if ident == None:
                return self._stop(data=none, text='Not specified which item to delete')
            rowFilter.update({idField: oid(ident)})
            documents = list(_DBM[table].find(rowFilter, {idField: True}))
            if len(documents) != 1:
                return self._stop(data=none, text='Unidentified item to delete')
            document = documents[0]
            (mayDelete, dFields) = Perm.may(table, 'delete', document=document)
            if not mayDelete:
                return self._stop(data=none, text='Not allowed to delete this item')
            else:
                _DBM[table].delete_one(rowFilter)
                return self._stop(data={idField: ident})

        elif action == 'update':
            newData = request.json
            ident = newData.get(idField, None)
            if ident == None:
                return self._stop(data=none, text='Not specified which item to update')
            name = newData.get('name', None)
            if name == None:
                return self._stop(data=none, text='Not specified which field to update')
            rowFilter.update({idField: oid(ident)})
            documents = list(_DBM[table].find(rowFilter))
            if len(documents) != 1:
                return self._stop(data=none, text='Unidentified item to update')
            document = documents[0]
            (mayUpdate, uFields) = Perm.may(table, 'update', document=document)
            if not mayUpdate:
                return self._stop(data=none, text='Not allowed to update this item')
            if not name in uFields:
                return self._stop(data=none, text='Not allowed to update field {} this item'.format(name))
            newValues = newData.get('values', None)
            fieldSpecs = self.DM.tables[table]['fieldSpecs'].get(name, None)
            if fieldSpecs == None:
                return self._stop(data=none, text='field {} has unknown type'.format(name))
            (valid, valValues) = self.validate(newValues, fieldSpecs)
            if not valid:
                documents = list(_DBM[table].find(rowFilter, {name: True}))
                if len(documents) != 1:
                    return self._stop(data=none, text='error during update of field {}'.format(name))
                document = documents[0]
                values = document.get(name, [])
                return dict(
                    data={name: values},
                    good=True,
                    msgs=[dict(kind='warning', text='restored field {} because validation failed'.format(name))],
                )
            else:
                modDate = self.DM.generic['modDate']
                modBy = self.DM.generic['modBy']
                changeVals = {'$set': {name: valValues} }
                if name != modDate and name != modBy:
                    changeVals.update({
                        '$push': {
                            modDate: now(),
                            modBy: {idField: self.uid},
                        },
                    })
                _DBM[table].update_one(rowFilter, changeVals)
                documents = list(_DBM[table].find(rowFilter, {name: True, modDate: True, modBy: True}))
                if len(documents) != 1:
                    return self._stop(data=none, text='item not properly identified after update')
                document = documents[0]
                changedVals = {
                    name: document[name],
                    modDate: document[modDate],
                    modBy: document[modBy],
                }
                return self._stop(data=changedVals)

    def _stop(self, data=None, text=None):
        good = text == None
        msgs = [] if good else [dict(kind='error', text=text)]
        return dict(data=data, msgs=msgs, good=good)
