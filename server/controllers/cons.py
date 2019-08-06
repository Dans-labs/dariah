from markdown import markdown

from pymongo import MongoClient

from controllers.utils import oid

TOOL_PROD = 'https://dariah-beta.dans.knaw.nl'
TOOL_DEV = 'http://127.0.0.1:8080'
TOOL = TOOL_PROD
MONGO = None
COORD = 'coord'
POWER = {'office', 'system', 'root'}


def dbAccess():
  clientm = MongoClient()
  global MONGO

  MONGO = clientm.dariah


def getCons(contribId, userInfo):
  data = _getData(contribId, userInfo)
  ok = data['good']
  if not ok:
    kind = data['kind']
    msg = data['msg']
    return {
        'error': f'''
  <div class="{kind}">{msg}</div>
'''
    }

  return data


def _getData(contribId, userInfo):
  dbAccess()
  userId = userInfo.get('_id', None)
  userGroup = userInfo.get('groupRep', 'public')
  myCountryId = userInfo.get('country', None)
  if userGroup == 'public':
    return {
        'good': False,
        'kind': 'error',
        'msg': 'You have to be logged in to view consolidated contributions',
    }
  if not contribId:
    return {
        'good': False,
        'kind': 'error',
        'msg': 'No contribution specified',
    }
  contribSpecs = contribId.split('/', 1)
  if len(contribSpecs) == 1:
    return {
        'good': False,
        'kind': 'error',
        'msg': 'No consolidated id specified',
    }
  (contribId, consId) = (oid(id) for id in contribSpecs)
  contribs = list(MONGO.contrib.find({'_id': contribId}))
  if len(contribs) == 0:
    return {
        'good': False,
        'kind': 'error',
        'msg': 'No such contribution',
    }
  contrib = contribs[0]
  countryId = contrib.get('country', None)
  creator = contrib.get('creator', None)
  editors = contrib.get('editors', [])

  if not (
      userGroup in POWER
      or
      userGroup == COORD and countryId == myCountryId
      or
      userId and (userId == creator or userId in editors)
  ):
    return {
        'good': False,
        'kind': 'error',
        'msg': 'You are not allowed to view this consolidated contribution',
    }

  contribCons = list(MONGO.contrib_consolidated.find({'_id': consId}))
  if len(contribCons) == 0:
    return {
        'good': False,
        'kind': 'error',
        'msg': 'No such consolidated contribution',
    }

  data = contribCons[0]
  return wrapHtml(data)


def kv(table, level, label, value):
  if (
      label == 'Title'
      or
      table == 'reviewEntry' and label == 'Criterion number'
  ):
    return f'''
<h{level}>{table.title()}: {value}</h{level}>
'''
  else:
    return f'''
<div class="kv">
  <div class="label">{label}</div>
  <div class="value">{value}</div>
</div>
'''


def wrapField(field, level, table, html):
  name = field["field"]
  if 'content' in field:
    wrapContent(field['content'], level, name, html)
    return
  fieldData = field["data"]
  if type(fieldData) is dict:
    fieldType = fieldData["type"]
    fieldValue = fieldData["value"]
    if fieldType == 'textarea':
      fieldValue = markdown(fieldValue)
    html.append(kv(table, level, name, fieldValue))
  else:
    vHtml = []
    for fieldSingle in fieldData:
      fieldType = fieldSingle["type"]
      fieldValue = fieldSingle["value"]
      if fieldType == 'textarea':
        fieldValue = markdown(fieldValue)
      vHtml.append(f'''
<div class="single">{fieldValue}</div>
''')
    html.append(kv(table, level, name, ''.join(vHtml)))


def wrapDetails(detail, level, html):
  table = detail["details"]
  data = detail["data"]
  s = '' if len(data) == 1 else 's'
  html.append(f'''
<hr/>

{len(data)} {table}{s}
''')
  if type(data) is dict:
    wrapContent(data, level + 1, table, html)
  else:
    for record in data:
      wrapContent(record['content'], level + 1, table, html)


def wrapItem(item, level, table, html):
  if 'field' in item:
    wrapField(item, level, table, html)
  elif 'details' in item:
    wrapDetails(item, level, html)


def wrapContent(content, level, table, html):
  for item in content:
    wrapItem(item, level, table, html)


def wrapHtml(data):
  title = data.get('title', 'consolidated DARIAH contribution')
  consLink = f'{TOOL}/cons/{data["contrib"]}/{data["_id"]}'
  liveLink = f'{TOOL}/data/contrib/filter/{data["contrib"]}/'

  consLinkHtml = f'''
<a target="_blank" href="{consLink}">{consLink}</a>
'''
  liveLinkHtml = f'''
<a target="_blank" href="{liveLink}">{liveLink}</a>
'''

  html = []
  html.append(f'''
{kv("", 0, "contribution", data["title"])}
{kv("", 0, "consolidated", data["consolidated"])}
{kv("", 0, "consolidated record online", consLinkHtml)}
{kv("", 0, "live record online", liveLinkHtml)}
''')

  wrapContent(data["content"], 1, 'contribution', html)

  return {
      'good': True,
      'title': title,
      'material': ''.join(html),
  }
