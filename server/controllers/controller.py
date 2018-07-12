import traceback
from bottle import request
from controllers.utils import serverprint
from models.compiled.model import model as M
from models.compiled.names import N

DM = M[N.tables]


def getq(name):
    return request.forms.get(name, '')[0:64]


class Controller(object):
    def __init__(self, DB):
        self.DB = DB
        self.WF = DB.WF

    def data(self, controller, Perm):
        return self._errorWrap(
            lambda: self._data(controller, Perm), controller,
            controller == N.mod
        )

    def list(self, name):
        table = getq(N.table)
        complete = getq(N.complete) == N.true
        return self.DB.getList(name, table, titleOnly=not complete, my=False)

    def mylist(self, name):
        table = getq(N.table)
        complete = getq(N.complete) == N.true
        return self.DB.getList(name, table, titleOnly=not complete, my=True)

    def myassign(self, name):
        table = getq(N.table)
        complete = getq(N.complete) == N.true
        my = DM.get(table, {}).get(N.workflow, {}).get(N.assign, True)
        return self.DB.getList(name, table, titleOnly=not complete, my=my)

    def view(self, name):
        table = getq(N.table)
        ident = getq(N.id) if N.id in request.query else None
        return self.DB.getItem(name, table, ident)

    def mod(self, name):
        table = getq(N.table)
        action = getq(N.action)
        return self.DB.modList(name, table, action)

    def wf(self, name):
        reset = getq(N.reset)
        return self.WF.manageWorkflow(reset=reset == N.true)

    def _data(self, controller, Perm):
        self.DB.Perm = Perm
        self.DB.uid = Perm.getUid()
        self.DB.eppn = Perm.getEppn()
        method = getattr(self, controller, None)
        if callable(method):
            result = method(controller)
        else:
            result = self.DB.stop({
                N.msgs: [{
                    N.kind: N.error,
                    N.text: 'wrong method: {}'.format(controller)
                }],
            })
        return result

    def _errorWrap(self, action, controller, addData):
        try:
            result = action()
        except Exception as err:
            message = getattr(err, N.message, repr(err))
            data = {N._error: message} if addData else None
            serverprint('\n')
            serverprint('ERROR IN CONTROLLER {}'.format(controller))
            traceback.print_exc()
            serverprint('END                 {}'.format(controller))
            serverprint('\n')
            result = self.DB.stop({
                N.data:
                    data,
                N.msgs: [{
                    N.kind: N.error,
                    N.text: 'server error: {}'.format(message)
                }],
            })
        return result
