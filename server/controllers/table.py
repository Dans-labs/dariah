from flask import request
from controllers.config import Config as C, Names as N, Tables as T
from controllers.perm import permRecord, getPerms, UNAUTH
from controllers.field import Field, QQ
from controllers.html import HtmlElements as H, htmlEscape as he
from controllers.utils import dbjson, E, ELLIPS

NUMERIC = C.table[N.numericTypes]
DEFAULT_TYPE = C.table[N.defaultType]
VALUE_TABLES = set(C.table[N.kinds][N.value])
VALUE_SPECS = C.table[N.value]
PROV_SPECS = C.table[N.prov]
PROV = C.html[N.provLabel]
M_OR = C.mongo[N.OR]


def titleSort(records):
  return sorted(records, key=lambda r: (r.get(N.title, E) or E).lower())


class Table(object):
  def __init__(self, db, auth, table):
    self.db = db
    self.auth = auth
    self.table = table
    self.mongo = db.mongo
    self.val = VALUE_SPECS
    self.prov = PROV_SPECS
    self.fields = getattr(
        T, table,
        VALUE_SPECS if self.table in VALUE_TABLES else {}
    )

    U = auth.userInfo
    self.uid = U.get(N._id, None)
    self.eppn = U.get(N.eppn, None)
    self.group = U.get(N.groupRep, UNAUTH)
    self.countryId = U.get(N.country, None)
    self.country = db.country.get(self.countryId, {})
    self.multiple = {N.editors}

  def list(self):
    mongo = self.mongo
    table = self.table

    records = titleSort(mongo[table].find())

    return H.div(
        (
            H.details(
                he(record.get(N.title, None) or QQ),
                H.div(
                    ELLIPS,
                    fetchurl=f"""/{table}/{N.item}/{record[N._id]}""",
                ),
                itemkey=f"""{table}/{record[N._id]}""",
            )
            for record in records
        )
    )

  def mylist(self):
    mongo = self.mongo
    uid = self.uid
    table = self.table

    crit = {
        M_OR: [
            {N.creator: uid},
            {N.editors: uid},
        ],
    }
    records = titleSort(mongo[table].find(crit))

    return H.div(
        (
            H.details(
                he(record.get(N.title, None) or QQ),
                H.div(
                    ELLIPS,
                    fetchurl=f"""/{table}/{N.item}/{record[N._id]}""",
                ),
                itemkey=f"""{table}/{record[N._id]}""",
            )
            for record in records
        )
    )

  def ourlist(self):
    mongo = self.mongo
    table = self.table
    countryId = self.countryId

    crit = {
        N.country: countryId,
    }
    records = titleSort(mongo[table].find(crit))

    return H.div(
        (
            H.details(
                he(record.get(N.title, None) or QQ),
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
        if tp in NUMERIC:
          conversion = float if tp == N.decimal else int
          if multiple:
            data = [
                conversion(d)
                for d in data
            ]
          else:
            data = conversion(data)

        actor = self.eppn
        modified = record.get(N.modified, None)
        (updates, deletions) = db.saveField(
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

    return (
        H.div(
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
