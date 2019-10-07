from flask import request

from controllers.config import Config as C, Names as N
from controllers.utils import dbjson, cap1, E
from controllers.html import HtmlElements as H
from controllers.field import Field
from controllers.types import Types


CT = C.table
CW = C.web


DEFAULT_TYPE = CT.defaultType
PROV = CW.provLabel


class Record(object):
  def __init__(self, tableObj, record=None, eid=None):
    self.tableObj = tableObj
    self.db = tableObj.db
    self.auth = tableObj.auth
    self.table = tableObj.table

    db = self.db
    table = self.table

    if record is None:
      record = db.getItem(table, eid)
    self.record = record
    self.studyRecord()

  def item(self, asJson=False):
    record = self.record

    return dbjson(record) if asJson else self.wrap(record)

  def fieldAction(self, field, action):
    data = request.get_json()
    if data is not None and N.save in data:
      self.fieldSave(field, data[N.save])
    return self.wrapField(field, action=action)

  def fieldSave(self, field, data):
    db = self.db
    table = self.table

    (mayRead, mayEdit) = self.permissions(field)
    if mayEdit:
      record = self.record
      fieldSpecs = self.fields

      fieldSpec = fieldSpecs.get(field, {})
      tp = fieldSpec.get(N.type, DEFAULT_TYPE)
      multiple = fieldSpec.get(N.multiple, False)

      tpClass = getattr(Types, tp, None)
      conversion = (
          tpClass.fromStr
          if tpClass else
          None
      )
      if conversion is not None:
        if multiple:
          data = [
              conversion(d)
              for d in data or []
          ]
        else:
          data = conversion(data)

      actor = self.eppn
      modified = record.get(N.modified, None)
      eid = record.get(N._id, None)
      (updates, deletions) = db.updateField(
          table,
          eid,
          field,
          data,
          actor,
          modified,
      )
      record.update(updates)
      for f in deletions:
        if f in record:
          del record[f]

  def wrap(self):
    tableObj = self.tableObj
    table = self.table
    record = self.record
    fieldSpecs = tableObj.fields
    provSpecs = tableObj.prov

    deleteButton = self.deleteButton()

    return (
        H.div(
            [deleteButton]
            +
            [
                self.wrapField(field)
                for field in fieldSpecs
                if field not in provSpecs
            ]
            +
            [H.details(
                PROV,
                H.div(
                    [self.wrapField(field) for field in provSpecs]
                ),
                itemkey=f"""{table}/{record[N._id]}/{N.prov}""",
            )],
            cls="record",
        )
    )

  def field(self, field):
    return Field(self, field)

  def wrapField(self, field, action=None):
    (mayRead, mayEdit) = self.permissions(field)
    if not mayRead:
      return E

    withRefresh = field == N.modified

    return (
        Field(self, field, mayEdit).
        wrap(action, withRefresh)
    )

  def dependencies(self):
    db = self.db
    table = self.table
    record = self.record

    return db.dependencies(table, record)

  def delete(self, eid):
    db = self.db
    table = self.table
    record = db.getItem(table, eid)
    if not record:
      return

    self.record = record
    if not self.mayDelete() or self.dependencies():
      return

    db.delItem(table, eid)
