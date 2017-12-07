import sys
from datetime import datetime as dt
from bson.objectid import ObjectId

ISO_DTP = '%Y-%m-%dT%H:%M:%S.%f'
ISO_DT = '%Y-%m-%dT%H:%M:%S'


def oid(oidstr):
    return ObjectId() if oidstr is None else ObjectId(oidstr)


def now():
    return dt.utcnow()


def dtm(isostr):
    isostr = isostr.rstrip('Z')
    try:
        date = dt.strptime(isostr, ISO_DTP)
    except Exception as errDummy:
        try:
            date = dt.strptime(isostr, ISO_DT)
        except Exception as err:
            return ('{}'.format(err), isostr)
    return ('', date)


def json_string(obj):
    if isinstance(obj, dt):
        return obj.isoformat()
    elif isinstance(obj, ObjectId):
        return str(obj)
    raise TypeError('Not sure how to serialize %s' % (obj, ))


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


def _composeM(modified):
    return ['{} on {}'.format(*m) for m in modified]


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
            modified.append(m)
    for m in chunks[-1]:
        modified.append(m)
    return modified


def mongoFields(fieldSet):
    return {field: True for field in fieldSet}


def mongoRows(rowFilter):
    return {} if rowFilter is True else rowFilter


def andRows(rowFilter1, rowFilter2):
    free1 = rowFilter1 is True or rowFilter1 is None
    free2 = rowFilter2 is True or rowFilter2 is None
    if free1 and free2 is True:
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
