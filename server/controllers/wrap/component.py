from flask import request
from controllers.perm import permRecord, getPerms
from controllers.records import titleSort, labelDiv, valueRODiv, valueEdDiv
from controllers.html import HtmlElements as H, htmlEscape as he
from controllers.utils import dtm, dbjson


class Field(object):
  pass


class Component(object):
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

  def permRecord(self):
    record = self.record

    self.perm = permRecord(
        self.auth.userInfo,
        record,
        country=record.get('country', None),
    )

  def getPerms(self, field):
    record = self.record
    U = self.auth.userInfo
    P = self.perm
    require = getattr(self, 'require', {}).get(field, {})

    return getPerms(U, P, record, require)

  def fieldAction(self, eid, field, action):
    db = self.db
    N = self.names
    table = self.table

    record = db.getItem(table, eid)
    self.record = record
    self.permRecord()
    method = getattr(self, f'wrap_{field}')
    if action == 'save':
      (mayRead, mayEdit) = self.getPerms(field)
      if mayEdit:
        data = request.get_json()
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
    return method(action=action)

  def fieldWrap(self, field, label, rep, action, withRefresh=False):
    table = self.table

    (mayRead, mayEdit) = self.getPerms(field)
    if not mayRead:
      return ''

    atts = (
        dict(
            table=table,
            eid=str(self.record['_id']),
            field=field,
        )
    )

    asView = action == 'view'
    asEdit = action == 'edit'
    asSave = action == 'save'

    rep = (
        valueEdDiv(rep, **atts)
        if asEdit and mayEdit else
        valueRODiv(rep, mayEdit, withRefresh=withRefresh, **atts)
    )
    editClass = (
        ' edit'
        if asEdit and mayEdit else
        ''
    )
    if asEdit or asSave or asView:
      return ''.join(rep)

    return (
        H.div(
            [
                labelDiv(label),
                H.div(
                    rep,
                    cls=f'record-value {editClass}',
                ),
            ],
            cls='record-row',
        )
    )

  def wrap_creator(self, action=None):
    record = self.record
    db = self.db
    auth = self.auth

    field = 'creator'
    label = 'Creator'
    value = db.getField(record, field, relTable='user')
    rep = H.div(
        he(auth.identity(value)),
        cls='tag',
    )
    return self.fieldWrap(field, label, rep, action)

  def wrap_dateCreated(self, action=None):
    record = self.record

    field = 'dateCreated'
    label = 'Created on'
    value = record.get(field, None)
    rep = he(f'{dtm(value.isoformat())[1]}' or ('' if action == 'edit' else '??'))
    return self.fieldWrap(field, label, rep, action)

  def wrap_editors(self, action=None):
    record = self.record
    db = self.db
    auth = self.auth

    field = 'editors'
    label = 'Editor(s)'
    values = db.getField(record, field, relTable='user', multiple=True)
    rep = [
        H.div(
            he(auth.identity(value)),
            cls='tag',
        )
        for value in values
    ]
    return self.fieldWrap(field, label, rep, action)

  def wrap_modified(self, action=None):
    record = self.record

    field = 'modified'
    label = 'Modified'
    value = record.get(field, [])
    rep = H.br().join(he(v) for v in value)
    return self.fieldWrap(field, label, rep, action, withRefresh=True)

  def wrapProvenance(self):
    table = self.table
    record = self.record

    return H.details(
        'Provenance',
        H.div(
            [
                self.wrap_creator(),
                self.wrap_editors(),
                self.wrap_dateCreated(),
                self.wrap_modified(),
            ]
        ),
        itemkey=f'{table}/{record["_id"]}/prov',
    )
