from controllers.config import Config as C, Names as N
from controllers.perm import permRecord
from controllers.utils import E, ELLIPS
from controllers.html import HtmlElements as H
from controllers.field import Field
from controllers.details import makeDetails


CT = C.tables
CW = C.web


DEFAULT_TYPE = CT.defaultType
DETAILS = CT.details
MASTERS = CT.masters

PROV = CW.provLabel
QQ = CW.unknown[N.generic]
QN = CW.unknown[N.number]


class Record(object):
  inheritProps = (
      N.control, N.db, N.auth, N.types,
      'uid', 'eppn',
      'table', 'fields', 'prov',
      'isUserTable', 'isUserEntryTable',
      'itemLabels',
  )

  def __init__(self, Table, tableObj, record=None, eid=None, details=False):
    for prop in Record.inheritProps:
      setattr(self, prop, getattr(tableObj, prop, None))

    self.doDetails = details
    self.Table = Table
    self.parent = tableObj

    db = self.db
    auth = self.auth
    table = self.table
    isUserTable = self.isUserTable

    if record is None:
      record = db.getItem(table, eid)
    self.record = record
    self.eid = record.get(N._id, None)

    isAuthenticated = auth.authenticated()
    isSuperuser = auth.superuser()

    self.setPerm()
    perm = self.perm

    mayDelete = (
        isAuthenticated
        and
        (
            isSuperuser
            or
            isUserTable and perm[N.isEdit]
        )
    )
    self.mayDelete = mayDelete
    self.dependencies = (
        db.dependencies(table, record) if mayDelete else None
    )

  def setPerm(self):
    auth = self.auth
    record = self.record

    self.perm = permRecord(
        auth.user,
        record,
        country=record.get(N.country, None),
    )

  def field(self, fieldName, asMaster=False):
    return Field(self, fieldName, asMaster=asMaster)

  def delete(self):
    mayDelete = self.mayDelete
    dependencies = self.dependencies

    if not mayDelete or dependencies:
      return

    db = self.db
    table = self.table
    eid = self.eid

    db.delItem(table, eid)

  def wrap(self, collapsed=False):
    table = self.table
    record = self.record
    fieldSpecs = self.fields
    provSpecs = self.prov

    if collapsed:
      return H.details(
          self.title(),
          H.div(
              ELLIPS,
              fetchurl=f"""/api/{table}/{N.item}/{record[N._id]}""",
          ),
          f"""{table}/{record[N._id]}""",
      )

    myMasters = MASTERS.get(table, [])

    deleteButton = self.deleteButton()

    main = (
        H.div(
            [deleteButton]
            +
            [
                self.field(field, asMaster=field in myMasters).wrap()
                for field in fieldSpecs
                if field not in provSpecs
            ]
            +
            [H.details(
                PROV,
                H.div(
                    [
                        self.field(field).wrap()
                        for field in provSpecs
                    ]
                ),
                f"""{table}/{record[N._id]}/{N.prov}""",
            )],
            cls="record",
        )
    )

    return main + makeDetails(self).wrap()

  def deleteButton(self):
    mayDelete = self.mayDelete

    if not mayDelete:
      return E

    record = self.record
    table = self.table
    itemSingle = self.itemLabels[0]
    dependencies = self.dependencies

    if dependencies:
      plural = '' if dependencies == 1 else 's'
      return H.span(
          [
              H.icon(
                  N.puzzle_piece,
                  cls="label medium warning-o delete",
                  title=f"""Cannot delete because of {dependencies} dependent record{plural}"""
              ),
              H.span(
                  f"""{dependencies} dependent record{plural}""",
                  cls="label small warning-o delete",
              ),
          ]
      )

    return H.span(
        H.icon(
            N.trash,
            cls="button medium error-o delete",
            href=f"""/api/{table}/{N.delete}/{record[N._id]}""",
            title=f"""Delete this {itemSingle}"""
        ),
    )

  def title(self):
    record = self.record
    return Record.titleRaw(self, record)

  @staticmethod
  def titleRaw(obj, record):
    table = obj.table
    control = obj.control
    types = control[N.types]
    typesObj = getattr(types, table)

    return H.span(typesObj.title(record=record))
