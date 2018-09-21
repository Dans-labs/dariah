import json
from bottle import request, install, JSONPlugin
from pymongo import MongoClient
from controllers.utils import (
    json_string,
)

MONGO = None

COUNTRY = {None: '??'}
YEAR = {None: '??'}
VCC = {None: '??'}
TYPE = {None: '??'}

COORD = 'coord'


def dbAccess():
  install(
      JSONPlugin(
          json_dumps=lambda body: json.dumps(body, default=json_string)
      )
  )
  clientm = MongoClient()
  global MONGO
  MONGO = clientm.dariah

  for doc in MONGO.country.find():
    COUNTRY[doc['_id']] = {
        'iso': doc['iso'],
        'name': doc['name'],
        'isMember': doc['isMember'],
    }
  for doc in MONGO.year.find():
    YEAR[doc['_id']] = doc['rep']
  for doc in MONGO.vcc.find():
    VCC[doc['_id']] = doc['rep']
  for doc in MONGO.typeContribution.find():
    mainType = doc.get('mainType', '')
    subType = doc.get('subType', '')
    sep = ' / ' if mainType and subType else ''
    TYPE[doc['_id']] = f'{doc["mainType"]}{sep}{doc["subType"]}'


def selectContrib(userInfo):
  group = userInfo.get('groupRep', 'public')
  myCountryId = userInfo.get('country', None)
  if group != COORD:
    return {
        'good': False,
        'kind': 'error',
        'msg': 'You are not a national coordinator',
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
  if countryId != myCountryId:
    return {
        'good': False,
        'kind': 'error',
        'msg': 'You try to select contributions of another country than your own',
    }

  value = request.json.get('selected', None)
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
    return getOurcountry(userInfo)
  return {}


def getOurcountry(userInfo):
  group = userInfo.get('groupRep', 'public')
  editable = group == COORD
  countryId = userInfo.get('country', None)
  if countryId is None:
    material = f'''
<div class="error-boundary">
  <p>I do not know which country you are from</p>
</div>'''
  else:
    countryInfo = COUNTRY.get(countryId, None)
    if countryInfo is None:
      material = f'''
<div class="error-boundary">
  <p>I do not know which country this is: {countryId}</p>
</div>'''
    else:
      name = countryInfo['name']
      iso = countryInfo['iso']
      full = f'{name} ({iso})'
      isMember = countryInfo['isMember']
      if not isMember:
        material = f'''
<div class="error-boundary">
  <p>{full} is not member of DARIAH</p>
</div>'''
      else:
        material = f'''
<h1>Contributions from {full}</h1>
<table class="cc">
<tbody>
  <tr>
    <th>VCC</th>
    <th>year</th>
    <th>type</th>
    <th>cost</th>
    <th>selected</th>
    <th>title</th>
  </tr>
'''

        contribs = []
        for doc in MONGO.contrib.find({'country': countryId}):
          contribs.append({
              '_id': doc.get('_id', None),
              'year': YEAR.get(doc.get('year', None), '??'),
              'vcc': ' + '.join(VCC.get(d, '??') for d in doc.get('vcc', [])),
              'type': TYPE.get(doc.get('typeContribution', None), '??'),
              'title': doc.get('title', '??'),
              'cost': euro(doc.get('costTotal', None)),
              'selected': doc.get('selected', None)
          })
        material += '\n'.join(formatContrib(contrib, editable) for contrib in contribs)
        material += '''
</tbody>
</table>
'''

  data = {
      'material': material,
  }
  return data


def euro(amount):
  if amount is None:
    return '??'
  return str(int(round(amount)))


def editTri(tri, contribId):
  material = ''
  sep = ''
  for t in (True, None, False):
    icon = 'question' if t is None else 'check' if t else 'times'
    className = 's-focus' if t is tri else ''
    if t is tri:
      elem = f'<span class="fa fa-{icon} {className}"/>'
    else:
      value = 'none' if t is None else 'false' if t is False else 'true'
      elem = f'<a href="#" contrib="{contribId}" value="{value}" class="fa fa-{icon} {className}"/>'
    material += f'{sep}{elem}'
    sep = '&nbsp;'
  return material


def roTri(tri):
  if tri is None:
    return ''
  icon = 'check' if tri else 'times'
  return f'<span class="fa fa-{icon}"/>'


def formatContrib(contrib, editable):
  selected = contrib.get('selected', None)
  contribId = contrib.get('_id', None)
  return f'''
<tr>
  <td class="c-vcc">{contrib['vcc']}</td>
  <td>{contrib['year']}</td>
  <td class="c-type">{contrib['type']}</td>
  <td class="c-cost">€ {contrib['cost']}</td>
  <td>{editTri(selected, contribId) if editable else roTri(selected)}</td>
  <td><a href="/data/contrib/list/{contribId}">{contrib['title']}</a></td>
</tr>
  '''
