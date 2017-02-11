def permissionModel(fs):
    return dict(
        groups = dict(
            x = dict(
                desc='unauthenticated user',
            ),
            auth = dict(
                desc='authenticated user',
            ),
            man = dict(
                desc='management user',
            ),
            sys = dict(
                desc='sytem administrator',
            ),
        ),
        actions = dict(
            insert = dict(
                desc='create item',
            ),
            read = dict(
                desc='read item',
            ),
            update = dict(
                desc='update item',
            ),
            delete = dict(
                desc='delete item',
            ),
        ),
        methods = dict(
            my_contribs = dict(
                desc='list my contributions',
            ),
            list_contrib = dict(
                desc='list contributions',
            ),
            item_contrib = dict(
                desc='details of a contribution',
            ),
            save_contrib = dict(
                desc='save fields of a contribution',
            ),
            member_country = dict(
                desc='member countries',
            ),
            users = dict(
                desc='users',
            ),
            value_list = dict(
                desc='value lists',
            ),
        ),
        permissions = dict(
            my_contribs = dict(
                x = dict(
                    read = dict(
                        rows = False,
                        fields = fs['public'] & fs['meta'],
                    ),
                ),
                auth = dict(
                    read = dict(
                        rows = 'own',
                        fields = fs['all'] & fs['meta'],
                    ),
                ),
                man = dict(
                    read = dict(
                        rows = 'own',
                        fields = fs['all'] & fs['meta'],
                    ),
                ),
                sys = dict(
                    read = dict(
                        rows = 'own',
                        fields = fs['all'] & fs['meta'],
                    ),
                ),
            ),
            list_contrib = dict(
                x = dict(
                    read = dict(
                        rows = True,
                        fields = fs['public'] & fs['meta'],
                    ),
                ),
                auth = dict(
                    read = dict(
                        rows = True,
                        fields = fs['all'] & fs['meta'],
                    ),
                ),
                man = dict(
                    read = dict(
                        rows = True,
                        fields = fs['all'] & fs['meta'],
                    ),
                ),
                sys = dict(
                    read = dict(
                        rows = True,
                        fields = fs['all'] & fs['meta'],
                    ),
                ),
            ),
            item_contrib = dict(
                x = dict(
                    read = dict(
                        rows = True,
                        fields = fs['public'],
                    ),
                    update = dict(
                        rows = False,
                        fields = set(),
                    ),
                ),
                auth = dict(
                    read = dict(
                        rows = True,
                        fields = fs['all'],
                    ),
                    update = dict(
                        rows = 'own',
                        fields = fs['public'] | fs['own'],
                    ),
                ),
                man = dict(
                    read = dict(
                        rows = True,
                        fields = fs['all'],
                    ),
                    update = dict(
                        rows = True,
                        fields = fs['public'] | fs['own'],
                    ),
                ),
                sys = dict(
                    read = dict(
                        rows = True,
                        fields = fs['all'],
                    ),
                    update = dict(
                        rows = True,
                        fields = fs['all'],
                    ),
                ),
            ),
            value_list = dict(
                x = dict(
                    read = dict(
                        rows = True,
                        fields = fs['public'] & fs['meta'],
                    ),
                    update = dict(
                        rows = False,
                        fields = set(),
                    ),
                ),
                auth = dict(
                    read = dict(
                        rows = True,
                        fields = (fs['public'] | fs['own']) & fs['meta'],
                    ),
                    update = dict(
                        rows = False,
                        fields = set(),
                    ),
                ),
                man = dict(
                    read = dict(
                        rows = True,
                        fields = (fs['public'] | fs['own']) & fs['meta'],
                    ),
                    update = dict(
                        rows = True,
                        fields = (fs['public'] | fs['own']) & fs['meta'],
                    ),
                ),
                sys = dict(
                    read = dict(
                        rows = True,
                        fields = fs['all'] & fs['meta'],
                    ),
                    update = dict(
                        rows = True,
                        fields = fs['all'] & fs['meta'],
                    ),
                ),
            ),
            member_country = dict(
                all = dict(
                    read = dict(
                        rows = True,
                        fields = fs['call'],
                    ),
                ),
            ),
            users = dict(
                x = dict(
                    read = dict(
                        rows = True,
                        fields = fs['upublic'],
                    ),
                ),
                auth = dict(
                    read = dict(
                        rows = True,
                        fields = fs['uauth'],
                    ),
                ),
                man = dict(
                    read = dict(
                        rows = True,
                        fields = fs['uall'],
                    ),
                ),
                sys = dict(
                    read = dict(
                        rows = True,
                        fields = fs['uall'],
                    ),
                ),
            ),
        ),
        inGroupsTest = {
            ('suzan1', 'local'): 'auth',
            ('suzan2', 'local'): 'auth',
            ('lisa', 'local'): 'man',
            ('dirk', 'local'): 'sys',
        },
    )

class PermissionModel(object):
    def __init__(self, CM):
        fs = CM.fieldSets
        for (k, v) in permissionModel(fs).items():
            setattr(self, k, v)

