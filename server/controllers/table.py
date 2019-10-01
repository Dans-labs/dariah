from itertools import chain
from flask import request
from bson.objectid import ObjectId

from controllers.config import Config as C, Names as N, Tables as T
from controllers.perm import permRecord, getPerms, UNAUTH
from controllers.field import Field, getTitle
from controllers.html import HtmlElements as H
from controllers.utils import dbjson, E, ELLIPS

tableConfig = C.table
SCALAR_TYPES = set(tableConfig[N.scalarTypes])
NUMERIC_TYPES = set(tableConfig[N.numericTypes])
DEFAULT_TYPE = tableConfig[N.defaultType]
VALUE_SPECS = tableConfig[N.value]
PROV_SPECS = tableConfig[N.prov]
PROV = C.html[N.provLabel]

FORBIDDEN = C.html[N.messages][N.forbidden]


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
    self.isMainTable = table == T.mainTable
    self.isUserTable = table in T.userTables
    self.isValueTable = table in T.valueTables
    self.itemLabels = T.items.get(table, [table, f'{table}s'])
    self.prov = PROV_SPECS
    self.fields = getattr(
        T, table,
        VALUE_SPECS if self.isValueTable else {}
    )
    U = auth.userInfo
    self.uid = U.get(N._id, None)
    self.eppn = U.get(N.eppn, None)
    self.group = U.get(N.groupRep, UNAUTH)
    self.countryId = U.get(N.country, None)
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
        P = self.perm
        if not P[N.isEdit]:
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
    return getTitle(db, auth, table, isUserTable, record)

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
          H.icon(
              N.puzzle_piece,
              cls="label medium warning-o delete",
              title=f"""Cannot delete because of {nDeps} dependent record{plural}"""
          )
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
        self.auth.userInfo,
        record,
        country=record.get(N.country, None),
    )

  def permissions(self, field):
    fieldSpecs = self.fields
    provSpecs = self.prov

    fieldSpec = fieldSpecs.get(field, provSpecs.get(field, {}))
    require = fieldSpec.get(N.perm, {})

    U = self.auth.userInfo
    P = self.perm
    record = self.record

    return getPerms(U, P, record, require)

  def fieldAction(self, eid, field, action):
    db = self.db
    table = self.table

    record = db.getItem(table, eid)
    self.record = record
    self.studyRecord()
    if action == N.save:
      (mayRead, mayEdit) = self.permissions(field)
      if mayEdit:
        fieldSpecs = self.fields
        provSpecs = self.prov

        fieldSpec = fieldSpecs.get(field, provSpecs.get(field, {}))
        tp = fieldSpec.get(N.type, DEFAULT_TYPE)
        multiple = fieldSpec.get(N.multiple, False)
        data = request.get_json()
        conversion = (
            (float if tp == N.decimal else int)
            if tp in NUMERIC_TYPES else
            ObjectId
            if tp not in SCALAR_TYPES else
            None
        )
        if conversion is not None:
          if multiple:
            data = [
                conversion(d)
                for d in data
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
    provSpecs = self.prov

    fieldSpec = fieldSpecs.get(field, provSpecs.get(field, {}))

    eid = str(self.record[N._id])
    label = fieldSpec.get(N.label, field.capitalize())
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

    self.record = record
    self.studyRecord()

    deleteButton = self.deleteButton()

    return (
        H.div(
            [deleteButton]
            +
            [self.wrapField(field) for field in self.fields]
            +
            [H.details(
                PROV,
                H.div(
                    [self.wrapField(field) for field in self.prov]
                ),
                itemkey=f"""{table}/{record[N._id]}/{N.prov}""",
            )],
            cls="record",
        )
    )
