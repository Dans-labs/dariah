from controllers.wrap.component import Component
from controllers.records import valueText, valueNumber, valueString, valueEmail, valueUrl
from controllers.html import HtmlElements as H
from controllers.names import Names as N


class Contrib(Component):
  def __init__(self, db, auth, mongo):
    super().__init__(db, auth, mongo=mongo)
    self.table = 'contrib'
    self.require = dict(
        selected=dict(edit=N.coord),
        costTotal=dict(read=N.coord),
        costDescription=dict(read=N.coord),
        contactPersonEmail=dict(read=N.auth),
        creator=dict(edit=N.nobody),
        editors=dict(read=N.auth),
        dateCreated=dict(edit=N.nobody),
        modified=dict(read=N.auth, edit=N.nobody),
    )

  def wrap(self, record):
    self.record = record

    self.permRecord()

    return (
        H.div(
            [
                self.wrap_title(),
                self.wrap_year(),
                self.wrap_country(),
                self.wrap_selected(),
                self.wrap_vcc(),
                self.wrap_typeContribution(),
                self.wrap_description(),
                self.wrap_costTotal(),
                self.wrap_costDescription(),
                self.wrap_contactPersonName(),
                self.wrap_contactPersonEmail(),
                self.wrap_urlContribution(),
                self.wrap_urlAcademic(),
                self.wrap_tadirahObject(),
                self.wrap_tadirahActivity(),
                self.wrap_tadirahTechnique(),
                self.wrap_discipline(),
                self.wrap_keyword(),
                self.wrapProvenance(),
            ],
            cls='record',
        )
    )

  def wrap_contactPersonName(self, action=None):
    record = self.record

    field = 'contactPersonName'
    label = 'Contact person'
    value = record.get(field, None)
    rep = valueString(value, action)
    return self.fieldWrap(field, label, rep, action)

  def wrap_contactPersonEmail(self, action=None):
    record = self.record

    field = 'contactPersonEmail'
    label = 'Contact email'
    value = record.get('contactPersonEmail', '')
    rep = valueEmail(value, action, multiple=True)
    return self.fieldWrap(field, label, rep, action)

  def wrap_costDescription(self, action=None):
    record = self.record

    field = 'costDescription'
    label = 'cost (description)'
    value = record.get(field, None)
    rep = valueText(value, action, multiple=False)
    return self.fieldWrap(field, label, rep, action)

  def wrap_costTotal(self, action=None):
    record = self.record

    field = 'costTotal'
    label = 'Cost (total)'
    value = record.get(field, None)
    rep = valueNumber(value, action, multiple=False)
    return self.fieldWrap(field, label, rep, action)

  def wrap_country(self, action=None):
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
    return self.fieldWrap(field, label, rep, action)

  def wrap_description(self, action=None):
    record = self.record

    field = 'description'
    label = 'Description'
    value = record.get(field, None)
    rep = valueText(value, action, multiple=False)
    return self.fieldWrap(field, label, rep, action)

  def wrap_discipline(self, action=None):
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
    return self.fieldWrap(field, label, rep, action)

  def wrap_keyword(self, action=None):
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
    return self.fieldWrap(field, label, rep, action)

  def wrap_selected(self, action=None):
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
    return self.fieldWrap(field, label, rep, action)

  def wrap_tadirahObject(self, action=None):
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
    return self.fieldWrap(field, label, rep, action)

  def wrap_tadirahActivity(self, action=None):
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
    return self.fieldWrap(field, label, rep, action)

  def wrap_tadirahTechnique(self, action=None):
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
    return self.fieldWrap(field, label, rep, action)

  def wrap_title(self, action=None):
    record = self.record

    field = 'title'
    label = 'Title'
    value = record.get(field, None)
    rep = valueString(value, action)
    return self.fieldWrap(field, label, rep, action)

  def wrap_typeContribution(self, action=None):
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
    return self.fieldWrap(field, label, rep, action)

  def wrap_urlAcademic(self, action=None):
    record = self.record

    field = 'urlAcademic'
    label = 'Academic url'
    value = record.get(field, [])
    rep = valueUrl(value, action, multiple=True)
    return self.fieldWrap(field, label, rep, action)

  def wrap_urlContribution(self, action=None):
    record = self.record

    field = 'urlContribution'
    label = 'Contribution url'
    value = record.get(field, [])
    rep = valueUrl(value, action, multiple=True)
    return self.fieldWrap(field, label, rep, action)

  def wrap_vcc(self, action=None):
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
    return self.fieldWrap(field, label, rep, action)

  def wrap_year(self, action=None):
    record = self.record
    db = self.db

    field = 'year'
    label = 'Year'
    value = db.getField(record, field)
    rep = H.div(
        str(value.get('rep', '??')),
        cls='tag',
    )
    return self.fieldWrap(field, label, rep, action)
