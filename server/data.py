import json
from bson import json_util
from bottle import install, JSONPlugin
from pymongo import MongoClient

class DataApi(object):
    def __init__(self):
        clientm = MongoClient()
        self.dbm = clientm.dariah
        install(JSONPlugin(json_dumps=lambda body: json.dumps(body, default=json_util.default)))

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
