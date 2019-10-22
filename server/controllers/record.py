from controllers.config import Config as C, Names as N
from controllers.perm import permRecord
from controllers.workflow import workflowRecord
from controllers.utils import cap1, E, ELLIPS, ONE, S
from controllers.html import HtmlElements as H
from controllers.field import Field

from controllers.details import Details
from controllers.specific.contrib_details import ContribD
from controllers.specific.assessment_details import AssessmentD
from controllers.specific.criteriaentry_details import CriteriaEntryD
from controllers.specific.review_details import ReviewD

CASES = (
    (N.contrib, ContribD),
    (N.assessment, AssessmentD),
    (N.criteriaEntry, CriteriaEntryD),
    (N.review, ReviewD),
)


CT = C.tables
CW = C.web


MASTERS = CT.masters
ACTUAL_TABLES = set(CT.actualTables)
REFRESH_TABLES = set(CT.refreshTables)


class Record(object):
  inheritProps = (
      N.control,
      N.uid, N.eppn,
      N.table, N.fields, N.prov,
      N.isUserTable, N.isUserEntryTable,
      N.itemLabels,
  )

  def __init__(
      self, Table, tableObj,
      record=None, eid=None,
      withDetails=False,
      readonly=False,
      bodyMethod=None,
  ):
    for prop in Record.inheritProps:
      setattr(self, prop, getattr(tableObj, prop, None))

    self.table = self.table
    self.withDetails = withDetails
    self.readonly = readonly
    self.bodyMethod = bodyMethod
    self.Table = Table

    control = self.control
    auth = control.auth
    table = self.table
    isUserTable = self.isUserTable
    isUserEntryTable = self.isUserEntryTable

    if record is None:
      record = control.getItem(table, eid)
    self.record = record
    self.eid = record.get(N._id, None)

    isAuthenticated = auth.authenticated()
    isSuperuser = auth.superuser()

    self.setPerm()
    perm = self.perm
    self.setWorkflow()

    mayDelete = (
        not isUserEntryTable
        and
        not readonly
        and
        isAuthenticated
        and
        (
            isSuperuser
            or
            isUserTable and perm[N.isEdit]
        )
    )

    self.mayDelete = mayDelete

  def getDependencies(self):
    control = self.control
    db = control.db
    table = self.table
    record = self.record

    self.dependencies = db.dependencies(table, record)

  def detailsFactory(self):
    table = self.table

    DetailsClass = Details
    for (tb, Dcl) in CASES:
      if tb == table:
        DetailsClass = Dcl
        break

    return DetailsClass(self)

  def setPerm(self):
    control = self.control
    table = self.table
    record = self.record

    self.perm = permRecord(
        control,
        table,
        record,
    )

  def setWorkflow(self):
    control = self.control
    perm = self.perm

    contribId = perm.get(N.contribId, None)

    self.workflow = workflowRecord(control, contribId)

  def adjustWorkflow(self):
    control = self.control
    wf = control.wf
    perm = self.perm

    contribId = perm.get(N.contribId, None)
    wf.adjustWorkflow(contribId)
    self.workflow = workflowRecord(control, contribId)

  def field(self, fieldName, **kwargs):
    return Field(self, fieldName, **kwargs)

  def delete(self):
    mayDelete = self.mayDelete
    if not mayDelete:
      return

    self.getDependencies()
    dependencies = self.dependencies

    if dependencies:
      return

    control = self.control
    db = control.db
    table = self.table
    eid = self.eid

    db.delItem(table, eid)

  def body(self, myMasters=None, hideMasters=False):
    fieldSpecs = self.fields
    provSpecs = self.prov

    return E.join(
        self.field(field, asMaster=field in myMasters).wrap()
        for field in fieldSpecs
        if (
            field not in provSpecs and
            not (hideMasters and field in myMasters)
        )
    )

  def wrap(
      self,
      inner=True,
      wrapMethod=None,
      expanded=1,
      withProv=True,
      hideMasters=False,
  ):
    return self.wrapHelper(
        inner=inner,
        wrapMethod=wrapMethod,
        expanded=expanded,
        withProv=withProv,
        hideMasters=hideMasters,
    )

  def wrapHelper(
      self,
      inner=True,
      wrapMethod=None,
      expanded=1,
      withProv=True,
      hideMasters=False,
      addCls=E,
  ):
    table = self.table
    eid = self.eid
    record = self.record
    provSpecs = self.prov
    withDetails = self.withDetails
    withRefresh = table in REFRESH_TABLES

    func = getattr(self, wrapMethod, None) if wrapMethod else None
    if func:
      return func()

    bodyMethod = self.bodyMethod
    urlExtra = f"""?method={bodyMethod}""" if bodyMethod else E
    fetchUrl = f"""/api/{table}/{N.item}/{eid}"""

    itemKey = f"""{table}/{record[N._id]}"""
    theTitle = self.title()

    if expanded == -1:
      return H.details(
          theTitle,
          H.div(ELLIPS),
          itemKey,
          fetchurl=fetchUrl,
          urlextra=urlExtra,
          urltitle=E,
      )

    bodyFunc = (
        getattr(self, f"""{N.body}{cap1(bodyMethod)}""", self.body)
        if bodyMethod else
        self.body
    )
    myMasters = MASTERS.get(table, [])

    deleteButton = self.deleteButton()

    innerCls = " inner" if inner else E

    provenance = (
        H.div(
            H.detailx(
                (N.prov, N.dismiss),
                H.div(
                    [
                        self.field(field).wrap()
                        for field in provSpecs
                    ],
                    cls="prov"
                ),
                f"""{table}/{record[N._id]}/{N.prov}""",
                openAtts=dict(
                    cls="button small",
                    title="Provenance and editors of this record",
                ),
                closeAtts=dict(
                    cls="button small",
                    title="Hide provenance",
                ),
                cls="prov",
            ),
            cls="provx",
        )
        if withProv else
        E
    )

    def refreshButton(tag):
      return (
          H.iconx(
              N.refresh,
              cls="small",
              action=N.refresh,
              title=f"""{cap1(N.refresh)} {table}""",
              targetkey=itemKey,
              tag=tag,
          )
          if withRefresh else
          E
      )

    rButton1 = refreshButton('#1')
    rButton2 = refreshButton('#2')

    main = (
        H.div(
            [
                deleteButton,
                H.div(
                    E.join(
                        bodyFunc(
                            myMasters=myMasters,
                            hideMasters=hideMasters,
                        )
                    ),
                    cls=f"{table.lower()}",
                ),
                *provenance,
            ],
            cls=f"record{innerCls} {addCls}",
        )

    )

    details = self.detailsFactory().wrap() if withDetails else E
    return (
        H.details(
            rButton1 + theTitle,
            H.div(main + rButton2 + details),
            itemKey,
            fetchurl=fetchUrl,
            urlextra=urlExtra,
            urltitle="""/title""",
            fat=ONE,
        )
        if expanded == 1 else
        H.div(main + details)
    )

  def deleteButton(self):
    mayDelete = self.mayDelete

    if not mayDelete:
      return E

    record = self.record
    table = self.table
    itemSingle = self.itemLabels[0]

    self.getDependencies()
    dependencies = self.dependencies

    if dependencies:
      plural = E if dependencies == 1 else S
      return H.span(
          [
              H.icon(
                  N.chain,
                  cls="medium right",
                  title=f"""Cannot delete because of {dependencies} dependent record{plural}"""
              ),
              H.span(
                  f"""{dependencies} dependent record{plural}""",
                  cls="label small warning-o right",
              ),
          ]
      )

    return H.span(
        H.iconx(
            N.delete,
            cls="medium right",
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

    types = control.types
    typesObj = getattr(types, table)

    isActual = table not in ACTUAL_TABLES or record.get(N.actual, False)
    atts = {} if isActual else dict(cls="inactual")

    return H.span(typesObj.title(record=record), **atts)
