import sys

from datetime import datetime as dt
from flask.json import JSONEncoder
from bson.objectid import ObjectId


ISO_DTP = '%Y-%m-%dT%H:%M:%S.%f'
ISO_DT = '%Y-%m-%dT%H:%M:%S'
ISO_D = '%Y-%m-%d'


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


def now():
  return dt.utcnow()


def serverprint(msg):
  sys.stdout.write(msg)
  sys.stdout.flush()


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
  return [f'{m[0]} on {_trimM(m[1], trim)}' for (m, trim) in reversed(modified)]


def _perDay(modified):
  chunks = {}
  for m in modified:
    chunks.setdefault(dt.date(m[1]), []).append(m)
  return [chunks[date] for date in sorted(chunks)]


def _thinM(chunks):
  modified = []
  nChunks = len(chunks)
  for (i, chunk) in enumerate(chunks):
    isLast = i == nChunks - 1
    people = {}
    for m in chunk:
      people.setdefault(m[0], []).append(m[1])
    thinned = []
    for (p, dates) in people.items():
      thinned.append((p, sorted(dates)[-1]))
    for m in sorted(thinned, key=lambda x: x[1]):
      modified.append((m, 2 if isLast else 1))
  return modified
