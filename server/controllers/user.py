from datetime import datetime
from models.compiled.model import model as M
from models.compiled.names import *

PM = M[N_permissions]

class UserApi(object):
    def __init__(self, DB):
        self.DB = DB

    def getUser(self, eppn, email=None):
        return self.DB.userFind(eppn, email, authority = N_local if self.isDevel else N_DARIAH)

    def getTestUsers(self):
        testUsers = {}
        records = self.DB.userLocal() 
        for r in records:
            testUsers[r[N_eppn]] = r
        return testUsers

    def storeUpdate(self, newUserInfo):
        eppn = newUserInfo[N_eppn]
        email = newUserInfo[N_email]
        record = self.getUser(eppn, email=email)
        if not record:
            record = self._store(newUserInfo)
        else:
            record = self._update(record, newUserInfo)
        return record

    def deliver(self):
        unauth = self.idFromGroup[PM[N_unauth]]
        groups = PM[N_groups]
        groupId = self.userInfo.get(N_group, unauth)
        group = self.groupFromId[groupId]
        self.userInfo[N_groupRep] = group
        self.userInfo[N_groupDesc] = groups.get(group, '??')
        return {N_data: self.userInfo, N_msgs: [], N_good: True}

    def _store(self, newUserInfo):
        now = datetime.utcnow()
        record = {}
        record.update(newUserInfo)
        record.update({
            N_dateCreated: now,
            N_dateLastLogin: now,
            N_statusLastLogin: N_Approved,
            N_mayLogin: True,
        })
        self.DB.userAdd(record)
        return record

    def _update(self, userInfo, newUserInfo):
        eppn = newUserInfo[N_eppn]
        now = datetime.utcnow()
        userInfo.update(newUserInfo)
        userInfo.update({
            N_dateLastLogin: now,
            N_statusLastLogin: N_Approved if userInfo.get(N_mayLogin, False) else N_Rejected,
        })
        self.DB.userMod(userInfo)
        if N__id in userInfo: del userInfo[N__id]
        return userInfo

