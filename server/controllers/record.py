from controllers.config import Config as C, Names as N
from controllers.perm import permRecord
from controllers.utils import E
from controllers.html import HtmlElements as H
from controllers.field import Field


CT = C.table
CW = C.web


DEFAULT_TYPE = CT.defaultType
PROV = CW.provLabel


class Record(object):
  inheritProps = (
      'db', 'auth', 'eppn', 'table', 'fields', 'prov', 'isUserTable', 'itemLabels',
  )

  def __init__(self, tableObj, record=None, eid=None):
    for prop in Record.inheritProps:
      setattr(self, prop, getattr(tableObj, prop, None))

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

  def field(self, fieldName):
    return Field(self, fieldName)

  def delete(self):
    mayDelete = self.mayDelete
    dependencies = self.dependencies

    if not mayDelete or dependencies:
      return

    db = self.db
    table = self.table
    eid = self.eid

    db.delItem(table, eid)

  def wrap(self):
    table = self.table
    record = self.record
    fieldSpecs = self.fields
    provSpecs = self.prov

    deleteButton = self.deleteButton()

    return (
        H.div(
            [deleteButton]
            +
            [
                self.field(field).wrap()
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
                itemkey=f"""{table}/{record[N._id]}/{N.prov}""",
            )],
            cls="record",
        )
    )

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

    return H.a(
        H.icon(
            N.trash,
            cls="button medium error-o delete",
        ),
        href=f"""/{table}/{N.delete}/{record[N._id]}""",
        title=f"""Delete this {itemSingle}"""
    )
