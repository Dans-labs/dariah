from itertools import chain

from flask import request

from controllers.config import Config as C, Names as N
from controllers.perm import UNAUTH
from controllers.record import Record
from controllers.html import HtmlElements as H
from controllers.utils import E, ELLIPS, NBSP


CT = C.tables
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
  def __init__(self, control, table):
    self.control = control
    self.db = control[N.db]
    self.auth = control[N.auth]
    self.types = control[N.types]

    db = self.db
    auth = self.auth
    user = auth.user

    self.table = table
    self.isMainTable = table == MAIN_TABLE
    self.isUserTable = table in USER_TABLES
    self.isUserEntryTable = table in USER_ENTRY_TABLES
    self.isValueTable = table in VALUE_TABLES
    self.itemLabels = ITEMS.get(table, [table, f'{table}s'])
    self.prov = PROV_SPECS
    self.fields = getattr(CT, table, {})

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
                        fetchurl=f"""/api/{table}/{N.item}/{record[N._id]}""",
                    ),
                    f"""{table}/{record[N._id]}""",
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
    return Record.titleRaw(self, record)


def forceOpen(theEid, openEid):
  return (
      dict(forceopen='1')
      if openEid and str(theEid) == openEid else
      dict()
  )
