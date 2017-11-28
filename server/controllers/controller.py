import traceback
from bottle import request
from controllers.utils import serverprint
from models.compiled.names import *

getq = lambda name: request.query[name][0:64]

class Controller(object):
    def __init__(self, DB):
        self.DB = DB

    def data(self, controller, Perm):
        return self._errorWrap(lambda: self._data(controller, Perm), controller, controller==N_mod)

    def list(self, name):
        table = getq(N_table)
        complete = getq(N_complete)==N_true
        return self.DB.getList(name, table, titleOnly=not complete, my=False)

    def mylist(self, name):
        table = getq(N_table)
        complete = getq(N_complete)==N_true
        return self.DB.getList(name, table, titleOnly=not complete, my=True)

    def view(self, name):
        table = getq(N_table)
        ident = getq(N_id) if N_id in request.query else None
        return self.DB.getItem(name, table, ident)

    def mod(self, name):
        table = getq(N_table)
        action = getq(N_action)
        return self.DB.modList(name, table, action)

    def _data(self, controller, Perm):
        self.DB.Perm = Perm
        self.DB.uid = Perm.getUid()
        self.DB.eppn = Perm.getEppn()
        method = getattr(self, controller, None)
        if callable(method):
            result = method(controller)
        else:
            result = self.DB.stop({N_text: 'wrong method: {}'.format(controller)})
        return result

    def _errorWrap(self, action, controller, addData):
        try:
            result = action()
        except Exception as err:
            message = getattr(err, N_message, repr(err))
            data = {N__error: message} if addData else None
            serverprint('\n')
            serverprint('ERROR IN CONTROLLER {}'.format(controller))
            traceback.print_exc()
            serverprint('END                 {}'.format(controller))
            serverprint('\n')
            result = self.DB.stop({N_data: data, N_text: 'server error: {}'.format(message)})
        return result

