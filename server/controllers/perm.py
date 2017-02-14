class PermApi(object):
    def __init__(self, auth, PM):
        self.userInfo = auth.userInfo
        self.PM = PM

    def getUid(self):
        return self.userInfo.get('_id', None)

    def queryFromFilter(self, f):
        uid = self.getUid()
        if f == 'own':
            return {'creator._id': uid} if uid != None else {'_id': {'$in': []}}
        if f == True:
            return {}
        if f == False:
            return f
        return {'_id': {'$in': f}}

    def criteriaFromFilter(self, f):
        uid = self.getUid()
        if f == 'own':
            return (lambda x: uid in set(map(lambda c: c['_id'], x.get('creator', [])))) if uid != None else (lambda x: False)
        if f == True:
            return lambda x: True
        if f == False:
            return lambda x: False
        return lambda x: x['_id'] in f

    def queryFromProjector(self, p):
        return dict((f, True) for f in p)

    def getPerms(self, query):
        self.query = query
        self.msgs = []
        self.filters = {}
        self.criteria = {}
        self.projectors = {}
        groups = self.PM.groups
        actions = self.PM.actions
        methods = self.PM.methods
        permissions = self.PM.permissions
        if query not in methods:
            self.msgs.append(dict(kind='error', text='unknown query {}'.format(query)))
            return False
        if query not in permissions:
            self.msgs.append(dict(kind='warning', text='query {} not permitted'.format(methods[query]['desc'])))
            return False
        group = self.userInfo['group']
        if group not in groups:
            self.msgs.append(dict(kind='error', text='unknown user group {}'.format(group)))
            return False
        eppn = self.userInfo.get('eppn', None)

        qperms = permissions[query]
        perms = qperms.get(group, qperms.get('all', False))
        if perms == False:
            self.msgs.append(dict(kind='warning', text='query {} not permitted for {}'.format(
                methods[query]['desc'],
                groups[group]['desc'],
            )))
            return False

        for action in actions:
            if action not in perms:
                self.filters[action] = False
                self.projectors[action] = {}
                continue

            conditions = perms[action]
            if type(conditions) is bool:
                self.criteria[action] = conditions
            else:
                if 'rows' not in conditions: conditions['rows'] = 'none'
                if 'fields' not in conditions: conditions['fields'] = 'none'

                self.filters[action] = self.queryFromFilter(conditions['rows'])
                self.criteria[action] = self.criteriaFromFilter(conditions['rows'])
                self.projectors[action] = self.queryFromProjector(conditions['fields'])
        return True


