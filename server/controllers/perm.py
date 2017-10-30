from controllers.utils import oid

class PermApi(object):
    def __init__(self, Auth, DM, PM):
        self.PM = PM
        self.DM = DM
        self.userInfo = Auth.userInfo
        self.groupFromId = Auth.groupFromId
        self.uid = self.userInfo.get('_id', None)
        self.eppn = self.userInfo.get('eppn', None)
        self.group = self.userInfo['groupRep']
        self.rank = dict((lev, n) for (n, lev) in enumerate(self.PM.levels))

    def getUid(self): return self.uid
    def getEppn(self): return self.eppn

    def getPerm(self, controller, table, action):
        methods = self.PM.methods
        tables = self.PM.tables
        fields = self.PM.fields
        actions = self.PM.actions
        if controller not in methods or table not in tables or table not in fields or action not in actions or action not in tables[table]:
            return (False, 'error in executing method: {}'.format(controller))
        level = self._highestLevel((methods[controller]['call'], tables[table][action]))
        rowFilter = self._rowSet(table, level) if action != 'insert' else True
        fieldFilter = self._fieldProjection(table, action) if action not in {'insert', 'delete'} else True
        if rowFilter == False or not fieldFilter:
            return (False, None) # this is not an error: the set of permitted rows/fields is just empty
        return (True, (rowFilter, fieldFilter))

    def may(self, table, action, document=None, newValues=None):
        tables = self.PM.tables
        fields = self.PM.fields
        actions = self.PM.actions
        if table not in tables or table not in fields or action not in actions or action not in tables[table]:
            return (False, {})
        level = tables[table][action]
        if document == None:
            authorized = self._authorize(level)
            fieldSet = self._fieldProjection(table, action)
        else:
            isOwn = self._isOwn(table, document)
            authorized = self._authorize(level, isOwn=isOwn)
            fieldSet = self._fieldSet(table, document, action, isOwn, newValues=newValues)
        if not authorized: return (False, {})
        return (True, fieldSet)

    def _isOwn(self, table, document):
        uid = self.uid
        owners = self.PM.owners
        ownField = owners.get(table, self.DM.generic['createdBy'])
        if ownField == None or ownField not in document: return False
        return document[ownField] == self.uid

    def _authorize(self, level, asInt=False, isOwn=None, newValue=None):
        group = self.group
        authorize = self.PM.authorize
        may = self.PM.authorize.get(group, {}).get(level, 0)
        if may == -1 and isOwn == False: may = 0
        if may == -2:
            if newValue != None:
                if newValue in {'own', 'nobody'}: may = 0
                elif newValue not in self.rank: may = 0
                elif self.rank[newValue] > self.rank[group]: may = 0
        return may if asInt else (may != 0)

    def _orderLevels(self, levs):
        rank = self.rank
        return sorted(levs, key=lambda lv: rank[lv]) 

    def _highestLevel(self, levs): return self._orderLevels(levs)[-1]
    def _lowestLevel(self, levs): return self._orderLevels(levs)[0]

    def _rowSet(self, table, level):
        owners = self.PM.owners
        ownField = owners.get(table, self.DM.generic['createdBy'])
        authorized = self._authorize(level, asInt=True)
        if authorized == 1: return {}
        if authorized == 0: return False
        if authorized == -1:
            if ownField == None: return False
            return {ownField: self.uid}

    def _fieldProjection(self, table, action):
        fields = self.PM.fields
        projection = {}
        for (field, levelInfo) in fields[table].items():
            level = levelInfo.get(action, None)
            if level != None and self._authorize(level):
                projection[field] = True
        return projection

    def _fieldSet(self, table, document, action, isOwn, newValues=None):
        fields = self.PM.fields
        projection = {}
        for (field, levelInfo) in fields[table].items():
            level = levelInfo.get(action, None)
            if level == None: continue
            newValue = None
            if level == 'ownLT':
                newValueId = None if newValues == None else newValues.get(field, None) 
                newValue = None if newValueId == None else self.groupFromId[oid(newValueId)]
            if self._authorize(level, isOwn=isOwn, newValue=newValue):
                projection[field] = True
        return projection

