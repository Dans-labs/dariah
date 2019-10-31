from controllers.config import Config as C, Names as N
from controllers.utils import pick as G

from controllers.record import Record
from controllers.field import Field


CF = C.workflow

ACTION_FIELDS = CF.actionFields


class ContribR(Record):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        table = self.table
        eid = self.eid
        wfitem = self.wfitem
        (frozen, locked) = wfitem.attributes(table, eid, N.frozen, N.locked,)

        self.actionFields = G(ACTION_FIELDS, table)

    def checkSave(self, data):
        frozen = self.frozen
        locked = self.locked
        if frozen or locked:
            return False

        field = self.field
        actionFields = self.actionFields
        wfitem = self.wfitem
        table = self.table
        eid = self.eid
        mayEdit = self.mayEdit

        if field in actionFields:
            action = self.getAction(field, data)
            perm = action and wfitem.permission(table, eid, action)
        else:
            perm = mayEdit
        return perm

    def getAction(self, field, value):
        return (
            (
                N.selectContrib
                if value
                else N.unselectContrib
                if value is None
                else N.deselectContrib
            )
            if field == N.selected
            else None
        )

    def field(self, fieldName, **kwargs):
        frozen = self.frozen
        locked = self.locked

        if frozen or locked:
            kwargs[N.mayEdit] = False

        actionFields = self.actionFields

        if fieldName in actionFields:
            kwargs[N.mayRead] = False
            kwargs[N.mayEdit] = False

        return Field(self, fieldName, **kwargs)
