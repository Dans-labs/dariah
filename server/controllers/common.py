from pymongo import MongoClient

from models.compiled.model import model as M
from models.compiled.names import N

DM = M[N.tables]


class Database(object):
  ALL = 'ALL'
  MONGO = None
  COUNTRIES = None
  SCORE_MAPPING = None
  MAX_SCORE_BY_CRIT = None

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
  CRITERIA = {}
  DECISION = {}

  DECISION_ACCEPT = 'Accept'
  DECISION_REJECT = 'Reject'

  AUTH = 'auth'
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

    for rec in self.MONGO.criteria.find():
      cId = rec.get('_id', None)
      if cId is not None:
        self.CRITERIA[cId] = rec

    for rec in self.MONGO.decision.find():
      self.DECISION[rec['_id']] = rec['rep']

    scoreData = list(self.MONGO.score.find())

    self.SCORE_MAPPING = {s['_id']: s['score'] for s in scoreData if 'score' in s}
    self.MAX_SCORE_BY_CRIT = {}

    for s in scoreData:
      crit = s.get('criteria', None)
      if crit is None:
        continue
      score = s.get('score', 0)
      prevMax = self.MAX_SCORE_BY_CRIT.setdefault(crit, None)
      if prevMax is None or score > prevMax:
        self.MAX_SCORE_BY_CRIT[crit] = score

  def computeScore(self, aRecord):
    aId = aRecord['_id']
    myCriteriaData = self.CRITERIA_ENTRIES.get(aId, [])
    myCriteriaEntries = [(
        cd['criteria'],
        self.SCORE_MAPPING.get(cd.get('score', None), 0),
        self.MAX_SCORE_BY_CRIT[cd['criteria']]
    ) for cd in myCriteriaData]

    relevantCriteriaEntries = [x for x in myCriteriaEntries if x[1] >= 0]
    relevantMax = sum(x[2] for x in relevantCriteriaEntries)
    relevantScore = sum(x[1] for x in relevantCriteriaEntries)
    overall = 0 if relevantMax == 0 else (round(relevantScore * 100 / relevantMax))
    return overall

  def computeStatus(self, assessment):
    aId = assessment['_id']
    reviewerF = assessment.get('reviewerF', None)
    reviews = self.REVIEWS.get(aId, [])
    aStatus = None
    for review in reviews:
      reviewer = review['creator']
      if reviewer == reviewerF:
        decision = review.get('decision', None)
        if self.DECISION.get(decision, None) == self.DECISION_REJECT:
          aStatus = 4
        elif self.DECISION.get(decision, None) == self.DECISION_ACCEPT:
          aStatus = 5
        else:
          aStatus = 3
      else:
        if aStatus is None:
          aStatus = 3
    if aStatus is None:
      aStatus = 2 if assessment.get('submitted', False) else 1
    return aStatus

  def computeSelected(self, assessment):
    cSelected = assessment.get('contribDetail', [{}])[0].get('selected', None)
    return cSelected


class User(object):
  def __init__(self, db, userInfo):
    self.uid = userInfo.get('_id', '')
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


