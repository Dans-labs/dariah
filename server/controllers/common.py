from pymongo import MongoClient


class Database(object):
  ALL = 'ALL'
  MONGO = None
  COUNTRIES = None
  SCORE_MAPPING = None
  MAX_SCORE_BY_CRIT = None
  CRITERIA_ENTRIES = {}

  COUNTRY = {
      ALL: {
          'iso': ALL,
          'name': 'DARIAH',
          'isMember': True,
      },
  }
  COUNTRI = {ALL: ALL}
  YEAR = {}
  VCC = {}
  TYPE = {}
  DECISION = {}

  DECISION_ACCEPT = 'Accept'
  DECISION_REJECT = 'Reject'

  COORD = 'coord'
  ALLOWED = {COORD, 'office', 'system', 'root', 'nobody'}
  POWER = ALLOWED - {COORD}

  ASSESSED_STATUS = (
      (-1600, 'no', 'a-none'),
      (-800, 'started', 'a-started'),
      (-400, 'self', 'a-self'),
      (-200, 'in review', 'a-inreview'),
      (-64000, 'rejected', 'a-rejected'),
      (0, 'accepted', 'a-accepted'),
  )
  ASSESSED_LABELS = dict((c[0], c[1]) for c in ASSESSED_STATUS)
  ASSESSED_CLASS = dict((c[0], c[2]) for c in ASSESSED_STATUS)
  ASSESSED_DEFAULT = ASSESSED_STATUS[0][0]
  ASSESSED_ACCEPTED_CLASS = ASSESSED_STATUS[-1][2]

  def __init__(self):
    clientm = MongoClient()

    self.MONGO = clientm.dariah

    countries = []
    for rec in self.MONGO.country.find():
      if rec['isMember']:
        self.COUNTRY[rec['_id']] = {
            'iso': rec['iso'],
            'name': rec['name'],
            'isMember': rec['isMember'],
        }
        self.COUNTRI[rec['iso']] = rec['_id']
    for (recId, rec) in self.COUNTRY.items():
      if recId is not None:
        countries.append((
            f'{rec["name"]} ({rec["iso"]})',
            rec['iso'],
            recId,
            rec['iso'] == self.ALL,
        ))
    self.COUNTRIES = sorted(countries, key=lambda c: '' if c[1] == self.ALL else c[0])
    for rec in self.MONGO.year.find():
      self.YEAR[rec['_id']] = rec['rep']
    for rec in self.MONGO.vcc.find():
      self.VCC[rec['_id']] = rec['rep']
    for rec in self.MONGO.typeContribution.find():
      mainType = rec.get('mainType', '')
      subType = rec.get('subType', '')
      sep = ' / ' if mainType and subType else ''
      self.TYPE[rec['_id']] = f'{rec["mainType"]}{sep}{rec["subType"]}'
    for rec in self.MONGO.decision.find():
      self.DECISION[rec['_id']] = rec['rep']

    scoreData = list(self.MONGO.score.find())

    for rec in self.MONGO.criteriaEntry.find():
      aId = rec.get('assessment', None)
      if aId is not None:
        self.CRITERIA_ENTRIES.setdefault(aId, []).append(rec)

    self.SCORE_MAPPING = {s['_id']: s['score'] for s in scoreData if 'score' in s}
    self.MAX_SCORE_BY_CRIT = {}

    for s in scoreData:
      crit = s['criteria']
      score = s.get('score', 0)
      prevMax = self.MAX_SCORE_BY_CRIT.setdefault(crit, None)
      if prevMax is None or score > prevMax:
        self.MAX_SCORE_BY_CRIT[crit] = score


class User(object):
  def __init__(self, db, userInfo):
    self.name = userInfo.get('name', '')
    if not self.name:
      firstName = userInfo.get('firstName', '')
      lastName = userInfo.get('lastName', '')
      self.name = (
          firstName +
          (' ' if firstName and lastName else '') +
          lastName
      )
    self.org = userInfo.get('org', '')
    self.orgRep = f' ({self.org})' if self.org else ''
    self.email = userInfo.get('email', '')
    self.authority = userInfo.get('authority', '')
    self.authorityRep = f' - {self.authority}' if self.authority else ''
    self.eppn = userInfo.get('eppn', '')

    self.countryId = userInfo.get('country', None)
    self.countryInfo = db.COUNTRY.get(self.countryId, {})
    self.countryLong = (
        f'{self.countryInfo.get("name", "unknown")} ({self.countryInfo.get("iso", "")})'
        if self.countryInfo else
        None
    )
    self.countryShort = self.countryInfo.get('iso', 'unknown')

    self.group = userInfo.get('groupRep', 'public')
    self.groupDesc = userInfo.get('groupDesc', 'public')
    print(userInfo)

    self.identityRep = (
        f'{self.name}{self.orgRep}'
        if self.name else
        f'{self.email}{self.orgRep}'
        if self.email else
        f'{self.eppn}{self.authorityRep}'
        if self.eppn else
        'unidentified user!'
    ) + ' from ' + (
        self.countryShort
    ) + f' ({self.groupDesc})'

    self.accessRep = (
        f'({self.groupDesc}' +
        (f'-{self.countryShort}' if self.group == db.COORD else '') +
        ')'
    )


class Contrib(object):
  def __init__(self, db, contribId):
    self.CONTRIB_COLSPECS = (
        ('country', str),
        ('vcc', str, 'VCC'),
        ('year', int),
        ('type', str),
        ('cost', int, 'cost (€)'),
        ('assessed', tuple),
        ('selected', bool),
        ('title', str),
    )
    if contribId != db.ALL:
      self.CONTRIB_COLSPECS = self.CONTRIB_COLSPECS[1:]

    self.CONTRIB_COLS = [c[0] for c in self.CONTRIB_COLSPECS]
    self.CONTRIB_COLSET = {c[0] for c in self.CONTRIB_COLSPECS}
    self.CONTRIB_TYPES = dict((c[0], c[1]) for c in self.CONTRIB_COLSPECS)
    self.CONTRIB_LABELS = dict((c[0], c[2] if len(c) > 2 else c[0]) for c in self.CONTRIB_COLSPECS)
    self.CONTRIB_SORT_DEFAULT = self.CONTRIB_COLS[-1]

    self.GROUP_COLS = '''
      country
      vcc
      year
      type
      assessed
      selected
    '''.strip().split()

    if contribId != db.ALL:
      self.GROUP_COLS = self.GROUP_COLS[1:]

    self.ALL_GROUPS = [dict(col=c, label=self.CONTRIB_LABELS[c]) for c in self.GROUP_COLS]
    self.ALL_GROUPSET = set(self.GROUP_COLS)
