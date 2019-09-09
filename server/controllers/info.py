import json
from flask import request, make_response
from controllers.utils import oid
from controllers.common import Database, User, Contrib

PAGE = '/info/ourcountry'
PAGEX = '/info/ourcountry.tsv'

COL_PLURAL = dict(country='countries', )

SUBHEAD_X_COLS = set('''
  cost
  title
'''.strip().split())


def colRep(col, n):
  itemRep = (col if n == 1 else COL_PLURAL.get(col, f'{col}s'))
  return f'{n} {itemRep}'


def selectContrib(userInfo):
  db = Database()
  U = User(db, userInfo)
  if U.group not in db.ALLOWED:
    return {
        'good': False,
        'kind': 'error',
        'msg': 'You are not a national coordinator or a member of the back office',
    }
  contribId = request.get_json().get('contrib', None)
  if contribId is None:
    return {
        'good': False,
        'kind': 'error',
        'msg': 'No contribution specified',
    }
  contribId = oid(contribId)
  contribs = list(db.MONGO.contrib.find({'_id': contribId}))
  if len(contribs) == 0:
    return {
        'good': False,
        'kind': 'error',
        'msg': 'No such contribution',
    }
  contrib = contribs[0]
  countryId = contrib.get('country', None)
  if U.group == db.COORD:
    if countryId is None:
      return {
          'good': False,
          'kind': 'error',
          'msg': 'Contribution is not asscoiated with a country',
      }
    elif countryId != U.countryId:
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
    origSelected = contrib.get('selected', None)
    if origSelected is not None:
      return {
          'good':
              False,
          'kind':
              'error',
          'msg': (
              'You try to change a selection decision'
              ' If you really need this, ask the DARIAH office.'
          ),
      }

  value = request.get_json().get('select', None)
  db.MONGO.contrib.update_one(
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


def getCriteriaEntries(db):
  setattr(db, 'CRITERIA_ENTRIES', {})
  for rec in db.MONGO.criteriaEntry.find():
    aId = rec.get('assessment', None)
    if aId is not None:
      db.CRITERIA_ENTRIES.setdefault(aId, []).append(rec)


def getReviews(db):
  setattr(db, 'REVIEWS', {})

  for rec in db.MONGO.review.find({}):
    aId = rec.get('assessment', None)
    db.REVIEWS.setdefault(aId, []).append(rec)


def getInfo(verb, userInfo, asTsv):
  db = Database()
  U = User(db, userInfo)
  getCriteriaEntries(db)
  getReviews(db)
  if verb.startswith('ourcountry'):
    sortCol = request.args.get('sortcol', '')
    reverse = request.args.get('reverse', '')
    country = request.args.get('country', '')
    groups = request.args.get('groups', '')
    return getOurcountry(db, U, country, groups, sortCol, reverse, asTsv)
  return {}


def ourCountryHeaders(C, country, groups, sortCol, reverse, editable, asTsv, groupOrder=None):
  if groupOrder is None:
    groupOrder = C.CONTRIB_COLS
  headers = '' if asTsv else '<tr>'
  if not asTsv:
    dirClass = 'desc' if reverse else 'asc'
    dirIcon = 'angle-down' if reverse else 'angle-up'
  else:
    sep = ''
  for col in groupOrder:
    if not asTsv:
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
    label = C.CONTRIB_LABELS[col]
    colControl = (
        label
        if asTsv else
        (
            f'<a href="{PAGE}?country={country}&sortcol={col}&reverse={reverseRep}'
            f'&groups={groups}">'
            f'{label}{icon}</a>'
        )
    )
    headers += (
        f'{sep}{colControl}'
        if asTsv else
        f'<th class="och {thisClass}">{colControl}</th>\n'
    )
    if asTsv:
      sep = '\t'
  if not asTsv:
    headers += '</tr>'
  return headers


def addGroup(groups, g):
  return ','.join(groups + [g])


def rmGroup(groups, g):
  return ','.join(h for h in groups if h != g)


def contribKey(db, C, col, individual=False):
  colType = C.CONTRIB_TYPES[col]

  def makeKey(contrib):
    if col == 'assessed':
      return contrib.get(col, (db.ASSESSED_DEFAULT, None))
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


def getOurcountry(db, U, country, groups, rawSortCol, rawReverse, asTsv):
  if country:
    countryId = db.COUNTRI.get(country, None)
  else:
    countryId = U.countryId
  chosenCountry = None

  C = Contrib(db, countryId)
  if countryId is not None and countryId != db.ALL:
    groups = rmGroup(groups.split(','), 'country')
  groupsChosen = [] if not groups else groups.split(',')
  groupSet = set(groupsChosen)
  groupStr = ('-by-' if groupSet else '') + '-'.join(sorted(groupSet))

  sortCol = C.CONTRIB_SORT_DEFAULT if rawSortCol not in C.CONTRIB_COLSET else rawSortCol
  reverse = False if rawReverse not in {'-1', '1'} else rawReverse == '-1'

  material = ''
  if not asTsv:
    material = '<h3>Country selection</h3><p class="countries">'
    for (name, iso, cid, isFake) in db.COUNTRIES:
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
      msg = f'Unknown country selected: "{country}"'
      if not asTsv:
        material += f'''
<div class="error-boundary">
  <p>{msg}</p>
</div>'''
  else:
    countryInfo = db.COUNTRY.get(countryId, None)
    if countryInfo is None:
      msg = f'I do not know which country this is: {countryId}'
      if not asTsv:
        material += f'''
<div class="error-boundary">
  <p>{msg}</p>
</div>'''
    else:
      name = countryInfo['name']
      iso = countryInfo['iso']
      full = f'{name} ({iso})'
      isMember = countryInfo['isMember']
      if not isMember:
        msg = f'{full} is not member of DARIAH'
        if not asTsv:
          material += f'''
<div class="error-boundary">
  <p>{msg}</p>
</div>'''
      else:
        chosenCountry = f'{name} ({iso})'
        groupsAvailable = sorted(C.ALL_GROUPSET - set(groupsChosen))
        groupOrder = groupsChosen + [g for g in C.CONTRIB_COLS if g not in groupSet]
        if not asTsv:
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
              U.group in db.POWER
              or (U.group == db.COORD and U.countryId is not None and countryId == U.countryId)
          )
          rArgs = (
              f'?country={iso}&sortcol={rawSortCol}&reverse={rawReverse}&groups={groups}'
          )
        headerLine = ourCountryHeaders(
            C,
            country, groups, sortCol, reverse,
            not asTsv and editable, asTsv,
            groupOrder=groupOrder
        )
        if not asTsv:
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
<h3>Contributions from {full}
<a href="{PAGEX}{rArgs}" target="_blank" class="button large">Download as Excel</a>
</h3>
<table class="cc">
<tbody>
  {headerLine}
