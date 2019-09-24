from bson.objectid import ObjectId
from flask import request
from controllers.perm import permRecord, getPerms
from controllers.records import labelDiv, valueRODiv, valueEdDiv
from controllers.html import HtmlElements as H


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
    self.group = U.get('groupRep', N.public)
    self.countryId = U.get('country', None)
    self.country = db.country.get(self.countryId, {})

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

  def fieldAction(self, table, eid, field, action):
    db = self.db
    mongo = self.mongo
    N = self.names

    record = db.getItem(table, eid)
    self.record = record
    self.permRecord()
    method = getattr(self, f'wrap_{field}')
    if action == 'save':
      data = request.get_json()
      (mayRead, mayEdit) = self.getPerms(field)
      if mayEdit:
        mongo[table].update_one(
            {'_id': ObjectId(eid)},
            {
                '$set': {field: data},
                '$unset': {N.isPristine: ''},
            },
        )
        record[field] = data
        if N.isPristine in record:
          del record[N.isPristine]
    return method(action=action)

  def fieldWrap(self, field, label, rep, action):
    (mayRead, mayEdit) = self.getPerms(field)
    if not mayRead:
      return ''

    atts = (
        dict(
            table=self.table,
            eid=str(self.record['_id']),
            field=field,
        )
        if mayEdit else
        {}
    )

    asEdit = action == 'edit'
    asSave = action == 'save'

    rep = (
        valueEdDiv(rep, **atts)
        if asEdit and mayEdit else
        valueRODiv(rep, mayEdit, **atts)
    )
    editClass = (
        ' edit'
        if asEdit and mayEdit else
        ''
    )
    if asEdit or asSave:
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
