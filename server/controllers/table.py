from itertools import chain

from controllers.config import Config as C, Names as N
from controllers.perm import UNAUTH
from controllers.record import Record
from controllers.html import HtmlElements as H, htmlEscape as he
from controllers.utils import E, ELLIPS

from controllers.types import Types


CT = C.table
CW = C.web


MAIN_TABLE = CT.mainTable
USER_TABLES = set(CT.userTables)
VALUE_TABLES = set(CT.valueTables)
ITEMS = CT.items
DEFAULT_TYPE = CT.defaultType
PROV_SPECS = CT.prov

PROV = CW.provLabel
FORBIDDEN = CW.messages[N.forbidden]
QQ = CW.unknown[N.generic]


class Table(object):
  def __init__(self, db, auth, table):
    self.db = db
    self.auth = auth
    self.table = table
    self.isMainTable = table == MAIN_TABLE
    self.isUserTable = table in USER_TABLES
    self.isValueTable = table in VALUE_TABLES
    if self.isValueTable:
      self.typeClass = getattr(Types, table)
    self.itemLabels = ITEMS.get(table, [table, f'{table}s'])
    self.prov = PROV_SPECS
    self.fields = getattr(CT, table, {})
    user = auth.user
    self.uid = user.get(N._id, None)
    self.eppn = user.get(N.eppn, None)
    self.group = user.get(N.groupRep, UNAUTH)
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

  def record(self, eid):
    return Record(self, eid=eid)

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

    params = (
        dict(my=uid)
        if action == N.mylist else
        dict(our=countryId)
        if action == N.ourlist else
        {}
    )

    records = db.getList(table, titleSortkey, **params)

    return H.div(
        chain.from_iterable((
            self.insertButton(),
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

    return (
        H.a(
            H.icon(
                N.plus,
                cls="button medium",
            ),
            href=f"""/{table}/{N.insert}""",
            title=f"""New {itemSingle}"""
        ),
    )

  def mayList(self, action=None):
    auth = self.auth
    isUserTable = self.isUserTable
    return (
        (isUserTable or auth.authenticated())
        if action is None else
        (isUserTable and auth.authenticated())
    )

  def title(self, record):
    db = self.db
    auth = self.auth
    isUserTable = self.isUserTable

    if isUserTable:
      return he(record.get(N.title, QQ))

    typeClass = self.typeClass
    titleStr = typeClass.titleStr(db, auth, record)
    titleHint = typeClass.titleHint(record)

    return typeClass.title(record, titleStr, titleHint)


def forceOpen(theEid, openEid):
  return (
      dict(forceopen='1')
      if openEid and str(theEid) == openEid else
      dict()
  )
