import json
from bson import json_util
from bottle import install, JSONPlugin
from pymongo import MongoClient
from datetime import datetime
from copy import deepcopy

def connectdb():
    clientm = MongoClient()
    dbm = clientm.dariah
    install(JSONPlugin(json_dumps=lambda body: json.dumps(body, default=json_util.default)))
    return dbm

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

class UserApi(object):
    def __init__(self):
        self.dbm = connectdb()

    def _store(self, userInfo):
        now = datetime.utcnow()
        record = dict(
            dateCreated=now,
            dateModified=now,
            dateLastLogin=now,
            **userInfo,
        )
        result = self.dbm.user.insert_one(record)
        return record

    def _update(self, userInfo):
        eppn = userInfo['eppn']
        now = datetime.utcnow()
        record = dict(
            dateModified=now,
            dateLastLogin=now,
            **userInfo,
        )
        result = self.dbm.user.update_one({'eppn': eppn}, {'$set': record})
        return record

    def store_update(self, userInfo):
        eppn = userInfo['eppn']
        email = userInfo['email']
        existingUser = self.get_user(eppn)
        if not existingUser:
            return self._store(userInfo)
        else:
            return self._update(userInfo)

    def get_user(self, eppn):
        return self.dbm.user.find_one({'eppn': eppn})

