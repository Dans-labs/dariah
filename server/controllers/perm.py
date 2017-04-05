class PermApi(object):
    def __init__(self, auth, PM):
        self.PM = PM
        self.userInfo = auth.userInfo
        self.uid = self.userInfo.get('_id', None)
        self.group = self.userInfo['group']
        self.rank = dict((lev, n) for (n, lev) in enumerate(self.PM.levels))

    def getUid(self): return self.uid
    def getGroup(self): return self.group

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
            return (False, None)
        return (True, (rowFilter, fieldFilter))

    def may(self, table, action, document=None):
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
            fieldSet = self._fieldSet(table, document, action, isOwn)
        if not authorized: return (False, {})
        return (True, fieldSet)

    def _isOwn(self, table, document):
        uid = self.uid
        owners = self.PM.owners
        ownField = owners.get(table, None)
        if ownField == None: return False
        ownComps = ownField.split('.')
        src = document
        for comp in ownComps:
            src = src.get(comp, {})
            if type(src) is list:
                src = {} if len(src) == 0 else src[0]
        return src == self.uid

    def _authorize(self, level, asInt=False, isOwn=None):
        group = self.group
        authorize = self.PM.authorize
        may = self.PM.authorize.get(group, {}).get(level, 0)
        if may == -1 and isOwn == False: may = 0
        return may if asInt else (may != 0)

    def _orderLevels(self, levs):
        rank = self.rank
        return sorted(levs, key=lambda lv: rank[lv]) 

    def _highestLevel(self, levs): return self._orderLevels(levs)[-1]
    def _lowestLevel(self, levs): return self._orderLevels(levs)[0]

    def _rowSet(self, table, level):
        owners = self.PM.owners
        ownField = owners.get(table, None)
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

    def _fieldSet(self, table, document, action, isOwn):
        fields = self.PM.fields
        projection = {}
        for (field, levelInfo) in fields[table].items():
            level = levelInfo.get(action, None)
            if level == None: continue
            if self._authorize(level, isOwn=isOwn):
                projection[field] = True
        return projection

