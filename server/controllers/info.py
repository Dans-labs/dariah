import json
from bottle import request, install, JSONPlugin
from pymongo import MongoClient
from controllers.utils import (
    oid,
    json_string,
)

PAGE = '/info/ourcountry'
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


def genConstants(contribId):
  global CONTRIB_COLSPECS
  global CONTRIB_COLS
  global CONTRIB_COLSET
  global CONTRIB_TYPES
  global CONTRIB_LABELS
  global CONTRIB_SORT_DEFAULT
  global GROUP_COLS
  global ALL_GROUPS
  global ALL_GROUPSET

  CONTRIB_COLSPECS = (
      ('country', str),
      ('vcc', str, 'VCC'),
      ('year', int),
      ('type', str),
      ('cost', int, 'cost (€)'),
      ('assessed', tuple),
      ('selected', bool),
      ('title', str),
  )
  if contribId != ALL:
    CONTRIB_COLSPECS = CONTRIB_COLSPECS[1:]

  CONTRIB_COLS = [c[0] for c in CONTRIB_COLSPECS]
  CONTRIB_COLSET = {c[0] for c in CONTRIB_COLSPECS}
  CONTRIB_TYPES = dict((c[0], c[1]) for c in CONTRIB_COLSPECS)
  CONTRIB_LABELS = dict((c[0], c[2] if len(c) > 2 else c[0]) for c in CONTRIB_COLSPECS)
  CONTRIB_SORT_DEFAULT = CONTRIB_COLS[-1]

  GROUP_COLS = '''
    country
    vcc
    year
    type
    assessed
    selected
  '''.strip().split()

  if contribId != ALL:
    GROUP_COLS = GROUP_COLS[1:]

  ALL_GROUPS = [dict(col=c, label=CONTRIB_LABELS[c]) for c in GROUP_COLS]
  ALL_GROUPSET = set(GROUP_COLS)


COL_PLURAL = dict(country='countries', )

SUBHEAD_X_COLS = set('''
  cost
  title
'''.strip().split())


def colRep(col, n):
  itemRep = (col if n == 1 else COL_PLURAL.get(col, f'{col}s'))
  return f'{n} {itemRep}'


