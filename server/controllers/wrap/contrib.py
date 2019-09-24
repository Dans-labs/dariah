from bson.objectid import ObjectId
from markdown import markdown

from controllers.wrap.component import Component
from controllers.utils import dbjson, dtm
from controllers.records import titleSort
from controllers.html import HtmlElements as H
from controllers.names import Names as N


class Contrib(Component):
  def __init__(self, db, auth, mongo):
    super().__init__(db, auth, mongo=mongo)
    self.table = 'contrib'

  def list(self):
    mongo = self.mongo

    records = titleSort(mongo['contrib'].find())

    return H.div(
        (
            H.details(
                record.get('title', None) or '??',
                H.div('...', fetchurl=f'/contrib/item/{record["_id"]}'),
            )
            for record in records
        )
    )

  def mylist(self):
    mongo = self.mongo
    uid = self.uid

    crit = {
        '$or': [
            {'creator': uid},
            {'editors': uid},
        ],
    }
    records = titleSort(mongo['contrib'].find(crit))

    return H.div(
        (
            H.details(
                record.get('title', None) or '??',
                H.div('...', fetchurl=f'/contrib/item/{record["_id"]}'),
            )
            for record in records
        )
    )

  def ourlist(self):
    mongo = self.mongo
    countryId = self.countryId

    crit = {
        'country': countryId,
    }
    records = titleSort(mongo['contrib'].find(crit))

    return H.div(
        (
            H.details(
                record.get('title', None) or '??',
                H.div('...', fetchurl=f'/contrib/item/{record["_id"]}'),
            )
            for record in records
        )
    )

  def item(self, eid, asJson=False):
    mongo = self.mongo

    records = list(
        mongo['contrib'].find({'_id': ObjectId(eid)})
    )
    record = (
        records[0]
        if len(records) else
        {}
    )
    return dbjson(record) if asJson else self.wrap(record)

  def fieldAction(self, eid, field, action):
    mongo = self.mongo

    records = list(
        mongo['contrib'].find({'_id': ObjectId(eid)})
    )
    record = (
        records[0]
        if len(records) else
        {}
    )
    self.record = record
    self.permRecord()
    method = getattr(self, f'wrap_{field}')
    return method(action=action)

  def wrap(self, record):
    self.record = record

    self.permRecord()

    return (
        H.div(
            [
                self.wrap_year(
                ),
                self.wrap_country(
                ),
                self.wrap_selected(
                    require=dict(edit=N.coord)
                ),
                self.wrap_vcc(
                ),
                self.wrap_typeContribution(
                ),
                self.wrap_description(
                ),
                self.wrap_costTotal(
                    require=dict(read=N.coord)
                ),
                self.wrap_costDescription(
                    require=dict(read=N.coord)
                ),
                self.wrap_contactPersonName(
                ),
                self.wrap_contactPersonEmail(
                    require=dict(read=N.auth)
                ),
                self.wrap_urlContribution(
                ),
                self.wrap_urlAcademic(
                ),
                self.wrap_tadirahObject(
                ),
                self.wrap_tadirahActivity(
                ),
                self.wrap_tadirahTechnique(
                ),
                self.wrap_discipline(
                ),
                self.wrap_keyword(
                ),
                H.details(
                    'Provenance',
                    H.div(
                        [
                            self.wrap_creator(
                                require=dict(edit=N.nobody)
                            ),
                            self.wrap_editors(
                                require=dict(read=N.auth)
                            ),
                            self.wrap_dateCreated(
                                require=dict(edit=N.nobody)
                            ),
                            self.wrap_modified(
                                require=dict(read=N.auth, edit=N.nobody)
                            ),
                        ]
                    ),
                ),
            ],
            cls='record',
        )
    )

  def wrap_creator(self, action=None, require=None):
    record = self.record
    db = self.db
    auth = self.auth

    field = 'creator'
    label = 'Creator'
    value = db.getField(record, field, relTable='user')
    rep = H.div(
        auth.identity(value),
        cls='tag',
    )
    return self.fieldWrap(field, label, rep, action, require)

  def wrap_contactPersonName(self, action=None, require=None):
    record = self.record

    field = 'contactPersonName'
    label = 'Contact person'
    value = record.get(field, None)
    rep = value or ('' if action == 'edit' else '??')
    return self.fieldWrap(field, label, rep, action, require)

  def wrap_contactPersonEmail(self, action=None, require=None):
    record = self.record

    field = 'contactPersonEmail'
    label = 'Contact email'
    value = record.get('contactPersonEmail', '')
    rep = value or ('' if action == 'edit' else '??')
    return self.fieldWrap(field, label, rep, action, require)

  def wrap_costDescription(self, action=None, require=None):
    record = self.record

    field = 'costDescription'
    label = 'cost (description)'
    value = record.get(field, None)
    rep = (value or '') if action == 'edit' else H.div(markdown(value or '??'))
    return self.fieldWrap(field, label, rep, action, require)

  def wrap_costTotal(self, action=None, require=None):
    record = self.record

    field = 'costTotal'
    label = 'Cost (total)'
    value = record.get(field, None)
    asEdit = action == 'edit'
    rep = ('' if asEdit else '€ ') + (str(value) or ('' if asEdit else '??'))
    return self.fieldWrap(field, label, rep, action, require)

  def wrap_country(self, action=None, require=None):
    record = self.record
    db = self.db

    field = 'country'
    label = 'Country'
    value = db.getField(record, field)
    rep = H.div(
        str(value.get('iso', '??')),
        title=str(value.get('name', '??')),
        cls='tag',
    )
    return self.fieldWrap(field, label, rep, action, require)

  def wrap_dateCreated(self, action=None, require=None):
    record = self.record

    field = 'dateCreated'
    label = 'Created on'
    value = record.get(field, None)
    rep = f'{dtm(value.isoformat())[1]}' or ('' if action == 'edit' else '??')
    return self.fieldWrap(field, label, rep, action, require)

  def wrap_description(self, action=None, require=None):
    record = self.record

    field = 'description'
    label = 'Description'
    value = record.get(field, None)
    rep = (value or '') if action == 'edit' else H.div(markdown(value or '??'))
    return self.fieldWrap(field, label, rep, action, require)

  def wrap_discipline(self, action=None, require=None):
    record = self.record
    db = self.db

    field = 'discipline'
    label = 'Disciplines'
    values = db.getField(record, field, multiple=True)
    rep = [
        H.div(
            value.get('rep', '??'),
            cls='tag',
        )
        for value in values
    ]
    return self.fieldWrap(field, label, rep, action, require)

  def wrap_editors(self, action=None, require=None):
    record = self.record
    db = self.db
    auth = self.auth

    field = 'editors'
    label = 'Editor(s)'
    values = db.getField(record, field, relTable='user', multiple=True)
    rep = [
        H.div(
            auth.identity(value),
            cls='tag',
        )
        for value in values
    ]
    return self.fieldWrap(field, label, rep, action, require)

  def wrap_keyword(self, action=None, require=None):
    record = self.record
    db = self.db

    field = 'keyword'
    label = 'Keywords'
    values = db.getField(record, field, multiple=True)
    rep = [
        H.div(
            value.get('rep', '??'),
            cls='tag',
        )
        for value in values
    ]
    return self.fieldWrap(field, label, rep, action, require)

  def wrap_modified(self, action=None, require=None):
    record = self.record

    field = 'modified'
    label = 'Modified'
    value = record.get(field, [])
    rep = '\n'.join(value)
    return self.fieldWrap(field, label, rep, action, require)

  def wrap_selected(self, action=None, require=None):
    record = self.record

    field = 'selected'
    label = 'Selected by National Coordinator'
    value = record.get(field, None)
    rep = (
        (
            '0'
            if value is None else
            '1'
            if value else
            '-1'
        )
        if action == 'edit' else
        (
            'No decision'
            if value is None else
            'Yes'
            if value else
            'No'
        )
    )
    return self.fieldWrap(field, label, rep, action, require)

  def wrap_tadirahObject(self, action=None, require=None):
    record = self.record
    db = self.db

    field = 'tadirahObject'
    label = 'Object(s)'
    values = db.getField(record, field, multiple=True)
    rep = [
        H.div(
            value.get('rep', '??'),
            cls='tag',
        )
        for value in values
    ]
    return self.fieldWrap(field, label, rep, action, require)

  def wrap_tadirahActivity(self, action=None, require=None):
    record = self.record
    db = self.db

    field = 'tadirahActivity'
    label = 'Activity(ies)'
    values = db.getField(record, field, multiple=True)
    rep = [
        H.div(
            value.get('rep', '??'),
            cls='tag',
        )
        for value in values
    ]
    return self.fieldWrap(field, label, rep, action, require)

  def wrap_tadirahTechnique(self, action=None, require=None):
    record = self.record
    db = self.db

    field = 'tadirahTechnique'
    label = 'Technique(s)'
    values = db.getField(record, field, multiple=True)
    rep = [
        H.div(
            value.get('rep', '??'),
            cls='tag',
        )
        for value in values
    ]
    return self.fieldWrap(field, label, rep, action, require)

  def wrap_typeContribution(self, action=None, require=None):
    record = self.record
    db = self.db

    field = 'typeContribution'
    label = 'Type'
    rawValue = record.get(field, None)
    value = db.getField(record, field)
    mainType = value.get('mainType', '')
    subType = value.get('subType', '')
    sep = ' - ' if mainType and subType else ''
    explanation = value.get('explanation', '')
    inactive = '' if rawValue in db.typeActive else ' inactive'
    rep = H.div(
        f'{mainType}{sep}{subType}',
        title=explanation,
        cls=f'tag{inactive}',
    )
    return self.fieldWrap(field, label, rep, action, require)

  def wrap_urlAcademic(self, action=None, require=None):
    record = self.record

    field = 'urlAcademic'
    label = 'Academic url'
    value = record.get(field, [])
    rep = (
        (
            [
                url
                for url in value
            ]
            if value else
            ''
        )
        if action == 'edit' else
        (
            [
                H.a(url, url, target='_blank')
                for url in value
            ]
            if value else
            '??'
        )
    )
    return self.fieldWrap(field, label, rep, action, require)

  def wrap_urlContribution(self, action=None, require=None):
    record = self.record

    field = 'urlContribution'
    label = 'Contribution url'
    value = record.get(field, [])
    rep = (
        (
            [
                url
                for url in value
            ]
            if value else
            ''
        )
        if action == 'edit' else
        (
            [
                H.a(url, url, target='_blank')
                for url in value
            ]
            if value else
            '??'
        )
    )
    return self.fieldWrap(field, label, rep, action, require)

  def wrap_vcc(self, action=None, require=None):
    record = self.record
    db = self.db

    field = 'vcc'
    label = 'VCC(s)'
    values = db.getField(record, field, multiple=True)
    rep = [
        H.div(
            value.get('rep', '??'),
            cls='tag',
        )
        for value in values
    ]
    return self.fieldWrap(field, label, rep, action, require)

  def wrap_year(self, action=None, require=None):
    record = self.record
    db = self.db

    field = 'year'
    label = 'Year'
    value = db.getField(record, field)
    rep = H.div(
        str(value.get('rep', '??')),
        cls='tag',
    )
    return self.fieldWrap(field, label, rep, action, require)
