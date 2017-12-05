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

    def allow(self, table, action, msgs, controller=None, document=None, newValues=None, extraMy=None, verbose=True):
        '''
        allow is the function that will determine whether something is allowed.
        It will be called for an action on a table and/or document.
        It may or may not be called in the context of a controller.
        The result is a tuple:
        - good: a boolean telling whether the action is allowed in that setting
        - rowFilter: a mongodb criterion constraining the set of records to which the action may be applied
        - fieldSet: the set of fields to which the action may be applied

        If not good, rowFilter and fieldSet will be None.
        
        rowFilter:
        - dict() (mongodb criteria for allowed rows),
        - False (no rows)
        - True (all rows)
        - None (irrelevant)

        fieldSet:
        - set() (allowed field names),
        - empty set (no fields)
        - None (irrelevant)

        If a document is passed, permissions will be calculated for that document,
        and the rowFilter will be None, because it is not needed.
        If no document is given, a rowFilter will be computed.
        
        If the operation is not permitted on any row, rowFilter = False is returned.
        The reaction to this outcome should be to not perform a database lookup at all.

        But this is not a permission error, in this case the list of records for which
        the operation is allowed is empty.
        This is different from good == False and rowFilter == None.

        If the operation is permitted on a selection of rows, a mongodb selection dict is returned.
        If the operation is permitted on all rows, rowFilter=True is returned.

        If no fields are permitted, fieldSet = set() is returned.
        This will still deliver the _id fields, because _id fields are always permitted.
        If all or part of the fields are permitted, a set of permitted fields is returned.

        '''
        # sanity checks
        # does the action exist?
        actions = PM[N_actions]
        if action not in actions:
            if verbose:
                msgs.append({
                    N_kind: N_error,
                    N_text: 'Unknown action {}'.format(action),
                })
            return (False, None, None)

        # determine the access level that is required for this action
        # level on the basis of the table and the action
        permT = DM.get(table, {}).get(N_perm, {}).get(action, None)
        if permT == None:
            if verbose:
                msgs.append({
                    N_kind: N_error,
                    N_text: 'Action {} not allowed for table {} '.format(action, table),
                })
            return (False, None, None)

        # level on the basis of the controller
        if controller == None:
            perm = permT
        else:
            methods = PM[N_methods]
            permC = methods.get(controller, {}).get(N_call, None)
            if permC == None:
                if verbose:
                    msgs.append({
                        N_kind: N_error,
                        N_text: 'Not allowed to execute controller {}'.format(controller),
                    })
                return (False, None, None)
            # take the strictest access level that the controller and the table require
            perm = self._highestLevel((permC, permT))

        # determine whether the action is allowed
        if document == None:
            allowed = self._authorize(perm)
        else:
            isOwn = self._isOwn(table, document)
            isEditor = self._isEditor(table, document)
            allowed = self._authorize(perm, isOwn=isOwn, isEditor=isEditor)

        if not allowed:
            if verbose:
                msgs.append({
                    N_kind: N_error,
                    N_text: 'You are not allowed to perform {} on table {}{}'.format(
                        action, table, 
                        '' if document == None else ' on this particular document',
                    ),
                })
            return (False, None, None)

        # compute the rowFilter
        if action == N_insert: rowFilter = None
        elif document == None:
            if allowed == 1: rowFilter = True
            elif allowed == -10: rowFilter = True
            else:
                owners = PM[N_owners]
                ownField = owners.get(table, N_creator)
                if allowed == -1: rowFilter = {ownField: self.uid}
                elif allowed == -2: rowFilter = {'$or': [{ownField: self.uid}, {N_editors: self.uid}]}
        else:
            rowFilter = None

        # compute the fieldSet
        fieldSet = set()
        fields = DM.get(table, {}).get(N_fieldSpecs, {})

        for field in fields:
            permF = fields[field].get(N_perm, {}).get(action, None)
            if permF == None: continue
            if document == None:
                if self._authorize(permF): fieldSet.add(field)
            else:
                if permF == N_ownLT:
                    oldValueId = document.get(field, None) 
                    oldValue = None if oldValueId == None else self.groupFromId[oid(oldValueId)]
                    newValueId = None if newValues == None else newValues.get(field, None) 
                    newValue = None if newValueId == None else self.groupFromId[oid(newValueId)]
                    if newValue == None: continue
                    if newValue in {N_own, N_nobody}:
                        if verbose:
                            msgs.append({
                                N_kind: N_error,
                                N_text: 'Cannot change permission role: {} is not an assignable role'.format(newValue),
                            })
                        continue
                    elif newValue not in self.rank:
                        if verbose:
                            msgs.append({
                                N_kind: N_error,
                                N_text: 'Cannot change permission role: the power of role {} is unknown'.format(newValue),
                            })
                        continue
                    elif self.rank[newValue] > self.rank[group]:
                        if verbose:
                            msgs.append({
                                N_kind: N_error,
                                N_text: 'Cannot change permission role: the role {} has more power than you have as {}'.format(newValue, self.group),
                            })
                        continue
                    if oldValue != None:
                        uid = document[N__id]
                        if uid != self.uid and self.rank[oldValue] >= self.rank[group]:
                            if verbose:
                                msgs.append({
                                    N_kind: N_error,
                                    N_text: 'Cannot change permission role: the other user is a {} with at least as much power as you have as {}'.format(oldValue, self.group),
                                })
                            continue
                if self._authorize(permF): fieldSet.add(field)
        return (True, rowFilter, fieldSet)

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

    def _authorize(self, perm, isOwn=None, isEditor=None):
        group = self.group
        authorize = PM[N_authorize]
        may = authorize.get(group, {}).get(perm, 0)
        if may == -1 and isOwn == False: may = 0
        if may == -2 and isOwn == False and isEditor == False: may = 0
        return may

    def _orderLevels(self, levs):
        rank = self.rank
        return sorted(levs, key=lambda lv: rank[lv]) 

    def _highestLevel(self, levs): return self._orderLevels(levs)[-1]


