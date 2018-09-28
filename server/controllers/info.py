import json
from bottle import request, install, JSONPlugin
from pymongo import MongoClient
from controllers.utils import (
    oid,
    json_string,
)

MONGO = None
COUNTRIES = None
SCORE_MAPPING = None
MAX_SCORE_BY_CRIT = None
CRITERIA_ENTRIES = {}

COUNTRY = {None: '??'}
COUNTRI = {None: '??'}
YEAR = {None: '??'}
VCC = {None: '??'}
TYPE = {None: '??'}
DECISION = {None: '??'}

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

CONTRIB_COLSPECS = (
    ('vcc', str, 'VCC'),
    ('year', int),
    ('type', str),
    ('cost', int,),
    ('assessed', int,),
    ('selected', bool),
    ('title', str),
)
CONTRIB_COLS = [c[0] for c in CONTRIB_COLSPECS]
CONTRIB_COLSET = {c[0] for c in CONTRIB_COLSPECS}
CONTRIB_TYPES = dict((c[0], c[1]) for c in CONTRIB_COLSPECS)
CONTRIB_LABELS = dict((c[0], c[2] if len(c) > 2 else c[0]) for c in CONTRIB_COLSPECS)
CONTRIB_SORT_DEFAULT = CONTRIB_COLS[-1]


def dbAccess():
  install(
      JSONPlugin(
          json_dumps=lambda body: json.dumps(body, default=json_string)
      )
  )
  clientm = MongoClient()
  global MONGO
  global COUNTRIES
  global SCORE_MAPPING
  global MAX_SCORE_BY_CRIT
  global CRITERIA_ENTRIES

  MONGO = clientm.dariah

  countries = []
  for doc in MONGO.country.find():
    COUNTRY[doc['_id']] = {
        'iso': doc['iso'],
        'name': doc['name'],
        'isMember': doc['isMember'],
    }
    COUNTRI[doc['iso']] = doc['_id']
    if doc['isMember']:
      countries.append((f'{doc["name"]} ({doc["iso"]})', doc['iso'], doc['_id']))
    COUNTRIES = sorted(countries)
  for doc in MONGO.year.find():
    YEAR[doc['_id']] = doc['rep']
  for doc in MONGO.vcc.find():
    VCC[doc['_id']] = doc['rep']
  for doc in MONGO.typeContribution.find():
    mainType = doc.get('mainType', '')
    subType = doc.get('subType', '')
    sep = ' / ' if mainType and subType else ''
    TYPE[doc['_id']] = f'{doc["mainType"]}{sep}{doc["subType"]}'
  for doc in MONGO.decision.find():
    DECISION[doc['_id']] = doc['rep']

  scoreData = list(MONGO.score.find())

  for doc in MONGO.criteriaEntry.find():
    aId = doc.get('assessment', None)
    if aId is not None:
      CRITERIA_ENTRIES.setdefault(aId, []).append(doc)

  SCORE_MAPPING = {s['_id']: s['score'] for s in scoreData if 'score' in s}
  MAX_SCORE_BY_CRIT = {}

  for s in scoreData:
      crit = s['criteria']
      score = s.get('score', 0)
      prevMax = MAX_SCORE_BY_CRIT.setdefault(crit, None)
      if prevMax is None or score > prevMax:
          MAX_SCORE_BY_CRIT[crit] = score


def computeScore(aDoc):
  aId = aDoc['_id']
  myCriteriaData = CRITERIA_ENTRIES.get(aId, [])
  myCriteriaEntries = [(
      cd['criteria'], SCORE_MAPPING.get(cd.get('score', None), 0),
      MAX_SCORE_BY_CRIT[cd['criteria']]
  ) for cd in myCriteriaData]

  relevantCriteriaEntries = [x for x in myCriteriaEntries if x[1] >= 0]
  relevantMax = sum(x[2] for x in relevantCriteriaEntries)
  relevantScore = sum(x[1] for x in relevantCriteriaEntries)
  overall = 0 if relevantMax == 0 else (
      round(relevantScore * 100 / relevantMax)
  )
  return overall


