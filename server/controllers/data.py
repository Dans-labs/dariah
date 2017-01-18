from bottle import request
from db import connectdb

class DataApi(object):
    def __init__(self):
        self.dbm = connectdb()

    def data(self, query, perm):
        self.perm = perm
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
        documents = list(self.dbm.contrib.find(qfilter, qprojector).sort('title', 1))
        return dict(data=dict(contribs=documents, fields=qprojector), msgs=[], good=True)

    def item_contrib(self):
        contribId = request.query.id
        thisFilter = {'_id': contribId}
        qfilter = self.perm.filters['read']
        if qfilter != False:
            qfilter.update(thisFilter)
        qprojector = self.perm.projectors['read']
        documents = list(self.dbm.contrib.find(qfilter, qprojector))
        ldoc = len(documents)
        if ldoc == 0:
            return dict(data=None, msgs=[dict(kind='error', text='contribution does not exist')], good=False)
        msgs = [] if ldoc == 1 else [dict(kind='warning', text='multiple contributions found')]

        document = documents[0]
        criteria = self.perm.criteria['upd']
        mayUpdate = criteria(document)
        ufields = self.perm.projectors['upd'] if mayUpdate else {}
        print(ufields)
        return dict(data=dict(row=document, fields=qprojector, perm=dict(upd=ufields)), msgs=msgs, good=True)

    def member_country(self):
        qfilter = self.perm.filters['read']
        thisProjector = {'inDARIAH': True}
        qprojector = self.perm.projectors['read']
        qprojector.update(thisProjector)
        documents = list(self.dbm.country.find(qfilter, qprojector))
        return dict(data=documents, msgs=[], good=True)
