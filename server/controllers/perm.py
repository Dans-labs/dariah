from controllers.utils import oid
from models.compiled.model import model as M
from models.compiled.names import *

DM = M[N_tables]
PM = M[N_permissions]

class PermApi(object):
    def __init__(self, Auth):

        self.userInfo = Auth.userInfo
        self.groupFromId = Auth.groupFromId
        self.uid = self.userInfo.get(N__id, None)
        self.eppn = self.userInfo.get(N_eppn, None)
        self.group = self.userInfo[N_groupRep]
        self.rank = dict((lev, n) for (n, lev) in enumerate(PM[N_levels]))

    def getUid(self): return self.uid
    def getEppn(self): return self.eppn

    def getPerm(self, controller, table, action):
        methods = PM[N_methods]
        call = methods.get(controller, {}).get(N_call, None)
        if call == None:
            return (False, 'Not allowed to execute controller {}'.format(controller))

        actions = PM[N_actions]
        if action not in actions:
            return (False, 'Unknown action {} when calling controller {}'.format(action, controller))

        perm = DM.get(table, {}).get(N_perm, {}).get(action, None)
        if perm == None:
            return (False, 'Action {} not allowed for table {} when calling controller {}'.format(
                action, table, controller,
        ))

        level = self._highestLevel((call, perm))
        rowFilter = self._rowSet(table, level) if action != N_insert else True
        fieldFilter = self._fieldProjection(table, action) if action not in {N_insert, N_delete} else True
        if rowFilter == False or not fieldFilter:
            return (False, None) # this is not an error: the set of permitted rows/fields is just empty
        return (True, (rowFilter, fieldFilter))

    def may(self, table, action, document=None, newValues=None):
        actions = PM[N_actions]
        if action not in actions:
            return (False, {}, [])

        perm = DM.get(table, {}).get(N_perm, {}).get(action, None)
        if perm == None:
            return (False, {}, [])


        if document == None:
            authorized = self._authorize(perm)
            fieldSet = self._fieldProjection(table, action)
            warnings = []
        else:
            isOwn = self._isOwn(table, document)
            isEditor = self._isEditor(table, document)
            authorized = self._authorize(perm, isOwn=isOwn, isEditor=isEditor)
            (warnings, fieldSet) = self._fieldSet(
                table, document, action, isOwn, isEditor, newValues=newValues,
            )
        if not authorized: return (False, {}, [])
        return (True, fieldSet, warnings)

    def _isOwn(self, table, document):
        uid = self.uid
        owners = PM[N_owners]
        ownField = owners.get(table, N_creator)
        if ownField == None or ownField not in document: return False
        return document[ownField] == self.uid

    def _isEditor(self, table, document):
        uid = self.uid
        if self._isOwn(table, document): return True
        if N_editors not in document: return False
        return self.uid in set(document[N_editors])

    def _authorize(self, level, asInt=False, isOwn=None, isEditor=None, uid=None, oldValue=None, newValue=None, warnings=[]):
        group = self.group
        authorize = PM[N_authorize]
        may = authorize.get(group, {}).get(level, 0)
        if may == -1 and isOwn == False: may = 0
        if may == -2 and isOwn == False and isEditor == False: may = 0
        if may == -10:
            if newValue != None:
                if newValue in {N_own, N_nobody}:
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
        owners = PM[N_owners]
        ownField = owners.get(table, N_creator)
        authorized = self._authorize(level, asInt=True)
        if authorized == 1: return {}
        if authorized == 2: return {}
        if authorized == 0: return False
        if authorized == -1:
            return {ownField: self.uid}
        if authorized == -2:
            return {'$or': [{ownField: self.uid}, {N_editors: self.uid}]}

    def _fieldProjection(self, table, action):
        fields = DM.get(table, {}).get(N_fieldSpecs, {})
        projection = {}
        for field in fields:
            level = fields[field].get(N_perm, {}).get(action, None)
            if level != None and self._authorize(level):
                projection[field] = True
        return projection

    def _fieldSet(self, table, document, action, isOwn, isEditor, newValues=None):
        fields = DM.get(table, {}).get(N_fieldSpecs, {})
        projection = {}
        warnings = []
        for field in fields:
            level = fields[field].get(N_perm, {}).get(action, None)
            if level == None: continue
            newValue = None
            oldValue = None
            if level == N_ownLT:
                oldValueId = document.get(field, None) 
                oldValue = None if oldValueId == None else self.groupFromId[oid(oldValueId)]
                newValueId = None if newValues == None else newValues.get(field, None) 
                newValue = None if newValueId == None else self.groupFromId[oid(newValueId)]
            if self._authorize(level, isOwn=isOwn, isEditor=isEditor, uid=document[N__id], oldValue=oldValue, newValue=newValue, warnings=warnings):
                projection[field] = True
        return (warnings, projection)
