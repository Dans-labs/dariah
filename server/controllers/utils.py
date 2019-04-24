import sys
import pprint
from datetime import datetime as dt

from bson.objectid import ObjectId
from flask.json import JSONEncoder

ISO_DTP = '%Y-%m-%dT%H:%M:%S.%f'
ISO_DT = '%Y-%m-%dT%H:%M:%S'
ISO_D = '%Y-%m-%d'

pp = pprint.PrettyPrinter(indent=2, width=100, compact=False)


def oid(oidstr):
  return ObjectId() if oidstr is None else ObjectId(oidstr)


def now():
  return dt.utcnow()


def dtm(isostr):
  isostr = isostr.rstrip('Z')
  try:
    date = dt.strptime(isostr, ISO_DTP)
  except Exception:
    try:
      date = dt.strptime(isostr, ISO_DT)
    except Exception:
      try:
        date = dt.strptime(isostr, ISO_D)
      except Exception as err:
        return ('{}'.format(err), isostr)
  return ('', date)


class CustomJSONEncoder(JSONEncoder):
    def default(self, obj):
      if isinstance(obj, dt):
        return obj.isoformat()
      elif isinstance(obj, ObjectId):
        return str(obj)
      return JSONEncoder.default(self, obj)


dbjson = CustomJSONEncoder().encode


def utf8FromLatin1(s):
  return str(bytes(s, encoding='latin1'), encoding='utf8')


def serverprint(msg):
  sys.stdout.write('o-o-o {}\n'.format(msg))


def fillInSelect(select):
  params = {
      'curYear': now().year,
  }
  for (key, value) in select.items():
    if type(value) is str:
      newValue = value
      for (p, pValue) in params.items():
        if '${}'.format(p) == value:
          newValue = pValue
          break
      if newValue != value:
        select[key] = newValue
    elif type(value) is dict:
      fillInSelect(value)


def filterModified(modified):
  logicM = _decomposeM(modified)
  chunks = _perDay(logicM)
  thinned = _thinM(chunks)
  return _composeM(thinned)


def _decomposeM(modified):
  splits = [m.rsplit(' on ', 1) for m in modified]
  return [(m[0], dtm(m[1].replace(' ', 'T'))[1]) for m in splits]


def _trimM(mdt, trim):
  return (
      str(mdt).split(' ')[0]
      if trim == 1 else
      str(mdt).split('.')[0]
  )


def _composeM(modified):
  return [f'{m[0]} on {_trimM(m[1], trim)}' for (m, trim) in modified]


def _perDay(modified):
  chunks = {}
  for m in modified:
    chunks.setdefault(dt.date(m[1]), []).append(m)
  return [chunks[date] for date in sorted(chunks)]


def _thinM(chunks):
  modified = []
  for chunk in chunks[0:-1]:
    people = {}
    for m in chunk:
      people.setdefault(m[0], []).append(m[1])
    thinned = []
    for (p, dates) in people.items():
      thinned.append((p, sorted(dates)[-1]))
    for m in sorted(thinned, key=lambda x: x[1]):
      modified.append((m, 1))
  if len(chunks):
    for m in chunks[-1]:
      modified.append((m, 2))
  return modified


def mongoFields(fieldSet):
  return {field: True for field in fieldSet}


def mongoRows(rowFilter):
  return {} if rowFilter is True else rowFilter


def andRows(rowFilter1, rowFilter2):
  free1 = rowFilter1 is True or rowFilter1 is None
  free2 = rowFilter2 is True or rowFilter2 is None
  if free1 and free2:
    return {}
  if free1:
    return mongoRows(rowFilter2)
  if free2:
    return mongoRows(rowFilter1)
  if rowFilter1 is False or rowFilter2 is False:
    return False
  rowFilter = {}
  rowFilter.update(rowFilter1)
  rowFilter.update(rowFilter2)
  return rowFilter
