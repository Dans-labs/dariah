from itertools import chain

from flask import request

from controllers.config import Config as C, Names as N
from controllers.perm import UNAUTH
from controllers.record import Record
from controllers.html import HtmlElements as H, htmlEscape as he
from controllers.utils import E, ELLIPS, NBSP

from controllers.types import Types


CT = C.table
CW = C.web


MAIN_TABLE = CT.mainTable
USER_TABLES = set(CT.userTables)
USER_ENTRY_TABLES = set(CT.userEntryTables)
VALUE_TABLES = set(CT.valueTables)
ITEMS = CT.items
DEFAULT_TYPE = CT.defaultType
PROV_SPECS = CT.prov

PROV = CW.provLabel
FORBIDDEN = CW.messages[N.forbidden]
QQ = CW.unknown[N.generic]
QN = CW.unknown[N.number]


class Table(object):
  def __init__(self, db, auth, table):
    self.db = db
    self.auth = auth
    self.table = table
    self.isMainTable = table == MAIN_TABLE
    self.isUserTable = table in USER_TABLES
    self.isUserEntryTable = table in USER_ENTRY_TABLES
    self.isValueTable = table in VALUE_TABLES
    if self.isValueTable:
      self.typeClass = getattr(Types, table)
    self.itemLabels = ITEMS.get(table, [table, f'{table}s'])
    self.prov = PROV_SPECS
    self.fields = getattr(CT, table, {})
    user = auth.user
    self.uid = user.get(N._id, None)
    self.eppn = user.get(N.eppn, None)
    self.group = user.get(N.groupRep, None) or UNAUTH
    self.countryId = user.get(N.country, None)
    self.country = db.country.get(self.countryId, {})
    self.multiple = {N.editors}

    isUserTable = self.isUserTable
    isSuperuser = auth.superuser()

    self.mayInsert = (
        auth.authenticated()
        and (isUserTable or isSuperuser)
    )

    def titleSortkey(r):
      return self.title(r).lower()

    self.titleSortkey = titleSortkey

  def record(self, eid=None, record=None, details=False):
    return Record(Table, self, eid=eid, record=record, details=details)

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
                    H.div(
                        ELLIPS,
                        fetchurl=f"""/{table}/{N.item}/{record[N._id]}""",
                    ),
                    itemkey=f"""{table}/{record[N._id]}""",
                    **forceOpen(record[N._id], openEid),
                )
                for record in records
            ),
        ))
    )

  def insertButton(self):
    mayInsert = self.mayInsert

    if not mayInsert:
      return E

    table = self.table
    itemSingle = self.itemLabels[0]

    return H.icon(
        N.plus,
        cls="button medium",
        href=f"""/{table}/{N.insert}""",
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
    db = self.db
    auth = self.auth
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


def forceOpen(theEid, openEid):
  return (
      dict(forceopen='1')
      if openEid and str(theEid) == openEid else
      dict()
  )
