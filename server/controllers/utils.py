from datetime import datetime as dt
from flask.json import JSONEncoder
from bson.objectid import ObjectId


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
