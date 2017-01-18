methods = {
    'list_contrib': dict(
            desc='list contributions',
        ),
    'item_contrib': dict(
            desc='details of a contribution',
        ),
    'member_country': dict(
            desc='member countries',
        ),
}

groups = {
    '': dict(
            desc='unauthenticated user',
        ),
    'auth': dict(
            desc='authenticated user',
        ),
    'man': dict(
            desc='management user',
        ),
    'sys': dict(
            desc='sytem administrator',
        ),
}

actions = {
    'ins': dict(
            desc='create item',
        ),
    'read': dict(
            desc='read item',
        ),
    'upd': dict(
            desc='update item',
        ),
    'del': dict(
            desc='delete item',
        ),
}

fldContribMeta = set('''
    title
    year
    country
    disciplines
    keywords
    vcc
    urlAcademic
    typeContribution
    tadirahActivities
    tadirahObjects
    tadirahTechniques
    urlContribution
    costTotal
    contactPersonName
    contactPersonEmail
    creator
    modifiedBy
    dateModified
    dateCreated
'''.strip().split())

fldContribPublic = set('''
    title
    year
    country
    disciplines
    keywords
    vcc
    urlAcademic
'''.strip().split())

fldContribOwn =  set('''
    typeContribution
    tadirahActivities
    tadirahObjects
    tadirahTechniques
    urlContribution
    description
    costTotal
    costDescription
    contactPersonName
    contactPersonEmail
'''.strip().split())

fldContribSystem =  set('''
    creator
    modifiedBy
    dateModified
    dateCreated
'''.strip().split())

fldContribAll = fldContribPublic | fldContribOwn | fldContribSystem

permissions = {
    'list_contrib': {
        '': {
            'read': {
                'rows': True,
                'fields': fldContribPublic & fldContribMeta,
            },
        },
        'auth': {
            'read': {
                'rows': True,
                'fields': fldContribAll & fldContribMeta,
            },
        },
        'man': {
            'read': {
                'rows': True,
                'fields': fldContribAll & fldContribMeta,
            },
        },
        'sys': {
            'read': {
                'rows': True,
                'fields': fldContribAll & fldContribMeta,
            },
        },
    },
    'item_contrib': {
        '': {
            'read': {
                'rows': True,
                'fields': fldContribPublic,
            },
            'upd': {
                'rows': set(),
                'fields': set(),
            },
        },
        'auth': {
            'read': {
                'rows': True,
                'fields': fldContribAll,
            },
            'upd': {
                'rows': 'own',
                'fields': fldContribPublic | fldContribOwn,
            },
        },
        'man': {
            'read': {
                'rows': True,
                'fields': fldContribAll,
            },
            'upd': {
                'rows': True,
                'fields': fldContribPublic | fldContribOwn,
            },
        },
        'sys': {
            'read': {
                'rows': True,
                'fields': fldContribAll,
            },
            'upd': {
                'rows': True,
                'fields': fldContribAll,
            },
        },
    },
    'member_country': {
        'all': {
            'read': {
                'rows': True,
                'fields': fldContribAll,
            },
        },
    },
}

inGroupsTest = {
    ('suzan1', 'local'): 'auth',
    ('suzan2', 'local'): 'auth',
    ('lisa', 'local'): 'man',
    ('dirk', 'local'): 'sys',
}

class PermApi(object):
    def __init__(self, auth):
        self.userInfo = auth.userInfo

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


