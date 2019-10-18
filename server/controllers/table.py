from itertools import chain

from flask import request

from controllers.config import Config as C, Names as N
from controllers.perm import UNAUTH
from controllers.html import HtmlElements as H
from controllers.utils import E, ELLIPS, NBSP, ONE

from controllers.record import Record
from controllers.specific.criteria_record import CriteriaR
from controllers.specific.score import ScoreR
from controllers.specific.assessment_record import AssessmentR
from controllers.specific.review_record import ReviewR
from controllers.specific.criteriaentry_record import CriteriaEntryR
from controllers.specific.reviewentry_record import ReviewEntryR

CASES = (
    (N.criteria, CriteriaR),
    (N.score, ScoreR),
    (N.assessment, AssessmentR),
    (N.review, ReviewR),
    (N.criteriaEntry, CriteriaEntryR),
    (N.reviewEntry, ReviewEntryR),
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
    self.db = control[N.db]
    self.auth = control[N.auth]
    self.types = control[N.types]

    auth = self.auth
    user = auth.user

    self.table = table
    self.isMainTable = table == MAIN_TABLE
    self.isUserTable = table in USER_TABLES
    self.isUserEntryTable = table in USER_ENTRY_TABLES
    self.isValueTable = table in VALUE_TABLES
    self.itemLabels = ITEMS.get(table, [table, f"""{table}s"""])
    self.prov = PROV_SPECS
    self.fields = getattr(CT, table, {})

    self.uid = user.get(N._id, None)
    self.eppn = user.get(N.eppn, None)
    self.group = user.get(N.groupRep, None) or UNAUTH
    self.countryId = user.get(N.country, None)

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

    db = self.db
    uid = self.uid
    eppn = self.eppn
    table = self.table

    return db.insertItem(table, uid, eppn)

  def wrap(self, openEid, action=None):
    if not self.mayList(action=action):
      return FORBIDDEN

    db = self.db
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
                    f"""{table}/{record[N._id]}""",
                    fetchurl=f"""/api/{table}/{N.item}/{record[N._id]}""",
                    **forceOpen(record[N._id], openEid),
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
    auth = self.auth
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