def selectContrib(userInfo):
  group = userInfo.get('groupRep', 'public')
  myCountryId = userInfo.get('country', None)
  if group not in ALLOWED:
    return {
        'good': False,
        'kind': 'error',
        'msg': 'You are not a national coordinator or a member of the backoffice',
    }
  contribId = request.json.get('contrib', None)
  if contribId is None:
    return {
        'good': False,
        'kind': 'error',
        'msg': 'No contribution specified',
    }
  contribId = oid(contribId)
  contribs = list(MONGO.contrib.find({'_id': contribId}))
  if len(contribs) == 0:
    return {
        'good': False,
        'kind': 'error',
        'msg': 'No such contribution',
    }
  contrib = contribs[0]
  countryId = contrib.get('country', None)
  if countryId is None:
    return {
        'good': False,
        'kind': 'error',
        'msg': 'Contribution is not asscoiated with a country',
    }
  if countryId != myCountryId and group == COORD:
    return {
        'good': False,
        'kind': 'error',
        'msg': (
            'You try to select a contribution of another country'
            ' than for which you are national coordinator'
        ),
    }

  value = request.json.get('select', None)
  MONGO.contrib.update_one(
      {'_id': contribId},
      {'$set': {'selected': value}},
  )
  return {
      'good': True,
  }


def getInfo(verb, userInfo):
  dbAccess()
  if verb == 'ourcountry':
    sortCol = request.query.sortcol
    reverse = request.query.reverse
    country = request.query.country
    return getOurcountry(userInfo, country, sortCol, reverse)
  return {}


def ourCountryHeaders(sortCol, reverse):
  headers = '<tr>'
  dirClass = 'desc' if reverse else 'asc'
  dirIcon = 'angle-down' if reverse else 'angle-up'
  for col in CONTRIB_COLS:
    isSorted = col == sortCol
    if isSorted:
      thisClass = dirClass
      nextReverse = not reverse
      icon = f'&nbsp;<span class="fa fa-{dirIcon}"/>'
    else:
      thisClass = ''
      nextReverse = False
      icon = ''
    reverseRep = -1 if nextReverse else 1
    label = CONTRIB_LABELS[col]
    colControl = f'<a href="/info/ourcountry?sortcol={col}&reverse={reverseRep}">{label}{icon}</a>'
    headers += f'''
    <th class="och {thisClass}">{colControl}</th>
  '''
  headers += '</tr>'
  return headers


def contribKey(col):
  colType = CONTRIB_TYPES[col]

  def makeKey(contrib):
    value = contrib.get(col, 0)
    if value is None:
      return '' if colType is str else 0
    if colType is str:
      return value.lower()
    if colType is bool:
      return 1 if value else -1
    return value
  return makeKey


