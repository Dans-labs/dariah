from datetime import datetime
from models.compiled.model import model as M
from models.compiled.names import N

PM = M[N.permissions]


class UserApi(object):
    def __init__(self, DB):
        self.DB = DB

    def getUser(self, eppn, email=None):
        return self.DB.userFind(
            eppn, email, authority=N.local if self.isDevel else N.DARIAH
        )

    def getTestUsers(self):
        testUsers = {}
        records = self.DB.userLocal()
        for r in records:
            testUsers[r[N.eppn]] = r
        return testUsers

    def storeUpdate(self, newUserInfo):
        eppn = newUserInfo[N.eppn]
        email = newUserInfo[N.email]
        record = self.getUser(eppn, email=email)
        if not record:
            record = self._store(newUserInfo)
        else:
            record = self._update(record, newUserInfo)
        return record

    def deliver(self):
        self.DB.addGroupInfo(self.userInfo)
        print('during DELIVER:', self.userInfo and self.userInfo.get(N.eppn, 'no eppn'))
        return {N.data: self.userInfo, N.msgs: [], N.good: True}

    def _store(self, newUserInfo):
        now = datetime.utcnow()
        record = {}
        record.update(newUserInfo)
        record.update({
            N.dateCreated: now,
            N.dateLastLogin: now,
            N.statusLastLogin: N.Approved,
            N.mayLogin: True,
        })
        self.DB.userAdd(record)
        return record

    def _update(self, userInfo, newUserInfo):
        now = datetime.utcnow()
        userInfo.update(newUserInfo)
        userInfo.update({
            N.dateLastLogin:
                now,
            N.statusLastLogin:
                N.Approved if userInfo.get(N.mayLogin, False) else N.Rejected,
        })
        self.DB.userMod(userInfo)
        if N._id in userInfo:
            del userInfo[N._id]
        return userInfo
