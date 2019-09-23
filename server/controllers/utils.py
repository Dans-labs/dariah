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


def titleSort(records):
  return sorted(records, key=lambda r: r['title'] or '')


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
