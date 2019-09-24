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

  def getPerms(self, require):
    record = self.record
    U = self.auth.userInfo
    P = self.perm

    return getPerms(U, P, record, require)

  def fieldWrap(self, field, label, rep, action, require):
    (mayRead, mayEdit) = self.getPerms(require)
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
    if asEdit or asSave:
      return rep

    return (
        H.div(
            [
                labelDiv(label),
                rep,
            ],
            cls='record-row',
        )
    )
