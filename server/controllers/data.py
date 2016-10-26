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

    def _store(self, newUserInfo):
        now = datetime.utcnow()
        record = {}
        record.update(newUserInfo)
        record.update(dict(
            dateCreated=now,
            dateModified=now,
            dateLastLogin=now,
            statusLastLogin='Approved',
            mayLogin=True,
        ))
        result = self.dbm.user.insert_one(record)
        return record

    def _update(self, userInfo, newUserInfo):
        eppn = newUserInfo['eppn']
        now = datetime.utcnow()
        userInfo.update(newUserInfo)
        userInfo.update(dict(
            dateModified=now,
            dateLastLogin=now,
            statusLastLogin='Approved' if userInfo.get('mayLogin', False) else 'Rejected',
        ))
        result = self.dbm.user.update_one({'eppn': eppn}, {'$set': userInfo})
        return userInfo

    def store_update(self, newUserInfo):
        eppn = newUserInfo['eppn']
        record = self.get_user(eppn)
        if not record:
            record = self._store(newUserInfo)
        else:
            record = self._update(record, newUserInfo)
        if '_id' in record: del record['_id']
        return record

    def get_user(self, eppn):
        record = self.dbm.user.find_one({'eppn': eppn})
        if record and '_id' in record: del record['_id']
        return record

