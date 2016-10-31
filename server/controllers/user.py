from db import connectdb
from datetime import datetime

class UserApi(object):
    def __init__(self):
        self.dbm = connectdb()
        self.testUser = dict(
            eppn='test@home',
            email='test@localhost',
            mayLogin=True,
            authority='local',
        )

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

    def deliver(self):
        return dict(data=self.userInfo or {}, msgs=[], good=True)
