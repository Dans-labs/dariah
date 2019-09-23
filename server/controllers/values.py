from itertools import chain
from markdown import markdown

from controllers.utils import now, dtm
from controllers.html import HtmlElements as H
from controllers.perm import getPerms


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

  def identity(self, U, record):
    name = record.get('name', '')
    if not name:
      firstName = record.get('firstName', '')
      lastName = record.get('lastName', '')
      name = (
          firstName +
          (' ' if firstName and lastName else '') +
          lastName
      )
    UNAUTH = self.names.public
    group = U.get('groupRep', UNAUTH)
    isAuth = group != UNAUTH
    org = record.get('org', '')
    orgRep = f' ({org})' if org else ''
    email = record.get('email', '') if isAuth else ''
    authority = record.get('authority', '') if isAuth else ''
    authorityRep = f' - {authority}' if authority else ''
    eppn = record.get('eppn', '') if isAuth else ''

    countryId = record.get('country', None)
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
    return identityRep

  def credentials(self, U):
    UNAUTH = self.names.public
    group = U.get('groupRep', UNAUTH)
    groupDesc = self.config.groups.get(group, 'unknown group')

    if group == UNAUTH:
      return ('Guest', groupDesc)

    identityRep = self.identity(U, U)

    return (identityRep, groupDesc)

  def wrapCurrentUser(self, auth):
    U = auth.userInfo
    UNAUTH = self.names.public
    (identityRep, accessRep) = self.credentials(U)
    access = U.get('groupRep', UNAUTH)
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

  def wrapNav(self, auth):
    return '\n'.join([
        H.a('Home', '/'),
        H.a('Contributions', '/contrib/list'),
    ])

  def wrapAuthor(self, U, P, record, require=None):
    label = 'Creator'
    value = self.relfield(record, 'creator', relTable='user')
    rep = H.div(
        self.identity(U, value),
        cls='tag',
    )
    return H.div(
        [labelDiv(label), valueRODiv(rep)],
        cls='record-row',
    )

  def wrapContactPersonName(self, U, P, record, require=None):
    label = 'Contact person'
    value = record.get('contactPersonName', None)
    rep = value or 'not given'
    return H.div(
        [labelDiv(label), valueRODiv(rep)],
        cls='record-row',
    )

  def wrapContactPersonEmail(self, U, P, record, require=None):
    (mayRead, mayEdit) = getPerms(U, P, record, require)
    if not mayRead and not mayEdit:
      return ''

    label = 'Contact email'
    value = record.get('contactPersonEmail', None)
    if not mayEdit:
      rep = value or 'not given'
      return H.div(
          [labelDiv(label), valueRODiv(rep)],
          cls='record-row',
      )
    rep = value or ''
    return H.div(
        [labelDiv(label), valueRODiv(rep)],
        cls='record-row',
    )

  def wrapCostTotal(self, U, P, record, require=None):
    label = 'Cost (total)'
    value = record.get('costTotal', None)
    rep = f'€ {value}' or '??'
    return H.div(
        [labelDiv(label), valueRODiv(rep)],
        cls='record-row',
    )

  def wrapCostDescription(self, U, P, record, require=None):
    label = 'cost (description)'
    value = record.get('costDescription', None)
    rep = H.div(markdown(value or '??'))
    return H.div(
        [labelDiv(label), valueRODiv(rep)],
        cls='record-row',
    )

  def wrapCountry(self, U, P, record, require=None):
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

  def wrapDateCreated(self, U, P, record, require=None):
    label = 'Created on'
    value = record.get('dateCreated', None)
    rep = f'{dtm(value.isoformat())[1]}' or '??'
    return H.div(
        [labelDiv(label), valueRODiv(rep)],
        cls='record-row',
    )

  def wrapDescription(self, U, P, record, require=None):
    label = 'Description'
    value = record.get('description', None)
    rep = H.div(markdown(value or '??'))
    return H.div(
        [labelDiv(label), valueRODiv(rep)],
        cls='record-row',
    )

  def wrapDisciplines(self, U, P, record, require=None):
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

  def wrapEditors(self, U, P, record, require=None):
    label = 'Editor(s)'
    values = self.relfield(record, 'editors', relTable='user', multiple=True)
    rep = [
        H.div(
            self.identity(U, value),
            cls='tag',
        )
        for value in values
    ]
    return H.div(
        [labelDiv(label), valueRODiv(rep)],
        cls='record-row',
    )

  def wrapKeywords(self, U, P, record, require=None):
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

  def wrapModified(self, U, P, record, require=None):
    label = 'Modified'
    value = record.get('modified', [])
    rep = H.br().join(value)
    return H.div(
        [labelDiv(label), valueRODiv(rep)],
        cls='record-row',
    )

  def wrapSelected(self, U, P, record, require=None):
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

  def wrapTadirahObjects(self, U, P, record, require=None):
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

  def wrapTadirahActivities(self, U, P, record, require=None):
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

  def wrapTadirahTechniques(self, U, P, record, require=None):
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

  def wrapTypeContribution(self, U, P, record, require=None):
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

  def wrapUrlAcademic(self, U, P, record, require=None):
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

  def wrapUrlContribution(self, U, P, record, require=None):
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

  def wrapVccs(self, U, P, record, require=None):
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

  def wrapYear(self, U, P, record, require=None):
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
