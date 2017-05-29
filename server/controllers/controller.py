from bottle import request

getq = lambda name: request.query[name][0:64]

class Controller(object):
    def __init__(self, DB):
        self.DB = DB

    def data(self, controller, Perm):
        self.DB.Perm = Perm
        self.DB.uid = Perm.getUid()
        self.DB.eppn = Perm.getEppn()
        method = getattr(self, controller, None)
        return method(controller) if callable(method) else self.DB.stop(
            text='wrong method: {}'.format(controller),
        )

    def list(self, name):
        table = getq('table')
        grid = getq('grid')
        return self.DB.getList(name, table, titleOnly=not grid, my=False, grid=grid)

    def mylist(self, name):
        table = getq('table')
        grid = getq('grid')
        return self.DB.getList(name, table, titleOnly=not grid, my=True, grid=grid)

    def view(self, name):
        table = getq('table')
        ident = getq('id')
        return self.DB.getItem(name, table, ident)

    def mod(self, name):
        table = getq('table')
        action = getq('action')
        return self.DB.modList(name, table, action)

