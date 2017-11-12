from datetime import datetime

DATECREATED_FIELD = None
EPPN_FIELD = None
EMAIL_FIELD = None

class UserApi(object):
    def __init__(self, DB, DM, PM):
        self.DB = DB
        self.DM = DM
        self.PM = PM
        systemFields = DM.generic['systemFields']
        userFields = DM.generic['userFields']
        global DATECREATED_FIELD
        DATECREATED_FIELD = systemFields[0]
        global EPPN_FIELD
        EPPN_FIELD = userFields[0]
        global EMAIL_FIELD
        EMAIL_FIELD = userFields[1]

    def getUser(self, eppn, email=None):
        return self.DB.userFind(eppn, email, authority = 'local' if self.isDevel else 'DARIAH')

    def getTestUsers(self):
        testUsers = {}
        records = self.DB.userLocal() 
        for r in records:
            testUsers[r[EPPN_FIELD]] = r
        return testUsers

    def storeUpdate(self, newUserInfo):
        eppn = newUserInfo[EPPN_FIELD]
        email = newUserInfo[EMAIL_FIELD]
        record = self.getUser(eppn, email=email)
        if not record:
            record = self._store(newUserInfo)
        else:
            record = self._update(record, newUserInfo)
        return record

    def deliver(self):
        unauth = self.idFromGroup[self.PM.unauth]
        groups = self.PM.groups
        groupId = self.userInfo.get('group', unauth)
        group = self.groupFromId[groupId]
        self.userInfo['groupRep'] = group
        self.userInfo['groupDesc'] = groups.get(group, '??')
        return dict(data=self.userInfo, msgs=[], good=True)

    def _store(self, newUserInfo):
        now = datetime.utcnow()
        record = {}
        record.update(newUserInfo)
        record.update({
            DATECREATED_FIELD: now,
            'dateLastLogin': now,
            'statusLastLogin': 'Approved',
            'mayLogin': True,
        })
        self.DB.userAdd(record)
        return record

    def _update(self, userInfo, newUserInfo):
        eppn = newUserInfo[EPPN_FIELD]
        now = datetime.utcnow()
        userInfo.update(newUserInfo)
        userInfo.update(dict(
            dateModified=now,
            dateLastLogin=now,
            statusLastLogin='Approved' if userInfo.get('mayLogin', False) else 'Rejected',
        ))
        self.DB.userMod(userInfo)
        if '_id' in userInfo: del userInfo['_id']
        return userInfo

