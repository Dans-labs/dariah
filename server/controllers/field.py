from flask import request

from controllers.config import Config as C, Names as N
from controllers.html import HtmlElements as H
from controllers.utils import E, BLANK, ONE, cap1
from controllers.perm import getPerms

CT = C.tables
CW = C.web


DEFAULT_TYPE = CT.defaultType
CONSTRAINED = CT.constrained
WORKFLOW_TABLES = set(CT.userTables) | set(CT.userEntryTables)
WORKFLOW_FIELDS = CT.workflowFields

REFRESH = CW.messages[N.refresh]


def labelDiv(label):
  return H.div(
      f"""{label}:""",
      cls="record-label",
  )


class Field(object):
  inheritProps = (
      N.control,
      N.uid, N.eppn,
      N.table, N.record, N.eid,
      N.perm,
      N.readonly,
  )

  def __init__(
      self, recordObj, field,
      asMaster=False,
      readonly=None,
  ):
    for prop in Field.inheritProps:
      setattr(self, prop, getattr(recordObj, prop, None))

    self.recordObj = recordObj

    self.field = field
    self.asMaster = asMaster
    self.withRefresh = field == N.modified

    fieldSpecs = recordObj.fields
    fieldSpec = fieldSpecs.get(field, {})

    record = self.record
    self.value = record.get(field, None)

    require = fieldSpec.get(N.perm, {})
    self.require = require

    self.label = fieldSpec.get(N.label, cap1(field))
    self.tp = fieldSpec.get(N.type, DEFAULT_TYPE)
    self.multiple = fieldSpec.get(N.multiple, False)
    self.extensible = fieldSpec.get(N.extensible, False)

    control = self.control

    perm = self.perm
    table = self.table
    eid = self.eid
    tp = self.tp
    types = control.types

    fieldTypeClass = getattr(types, tp)
    self.fieldTypeClass = fieldTypeClass
    self.widgetType = fieldTypeClass.widgetType

    readonly = self.readonly if readonly is None else readonly

    (self.mayRead, self.mayEdit) = getPerms(
        table, perm, require,
    )
    if readonly or asMaster:
      self.mayEdit = False

    self.atts = (
        dict(
            table=table,
            eid=eid,
            field=field,
        )
    )

  def save(self, data):
    mayEdit = self.mayEdit

    if not mayEdit:
      return

    control = self.control
    db = control.db
    uid = self.uid
    eppn = self.eppn
    table = self.table
    eid = self.eid
    field = self.field
    extensible = self.extensible
    record = self.record
    recordObj = self.recordObj
    require = self.require

    multiple = self.multiple
    fieldTypeClass = self.fieldTypeClass
    conversion = (
        fieldTypeClass.fromStr
        if fieldTypeClass else
        None
    )
    args = (
        dict(uid=uid, eppn=eppn, extensible=True)
        if extensible else
        {}
    )

    if conversion is not None:
      if multiple:
        data = [
            conversion(d, **args)
            for d in data or []
        ]
      else:
        data = conversion(data, **args)

    modified = record.get(N.modified, None)
    (updates, deletions) = db.updateField(
        table,
        eid,
        field,
        data,
        eppn,
        modified,
    )
    record = control.getItem(table, eid, requireFresh=True)

    recordObj.reload(record)
    self.value = record.get(field, None)
    self.perm = recordObj.perm
    perm = self.perm
    (self.mayRead, self.mayEdit) = getPerms(table, perm, require)

    if table in WORKFLOW_TABLES and field in WORKFLOW_FIELDS:
      recordObj.adjustWorkflow()

  def isEmpty(self):
    value = self.value
    multiple = self.multiple
    return value is None or multiple and value == []

  def isBlank(self):
    value = self.value
    multiple = self.multiple
    return (
        value is None or
        value == E or
        multiple and (
            value == []
            or all(v is None or v == E for v in value)
        )
    )

  def wrap(self, action=None, asEdit=False, empty=False, withLabel=True, cls=E):
    mayRead = self.mayRead

    if not mayRead:
      return E

    asMaster = self.asMaster
    mayEdit = self.mayEdit
    editable = mayEdit and (action == N.edit or asEdit) and not asMaster

    if action is not None and not asMaster:
      data = request.get_json()
      if data is not None and N.save in data:
        self.save(data[N.save])

    widget = self.wrapWidget(editable, cls=cls)

    if action is not None:
      return E.join(widget)

    if empty and self.isEmpty():
      return E

    label = self.label
    editClass = " edit" if editable else E

    return (
        H.div(
            [
                labelDiv(label),
                H.div(
                    widget,
                    cls=f"record-value{editClass}",
                ),
            ],
            cls="record-row",
        )
        if withLabel else
        H.div(
            widget,
            cls=f"record-value{editClass}",
        )
    )

  def wrapWidget(self, editable, cls=E):
    atts = self.atts
    mayEdit = self.mayEdit
    withRefresh = self.withRefresh

    button = (
        H.iconx(
            N.ok,
            cls="small",
            action=N.view,
            **atts,
        )
        if editable else
        (
            H.iconx(
                N.edit,
                cls="small",
                action=N.edit,
                **atts,
            )
            if mayEdit else
            H.iconx(
                N.refresh,
                cls="small",
                action=N.view,
                title=REFRESH,
                **atts,
            )
            if withRefresh else
            E
        )
    )

    return [button, self.wrapValue(editable, cls=cls)]

  def wrapBare(self):
    control = self.control
    types = control.types
    tp = self.tp
    value = self.value
    multiple = self.multiple

    fieldTypeClass = getattr(types, tp)
    method = fieldTypeClass.toDisplay

    return (
        BLANK.join(
            method(val)
            for val in (value or [])
        )
        if multiple else
        method(value)
    )

  def wrapValue(self, editable, cls=E):
    control = self.control
    types = control.types
    fieldTypeClass = self.fieldTypeClass
    value = self.value
    tp = self.tp
    multiple = self.multiple
    extensible = self.extensible
    widgetType = self.widgetType

    baseCls = "tags" if widgetType == N.related else "values"
    isSelectWidget = widgetType == N.related

    args = []
    if isSelectWidget and editable:
      record = self.record
      field = self.field
      constrain = None
      constrainField = CONSTRAINED.get(field, None)
      if constrainField:
        constrainValue = record.get(constrainField, None)
        if constrainValue:
          constrain = (constrainField, constrainValue)
      args.append(multiple)
      args.append(extensible)
      args.append(constrain)
    method = fieldTypeClass.widget if editable else fieldTypeClass.toDisplay
    extraCls = E if editable else cls
    atts = dict(wtype=widgetType)

    if editable:
      origStr = types.toOrig(value, tp, multiple)
      atts[N.orig] = origStr
    if multiple:
      atts[N.multiple] = ONE
    if extensible:
      atts[N.extensible] = ONE

    return (
        H.div(
            [
                method(val, *args)
                for val in (value or []) + ([E] if editable else [])
            ],
            **atts,
            cls=baseCls,
        )
        if multiple and not (editable and isSelectWidget) else
        H.div(
            method(value, *args),
            **atts,
            cls=f"value {extraCls}",
        )
    )