'''

        contribs = {}
        contribSelection = {}
        countrySelector = ({} if countryId == db.ALL else {'country': countryId})
        for rec in db.MONGO.contrib.find(countrySelector):
          contribId = rec.get('_id', None)
          countryId = rec.get('country', None)
          if countryId in db.COUNTRY:
            countryInfo = db.COUNTRY[countryId]
            countryRep = f'{countryInfo["name"]} ({countryInfo["iso"]})' if countryInfo else None
          else:
            countryRep = None
          vccs = rec.get('vcc', [])
          vccRep = ' + '.join(db.VCC[v] for v in vccs)
          year = rec.get('year', None)
          yearRep = None if year is None else db.YEAR.get(year, None)
          typ = rec.get('typeContribution', None)
          typeRep = None if typ is None else db.TYPE.get(typ, None)
          contribSelected = rec.get('selected', None)

          contribs[contribId] = {
              '_id': contribId,
              '_cn': countryRep,
              'country': countryRep,
              'vcc': vccRep,
              'year': yearRep,
              'type': typeRep,
              'title': rec.get('title', None),
              'cost': rec.get('costTotal', None),
              'assessed': (db.ASSESSED_DEFAULT, None),
              'selected': contribSelected,
          }
          contribSelection[str(contribId)] = contribSelected
        assessmentScore = {}
        assessmentStatus = {}
        assessments = {}
        for rec in db.MONGO.assessment.find({'contrib': {'$in': list(contribs.keys())}}):
          aId = rec['_id']
          assessments[aId] = rec
          status = db.computeStatus(rec)
          assessmentStatus[aId] = status
          if status == 5:
            assessmentScore[aId] = db.computeScore(rec)
          contribId = rec['contrib']
          assessed = db.ASSESSED_STATUS[status][0]
          score = assessmentScore[aId] if aId in assessmentScore else None
          contribs[contribId]['assessed'] = (assessed, score)
        (thisMaterial, groupRel) = groupList(
            db,
            C,
            contribs.values(),
            groupsChosen,
            sortCol,
            reverse,
            not asTsv and editable,
            full,
            U.group,
            U.countryLong,
            chosenCountry,
            asTsv
        )
        material += (
            thisMaterial
            if asTsv else
            f'''
{thisMaterial}
</tbody>
</table>
{groupRel}
'''
        )
        if not asTsv:
          if editable:
            material += f'''