def getOurcountry(userInfo, country, rawSortCol, rawReverse):
  sortCol = CONTRIB_SORT_DEFAULT if rawSortCol not in CONTRIB_COLSET else rawSortCol
  reverse = False if rawReverse not in {'-1', '1'} else rawReverse == '-1'
  group = userInfo.get('groupRep', 'public')
  myCountryId = userInfo.get('country', None)
  if country:
    countryId = COUNTRI.get(country, None)
  else:
    countryId = myCountryId

  material = ''
  for (name, iso, cid) in COUNTRIES:
    material += (
        f'''
            <span class="c-focus">{name}</span>
        '''
        if cid == countryId else
        f'''
            <a
              class="c-control"
              href="/info/ourcountry?country={iso}&sortcol={rawSortCol}&reverse={rawReverse}"
            >{name}</a>
        '''
    )
  if countryId is None:
    msg = (
        'I do not know which country you are from '
        if country is None else
        f'Unknown country selected: "{country}"'
    )
    material += f'''
<div class="error-boundary">
  <p>{msg}</p>
</div>'''
  else:
    countryInfo = COUNTRY.get(countryId, None)
    if countryInfo is None:
      material += f'''
<div class="error-boundary">
  <p>I do not know which country this is: {countryId}</p>
</div>'''
    else:
      name = countryInfo['name']
      iso = countryInfo['iso']
      full = f'{name} ({iso})'
      isMember = countryInfo['isMember']
      if not isMember:
        material += f'''
<div class="error-boundary">
  <p>{full} is not member of DARIAH</p>
</div>'''
      else:
        material += f'''
<h1>Contributions from {full}</h1>
<table class="cc">
<tbody>
  {ourCountryHeaders(sortCol, reverse)}
'''

        editable = (
            group in POWER
            or
            (
                group == COORD
                and
                myCountryId is not None
                and
                countryId == myCountryId
            )
        )
        contribs = {}
        contribSelection = {}
        for doc in MONGO.contrib.find({'country': countryId}):
          contribId = doc.get('_id', None)
          contribSelected = doc.get('selected', None)
          contribs[contribId] = {
              '_id': contribId,
              'year': YEAR.get(doc.get('year', None), '??'),
              'vcc': ' + '.join(VCC.get(d, '??') for d in doc.get('vcc', [])),
              'type': TYPE.get(doc.get('typeContribution', None), '??'),
              'title': doc.get('title', '??'),
              'cost': doc.get('costTotal', None),
              'assessed': ASSESSED_DEFAULT,
              'selected': contribSelected,
          }
          contribSelection[str(contribId)] = contribSelected
        assessmentScore = {}
        assessmentStatus = {}
        assessments = {}
        finalReviewers = {}
        for doc in MONGO.assessment.find({'contrib': {'$in': list(contribs.keys())}}):
          aId = doc['_id']
          assessments[aId] = doc
          reviewerF = doc.get('reviewerF', None)
          if reviewerF is not None:
            finalReviewers[aId] = reviewerF
        reviews = {}
        for doc in MONGO.review.find({'assessment': {'$in': list(assessments.keys())}}):
          reviews[doc['_id']] = doc
        for rDoc in reviews.values():
          aId = rDoc['assessment']
          reviewer = rDoc['creator']
          thisStatus = None
          if reviewer == finalReviewers.get(aId, None):
            decision = rDoc.get('decision', None)
            if DECISION.get(decision, None) == DECISION_REJECT:
              thisStatus = 4
            elif DECISION.get(decision, None) == DECISION_ACCEPT:
              thisStatus = 5
              assessmentScore[aId] = computeScore(assessments[aId])
          assessmentStatus[aId] = 3 if thisStatus is None else thisStatus
        for (aId, aDoc) in assessments.items():
          if aId in assessmentStatus:
            aIndex = assessmentStatus[aId]
          else:
            aIndex = 2 if aDoc.get('submitted', False) else 1
          contribId = aDoc['contrib']
          contribs[contribId]['assessed'] = ASSESSED_STATUS[aIndex][0]
          if aId in assessmentScore:
            contribs[contribId]['score'] = assessmentScore[aId]
        sortedContribs = sorted(contribs.values(), key=contribKey(sortCol), reverse=reverse)
        material += '\n'.join(formatContrib(contrib, editable) for contrib in sortedContribs)
        material += '''
</tbody>
</table>
'''
        if editable:
          material += f'''
<script>
var contribSelection = {json.dumps(contribSelection)}
</script>
'''

  data = {
      'material': material,
  }
  return data


def euro(amount):
  if amount is None:
    return '??'
  return f'€ {int(round(amount))}'


def editTri(contribId):
  return f'<span class="selectctl" contrib="{contribId}"></span>'


def roTri(tri):
  if tri is None:
    return ''
  icon = 'check' if tri else 'times'
  return f'<span class="fa fa-{icon}"/>'


def formatContrib(contrib, editable):
  selected = contrib.get('selected', None)
  contribId = contrib.get('_id', None)
  assessedCode = contrib.get('assessed', ASSESSED_DEFAULT)
  assessedScore = contrib.get('score', None)
  assessedLabel = (
      ASSESSED_LABELS.get(assessedCode, '??')
      if assessedScore is None else
      f'score {assessedScore}%'
  )

  assessedClass = ASSESSED_CLASS.get(assessedCode, ASSESSED_ACCEPTED_CLASS)
  return f'''
<tr>
  <td class="c-vcc">{contrib['vcc']}</td>
  <td>{contrib['year']}</td>
  <td class="c-type">{contrib['type']}</td>
  <td class="c-cost">{euro(contrib['cost'])}</td>
  <td class="c-ass {assessedClass}">{assessedLabel}</td>
  <td>{editTri(contribId) if editable else roTri(selected)}</td>
  <td><a href="/data/contrib/list/{contribId}">{contrib['title']}</a></td>
</tr>
  '''
