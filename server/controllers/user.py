from db import connectdb
from datetime import datetime

class UserApi(object):
    def __init__(self, PM):
        self.dbm = connectdb()
        self.PM = PM

    def storeUpdate(self, newUserInfo):
        eppn = newUserInfo['eppn']
        record = self.getUser(eppn)
        if not record:
            record = self._store(newUserInfo)
        else:
            record = self._update(record, newUserInfo)
        return record

    def getUser(self, eppn):
        authority = 'local' if self.isDevel else 'DARIAH'
        record = self.dbm.users.find_one({'eppn': eppn, 'authority': authority})
        return record

    def getTestUsers(self):
        self.testUsers = {}
        records = self.dbm.users.find({'authority': 'local'})
        for r in records:
            self.testUsers[r['eppn']] = r

    def getInGroups(self):
        groups = self.PM.groups
        records = self.dbm.groups.find({})
        inGroups = {}
        for r in records:
            eppn = r['eppn']
            authority = r['authority']
            group = r['group']
            inGroups[(eppn, authority)] = group
        return inGroups

    def deliver(self):
        groups = self.PM.groups
        self.userInfo['groupDesc'] = groups.get(self.userInfo['group'], dict(desc='??'))['desc']
        return dict(data=dict(x for x in self.userInfo.items() if x[0] != '_id'), msgs=[], good=True)

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
        result = self.dbm.users.insert_one(record)
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
        if '_id' in userInfo: del userInfo['_id']
        result = self.dbm.users.update_one({'eppn': eppn}, {'$set': userInfo})
        return userInfo

