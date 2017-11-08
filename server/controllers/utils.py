import datetime
from datetime import datetime
from bson.objectid import ObjectId

def oid(oidstr):
    return ObjectId() if oidstr == None else ObjectId(oidstr) 

def now(): return datetime.utcnow()

def dtm(isostr):
    isostr = isostr.rstrip('Z')
    try:
        date = datetime.strptime(isostr, "%Y-%m-%dT%H:%M:%S.%f")
    except:
        try:
            date = datetime.strptime(isostr, "%Y-%m-%dT%H:%M:%S")
        except Exception as err:
            return ('{}'.format(err), isostr)
    return ('', date)

def json_string(obj):
    if isinstance(obj, datetime):
        return obj.isoformat()
    elif isinstance(obj, ObjectId):
        return str(obj)
    raise TypeError('Not sure how to serialize %s' % (obj,))

def utf8FromLatin1(s): return str(bytes(s, encoding='latin1'), encoding='utf8')
