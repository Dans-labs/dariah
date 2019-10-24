from itertools import chain

from flask import request

from controllers.config import Config as C, Names as N
from controllers.perm import UNAUTH
from controllers.html import HtmlElements as H
from controllers.utils import pick as G, E, ELLIPS, NBSP, ONE

from controllers.record import Record
from controllers.specific.assessment_record import AssessmentR
from controllers.specific.criteria_record import CriteriaR
from controllers.specific.criteriaentry_record import CriteriaEntryR
from controllers.specific.review_record import ReviewR
from controllers.specific.reviewentry_record import ReviewEntryR
from controllers.specific.score import ScoreR

CASES = (
    (N.assessment, AssessmentR),
    (N.criteria, CriteriaR),
    (N.criteriaEntry, CriteriaEntryR),
    (N.review, ReviewR),
    (N.reviewEntry, ReviewEntryR),
    (N.score, ScoreR),
)

CT = C.tables
CW = C.web


MAIN_TABLE = CT.userTables[0]
USER_TABLES = set(CT.userTables)
USER_ENTRY_TABLES = set(CT.userEntryTables)
VALUE_TABLES = set(CT.valueTables)
ITEMS = CT.items
PROV_SPECS = CT.prov

FORBIDDEN = CW.messages[N.forbidden]


class Table(object):
  def __init__(self, control, table):
    self.control = control

    auth = control.auth
    user = auth.user

    self.table = table
    self.isMainTable = table == MAIN_TABLE
    self.isUserTable = table in USER_TABLES
    self.isUserEntryTable = table in USER_ENTRY_TABLES
    self.isValueTable = table in VALUE_TABLES
    self.itemLabels = G(ITEMS, table, default=[table, f"""{table}s"""])
    self.prov = PROV_SPECS
    self.fields = getattr(CT, table, {})

    self.uid = G(user, N._id)
    self.eppn = G(user, N.eppn)
    self.group = G(user, N.groupRep) or UNAUTH
    self.countryId = G(user, N.country)

    isUserTable = self.isUserTable
    isUserEntryTable = self.isUserEntryTable
    isSuperuser = auth.superuser()

    self.mayInsert = (
        auth.authenticated()
        and (isUserTable or isSuperuser)
        and not isUserEntryTable
    )

    def titleSortkey(r):
      return self.title(r).lower()

    self.titleSortkey = titleSortkey

  def recordFactory(self):
    table = self.table

    RecordClass = Record
    for (tb, Rcl) in CASES:
      if tb == table:
        RecordClass = Rcl
        break

    return RecordClass

  def record(
      self,
      eid=None, record=None,
      withDetails=False,
      readonly=False,
      bodyMethod=None,
  ):
    return self.recordFactory()(
        Table, self,
        eid=eid,
        record=record,
        withDetails=withDetails,
        readonly=readonly,
        bodyMethod=bodyMethod,
    )

  def insert(self):
    mayInsert = self.mayInsert
    if not mayInsert:
      return None

    control = self.control
    db = control.db
    uid = self.uid
    eppn = self.eppn
    table = self.table

    result = db.insertItem(table, uid, eppn)
    if table == MAIN_TABLE:
      self.adjustWorkflow(result)

    return result

  def adjustWorkflow(self, contribId, new=True):
    control = self.control
    wf = control.wf

    if new:
      wf.insert(contribId)
    else:
      wf.recompute(contribId)

  def wrap(self, openEid, action=None):
    if not self.mayList(action=action):
      return FORBIDDEN

    control = self.control
    db = control.db
    table = self.table
    uid = self.uid
    countryId = self.countryId
    titleSortkey = self.titleSortkey
    (itemSingular, itemPlural) = self.itemLabels

    params = (
        dict(my=uid)
        if action == N.mylist else
        dict(our=countryId)
        if action == N.ourlist else
        {}
    )
    if request.args:
      params.update(request.args)

    records = db.getList(table, titleSortkey, select=self.isMainTable, **params)
    nRecords = len(records)
    itemLabel = itemSingular if nRecords == 1 else itemPlural
    nRep = H.span(f"""{nRecords} {itemLabel}""", cls="stats")
    insertButton = self.insertButton()
    sep = NBSP if insertButton else E

    return H.div(
        chain.from_iterable((
            [
                H.span(
                    [
                        self.insertButton(),
                        sep,
                        nRep,
                    ],
                )
            ],
            (
                H.details(
                    self.title(record),
                    H.div(ELLIPS),
                    f"""{table}/{G(record, N._id)}""",
                    fetchurl=f"""/api/{table}/{N.item}/{G(record, N._id)}""",
                    urltitle=E,
                    urlextra=E,
                    **forceOpen(G(record, N._id), openEid),
                )
                for record in records
            ),
        )),
        cls=f"table {table}",
    )

  def insertButton(self):
    mayInsert = self.mayInsert

    if not mayInsert:
      return E

    table = self.table
    itemSingle = self.itemLabels[0]

    return H.iconx(
        N.insert,
        cls="large",
        href=f"""/api/{table}/{N.insert}""",
        title=f"""New {itemSingle}"""
    )

  def mayList(self, action=None):
    control = self.control
    auth = control.auth
    isMainTable = self.isMainTable
    isValueTable = self.isValueTable
    return (
        (
            isMainTable and action == N.list
            or
            auth.superuser() or
            (isMainTable or isValueTable) and auth.authenticated()
        )
    )

  def title(self, record):
    # return obj.record(record=record).title(**atts)
    return Record.titleRaw(self, record)


def forceOpen(theEid, openEid):
  return (
      dict(forceopen=ONE)
      if openEid and str(theEid) == openEid else
      dict()
  )
