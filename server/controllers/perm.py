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
        warnings = []
        if table not in tables or table not in fields or action not in actions or action not in tables[table]:
            return (False, {}, [])
        level = tables[table][action]
        if document == None:
            authorized = self._authorize(level)
            fieldSet = self._fieldProjection(table, action)
        else:
            isOwn = self._isOwn(table, document)
            authorized = self._authorize(level, isOwn=isOwn)
            (warnings, fieldSet) = self._fieldSet(table, document, action, isOwn, newValues=newValues)
        if not authorized: return (False, {}, [])
        return (True, fieldSet, warnings)

    def _isOwn(self, table, document):
        uid = self.uid
        owners = self.PM.owners
        ownField = owners.get(table, self.DM.generic['createdBy'])
        if ownField == None or ownField not in document: return False
        return document[ownField] == self.uid

    def _authorize(self, level, asInt=False, isOwn=None, uid=None, oldValue=None, newValue=None, warnings=[]):
        group = self.group
        authorize = self.PM.authorize
        may = self.PM.authorize.get(group, {}).get(level, 0)
        if may == -1 and isOwn == False: may = 0
        if may == -2:
            if newValue != None:
                if newValue in {'own', 'nobody'}:
                    may = 0
                    warnings.append('Cannot change permission role: {} is not an assignable role'.format(newValue))
                elif newValue not in self.rank:
                    warnings.append('Cannot change permission role: the power of role {} is unknown'.format(newValue))
                    may = 0
                elif self.rank[newValue] > self.rank[group]:
                    warnings.append('Cannot change permission role: the role {} has more power than you have as {}'.format(newValue, self.group))
                    may = 0
                if oldValue != None:
                    if uid != self.uid and self.rank[oldValue] >= self.rank[group]:
                        warnings.append('Cannot change permission role: the other user is a {} with at least as much power as you have as {}'.format(oldValue, self.group))
                        may = 0
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
        warnings = []
        for (field, levelInfo) in fields[table].items():
            level = levelInfo.get(action, None)
            if level == None: continue
            newValue = None
            oldValue = None
            if level == 'ownLT':
                oldValueId = document.get(field, None) 
                oldValue = None if oldValueId == None else self.groupFromId[oid(oldValueId)]
                newValueId = None if newValues == None else newValues.get(field, None) 
                newValue = None if newValueId == None else self.groupFromId[oid(newValueId)]
            if self._authorize(level, isOwn=isOwn, uid=document['_id'], oldValue=oldValue, newValue=newValue, warnings=warnings):
                projection[field] = True
        return (warnings, projection)

