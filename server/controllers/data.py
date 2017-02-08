from bottle import request
from db import connectdb
from datetime import datetime

def getDatetime(iso): return datetime.strptime(iso, "%Y-%m-%dT%H:%M:%S.%fZ")

def validate(values, fieldSpecs):
    valType = fieldSpecs['valType']
    fvalidation = fieldSpecs['validation']
    nonEmpty = fvalidation.get('nonEmpty', False)

    if values == None: return (not nonEmpty, [])
    if valType == 'datetime':
        valValues = [getDatetime(v) for v in values]
    else:
        valValues = [v for v in values]
    return (True, valValues)

class DataApi(object):
    def __init__(self, CM):
        self.dbm = connectdb()
        self.CM =CM

    def data(self, query, perm):
        self.perm = perm
        self.uid = perm.getUid()
        method = getattr(self, query, None)
        if callable(method):
            allowed = perm.getPerms(query)
            if not allowed:
                return dict(data=None, msgs=self.perm.msgs, good=False)
            else:
                return method()
        else:
            return dict(data=None, msgs=[dict(kind='error', text='query {} not provided'.format(query))], good=False)

    def list_contrib(self):
        qfilter = self.perm.filters['read']
        qprojector = self.perm.projectors['read']
        documents = list(self.dbm.contrib.find(qfilter, qprojector).sort('title', 1)) if qfilter != False else []
        return dict(data=dict(contribs=documents, fields=qprojector), msgs=[], good=True)

    def item_contrib(self):
        action = request.query.action
        criteria = self.perm.criteria['update']

        if action == 'update':
            qprojector = self.perm.projectors['update']
            newData = request.json
            _id = newData.get('_id', None)
            if _id == None:
                return dict(
                    data=None,
                    good=False,
                    msgs=[dict(kind='error', text='contribution not identified')],
                )
            name = newData.get('name', None)
            if name == None:
                return dict(
                    data=None,
                    good=False,
                    msgs=[dict(kind='error', text='unknown contribution field {}'.format(name))],
                )
            if not qprojector.get(name, False):
                return dict(
                    data=None,
                    good=False,
                    msgs=[dict(kind='error', text='not allowed to update contribution field {}'.format(name))],
                )
            documents = list(self.dbm.contrib.find(dict(_id=_id)))
            if len(documents) != 1:
                return dict(
                    data=None,
                    good=False,
                    msgs=[dict(kind='error', text='contribution not properly identified')],
                )
            document = documents[0]
            mayUpdate = criteria(document)
            if not mayUpdate:
                return dict(
                    data=None,
                    good=False,
                    msgs=[dict(kind='error', text='not allowed to update field {} of this contribution'.format(name))],
                )
            newValues = newData.get('values', None)
            fieldSpecs = self.CM.fieldSpecs.get(name, None)
            if fieldSpecs == None:
                return dict(
                    data=None,
                    good=False,
                    msgs=[dict(kind='error', text='field {} has unknown type'.format(name))],
                )
            (valid, valValues) = validate(newValues, fieldSpecs)
            if not valid:
                documents = list(self.dbm.contrib.find(dict(_id=_id), {name: True}))
                if len(documents) != 1:
                    return dict(
                        data=None,
                        good=False,
                        msgs=[dict(kind='error', text='error during update of contribution field {}'.format(name))],
                    )
                document = documents[0]
                values = document.get(name, [])
                return dict(
                    data={name: values},
                    good=False,
                    msgs=[dict(kind='error', text='could not update contribution field {}: validation failed'.format(name))],
                )
            else:
                modDate = self.CM.modDate
                modBy = self.CM.modBy
                changeVals = {
                    '$set': {name: valValues},
                    '$push': {
                        modDate: datetime.utcnow(),
                        modBy: dict(_id=self.uid),
                    },
                }
                self.dbm.contrib.update_one(dict(_id=_id), changeVals)
                documents = list(self.dbm.contrib.find(dict(_id=_id), {name: True, modDate: True, modBy: True}))
                if len(documents) != 1:
                    return dict(
                        data=None,
                        good=False,
                        msgs=[dict(kind='error', text='contribution not properly identified after update')],
                    )
                document = documents[0]
                changedVals = {
                    name: document[name],
                    modDate: document[modDate],
                    modBy: document[modBy],
                }
                return dict(
                    data=changedVals,
                    good=True,
                    msgs=[],
                )
        else:
            action = 'read'
            contribId = request.query.id
            if len(contribId) > 32:
                return dict(data=None, msgs=[dict(kind='error', text='contribution does not exist')], good=False)
            thisFilter = {'_id': contribId}
            qfilter = self.perm.filters[action]
            if qfilter != False:
                qfilter.update(thisFilter)
            qprojector = self.perm.projectors[action]
            documents = list(self.dbm.contrib.find(qfilter, qprojector)) if qfilter != False else []
            ldoc = len(documents)
            if ldoc == 0:
                return dict(data=None, msgs=[dict(kind='error', text='contribution does not exist')], good=False)
            msgs = [] if ldoc == 1 else [dict(kind='warning', text='multiple contributions found')]
            document = documents[0]
            mayUpdate = criteria(document)
            ufields = self.perm.projectors['update'] if mayUpdate else {}
            fieldOrder = [x for x in self.CM.fieldOrder if x in qprojector or x in ufields]
            return dict(
                data=dict(
                    row=document,
                    fields=qprojector,
                    perm=dict(update=ufields),
                    fieldOrder=fieldOrder,
                    fieldSpecs=dict(((x for x in self.CM.fieldSpecs.items() if x[0] in fieldOrder))),
                ),
                msgs=msgs,
                good=True,
            )

    def member_country(self):
        qfilter = self.perm.filters['read']
        thisFilter = {'isMember': True}
        qfilter.update(thisFilter)
        qprojector = self.perm.projectors['read']
        documents = list(self.dbm.country.find(qfilter, qprojector)) if qfilter != False else []
        return dict(data=documents, msgs=[], good=True)

    def users(self):
        qfilter = self.perm.filters['read']
        qprojector = self.perm.projectors['read']
        documents = list(self.dbm.users.find(qfilter, qprojector)) if qfilter != False else []
        return dict(data=documents, msgs=[], good=True)

    def value_list(self):
        valueList = request.query.list
        qprojector = self.perm.projectors['read']
        if valueList not in qprojector:
            return dict(data=None, msgs=[dict(kind='error', text='no access to list "{}"'.format(valueList))], good=False)
        documents = list(self.dbm.contrib.distinct(valueList, {}))
        return dict(data=documents, msgs=[], good=True)
