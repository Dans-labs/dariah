from db import connectdb

class DataApi(object):
    def __init__(self):
        self.dbm = connectdb()

    def data(self, query):
        method = getattr(self, query, None)
        if callable(method):
            return method()
        else:
            return None

    def list_contrib(self):
        documents = list(self.dbm.contrib.find({}).sort('title', 1))
        return dict(data=documents, msgs=[], good=True)

    def item_contrib(self):
        ids = request.vars.ids.split(',')
        documents = self.dbm.contrib.find({'_id': {'$in': ids}})
        return dict(data=list(documents), msgs=[], good=True)

    def member_country(self):
        documents = list(self.dbm.country.find({}, {'inDARIAH': True}))
        return dict(data=documents, msgs=[], good=True)
