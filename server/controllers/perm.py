class PermApi(object):
    def __init__(self, auth, PM):
        self.userInfo = auth.userInfo
        self.PM = PM

    def queryFromFilter(self, f):
        return {} if f == True else \
            ({'creator.eppn': self.userInfo['eppn']} if 'eppn' in self.userInfo else False) if f == 'own' else \
            False if len(f) == 0 else f

    def criteriaFromFilter(self, f):
        eppn = self.userInfo.get('eppn', None)
        if f == 'own':
            return (lambda x: x.get('creator', {}).get('eppn', None) == eppn) if eppn != None else lambda x: False
        if f == True:
            return lambda x: True
        return lambda x: x['_id'] in f

    def queryFromProjector(self, p):
        return dict(((f, True) for f in p))

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
            if 'rows' not in conditions: conditions['rows'] = 'none'
            if 'fields' not in conditions: conditions['fields'] = 'none'

            self.filters[action] = self.queryFromFilter(conditions['rows'])
            self.criteria[action] = self.criteriaFromFilter(conditions['rows'])
            self.projectors[action] = self.queryFromProjector(conditions['fields'])
        return True


