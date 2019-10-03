from itertools import chain
from flask import request

from controllers.config import Config as C, Names as N
from controllers.perm import permRecord, getPerms, UNAUTH
from controllers.field import Field
from controllers.html import HtmlElements as H, htmlEscape as he
from controllers.utils import dbjson, cap1, E, ELLIPS

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


def forceOpen(theEid, openEid):
  return (
      dict(forceopen='1')
      if openEid and str(theEid) == openEid else
      dict()
  )


class Table(object):
  def __init__(self, db, auth, table):
    self.db = db
    self.auth = auth
    self.table = table
    self.isMainTable = table == MAIN_TABLE
    self.isUserTable = table in USER_TABLES
    self.isValueTable = table in VALUE_TABLES
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

    def titleSortkey(r):
      return self.title(r).lower()

    self.titleSortkey = titleSortkey

  def dependencies(self):
    db = self.db
    table = self.table
    record = self.record

    return db.dependencies(table, record)

  def mayDelete(self):
    auth = self.auth

    if not auth.authenticated():
      return False

    isSuperuser = auth.superuser()
    isUserTable = self.isUserTable

    if not isSuperuser:
      if isUserTable:
        self.studyRecord()
        perm = self.perm
        if not perm[N.isEdit]:
          return False
      else:
        return False

    return True

  def mayInsert(self):
    auth = self.auth
    isUserTable = self.isUserTable
    isSuperuser = auth.superuser()

    return (
        auth.authenticated()
        and (isUserTable or isSuperuser)
    )

  def mayList(self):
    auth = self.auth
    isUserTable = self.isUserTable
    return (
        isUserTable
        or
        auth.authenticated()
    )

  def mayMyList(self):
    auth = self.auth
    isUserTable = self.isUserTable
    return (
        isUserTable
        and
        auth.authenticated()
    )

  def mayOurList(self):
    auth = self.auth
    isUserTable = self.isUserTable
    return (
        isUserTable
        and
        auth.authenticated()
    )

  def title(self, record):
    db = self.db
    auth = self.auth
    table = self.table
    isUserTable = self.isUserTable

    if isUserTable:
      return he(record.get(N.title, QQ))

    typeClass = getattr(Types, table)
    titleStr = typeClass.titleStr(db, auth, record)
    titleHint = typeClass.titleHint(record)

    return typeClass.title(record, titleStr, titleHint)

  def insert(self):
    db = self.db
    if not self.mayInsert():
      return ()

    uid = self.uid
    eppn = self.eppn
    table = self.table

    return db.insertItem(table, uid, eppn)

  def insertButton(self):
    if not self.mayInsert():
      return ()

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

  def delete(self, eid):
    db = self.db
    table = self.table
    record = db.getItem(table, eid)
    if not record:
      return

    self.record = record
    if not self.mayDelete() or self.dependencies():
      return

    db.delItem(table, eid)

  def deleteButton(self):
    if not self.mayDelete():
      return E
    nDeps = self.dependencies()
    if nDeps:
      plural = '' if nDeps == 1 else 's'
      return H.span(
          [
              H.icon(
                  N.puzzle_piece,
                  cls="label medium warning-o delete",
                  title=f"""Cannot delete because of {nDeps} dependent record{plural}"""
              ),
              H.span(
                  f"""{nDeps} dependent record{plural}""",
                  cls="label small warning-o delete",
              ),
          ]
      )

    record = self.record
    table = self.table
    itemSingle = self.itemLabels[0]

    return H.a(
        H.icon(
            N.trash,
            cls="button medium error-o delete",
        ),
        href=f"""/{table}/{N.delete}/{record[N._id]}""",
        title=f"""Delete this {itemSingle}"""
    )

  def list(self, openEid):
    if not self.mayList():
      return FORBIDDEN

    db = self.db
    table = self.table
    titleSortkey = self.titleSortkey

    records = db.getList(table, titleSortkey)

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

  def mylist(self, openEid):
    if not self.mayMyList():
      return FORBIDDEN

    db = self.db
    table = self.table
    titleSortkey = self.titleSortkey
    uid = self.uid

    records = db.getList(table, titleSortkey, my=uid)

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

  def ourlist(self):
    if not self.mayOurList():
      return FORBIDDEN

    db = self.db
    table = self.table
    titleSortkey = self.titleSortkey
    countryId = self.countryId

    records = db.getList(table, titleSortkey, our=countryId)

    return H.div(
        (
            H.details(
                self.title(record),
                H.div(
                    ELLIPS,
                    fetchurl=f"""/{table}/{N.item}/{record[N._id]}""",
                ),
                itemkey=f"""{table}/{record[N._id]}""",
            )
            for record in records
        )
    )

  def item(self, eid, asJson=False):
    db = self.db
    table = self.table
    record = db.getItem(table, eid)

    return dbjson(record) if asJson else self.wrap(record)

  def studyRecord(self):
    record = self.record

    self.perm = permRecord(
        self.auth.user,
        record,
        country=record.get(N.country, None),
    )

  def permissions(self, field):
    fieldSpecs = self.fields

    fieldSpec = fieldSpecs.get(field, {})
    require = fieldSpec.get(N.perm, {})

    user = self.auth.user
    perm = self.perm
    record = self.record

    return getPerms(user, perm, record, require)

  def fieldSave(self, eid, field, data):
    db = self.db
    table = self.table

    (mayRead, mayEdit) = self.permissions(field)
    if mayEdit:
      record = self.record
      fieldSpecs = self.fields

      fieldSpec = fieldSpecs.get(field, {})
      tp = fieldSpec.get(N.type, DEFAULT_TYPE)
      multiple = fieldSpec.get(N.multiple, False)

      tpClass = getattr(Types, tp, None)
      conversion = (
          tpClass.fromStr
          if tpClass else
          None
      )
      if conversion is not None:
        if multiple:
          data = [
              conversion(d)
              for d in data or []
          ]
        else:
          data = conversion(data)

      actor = self.eppn
      modified = record.get(N.modified, None)
      (updates, deletions) = db.updateField(
          table,
          eid,
          field,
          data,
          actor,
          modified,
      )
      record.update(updates)
      for f in deletions:
        if f in record:
          del record[f]

  def fieldAction(self, eid, field, action):
    db = self.db
    table = self.table

    record = db.getItem(table, eid)
    self.record = record
    self.studyRecord()
    data = request.get_json()
    if data is not None and N.save in data:
      self.fieldSave(eid, field, data[N.save])
    return self.wrapField(field, action=action)

  def wrapField(self, field, action=None):
    (mayRead, mayEdit) = self.permissions(field)
    if not mayRead:
      return E

    auth = self.auth
    db = self.db
    table = self.table
    record = self.record
    fieldSpecs = self.fields

    fieldSpec = fieldSpecs.get(field, {})

    eid = str(self.record[N._id])
    label = fieldSpec.get(N.label, cap1(field))
    tp = fieldSpec.get(N.type, DEFAULT_TYPE)
    multiple = fieldSpec.get(N.multiple, False)
    value = record.get(field, None)
    withRefresh = field == N.modified

    return (
        Field(db, auth, table, eid, field, mayEdit, label, tp, multiple, value).
        wrap(action, withRefresh)
    )

  def wrap(self, record):
    table = self.table
    provSpecs = self.prov

    self.record = record
    self.studyRecord()

    deleteButton = self.deleteButton()

    return (
        H.div(
            [deleteButton]
            +
            [
                self.wrapField(field)
                for field in self.fields
                if field not in provSpecs
            ]
            +
            [H.details(
                PROV,
                H.div(
                    [self.wrapField(field) for field in provSpecs]
                ),
                itemkey=f"""{table}/{record[N._id]}/{N.prov}""",
            )],
            cls="record",
        )
    )