class Wrap(object):
  def __init__(self, db, U):
    self.db = db
    self.U = U

  def getAssessments(self):
    U = self.U
    db = self.db

    coordCrit = {
        'contribDetail.country': U.countryId,
    }
    authCrit = {
        '$or': [
            {'creator': U.uid},
            {'editors': U.uid},
            {'reviewerE': U.uid},
            {'reviewerF': U.uid},
        ],
    }
    select = (
        {}
        if U.group in db.POWER else
        {
            '$or': [
                coordCrit,
                authCrit,
            ],
        }
        if U.group == db.COORD else
        authCrit
        if U.group == db.AUTH else
        None
    )

    if select is None:
      return ('You are not allowed to see assessments and reviews')

    assessmentList = db.MONGO.assessment.aggregate([
        {
            '$lookup': {
                'from': 'contrib',
                'localField': 'contrib',
                'foreignField': '_id',
                'as': 'contribDetail',
            },
        },
        {
            '$match': select,
        },
        {
            '$lookup': {
                'from': 'review',
                'localField': '_id',
                'foreignField': 'assessment',
                'as': 'reviews',
            },
        },
    ])
    assessments = {a['_id']: a for a in assessmentList}
    setattr(db, 'ASSESSMENTS', assessments)
    self.getCriteriaEntries()
    self.getReviews()
    self.getReviewEntries()
    return None

  def getCriteriaEntries(self):
    db = self.db
    setattr(db, 'CRITERIA_ENTRIES', {})

    for rec in db.MONGO.criteriaEntry.find({
        'assessment': {'$in': list(db.ASSESSMENTS.keys())}
    }):
      aId = rec.get('assessment', None)
      db.CRITERIA_ENTRIES.setdefault(aId, []).append(rec)

  def getReviews(self):
    db = self.db
    setattr(db, 'REVIEWS', {})

    reviewIds = set()

    for rec in db.MONGO.review.find({
        'assessment': {'$in': list(db.ASSESSMENTS.keys())}
    }):
      rId = rec.get('_id', None)
      aId = rec.get('assessment', None)
      reviewIds.add(rId)
      db.REVIEWS.setdefault(aId, []).append(rec)
    setattr(db, 'REVIEW_IDS', list(reviewIds))

  def getReviewEntries(self):
    db = self.db
    setattr(db, 'REVIEW_ENTRIES', {})

    reviewEntryList = db.MONGO.reviewEntry.find(
        {
            'review': {
                '$in': db.REVIEW_IDS,
            },
        }
    )

    for rec in reviewEntryList:
      rId = rec.get('review', None)
      cId = rec.get('criteria', None)
      if rId is not None and cId is not None:
        db.REVIEW_ENTRIES.setdefault(rId, {}).setdefault(cId, []).append(rec)

  def categorizeAssessments(self):
    db = self.db
    U = self.U

    asWriter = []
    asReviewerE = []
    asReviewerF = []
    asCoord = []
    asOffice = []
    errorCat = []

    for assessment in db.ASSESSMENTS.values():
      countryId = assessment.get('contribDetail', [{}])[0].get('country', None)
      dest = (
          asWriter
          if U.uid == assessment.get('creator', None) or U.uid in assessment.get('editors', []) else
          asReviewerE
          if U.uid == assessment.get('reviewerE', None) else
          asReviewerF
          if U.uid == assessment.get('reviewerF', None) else
          asCoord
          if U.group == db.COORD and U.countryId == countryId else
          asOffice
          if U.group in db.POWER else
          errorCat
      )
      dest.append(assessment)
    if errorCat:
      print(f'FAULTY LOGIC: {len(errorCat)} spurious assessments')
      for (i, assessment) in enumerate(errorCat):
        print(f'-----{i + 1}-----')
        print(assessment)
    return {
        'as writer/editor': asWriter,
        'as expert reviewer': asReviewerE,
        'as final reviewer': asReviewerF,
        'as national coordinator': asCoord,
        'for management': asOffice,
    }

  def wrapAssessment(self, record):
    db = self.db
    head = self.wrapAssessmentHead(record)
    aId = record['_id']
    criteriaEntries = self.wrapCriteriaEntries(db.CRITERIA_ENTRIES.get(aId, []))
    reviews = self.wrapReviews(record.get('reviews', None))
    return f'''
  <details>
  <summary>{head}</summary>
  {criteriaEntries}
  {reviews}
  </details>
    '''

  def wrapAssessmentHead(self, record):
    db = self.db
    cRecord = record.get('contribDetail', [{}])[0]
    aScore = db.computeScore(record)
    aStatus = db.computeStatus(record)
    cSelected = db.computeSelected(record)
    cLabel = (
        'no decision'
        if cSelected is None else
        'selected'
        if cSelected else
        'not selected'
    )
    cClass = (
        'c-undecided'
        if cSelected is None else
        'c-selected'
        if cSelected else
        'c-rejected'
    )
    aCode = db.ASSESSED_STATUS[aStatus][0]
    (aLabel, aClass) = self.wrapStatus(aCode, aScore, compact=False)
    title = cRecord.get('title', record.get('title', '??'))
    cId = cRecord.get('_id', None)
    linkedTitle = (
        f'<a href="/data/contrib/list/{cId}">{title}</a>'
        if cId else
        title
    )
    countryId = record.get('contribDetail', [{}])[0].get('country', None)
    iso = db.COUNTRY.get(countryId, {}).get('iso', 'unknown country')
    return f'''
  <span class="assessment-head">
  <span class="{cClass}">{cLabel}</span>
  <span class="{aClass}">{aLabel}</span> {linkedTitle} ({iso})
  </span>
    '''

  def wrapCriteriaEntries(self, records):
    material = ['<div class="criteria">']
    for record in records:
      material.append(self.wrapCriteriaEntry(record))
    material.append('</div>')
    return '\n'.join(material)

  def wrapCriteriaEntry(self, record):
    db = self.db
    scoreId = record.get('score', None)
    score = db.SCORE_MAPPING.get(scoreId, '??')
    evidence = '<br/>\n'.join(record.get('evidence', []))
    return f'''
  <div class="criteriaEntry">
  {score}
  {evidence}
  </div>
    '''

  def wrapReviews(self, records):
    material = ['<div class="reviews">']
    for record in records:
      material.append(self.wrapReview(record))
    material.append('</div>')
    return '\n'.join(material)

  def wrapReview(self, record):
    head = self.wrapReviewHead(record)
    return f'''
  <div class="review">
  {head}
  </div>
    '''

  def wrapReviewHead(self, record):
    title = record.get('title', '')
    return f'''
  <div class="review-head">
  {title}
  </div>
    '''

  def wrapStatus(self, aCode, aScore, compact=True):
    db = self.db
    baseLabel = db.ASSESSED_LABELS.get(aCode, '??')
    aClass = db.ASSESSED_CLASS.get(aCode, db.ASSESSED_ACCEPTED_CLASS)
    if compact:
      aLabel = (
          baseLabel
          if aScore is None else
          f'score {aScore}%'
      )
    else:
      aLabel = f'{aScore}% - {baseLabel}'
    return (aLabel, aClass)
