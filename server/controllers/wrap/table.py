import yaml
from flask import request
from controllers.perm import permRecord, getPerms
from controllers.field import Field, NUMERIC
from controllers.html import HtmlElements as H, htmlEscape as he
from controllers.utils import dbjson


def titleSort(records):
  return sorted(records, key=lambda r: (r.get('title', '') or '').lower())


class Table(object):
  def __init__(self, db, auth, **kwargs):
    self.db = db
    self.names = db.names
    self.config = db.config
    self.auth = auth
    for (k, v) in kwargs.items():
      setattr(self, k, v)

    N = self.names
    U = auth.userInfo
    self.uid = U.get('_id', None)
    self.eppn = U.get('eppn', None)
    self.group = U.get('groupRep', N.public)
    self.countryId = U.get('country', None)
    self.country = db.country.get(self.countryId, {})
    self.multiple = {'editors'}
    self.provenance = yaml.load('''
creator:
  label: Creator
  type: user
  perm:
    edit: nobody
dateCreated:
  label: Created on
  type: datetime
  perm:
    edit: nobody
editors:
  label: Editor(s)
  type: user
  multiple: true
  perm:
    read: auth
modified:
  label: modified
  type: string
  multiple: true
  perm:
    read: auth
    edit: nobody
    ''')

  def list(self):
    mongo = self.mongo
    table = self.table

    records = titleSort(mongo[table].find())

    return H.div(
        (
            H.details(
                he(record.get('title', None) or '??'),
                H.div('...', fetchurl=f'/{table}/item/{record["_id"]}'),
                itemkey=f'{table}/{record["_id"]}',
            )
            for record in records
        )
    )

  def mylist(self):
    mongo = self.mongo
    uid = self.uid
    table = self.table

    crit = {
        '$or': [
            {'creator': uid},
            {'editors': uid},
        ],
    }
    records = titleSort(mongo[table].find(crit))

    return H.div(
        (
            H.details(
                he(record.get('title', None) or '??'),
                H.div('...', fetchurl=f'/{table}/item/{record["_id"]}'),
                itemkey=f'{table}/{record["_id"]}',
            )
            for record in records
        )
    )

  def ourlist(self):
    mongo = self.mongo
    table = self.table
    countryId = self.countryId

    crit = {
        'country': countryId,
    }
    records = titleSort(mongo[table].find(crit))

    return H.div(
        (
            H.details(
                he(record.get('title', None) or '??'),
                H.div('...', fetchurl=f'/{table}/item/{record["_id"]}'),
                itemkey=f'{table}/{record["_id"]}',
            )
            for record in records
        )
    )

  def item(self, eid, asJson=False):
    db = self.db
    table = self.table
    record = db.getItem(table, eid)

    return dbjson(record) if asJson else self.wrap(record)

  def authenticated(self):
    N = self.names
    group = self.group
    return group != N.public

  def coordinator(self):
    N = self.names
    group = self.group
    country = self.country
    return (
        country.get('iso', '')
        if group == N.coord and country else
        ''
    )

  def studyRecord(self):
    record = self.record

    self.perm = permRecord(
        self.auth.userInfo,
        record,
        country=record.get('country', None),
    )

  def permissions(self, field):
    fieldSpecs = self.fields
    provSpecs = self.provenance

    fieldSpec = fieldSpecs.get(field, provSpecs.get(field, {}))
    require = fieldSpec.get('perm', {})

    U = self.auth.userInfo
    P = self.perm
    record = self.record

    return getPerms(U, P, record, require)

  def fieldAction(self, eid, field, action):
    db = self.db
    N = self.names
    table = self.table

    record = db.getItem(table, eid)
    self.record = record
    self.studyRecord()
    if action == 'save':
      (mayRead, mayEdit) = self.permissions(field)
      if mayEdit:
        fieldSpecs = self.fields
        provSpecs = self.provenance

        fieldSpec = fieldSpecs.get(field, provSpecs.get(field, {}))
        tp = fieldSpec.get('type', None)
        multiple = fieldSpec.get('multiple', False)
        data = request.get_json()
        if tp in NUMERIC:
          if multiple:
            data = [int(d) for d in data]
          else:
            data = int(data)
        print(f'tp={tp} data={data}  of type {type(data)}')
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
        print('after save:', updates, deletions)
        record.update(updates)
        for f in deletions:
          if f in record:
            del record[f]
    return self.wrapField(field, action=action)

  def wrapField(self, field, action=None):
    (mayRead, mayEdit) = self.permissions(field)
    if not mayRead:
      return ''

    auth = self.auth
    db = self.db
    N = self.names
    table = self.table
    record = self.record
    fieldSpecs = self.fields
    provSpecs = self.provenance

    fieldSpec = fieldSpecs.get(field, provSpecs.get(field, {}))

    eid = str(self.record['_id'])
    label = fieldSpec.get('label', field)
    tp = fieldSpec.get('type', False)
    multiple = fieldSpec.get('multiple', False)
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
                'Provenance',
                H.div(
                    [self.wrapField(field) for field in self.provenance]
                ),
                itemkey=f'{table}/{record["_id"]}/prov',
            )],
            cls='record',
        )
    )
