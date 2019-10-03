from controllers.config import Config as C, Names as N
from controllers.html import HtmlElements as H
from controllers.utils import E
from controllers.types import Types

CT = C.table
CW = C.web


REFRESH = CW.messages[N.refresh]
QQ = CW.unknown[N.generic]
ZERO = CW.unknown[N.number]


def labelDiv(label):
  return H.div(
      f"""{label}:""",
      cls="record-label",
  )


class Field(object):
  def __init__(self, db, auth, table, eid, field, mayEdit, label, tp, multiple, value):
    self.db = db
    self.auth = auth
    self.table = table
    self.eid = eid
    self.field = field
    self.mayEdit = mayEdit
    self.label = label
    self.tp = tp
    self.multiple = multiple
    self.value = value
    self.atts = (
        dict(
            table=self.table,
            eid=self.eid,
            field=self.field,
        )
    )
    tpClass = getattr(Types, tp)
    self.tpClass = tpClass
    self.widgetType = tpClass.widgetType

  def wrap(self, action, withRefresh):
    self.withRefresh = withRefresh
    mayEdit = self.mayEdit

    asEdit = mayEdit and action == N.edit
    editClass = " edit" if asEdit else E
    rep = self.valueEdDiv() if asEdit else self.valueRODiv()

    if action is not None:
      return E.join(rep)

    return (
        H.div(
            [
                labelDiv(self.label),
                H.div(
                    rep,
                    cls=f"record-value {editClass}",
                ),
            ],
            cls="record-row",
        )
    )

  def valueRODiv(self):
    button = (
        H.icon(
            N.pencil,
            cls="button small field",
            action=N.edit,
            **self.atts,
        )
        if self.mayEdit else
        H.icon(
            N.refresh,
            cls="button small field",
            action=N.view,
            title=REFRESH,
            **self.atts,
        )
        if self.withRefresh else
        E
    )
    rep = self.getValueRO()

    return [button, rep]

  def valueEdDiv(self):
    tp = self.tp
    multiple = self.multiple
    value = self.value
    widgetType = self.widgetType

    button = H.icon(
        N.eye,
        cls="button small field",
        action=N.view,
        **self.atts,
    )
    rep = self.getValueEd()

    origStr = Types.toOrig(value, tp, multiple)

    atts = dict(
        orig=origStr,
        wtype=widgetType,
    )
    if multiple:
      atts[N.multiple] = True
    widget = H.div(
        rep,
        **atts,
        cls="value",
    )
    return [button, widget]

  def getValueRO(self):
    multiple = self.multiple
    widgetType = self.widgetType
    value = self.value
    cls = "tags" if widgetType == N.related else "values"

    display = (
        H.div(
            [
                self.formatVal(val)
                for val in value or []
            ],
            cls=cls,
        )
        if multiple else
        H.div(
            self.formatVal(value),
            cls="value",
        )
    )

    return display

  def getValueEd(self):
    multiple = self.multiple
    widgetType = self.widgetType
    value = self.value

    collapseMultiple = widgetType == N.related

    widget = (
        H.div(
            [
                self.formatVal(val, editable=True)
                for val in (value or []) + [E]
            ],
            cls="values",
        )
        if multiple and not collapseMultiple else
        self.formatVal(value, editable=True)
    )

    return widget

  # TOP LEVEL

  def formatVal(self, v, editable=False):
    db = self.db
    auth = self.auth
    tpClass = self.tpClass

    args = [db, auth] if tpClass.needsField else []
    method = tpClass.widget if editable else tpClass.toDisplay
    return method(v, *args)
