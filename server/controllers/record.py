from controllers.config import Config as C, Names as N
from controllers.perm import permRecord
from controllers.utils import E, ELLIPS
from controllers.html import HtmlElements as H, htmlEscape as he
from controllers.field import Field


CT = C.table
CW = C.web


DEFAULT_TYPE = CT.defaultType
DETAILS = CT.details
MASTERS = CT.masters

PROV = CW.provLabel
QQ = CW.unknown[N.generic]
QN = CW.unknown[N.number]


class Record(object):
  inheritProps = (
      'db', 'auth',
      'uid', 'eppn',
      'typeClass',
      'table', 'fields', 'prov',
      'isUserTable', 'isUserEntryTable',
      'itemLabels',
  )

  def __init__(self, tableCls, tableObj, record=None, eid=None, details=False):
    for prop in Record.inheritProps:
      setattr(self, prop, getattr(tableObj, prop, None))

    self.parentCls = tableCls
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

    self.details = {}

    if not details:
      return

    eid = self.eid
    tableCls = self.parentCls

    detailTables = DETAILS.get(table, [])
    for detailTable in detailTables:
      detailTableObj = tableCls(db, auth, detailTable)
      detailRecords = db.getDetails(detailTable, eid, table)
      self.details[detailTable] = (
          detailTableObj,
          tuple(
              detailTableObj.record(record=detailRecord, details=False)
              for detailRecord in detailRecords
          ),
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
              fetchurl=f"""/{table}/{N.item}/{record[N._id]}""",
          ),
          itemkey=f"""{table}/{record[N._id]}""",
      )

    details = self.details
    myMasters = set(MASTERS.get(table, []))

    deleteButton = self.deleteButton()

    main = (
        H.div(
            [deleteButton]
            +
            [
                self.field(field).wrap()
                for field in fieldSpecs
                if field not in provSpecs and field not in myMasters
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

    detailReps = []
    for (detailTable, (detailTableObj, detailRecords)) in details.items():
      nRecords = len(detailRecords)
      (itemSingular, itemPlural) = detailTableObj.itemLabels
      itemLabel = itemSingular if nRecords == 1 else itemPlural

      nRep = H.div(f"""{nRecords} {itemLabel}""", cls="stats")
      detailReps.append(
          H.div(
              [nRep]
              +
              [
                  detailRecord.wrap(collapsed=True)
                  for detailRecord in detailRecords
              ]
          )
      )

    return main + E.join(detailReps)

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
            href=f"""/{table}/{N.delete}/{record[N._id]}""",
            title=f"""Delete this {itemSingle}"""
        ),
    )

  def title(self):
    db = self.db
    auth = self.auth
    record = self.record
    isUserTable = self.isUserTable
    isUserEntryTable = self.isUserEntryTable

    if isUserTable:
      return H.span(he(record.get(N.title, None) or QQ))

    if isUserEntryTable:
      return H.span(he(record.get(N.seq, None) or QN))

    typeClass = self.typeClass
    titleStr = typeClass.titleStr(db, auth, record)
    titleHint = typeClass.titleHint(record)

    return H.span(typeClass.title(record, titleStr, titleHint))
