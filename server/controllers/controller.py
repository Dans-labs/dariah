from bottle import request

getq = lambda name: request.query[name][0:64]

class Controller(object):
    def __init__(self, DB):
        self.DB = DB

    def data(self, controller, Perm):
        self.DB.Perm = Perm
        self.DB.uid = Perm.getUid()
        method = getattr(self, controller, None)
        return method(controller) if callable(method) else self._fail(
            text='wrong method: {}'.format(controller),
        )

    def member_country(self, name):
        return self.DB.getList(name, 'country', 'read', rFilter={'isMember': True})

    def user(self, name):
        return self.DB.getList(name, 'user', 'read')

    def list(self, name):
        table = getq('table')
        return self.DB.getList(name, table, 'read', withFields=True, sort=('*title', 1), withFilters=True)

    def my(self, name):
        table = getq('table')
        return self.DB.getList(name, table, 'read', withFields=True, sort=('*title', 1), withFilters=False)

    def view(self, name):
        table = getq('table')
        ident = getq('id')
        return self.DB.getItem(name, table, ident, 'read')

    def mod(self, name):
        table = getq('table')
        action = getq('action')
        return self.DB.modList(name, table, action)

    def value_table(self, name):
        table = getq('table')
        field = getq('field')
        return self.DB.getList(name, field, 'read')

    def value_skim(self, name):
        table = getq('table')
        field = getq('field')
        return self.DB.getValues(name, table, field, 'read')


