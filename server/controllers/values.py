from itertools import chain
from markdown import markdown

from controllers.utils import now
from controllers.html import HtmlElements as H


UNAUTH = 'public'


def labelDiv(label):
  return H.div(
      f'{label}:',
      cls='record-label',
  )


def valueRODiv(value):
  return H.div(
      value,
      cls='record-value',
  )


class Values(object):
  def __init__(self, MONGO, Config, Names):
    self.MONGO = MONGO
    self.names = Names
    self.config = Config

  def collect(self):
    MONGO = self.MONGO
    for table in f'''
        country
        criteria
        decision
        discipline
        keyword
        package
        permissionGroup
        score
        tadirahActivity
        tadirahObject
        tadirahTechnique
        typeContribution
        user
        vcc
        year
    '''.strip().split():
      setattr(
          self,
          table,
          {
              record['_id']: record
              for record in MONGO[table].find()
          },
      )
    for table in f'''
        permissionGroup
    '''.strip().split():
      setattr(
          self,
          f'{table}Inv',
          {
              record['rep']: record['_id']
              for record in MONGO[table].find()
          },
      )

    self.collectActiveItems()

  def collectActiveItems(self):
    MONGO = self.MONGO
    present = now()
    self.packageActive = {
        record['_id']
        for record in MONGO.package.find(
            {
                'startDate': {'$lte': present},
                'endDate': {'$gte': present},
            },
        )
    }
    self.typeActive = set(chain.from_iterable(
        record.get('typeContribution', [])
        for (_id, record) in self.package.items()
        if _id in self.packageActive
    ))

    self.criteriaActive = {
        _id
        for (_id, record) in self.criteria.items()
        if record['package'] in self.packageActive
    }
    self.typeCriteria = {}
    for (_id, record) in self.criteria.items():
      if _id not in self.criteriaActive:
        continue
      for tp in record.get('typeContribution', []):
        self.typeCriteria.setdefault(tp, set()).add(_id)

  def relfield(
      self,
      record,
      fieldName,
      multiple=False,
      relTable=None,
  ):
    relTable = relTable or fieldName
    rawValue = record.get(fieldName, [] if multiple else None)
    valTable = getattr(self, relTable, {})
    return (
        [
            valTable.get(rawVal, {})
            for rawVal in rawValue
        ]
        if multiple else
        valTable.get(rawValue, {})
    )

  def credentials(self, userInfo):
    UNAUTH = self.names.public
    group = userInfo.get('groupRep', UNAUTH)
    groupDesc = self.config.groups.get(group, 'unknown group')

    if group == UNAUTH:
      return ('Guest', groupDesc)

    name = userInfo.get('name', '')
    if not name:
      firstName = userInfo.get('firstName', '')
      lastName = userInfo.get('lastName', '')
      name = (
          firstName +
          (' ' if firstName and lastName else '') +
          lastName
      )
    org = userInfo.get('org', '')
    orgRep = f' ({org})' if org else ''
    email = userInfo.get('email', '')
    authority = userInfo.get('authority', '')
    authorityRep = f' - {authority}' if authority else ''
    eppn = userInfo.get('eppn', '')

    countryId = userInfo.get('country', None)
    countryInfo = self.country.get(countryId, {})
    countryLong = (
        f'{countryInfo.get("name", "unknown")} ({countryInfo.get("iso", "")})'
        if countryInfo else
        'unkown country'
    )

    identityRep = (
        f'{name}{orgRep}'
        if name else
        f'{email}{orgRep}'
        if email else
        f'{eppn}{authorityRep}'
        if eppn else
        'unidentified user!'
    ) + ' from ' + (
        countryLong
    )

    return (identityRep, groupDesc)

  def wrapUser(self, userInfo):
    UNAUTH = self.names.public
    (identityRep, accessRep) = self.credentials(userInfo)
    access = userInfo.get('groupRep', UNAUTH)
    login = (
        H.a(
            'log in',
            '/login',
            cls='button small loginout'
        )
        if access == UNAUTH else
        ''
    )
    logout = (
        []
        if access == UNAUTH else
        [
            H.a(
                'log out',
                '/logout',
                cls='button small loginout'
            ),
            H.a(
                'log out from DARIAH',
                '/slogout',
                cls='button small loginout',
                title='you need to restart your browser for this to take effect',
            ),
        ]
    )
    return H.div(
        [
            H.div(
                identityRep,
                cls='user',
            ),
            H.div(
                accessRep,
                cls='access',
            ),
            login,
            *logout,
        ],
        cls='headline',
    )

  def wrapContactPersonName(self, record, action='read'):
    label = 'Contact person'
    value = record.get('contactPersonName', None)
    rep = value or 'not given'
    return H.div(
        [labelDiv(label), valueRODiv(rep)],
        cls='record-row',
    )

  def wrapContactPersonEmail(self, record, action='read'):
    label = 'Contact email'
    value = record.get('contactPersonEmail', None)
    rep = value or 'not given'
    return H.div(
        [labelDiv(label), valueRODiv(rep)],
        cls='record-row',
    )

  def wrapCostTotal(self, record, action='read'):
    label = 'Cost (total)'
    value = record.get('costTotal', None)
    rep = f'€ {value}' or '??'
    return H.div(
        [labelDiv(label), valueRODiv(rep)],
        cls='record-row',
    )

  def wrapCostDescription(self, record, action='read'):
    label = 'cost (description)'
    value = record.get('costDescription', None)
    rep = H.div(markdown(value or '??'))
    return H.div(
        [labelDiv(label), valueRODiv(rep)],
        cls='record-row',
    )

  def wrapCountry(self, record, action='read'):
    label = 'Country'
    value = self.relfield(record, 'country')
    rep = H.div(
        str(value.get('iso', '??')),
        title=str(value.get('name', '??')),
        cls='tag',
    )
    return H.div(
        [labelDiv(label), valueRODiv(rep)],
        cls='record-row',
    )

  def wrapDescription(self, record, action='read'):
    label = 'Description'
    value = record.get('description', None)
    rep = H.div(markdown(value or '??'))
    return H.div(
        [labelDiv(label), valueRODiv(rep)],
        cls='record-row',
    )

  def wrapSelected(self, record, action='read'):
    label = 'Selected by National Coordinator'
    value = record.get('selected', None)
    rep = (
        'No decision'
        if value is None else
        'Yes'
        if value else
        'No'
    )
    return H.div(
        [labelDiv(label), valueRODiv(rep)],
        cls='record-row',
    )

  def wrapTadirahObjects(self, record, action='read'):
    label = 'Object(s)'
    values = self.relfield(record, 'tadirahObject', multiple=True)
    rep = [
        H.div(
            value.get('rep', '??'),
            cls='tag',
        )
        for value in values
    ]
    return H.div(
        [labelDiv(label), valueRODiv(rep)],
        cls='record-row',
    )

  def wrapTadirahActivities(self, record, action='read'):
    label = 'Activity(ies)'
    values = self.relfield(record, 'tadirahActivity', multiple=True)
    rep = [
        H.div(
            value.get('rep', '??'),
            cls='tag',
        )
        for value in values
    ]
    return H.div(
        [labelDiv(label), valueRODiv(rep)],
        cls='record-row',
    )

  def wrapTadirahTechniques(self, record, action='read'):
    label = 'Technique(s)'
    values = self.relfield(record, 'tadirahTechnique', multiple=True)
    rep = [
        H.div(
            value.get('rep', '??'),
            cls='tag',
        )
        for value in values
    ]
    return H.div(
        [labelDiv(label), valueRODiv(rep)],
        cls='record-row',
    )

  def wrapDisciplines(self, record, action='read'):
    label = 'Disciplines'
    values = self.relfield(record, 'discipline', multiple=True)
    rep = [
        H.div(
            value.get('rep', '??'),
            cls='tag',
        )
        for value in values
    ]
    return H.div(
        [labelDiv(label), valueRODiv(rep)],
        cls='record-row',
    )

  def wrapKeywords(self, record, action='read'):
    label = 'Keywords'
    values = self.relfield(record, 'keyword', multiple=True)
    rep = [
        H.div(
            value.get('rep', '??'),
            cls='tag',
        )
        for value in values
    ]
    return H.div(
        [labelDiv(label), valueRODiv(rep)],
        cls='record-row',
    )

  def wrapTypeContribution(self, record, action='read'):
    label = 'Type'
    rawValue = record.get('typeContribution', None)
    value = self.relfield(record, 'typeContribution')
    mainType = value.get('mainType', '')
    subType = value.get('subType', '')
    sep = ' - ' if mainType and subType else ''
    explanation = value.get('explanation', '')
    inactive = '' if rawValue in self.typeActive else ' inactive'
    rep = H.div(
        f'{mainType}{sep}{subType}',
        title=explanation,
        cls=f'tag{inactive}',
    )
    return H.div(
        [labelDiv(label), valueRODiv(rep)],
        cls='record-row',
    )

  def wrapUrlAcademic(self, record, action='read'):
    label = 'Academic url'
    value = record.get('urlAcademic', [])
    rep = (
        [
            H.a(url, url, target='_blank')
            for url in value
        ]
        if value else
        '??'
    )
    return H.div(
        [labelDiv(label), valueRODiv(rep)],
        cls='record-row',
    )

  def wrapUrlContribution(self, record, action='read'):
    label = 'Contribution url'
    value = record.get('urlContribution', [])
    rep = (
        [
            H.a(url, url, target='_blank')
            for url in value
        ]
        if value else
        '??'
    )
    return H.div(
        [labelDiv(label), valueRODiv(rep)],
        cls='record-row',
    )

  def wrapVccs(self, record, action='read'):
    label = 'VCC(s)'
    values = self.relfield(record, 'vcc', multiple=True)
    rep = [
        H.div(
            value.get('rep', '??'),
            cls='tag',
        )
        for value in values
    ]
    return H.div(
        [labelDiv(label), valueRODiv(rep)],
        cls='record-row',
    )

  def wrapYear(self, record, action='read'):
    label = 'Year'
    value = self.relfield(record, 'year')
    rep = H.div(
        str(value.get('rep', '??')),
        cls='tag',
    )
    return H.div(
        [labelDiv(label), valueRODiv(rep)],
        cls='record-row',
    )
