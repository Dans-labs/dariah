from controllers.common import Database, User


def getReview(verb, userInfo):
  db = Database()
  U = User(db, userInfo)
  if verb == 'my':
    return getMy(db, U)
  return {}


def modReview(userInfo):
  db = Database()
  U = User(db, userInfo)
  if U.group not in db.ALLOWED:
    return {
        'good': False,
        'kind': 'error',
        'msg': 'You are not a national coordinator or a member of the back office',
    }
  return {
      'good': False,
      'kind': 'error',
      'msg': 'Nothing was done',
  }


def getMy(db, U):
  msg = getAssessments(db, U)
  material = []
  material.append('''
<h1>Assessments and reviews</h1>
''')
  if msg:
    material.append(f'''
<div class="error-boundary">
  <p>{msg}</p>
</div>
''')

  assessmentsByCat = categorizeAssessments(db, U)
  for (cat, assessments) in assessmentsByCat.items():
    material.append(f'''
<h2>{cat} ({len(assessments)})</h2>
''')
    for assessment in assessments:
      material.append(wrapAssessment(db, U, assessment))

  data = {
      'material': '\n'.join(material),
      'user': U.identityRep,
  }
  return data


def getCriteriaEntries(db):
  setattr(db, 'CRITERIA_ENTRIES', {})

  for rec in db.MONGO.criteriaEntry.find({
      'assessment': {'$in': list(db.ASSESSMENTS.keys())}
  }):
    aId = rec.get('assessment', None)
    db.CRITERIA_ENTRIES.setdefault(aId, []).append(rec)


def getReviews(db):
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


def getReviewEntries(db):
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


def getAssessments(db, U):
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
  getCriteriaEntries(db)
  getReviews(db)
  getReviewEntries(db)
  return None


def categorizeAssessments(db, U):
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


def wrapAssessment(db, U, record):
  head = wrapAssessmentHead(db, U, record)
  aId = record['_id']
  criteriaEntries = wrapCriteriaEntries(db, U, db.CRITERIA_ENTRIES.get(aId, []))
  reviews = wrapReviews(db, U, record.get('reviews', None))
  return f'''
<details>
<summary>{head}</summary>
{criteriaEntries}
{reviews}
</details>
  '''


def wrapAssessmentHead(db, U, record):
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
  (aLabel, aClass) = db.wrapStatus(aCode, aScore, compact=False)
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


def wrapCriteriaEntries(db, U, records):
  material = ['<div class="criteria">']
  for record in records:
    material.append(wrapCriteriaEntry(db, U, record))
  material.append('</div>')
  return '\n'.join(material)


def wrapCriteriaEntry(db, U, record):
  scoreId = record.get('score', None)
  score = db.SCORE_MAPPING.get(scoreId, '??')
  evidence = '<br/>\n'.join(record.get('evidence', []))
  return f'''
<div class="criteriaEntry">
{score}
{evidence}
</div>
  '''


def wrapReviews(db, U, records):
  material = ['<div class="reviews">']
  for record in records:
    material.append(wrapReview(db, U, record))
  material.append('</div>')
  return '\n'.join(material)


def wrapReview(db, U, record):
  head = wrapReviewHead(db, U, record)
  return f'''
<div class="review">
{head}
</div>
  '''


def wrapReviewHead(db, U, record):
  title = record.get('title', '')
  return f'''
<div class="review-head">
{title}
</div>
  '''
