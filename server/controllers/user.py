from datetime import datetime

class UserApi(object):
    def __init__(self, DB, PM):
        self.DB = DB
        self.PM = PM

    def getUser(self, eppn):
        return self.DB.userFind(eppn, authority = 'local' if self.isDevel else 'DARIAH')

    def getTestUsers(self):
        testUsers = {}
        records = self.DB.userLocal() 
        for r in records:
            testUsers[r['eppn']] = r
        return testUsers

    def storeUpdate(self, newUserInfo):
        eppn = newUserInfo['eppn']
        record = self.getUser(eppn)
        if not record:
            record = self._store(newUserInfo)
        else:
            record = self._update(record, newUserInfo)
        return record

    def getInGroup(self):
        groups = self.PM.groups
        records = self.DB.userInGroup()
        inGroup = {}
        for r in records:
            eppn = r['eppn']
            authority = r['authority']
            group = r['group']
            inGroup[(eppn, authority)] = group
        return inGroup

    def deliver(self):
        groups = self.PM.groups
        self.userInfo['groupDesc'] = groups.get(self.userInfo['group'], '??')
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
        self.DB.userAdd(record)
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
        self.DB.userMod(userInfo)
        return userInfo

