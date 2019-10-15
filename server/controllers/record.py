from controllers.config import Config as C, Names as N
from controllers.perm import permRecord
from controllers.utils import E, ELLIPS, ONE
from controllers.html import HtmlElements as H
from controllers.field import Field

from controllers.details import Details
from controllers.contrib_details import ContribD
from controllers.assessment_details import AssessmentD
from controllers.review_details import ReviewD

CASES = (
    (N.contrib, ContribD),
    (N.assessment, AssessmentD),
    (N.review, ReviewD),
)


CT = C.tables
CW = C.web


MASTERS = CT.masters
ACTUAL_TABLES = set(CT.actualTables)

PROV = CW.provLabel


class Record(object):
  inheritProps = (
      N.control, N.db, N.auth, N.types,
      'uid', 'eppn',
      'table', 'fields', 'prov',
      'isUserTable', 'isUserEntryTable',
      'itemLabels',
  )

  def __init__(self, Table, tableObj, record=None, eid=None, withDetails=False):
    for prop in Record.inheritProps:
      setattr(self, prop, getattr(tableObj, prop, None))

    self.withDetails = withDetails
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

  def detailsFactory(self):
    table = self.table

    DetailsClass = Details
    for (tb, Dcl) in CASES:
      if tb == table:
        DetailsClass = Dcl
        break

    return DetailsClass(self)

  def setPerm(self):
    auth = self.auth
    record = self.record

    self.perm = permRecord(
        auth.user,
        record,
        country=record.get(N.country, None),
    )

  def field(self, fieldName, **kwargs):
    return Field(self, fieldName, **kwargs)

  def delete(self):
    mayDelete = self.mayDelete
    dependencies = self.dependencies

    if not mayDelete or dependencies:
      return

    db = self.db
    table = self.table
    eid = self.eid

    db.delItem(table, eid)

  def body(self, myMasters=None):
    fieldSpecs = self.fields
    provSpecs = self.prov
    return E.join(
        self.field(field, asMaster=field in myMasters).wrap()
        for field in fieldSpecs
        if field not in provSpecs
    )

  def wrap(self, collapsed=False):
    return self.wrapHelper(collapsed=collapsed)

  def wrapHelper(self, addCls=E, withDelete=True, collapsed=False):
    table = self.table
    record = self.record
    provSpecs = self.prov
    withDetails = self.withDetails

    theTitle = self.title()
    fetchUrl = f"""/api/{table}/{N.item}/{record[N._id]}"""
    itemKey = f"""{table}/{record[N._id]}"""

    myMasters = MASTERS.get(table, [])

    if collapsed:
      return H.details(
          theTitle,
          H.div(ELLIPS),
          itemKey,
          fetchurl=fetchUrl,
      )

    deleteButton = self.deleteButton() if withDelete else E

    main = (
        H.div(
            [deleteButton]
            +
            [self.body(myMasters=myMasters)]
            +
            [H.details(
                H.span(PROV, cls="prov"),
                H.div(
                    [
                        self.field(field).wrap()
                        for field in provSpecs
                    ],
                    cls="prov"
                ),
                f"""{table}/{record[N._id]}/{N.prov}""",
                cls="prov"
            )],
            cls=f"record {addCls}",
        )
    )

    details = self.detailsFactory().wrap() if withDetails else E
    return H.details(
        theTitle,
        H.div(main + details),
        itemKey,
        fetchurl=fetchUrl,
        fat=ONE,
    )
    return

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

    isActual = table not in ACTUAL_TABLES or record.get(N.actual, False)
    atts = {} if isActual else dict(cls="inactual")

    return H.span(typesObj.title(record=record), **atts)