<script>
var contribSelection = {json.dumps(contribSelection)}
var allGroups = {json.dumps(C.ALL_GROUPS)}
</script>
'''

  if asTsv:
    fileName = f'dariah-{country or "all-countries"}{groupStr}-for-{U.accessRep}'
    headers = {
        'Expires': '0',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Content-Type': 'text/csv',
        'Content-Disposition': f'attachment; filename="{fileName}"',
        'Content-Encoding': 'identity',
    }
    tsv = f'\ufeff{headerLine}\n{material}'.encode('utf_16_le')
    data = make_response(tsv, headers)
  else:
    data = {
        'material': material,
        'user': U.identityRep,
    }
  return data


def groupList(
    db,
    C,
    contribs,
    groups,
    sortCol,
    reverse,
    editable,
    selectedCountry,
    userGroup,
    myCountry,
    chosenCountry,
    asTsv,
):
  if len(groups) == 0:
    groupedList = sorted(contribs, key=contribKey(db, C, sortCol), reverse=reverse)
    return (
        '\n'.join(
            formatContrib(
                db,
                C,
                contrib,
                editable,
                None,
                userGroup,
                myCountry,
                chosenCountry,
                asTsv,
            )
            for contrib in groupedList
        ),
        '',
    )

  preGroups = groups[0:-1]
  lastGroup = groups[-1]

  groupLen = len(groups)
  groupSet = set(groups)
  groupOrder = groups + [g for g in C.CONTRIB_COLS if g not in groupSet]

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
    nRecords = 0
    nGroups = 0
    cost = 0
    if type(gList) is list:
      for rec in sorted(
          (
              {
                  k: v
                  for (k, v) in list(d.items())
                  if k not in groupValues
              }
              for d in gList
          ),
          key=contribKey(db, C, sortCol),
          reverse=reverse,
      ):
        nRecords += 1
        nGroups += 1
        cost += rec.get('cost', 0) or 0
        material.append(
            formatContrib(
                db,
                C,
                rec,
                editable,
                thisGroupId,
                userGroup,
                myCountry,
                chosenCountry,
                asTsv,
                groupOrder=groupOrder,
                hide=True,
            )
        )
    else:
      newGroup = groups[depth]
      for groupValue in sorted(
          gList.keys(),
          key=contribKey(db, C, newGroup, individual=True),
          reverse=reverse,
      ):
        nGroups += 1
        newGroupValues = {}
        newGroupValues.update(groupValues)
        newGroupValues[newGroup] = groupValue
        (nRecordsG, costG) = groupMaterial(
            gList[groupValue],
            depth + 1,
            newGroupValues,
            thisGroupId,
        )
        nRecords += nRecordsG
        cost += costG
    groupValuesT = {}
    if depth > 0:
      thisGroup = groups[depth - 1]
      groupValuesT[thisGroup] = groupValues[thisGroup]
    # groupValuesT.update(groupValues)
    groupValuesT['cost'] = cost
    groupValuesT['title'] = colRep('contribution', nRecords)
    groupValuesT['_cn'] = groupValues.get('country', None)
    if depth == 0:
      for g in C.GROUP_COLS + ['title']:
        label = selectedCountry if g == 'country' else 'all'
        controls = expandAcontrols(g) if g in groups or g == 'title' else ''
        groupValuesT[g] = label if asTsv else f'{label} {controls}'
    material[headIndex] = formatContrib(
        db,
        C,
        groupValuesT,
        False,
        parentGroupId,
        userGroup,
        myCountry,
        chosenCountry,
        asTsv,
        groupOrder=groupOrder,
        groupSet=groupSet,
        subHead=True,
        allHead=depth == 0,
        groupLen=groupLen,
        depth=depth,
        thisGroupId=thisGroupId,
        nGroups=nGroups,
    )
    return (nRecords, cost)

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


def valTri(tri):
  return '' if tri is None else '+' if tri else '-'


def subHeadClass(col, groupSet, subHead, allHead):
  theClass = (
      'allhead' if allHead and col == 'selected' else 'subhead' if allHead or
      (subHead and (col in groupSet or col in SUBHEAD_X_COLS)) else ''
  )
  return f' {theClass}' if theClass else ''


def disclose(db, values, colName, userGroup, myCountry, recCountry):
  disclosed = (
      colName != 'cost'
      or
      userGroup in db.POWER
      or (userGroup == db.COORD and myCountry is not None and recCountry == myCountry)
  )
  value = values[colName] if disclosed else 'undisclosed'
  return value


def formatContrib(
    db,
    C,
    contrib,
    editable,
    groupId,
    userGroup,
    myCountry,
    chosenCountry,
    asTsv,
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
    groupOrder = C.CONTRIB_COLS
  contribId = contrib.get('_id', None)
  if allHead:
    selected = contrib.get('selected', '')
    if asTsv:
      selected = valTri(selected)
    assessedLabel = contrib.get('assessed', '')
    assessedClass = ''
  else:
    selected = contrib.get('selected', None)
    selected = (
        (
            valTri(selected)
            if asTsv else
            (
                editTri(contribId)
                if editable else
                roTri(selected)
            )
        )
        if 'selected' in contrib else
        ''
    )

    (assessedCode, assessedScore) = contrib.get('assessed', (db.ASSESSED_DEFAULT, None))
    (assessedLabel, assessedClass) = (
        db.wrapStatus(assessedCode, assessedScore)
        if 'assessed' in contrib else
        ('', '')
    )
  rawTitle = contrib.get('title', '')
  title = (
      rawTitle
      if asTsv else
      rawTitle
      if subHead else (
          f'<a href="/data/contrib/list/{contribId}">'
          f'''{rawTitle or '? missing title ?'}'''
          f'</a>'
      )
      if 'title' in contrib else
      ''
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
  recCountry = contrib.get('_cn', None) or values.get('country', None) or chosenCountry
  if depth is not None:
    xGroup = groupOrder[depth] if depth == 0 or depth < groupLen else 'title'
    xName = 'contribution' if xGroup == 'title' else xGroup
    xRep = colRep(xName, nGroups)
    values[xGroup] = (
        xRep
        if asTsv else
        (
            f'{expandControls(thisGroupId, True)} {xRep}'
            if xGroup == 'title' else
            f'{values[xGroup]} ({xRep}) {expandControls(thisGroupId)}'
            if depth > 0 else
            f'{values[xGroup]} ({xRep}) {expandControls(thisGroupId)}'
        )
    )
  if not asTsv:
    classes = {col: f'c-{col}' for col in groupOrder}
    classes['assessed'] += f' {assessedClass}'
    if editable:
      classes['selected'] += ' editable'
  if asTsv:
    columns = '\t'.join((
        f'{disclose(db, values, col, userGroup, myCountry, recCountry)}'
    ) for col in groupOrder)
  else:
    columns = '\n'.join((
        f'<td class="{classes[col]}'
        f'{subHeadClass(col, groupSet, subHead, allHead)}'
        f'">{disclose(db, values, col, userGroup, myCountry, recCountry)}</td>'
    ) for col in groupOrder)
  if not asTsv:
    hideRep = ' hide' if hide else ''
    displayAtts = '' if groupId is None else f''' class="dd{hideRep}" gid="{groupId}"'''
  return (
      columns
      if asTsv else
      f'<tr{displayAtts}>{columns}</tr>'
  )
