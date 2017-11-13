import sys,datetime
from datetime import datetime
from bson.objectid import ObjectId

ISO_DTP = '%Y-%m-%dT%H:%M:%S.%f'
ISO_DT  = '%Y-%m-%dT%H:%M:%S'

def oid(oidstr):
    return ObjectId() if oidstr == None else ObjectId(oidstr) 

def now(): return datetime.utcnow()

def dtm(isostr):
    isostr = isostr.rstrip('Z')
    try:
        date = datetime.strptime(isostr, ISO_DTP)
    except:
        try:
            date = datetime.strptime(isostr, ISO_DT)
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

def serverprint(msg): sys.stdout.write('o-o-o {}\n'.format(msg))