def dbAccess():
  install(JSONPlugin(json_dumps=lambda body: json.dumps(body, default=json_string)))
  clientm = MongoClient()
  global MONGO
  global COUNTRIES
  global SCORE_MAPPING
  global MAX_SCORE_BY_CRIT
  global CRITERIA_ENTRIES

  MONGO = clientm.dariah

  countries = []
  for doc in MONGO.country.find():
    if doc['isMember']:
      COUNTRY[doc['_id']] = {
          'iso': doc['iso'],
          'name': doc['name'],
          'isMember': doc['isMember'],
      }
      COUNTRI[doc['iso']] = doc['_id']
  for (docId, doc) in COUNTRY.items():
    if docId is not None:
      countries.append((f'{doc["name"]} ({doc["iso"]})', doc['iso'], docId, doc['iso'] == ALL))
  COUNTRIES = sorted(countries, key=lambda c: '' if c[1] == ALL else c[0])
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
      cd['criteria'], SCORE_MAPPING.get(cd.get('score', None), 0), MAX_SCORE_BY_CRIT[cd['criteria']]
  ) for cd in myCriteriaData]

  relevantCriteriaEntries = [x for x in myCriteriaEntries if x[1] >= 0]
  relevantMax = sum(x[2] for x in relevantCriteriaEntries)
  relevantScore = sum(x[1] for x in relevantCriteriaEntries)
  overall = 0 if relevantMax == 0 else (round(relevantScore * 100 / relevantMax))
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
        'good':
            False,
        'kind':
            'error',
        'msg': (
            'You try to select a contribution of another country'
            ' than for which you are national coordinator'
        ),
    }

  value = request.json.get('select', None)
  MONGO.contrib.update_one(
      {
          '_id': contribId
      },
      {'$set': {
          'selected': value
      }},
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
    groups = request.query.groups
    return getOurcountry(userInfo, country, groups, sortCol, reverse)
  return {}


def ourCountryHeaders(country, groups, sortCol, reverse, editable, groupOrder=None):
  if groupOrder is None:
    groupOrder = CONTRIB_COLS
  headers = '<tr>'
  dirClass = 'desc' if reverse else 'asc'
  dirIcon = 'angle-down' if reverse else 'angle-up'
  for col in groupOrder:
    isSorted = col == sortCol
    thisClass = f'c-{col}'
    if editable and col == 'selected':
      thisClass += ' editable'
    if isSorted:
      thisClass += f' {dirClass}'
      nextReverse = not reverse
      icon = f'&nbsp;<span class="fa fa-{dirIcon}"/>'
    else:
      nextReverse = False
      icon = ''
    reverseRep = -1 if nextReverse else 1
    label = CONTRIB_LABELS[col]
    colControl = (
        f'<a href="{PAGE}?country={country}&sortcol={col}&reverse={reverseRep}'
        f'&groups={groups}">'
        f'{label}{icon}</a>'
    )
    headers += f'''
    <th class="och {thisClass}">{colControl}</th>
  '''
  headers += '</tr>'
  return headers


def addGroup(groups, g):
  return ','.join(groups + [g])


def rmGroup(groups, g):
  return ','.join(h for h in groups if h != g)


def contribKey(col, individual=False):
  colType = CONTRIB_TYPES[col]

  def makeKey(contrib):
    if col == 'assessed':
      return contrib.get(col, (ASSESSED_DEFAULT, None))
    value = contrib.get(col, None)
    if value is None:
      return '' if colType is str else 0
    if colType is str:
      return value.lower()
    if colType is bool:
      return 1 if value else -1
    return value

  def makeKeyInd(value):
    if col == 'assessed':
      return value
    if value is None:
      return '' if colType is str else 0
    if colType is str:
      return value.lower()
    if colType is bool:
      return 1 if value else -1
    return value

  return makeKeyInd if individual else makeKey


def getOurcountry(userInfo, country, groups, rawSortCol, rawReverse):
  group = userInfo.get('groupRep', 'public')
  myCountryId = userInfo.get('country', None)
  if country:
    countryId = COUNTRI.get(country, None)
  else:
    countryId = myCountryId

  genConstants(countryId)
  if countryId is not None and countryId != ALL:
    groups = rmGroup(groups.split(','), 'country')

  sortCol = CONTRIB_SORT_DEFAULT if rawSortCol not in CONTRIB_COLSET else rawSortCol
  reverse = False if rawReverse not in {'-1', '1'} else rawReverse == '-1'

  material = '<h3>Country selection</h3><p class="countries">'
  for (name, iso, cid, isFake) in COUNTRIES:
    extraClass = ' fake' if isFake else ''
    material += (
        f'''
<span class="c-focus{extraClass}">{name}</span>
        ''' if cid == countryId else f'''
<a
  class="c-control{extraClass}"
  href="{PAGE}?country={iso}&sortcol={rawSortCol}&reverse={rawReverse}&groups={groups}"
>{name}</a>
        '''
    )
  material += '</p>'
  if countryId is None:
    if country:
      msg = (f'Unknown country selected: "{country}"')
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
        groupsChosen = [] if not groups else groups.split(',')
        groupsAvailable = sorted(ALL_GROUPSET - set(groupsChosen))
        groupSet = set(groupsChosen)
        groupOrder = groupsChosen + [g for g in CONTRIB_COLS if g not in groupSet]
        availableReps = ' '.join((
            f'<a class="g-add" href="'
            f'{PAGE}'
            f'?country={iso}&sortcol={rawSortCol}&reverse={rawReverse}'
            f'&groups={addGroup(groupsChosen, g)}'
            f'">+{g}</a>'
        ) for g in groupsAvailable)
        chosenReps = ' '.join((
            f'<a class="g-rm" href="'
            f'{PAGE}'
            f'?country={iso}&sortcol={rawSortCol}&reverse={rawReverse}'
            f'&groups={rmGroup(groupsChosen, g)}'
            f'">-{g}</a>'
        ) for g in groupsChosen)
        clearGroups = (
            '' if len(chosenReps) == 0 else (
                f'<a '
                f'class="g-x fa fa-times" '
                f'title="clear all groups" '
                f'href="'
                f'{PAGE}'
                f'?country={iso}&sortcol={rawSortCol}&reverse={rawReverse}'
                f'"></a>'
            )
        )
        editable = (
            group in POWER
            or (group == COORD and myCountryId is not None and countryId == myCountryId)
        )
        material += f'''
<h3>Grouping</h3>
<table class="mt">
<tr>
  <td class="mtl">available groups</td>
  <td class="mtd">{availableReps}</td>
  <td>&nbsp;</td>
</tr>
<tr>
  <td class="mtl">chosen groups</td>
  <td class="mtd">{chosenReps}</td>
  <td>{clearGroups}</td>
</tr>
</table>
<h3>Contributions from {full}</h3>
<table class="cc">
<tbody>
  {ourCountryHeaders(country, groups, sortCol, reverse, editable, groupOrder=groupOrder)}
'''

        contribs = {}
        contribSelection = {}
        countrySelector = ({} if countryId == ALL else {'country': countryId})
        for doc in MONGO.contrib.find(countrySelector):
          contribId = doc.get('_id', None)
          countryId = doc.get('country', None)
          if countryId not in COUNTRY:
            countryRep = None
          else:
            countryInfo = COUNTRY[countryId]
            countryRep = f'{countryInfo["name"]} ({countryInfo["iso"]})'
          vccs = doc.get('vcc', [])
          vccRep = ' + '.join(VCC[v] for v in vccs)
          year = doc.get('year', None)
          yearRep = None if year is None else YEAR.get(year, None)
          typ = doc.get('typeContribution', None)
          typeRep = None if typ is None else TYPE.get(typ, None)
          contribSelected = doc.get('selected', None)

          contribs[contribId] = {
              '_id': contribId,
              'country': countryRep,
              'vcc': vccRep,
              'year': yearRep,
              'type': typeRep,
              'title': doc.get('title', None),
              'cost': doc.get('costTotal', None),
              'assessed': (ASSESSED_DEFAULT, None),
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
          assessed = ASSESSED_STATUS[aIndex][0]
          score = assessmentScore[aId] if aId in assessmentScore else None
          contribs[contribId]['assessed'] = (assessed, score)
        (thisMaterial, groupRel) = groupList(
            contribs.values(),
            groupsChosen,
            sortCol,
            reverse,
            editable,
            full,
        )
        material += f'''
{thisMaterial}
</tbody>
</table>
{groupRel}
'''
        if editable:
          material += f'''
<script>
var contribSelection = {json.dumps(contribSelection)}
var allGroups = {json.dumps(ALL_GROUPS)}
</script>
'''

  data = {
      'material': material,
  }
  return data


def groupList(contribs, groups, sortCol, reverse, editable, selectedCountry):
  if len(groups) == 0:
    groupedList = sorted(contribs, key=contribKey(sortCol), reverse=reverse)
    return ('\n'.join(formatContrib(contrib, editable, None) for contrib in groupedList), '')

  preGroups = groups[0:-1]
  lastGroup = groups[-1]

  groupLen = len(groups)
  groupSet = set(groups)
  groupOrder = groups + [g for g in CONTRIB_COLS if g not in groupSet]

  groupedList = {}

  for c in contribs:
    dest = groupedList
    for g in preGroups:
      dest = dest.setdefault(c.get(g, None), {})
    dest = dest.setdefault(c.get(lastGroup, None), [])
    dest.append(c)

  material = []
  maxGroupId = 1
  groupRel = {}

  def groupMaterial(gList, depth, groupValues, parentGroupId):
    groupSet = set(groupValues.keys())

    nonlocal maxGroupId
    maxGroupId += 1
    thisGroupId = maxGroupId
    groupRel.setdefault(str(parentGroupId), []).append(str(thisGroupId))

    headIndex = len(material)
    material.append('-')
    nDocs = 0
    nGroups = 0
    cost = 0
    if type(gList) is list:
      for doc in sorted(
          ({k: v for (k, v) in doc.items() if k not in groupValues} for doc in gList),
          key=contribKey(sortCol),
          reverse=reverse,
      ):
        nDocs += 1
        nGroups += 1
        cost += doc.get('cost', 0) or 0
        material.append(formatContrib(doc, editable, thisGroupId, groupOrder=groupOrder, hide=True))
    else:
      newGroup = groups[depth]
      for groupValue in sorted(
          gList.keys(),
          key=contribKey(newGroup, individual=True),
          reverse=reverse,
      ):
        nGroups += 1
        newGroupValues = {}
        newGroupValues.update(groupValues)
        newGroupValues[newGroup] = groupValue
        (nDocsG, costG) = groupMaterial(
            gList[groupValue],
            depth + 1,
            newGroupValues,
            thisGroupId,
        )
        nDocs += nDocsG
        cost += costG
    groupValuesT = {}
    if depth > 0:
      thisGroup = groups[depth - 1]
      groupValuesT[thisGroup] = groupValues[thisGroup]
    # groupValuesT.update(groupValues)
    groupValuesT['cost'] = cost
    groupValuesT['title'] = colRep('contribution', nDocs)
    if depth == 0:
      for g in GROUP_COLS + ['title']:
        label = selectedCountry if g == 'country' else 'all'
        controls = expandAcontrols(g) if g in groups or g == 'title' else ''
        groupValuesT[g] = f'{label} {controls}'
    material[headIndex] = formatContrib(
        groupValuesT,
        False,
        parentGroupId,
        groupOrder=groupOrder,
        groupSet=groupSet,
        subHead=True,
        allHead=depth == 0,
        groupLen=groupLen,
        depth=depth,
        thisGroupId=thisGroupId,
        nGroups=nGroups,
    )
    return (nDocs, cost)

  groupMaterial(groupedList, 0, {}, 1)
  return (
      '\n'.join(material), f'''
<script>
var groupRel = {json.dumps(groupRel)}
</script>
      '''
  )


def expandControls(gid, hide=False):
  hideRep = ' hide' if hide else ''
  showRep = '' if hide else ' hide'
  return (
      f'<a href="#" class="fa fa-chevron-circle-down dc{showRep}" gid="{gid}"></a>'
      f'<a href="#" class="fa fa-chevron-circle-up dc{hideRep}" gid="{gid}"></a>'
  )


def expandAcontrols(group):
  return (
      f'<a href="#" class="fa fa-angle-double-down dca" gn="{group}"></a>'
      f'<a href="#" class="fa fa-angle-double-up dca" gn="{group}"></a>'
  )


def euro(amount, subHead):
  return '??' if amount is None else f'{int(round(amount)):,}'


def editTri(contribId):
  return f'<span class="selectctl" contrib="{contribId}"></span>'


def roTri(tri):
  icon = 'minus' if tri is None else 'check' if tri else 'times'
  return f'<span class="fa fa-{icon}"/>'


def subHeadClass(col, groupSet, subHead, allHead):
  theClass = (
      'allhead' if allHead and col == 'selected' else 'subhead' if allHead or
      (subHead and (col in groupSet or col in SUBHEAD_X_COLS)) else ''
  )
  return f' {theClass}' if theClass else ''


def formatContrib(
    contrib,
    editable,
    groupId,
    groupOrder=None,
    groupSet=set(),
    subHead=False,
    allHead=False,
    groupLen=None,
    depth=None,
    thisGroupId=None,
    nGroups=None,
    hide=False,
):
  if groupOrder is None:
    groupOrder = CONTRIB_COLS
  contribId = contrib.get('_id', None)
  if allHead:
    selected = contrib.get('selected', '')
    assessedLabel = contrib.get('assessed', '')
    assessedClass = ''
  else:
    selected = contrib.get('selected', None)
    selected = (editTri(contribId)
                if editable else roTri(selected)) if 'selected' in contrib else ''

    (assessedCode, assessedScore) = contrib.get('assessed', (ASSESSED_DEFAULT, None))
    assessedLabel = ((
        ASSESSED_LABELS.get(assessedCode, '??')
        if assessedScore is None else f'score {assessedScore}%'
    ) if 'assessed' in contrib else '')
    assessedClass = (
        ASSESSED_CLASS.get(assessedCode, ASSESSED_ACCEPTED_CLASS) if 'assessed' in contrib else ''
    )
  title = (
      contrib.get('title', '') if subHead else (
          f'<a href="/data/contrib/list/{contribId}">'
          f'''{contrib['title'] or '? missing title ?'}'''
          f'</a>'
      ) if 'title' in contrib else ''
  )

  values = {
      'country': (contrib['country'] or '??') if 'country' in contrib else '',
      'vcc': (contrib['vcc'] or '??') if 'vcc' in contrib else '',
      'year': (contrib['year'] or '??') if 'year' in contrib else '',
      'type': (contrib['type'] or '??') if 'type' in contrib else '',
      'cost': euro(contrib.get('cost', None), subHead) if 'cost' in contrib else '',
      'assessed': assessedLabel,
      'selected': selected,
      'title': title,
  }
  if depth is not None:
    xGroup = groupOrder[depth] if depth == 0 or depth < groupLen else 'title'
    xName = 'contribution' if xGroup == 'title' else xGroup
    xRep = colRep(xName, nGroups)
    values[xGroup] = (
        f'{expandControls(thisGroupId, True)} {xRep}'
        if xGroup == 'title' else f'{values[xGroup]} ({xRep}) {expandControls(thisGroupId)}'
        if depth > 0 else f'{values[xGroup]} ({xRep}) {expandControls(thisGroupId)}'
    )
  classes = {col: f'c-{col}' for col in groupOrder}
  classes['assessed'] += f' {assessedClass}'
  if editable:
    classes['selected'] += ' editable'
  columns = '\n'.join((
      f'<td class="{classes[col]}'
      f'{subHeadClass(col, groupSet, subHead, allHead)}'
      f'">{values[col]}</td>'
  ) for col in groupOrder)
  hideRep = ' hide' if hide else ''
  displayAtts = '' if groupId is None else f''' class="dd{hideRep}" gid="{groupId}"'''
  return f'<tr{displayAtts}>{columns}</tr>'
