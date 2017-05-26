# To import the bson dump in another mongodb installation, use the commandline to dump the dariah database here
# 
#     mongodump -d dariah -o dariah
# 
# and to import it elsewhere.
# 
#     mongorestore --drop -d dariah dariah


# # Importing InKind from FileMaker
# 
# We use an XML export of the various tables in the FileMaker Inkind database.
# 
# The XML will be read, field definitions will be extracted from it, the data will be read.
# We do the following:
# * adapt the table and field organization;
# * adjust the field types and the values, especially for datetime and currency;
# * generate value tables and cross tables;
# * add extra information for countries, so that they can be visualized on a map
# * link values to existing tables;
# * write SQL create statements and insert statements
# * import a moderately denormalized version of the data into MongoDB

import os,sys,re,collections,json,yaml,xlsxwriter
from os.path import splitext, basename
from functools import reduce
from glob import glob
from lxml import etree
from datetime import datetime, date
from pymongo import MongoClient
from bson.objectid import ObjectId

def info(x): sys.stdout.write('{}\n'.format(x))
def warning(x): sys.stderr.write('{}\n'.format(x))

generic = re.compile('[ \t]*[\n+][ \t\n]*')           # split on newlines (with surrounding white space)
genericComma = re.compile('[ \t]*[\n+,;][ \t\n]*')    # split on newlines or commas (with surrounding white space)

STRIP_NUM = re.compile('^[0-9]\s*\.?\s+')

def stripNum(v): return STRIP_NUM.sub('', v)

DECIMAL_PATTERN = re.compile(
    r'^-?[0-9]+\.?[0-9]*'
)
DATE_PATTERN = re.compile(
    r'^\s*([0-9]{2})/([0-9]{2})/([0-9]{4})$'
)
DATE2_PATTERN = re.compile(
    r'^\s*([0-9]{4})-([0-9]{2})-([0-9]{2})$'
)
DATETIME_PATTERN = re.compile(
    r'^\s*([0-9]{2})/([0-9]{2})/([0-9]{4})\s+([0-9]{2}):([0-9]{2})(?::([0-9]{2}))?$'
)

def date_repl(match):
    [d,m,y] = list(match.groups())
    return '{}-{}-{}'.format(y,m,d)
    
def date2_repl(match):
    [y,m,d] = list(match.groups())
    return '{}-{}-{}'.format(y,m,d)
    
def datetime_repl(match):
    [d,m,y,hr,mn,sc] = list(match.groups())
    return '{}-{}-{}T{}:{}:{}'.format(y,m,d,hr,mn,sc or '00')

def dt(v_raw, i, t, fname):
    if not DATE2_PATTERN.match(v_raw):
        warning(
            'table `{}` field `{}` record {}: not a valid date: "{}"'.format(
                t, fname, i, v_raw
        ))
        return v_raw
    return datetime(*map(int, re.split('[:T-]', DATE2_PATTERN.sub(date2_repl, v_raw))))

def dtm(v_raw, i, t, fname):
    if not DATETIME_PATTERN.match(v_raw):
        warning(
            'table `{}` field `{}` record {}: not a valid date time: "{}"'.format(
                t, fname, i, v_raw
        ))
        return v_raw
    return datetime(*map(int, re.split('[:T-]', DATETIME_PATTERN.sub(datetime_repl, v_raw))))

def dti(v_iso): return date(*map(int, re.split('[-]', v_iso)))
def dtmi(v_iso): return datetime(*map(int, re.split('[:T-]', v_iso)))
def now(): return datetime.utcnow()

def dtmiso(v_raw, i, t, fname):
    if not DATETIME_PATTERN.match(v_raw):
        warning(
            'table `{}` field `{}` record {}: not a valid date time: "{}"'.format(
                t, fname, i, v_raw
        ))
        return v_raw
    return DATETIME_PATTERN.sub(datetime_repl, v_raw)

def num(v_raw, i, t, fname):
    if type(v_raw) is int: return v_raw
    if v_raw.isdigit(): return int(v_raw)
    warning(
        'table `{}` field `{}` record {}: not an integer: "{}"'.format(
            t, fname, i, v_raw
    ))
    return v_raw

def decimal(v_raw, i, t, fname):
    if type(v_raw) is float: return v_raw
    if v_raw.isdigit(): return float(v_raw)
    if DECIMAL_PATTERN.match(v_raw): return float(v_raw)
    warning(
        'table `{}` field `{}` record {}: not an integer: "{}"'.format(
            t, fname, i, v_raw
    ))
    return v_raw

def email(v_raw, i, t, fname):
    return v_raw.replace('mailto:', '', 1) if v_raw.startswith('mailto:') else v_raw

funcs = dict(
    generic=generic,
    genericComma=genericComma,
    stripNum=stripNum,
)

class IdIndex(object):
    def __init__(self):
        self._idFromName = {}
        self._nameFromId = {}
    def getId(self, name):
        _id = self._idFromName.get(name, None)
        if _id == None:
            _id = ObjectId()
            self._idFromName[name] = _id
            self._nameFromId[_id] = name
        return _id
    def getName(self, _id): return self._nameFromId[_id]
    
class MongoId(IdIndex):
    def __init__(self):
        super().__init__()
        self.cur = 0
    def newId(self):
        self.cur += 1
        return self.getId(self.cur)
        
class FMConvert(object):
    def __init__(self):
        with open('./config.yaml') as ch:
            config = yaml.load(ch)
        homeDir = os.path.expanduser('~')
        baseDir = config['locations']['BASE_DIR']
        exportDir = config['locations']['EXPORT_DIR']
        for (loc, path) in config['locations'].items():
            config['locations'][loc] = os.path.expanduser(path.format(b=baseDir, e=exportDir))
        self.config = config

        for cfg in {'SPLIT_FIELDS', 'HACK_FIELDS'}:
            for (table, specs) in config[cfg].items():
                for (field, fun) in specs.items():
                    config[cfg][table][field] = funcs[fun]

        cfg = 'DEFAULT_VALUES'
        for (table, specs) in config[cfg].items():
            for (field, dValue) in specs.items():
                if dValue.startswith('datetime('):
                    comps = [int(c) for c in dValue.replace('datetime(', '', 1)[0:-1].split(',')]
                    config[cfg][table][field] = datetime(*comps)

        cfg = 'BOOL_VALUES'
        for (boolVal, boolList) in config[cfg].items():
            config[cfg][boolVal] = set(boolList)

        cfg = 'NULL_VALUES'
        config[cfg] = set(config[cfg])
        for (k,v) in config.items():
            if k in {'locations', 'xml'}:
                for (l, w) in v.items(): setattr(self, l, w)
            else: setattr(self, k, v)

    def bools(self, v_raw, i, t, fname):
        if v_raw in self.BOOL_VALUES[True]: return True
        if v_raw in self.BOOL_VALUES[False]: return False
        warning(
            'table `{}` field `{}` record {}: not a boolean value: "{}"'.format(
                t, fname, i, v_raw
        ))
        return v_raw

    def money(self, v_raw, i, t, fname):
        note = ',' in v_raw or '.' in v_raw
        v = v_raw.strip().lower().replace(' ','').replace('€', '').replace('euro', '').replace('\u00a0', '')
        for p in range(2,4): # interpret . or , as decimal point if less than 3 digits follow it
            if len(v) >= p and v[-p] in '.,': 
                v_i = v[::-1]
                if v_i[p-1] == ',': v_i = v_i.replace(',', 'D', 1)
                elif v_i[p-1] == '.': v_i = v_i.replace('.', 'D', 1)
                v = v_i[::-1]
        v = v.replace('.','').replace(',','')
        v = v.replace('D', '.')
        if not v.replace('.','').isdigit():
            if len(set(v) & set('0123456789')):
                warning(
                    'table `{}` field `{}` record {}: not a decimal number: "{}" <= "{}"'.format(
                        t, fname, i, v, v_raw,
                ))
                self.moneyWarnings.setdefault('{}:{}'.format(t, fname), {}).setdefault(v, set()).add(v_raw)
                v = None
            else:
                v = None
                self.moneyNotes.setdefault('{}:{}'.format(t, fname), {}).setdefault('NULL', set()).add(v_raw)
        elif note:
            self.moneyNotes.setdefault('{}:{}'.format(t, fname), {}).setdefault(v, set()).add(v_raw)
        return None if v == None else float(v)

    def sanitize(self, t, i, fname, value):
        if fname == '_id': return value
        (ftype, fmult) = self.allFields[t][fname]
        newValue = []
        for v_raw in value:
            if v_raw in self.NULL_VALUES: continue
            elif ftype == 'text': v = v_raw
            elif ftype == 'bool': v = self.bools(v_raw, i, t, fname)
            elif ftype == 'number': v = num(v_raw, i, t, fname)
            elif ftype == 'decimal': v = decimal(v_raw, i, t, fname)
            elif ftype == 'email': v = email(v_raw, i, t, fname)
            elif ftype == 'valuta': v = self.money(v_raw, i, t, fname)
            elif ftype == 'date': v = dt(v_raw, i, t, fname)
            elif ftype == 'datetime': v = dtm(v_raw, i, t, fname)
            elif ftype == 'datetimeiso': v = dtmiso(v_raw, i, t, fname)
            else: v = v_raw
            if v != None and (fmult <= 1 or v != ''): newValue.append(v)
        if len(newValue) == 0:
            defValue = self.DEFAULT_VALUES.get(t, {}).get(fname, None)
            if defValue != None: newValue = [defValue]
        if fmult == 1:
            newValue = None if len(newValue) == 0 else newValue[0]
        return newValue

    def showFields(self):
        for (mt, defs) in sorted(self.allFields.items()):
            info(mt)
            for (fname, fdef) in sorted(defs.items()):
                info('{:>25}: {:<10} ({})'.format(fname, *fdef))

    def showData(self):
        for (mt, rows) in sorted(self.allData.items()):
            info('o-o-o-o-o-o-o TABLE {} with {} rows o-o-o-o-o-o-o-o '.format(mt, len(rows)))
            for row in rows[0:2]:
                for f in sorted(row.items()):
                    info('{:>20} = {}'.format(*f))
                info('o-o-o-o-o-o-o-o-o-o-o-o')

    def showMoney(self):
        for (tf, vs) in sorted(self.moneyNotes.items()):
            for v in vs: info('{} "{}" <= {}'.format(tf, v, ' | '.join(vs[v])))

    def readFmFields(self):
        for mt in self.MAIN_TABLES:
            infile = '{}/{}.xml'.format(self.FM_DIR, mt)
            root = etree.parse(infile, self.parser).getroot()
            fieldroots = [x for x in root.iter(self.FMNS+'METADATA')]
            fieldroot = fieldroots[0]
            fields = []
            fieldDefs = {}
            for x in fieldroot.iter(self.FMNS+'FIELD'):
                fname = x.get('NAME').lower().replace(' ','_').replace(':', '_')
                ftype = x.get('TYPE').lower()
                fmult = int(x.get('MAXREPEAT'))
                fields.append(fname)
                fieldDefs[fname] = [ftype, fmult]
            self.rawFields[mt] = fields
            self.allFields[mt] = fieldDefs

            for f in self.SKIP_FIELDS[mt]:
                del self.allFields[mt][f]

            for (f, mfs) in self.MERGE_FIELDS[mt].items():
                self.allFields[mt][f][1] += 1
                for mf in mfs:
                    del self.allFields[mt][mf]
            self.allFields[mt] = dict((self.MAP_FIELDS[mt][f], v) for (f,v) in self.allFields[mt].items())
            for f in self.SPLIT_FIELDS[mt]:
                self.allFields[mt][f][1] += 1
            for (f, fo) in self.DECOMPOSE_FIELDS[mt].items():
                self.allFields[mt][fo] = self.allFields[mt][f]
                self.allFields[mt][f] = [self.allFields[mt][f][0], 1]
            for (f, t) in self.FIELD_TYPE.get(mt, {}).items():
                self.allFields[mt][f][0] = t
            for (f, m) in self.FIELD_MULTIPLE.get(mt, {}).items():
                self.allFields[mt][f][1] = m

    def readFmData(self):
        for mt in self.MAIN_TABLES:
            infile = '{}/{}.xml'.format(self.FM_DIR, mt)
            root = etree.parse(infile, self.parser).getroot()
            dataroots = [x for x in root.iter(self.FMNS+'RESULTSET')]
            dataroot = dataroots[0]
            rows = []
            rowsRaw = []
            fields = self.rawFields[mt]
            for (i, r) in enumerate(dataroot.iter(self.FMNS+'ROW')):
                rowRaw = []
                for c in r.iter(self.FMNS+'COL'):
                    data = [x.text.strip() for x in c.iter(self.FMNS+'DATA') if x.text != None]
                    rowRaw.append(data)
                if len(rowRaw) != len(fields):
                    warning('row {}: fields encountered = {}, should be {}'.format(len(row), len(fields)))
                rowsRaw.append(dict((f,v) for (f, v) in zip(fields, rowRaw)))
                row = dict((f,v) for (f, v) in zip(fields, rowRaw) if f not in self.SKIP_FIELDS[mt])
                for (f, mfs) in self.MERGE_FIELDS[mt].items():
                    for mf in mfs:
                        row[f].extend(row[mf])
                        del row[mf]
                row = dict((self.MAP_FIELDS[mt][f], v) for (f,v) in row.items())
                for (f, spl) in self.SPLIT_FIELDS[mt].items():
                    row[f] = reduce(lambda x,y: x+y, [spl.split(v) for v in row[f]], [])
                for (f, hack) in self.HACK_FIELDS[mt].items():
                    row[f] = [hack(v) for v in row[f]]
                for (f, fo) in self.DECOMPOSE_FIELDS[mt].items():
                    row[fo] = row[f][1:]
                    row[f] = [row[f][0]] if len(row[f]) else []
                row['_id'] = self.mongo.newId()
                for (f, v) in row.items(): row[f] = self.sanitize(mt, i, f, v)
                rows.append(row)
            self.allData[mt] = rows
            self.rawData[mt] = rowsRaw

        if self.moneyWarnings:
            for tf in sorted(self.moneyWarnings):
                for v in sorted(self.moneyWarnings[tf]):
                    warning('{} "{}" <= {}'.format(
                        tf, v,
                        ' | '.join(self.moneyWarnings[tf][v]),
                ))

    def moveFields(self):
        for mt in self.MAIN_TABLES:
            for (omt, mfs) in self.MOVE_FIELDS[mt].items():
                for mf in mfs:
                    self.allFields.setdefault(omt, dict())[mf] = self.allFields[mt][mf]
                    del self.allFields[mt][mf]
                self.allFields.setdefault(omt, dict)['{}_id'.format(mt)] = ('id', 1)

            for row in self.allData[mt]:
                for (omt, mfs) in self.MOVE_FIELDS[mt].items():
                    orow = dict((mf, row[mf]) for mf in mfs)
                    orow['_id'] = self.mongo.newId()
                    orow['{}_id'.format(mt)] = row['_id']
                    self.allData.setdefault(omt, []).append(orow)
                    for mf in mfs: del row[mf]

    def readLists(self):
        valueLists = collections.defaultdict(set)
        for mt in self.VALUE_LISTS:
            rows = self.allData[mt]
            for f in self.VALUE_LISTS[mt]:
                path = '{}/{}/{}.txt'.format(self.FM_DIR, mt, f)
                data = set()
                if os.path.exists(path):
                    with open(path) as fh:
                        for line in fh:
                            data.add(line.strip())
                else:
                    for row in rows:
                        values = row.get(f, [])
                        if type(values) is not list:
                            values = [values]
                        for val in values:
                            data.add(val)
                valueLists[f] |= data
        for (f, valueSet) in valueLists.items():
            self.valueDict[f] = dict((i+1, x) for (i, x) in enumerate(sorted(valueSet)))
            self.allFields[f] = dict(
                _id=('id', 1),
                rep=('string', 1),
            )

    def countryTable(self):
        extraInfo = self.countryExtra
        idMapping = dict()

        seen = set()
        for row in self.allData['country']:
            for f in row:
                if type(row[f]) is list: row[f] = row[f][0]
            iso = row['iso']
            seen.add(iso)
            row['_id'] = self.mongo.newId()
            idMapping[iso] = row['_id']
            thisInfo = extraInfo[iso]
            row['latitude'] = thisInfo['latitude']
            row['longitude'] = thisInfo['longitude']
        for (iso, info) in extraInfo.items():
            if iso in seen: continue
            _id = self.mongo.newId()
            idMapping[iso] = _id
            self.allData['country'].append(dict(
                _id=_id,
                iso=iso,
                name=info['name'],
                isMember=False,
                latitude = info['latitude'],
                longitude = info['longitude'],
            ))

        for row in self.allData['contrib']:
            if row['country'] != None:
                iso = row['country']
                row['country'] = idMapping[iso]
        
        self.allFields['country']['_id'] = ('id', 1)
        self.allFields['country']['iso'] = ('string', 1)
        self.allFields['country']['latitude'] = ('float', 1)
        self.allFields['country']['longitude'] = ('float', 1)

    def userTable(self):
        idMapping = dict()
        existingUsers = []

        users = collections.defaultdict(set)
        eppnSet = set()
        for c in self.allData['contrib']:
            crsPre = [c.get(field, None) for field in ['creator']]
            crs = [x for x in crsPre if x != None]
            for cr in crs:
                eppnSet.add(cr)
        idMapping = dict((eppn, self.mongo.newId()) for eppn in sorted(eppnSet))
        for c in self.allData['contrib']:
            c['creator'] = idMapping[c['creator']]

        users = dict((i, eppn) for (eppn, i) in idMapping.items())
        for (i, eppn) in sorted(users.items()):
            existingUsers.append(dict(_id=i, eppn=eppn, mayLogin=False, authority='legacy'))

        for u in self.testUsers:
            u['_id'] = self.mongo.newId()
            idMapping[u['eppn']] = u['_id']
            existingUsers.append(u)
        self.inGroup = [dict(tuple(ig.items())+(('_id', self.mongo.newId()),)) for ig in self.inGroup]
        self.allData['user'] = existingUsers
        self.allData['inGroup'] = self.inGroup
        
        self.allFields['user'] = dict(
            _id=('id', 1),
            eppn=('string', 1),
            email=('email', 1),
            mayLogin=('bool', 1),
            authority=('string', 1),
            firstName=('string', 1),
            lastName=('string', 1),
        )
        self.allFields['inGroup'] = dict(
            _id=('id', 1),
            eppn=('string', 1),
            authority=('string', 1),
            group=('string', 1),
        )
        self.uidMapping.update(idMapping)

    def provenance(self):
        for c in self.allData['contrib']:
            c['modified'] = ['{} on {}'.format(c['modifiedBy'], c['dateModified'])]
            del c['modifiedBy']
            del c['dateModified']
        self.allFields['contrib']['modified'] = ('string', 2)
        del self.allFields['contrib']['modifiedBy']
        del self.allFields['contrib']['dateModified']
        creator = self.CREATOR
        creatorId = self.uidMapping[creator]
        created = now()
        for mt in ('user', 'country', 'package', 'criteria'):
            for c in self.allData[mt]:
                c['creator'] = creatorId
                c['dateCreated'] = created
                c['modified'] = ['{} on {}'.format(creator, created)]

    def norm(self, x): return x.strip().lower()

    def relTables(self):
        
        relIndex = dict()
        for mt in sorted(self.VALUE_LISTS):
            rows = self.allData[mt]
            for f in sorted(self.VALUE_LISTS[mt]):
                comps = f.split(':')
                if len(comps) == 2:
                    (f, fAs) = comps
                else:
                    fAs = f
                relInfo = self.valueDict[fAs]
                if not fAs in relIndex:
                    idMapping = dict((i, self.mongo.newId()) for i in relInfo)
                    self.allData[fAs] = [dict(_id=idMapping[i], rep=v) for (i, v) in relInfo.items()]
                    relIndex[fAs] = dict((self.norm(v), (idMapping[i], v)) for (i, v) in relInfo.items())
                (ftype, fmult) = self.allFields[mt][f]
                for row in rows:
                    newValue = []
                    for v in (row[f] if fmult > 1 else [row[f]] if row[f] != None else []):
                        rnv = self.norm(v)
                        (i, nv) = relIndex[fAs].get(rnv, ("-1", None))
                        if nv == None:
                            target = self.MOVE_MISSING[mt]
                            (ttype, tmult) = self.allFields[mt][target]
                            if target not in row or row[target] == None:
                                row[target] = [] if tmult > 1 else ''
                            if tmult == 1:
                                row[target] += '\nMOVED FROM {}: {}'.format(f, v)
                            else:
                                row[target].append('MOVED FROM {}: {}'.format(f, v))
                        else:
                            if fmult > 1: newValue.append(i)
                            else: newValue = i
                    row[f] = newValue 
        self.relIndex = relIndex

    def testTweaks(self):
        for (table, test) in self.testOwner.items():
            my = self.uidMapping[test['owner']]
            search = test['search']
            (stype, smult) = self.allFields[table][search]
            field = test['field']
            mine = test['documents']
            for row in self.allData[table]:
                value = row.get(search, [None])
                if smult > 1:
                    if len(value) == 0: value = [None]
                    if value[0] in mine:
                        row[field] = [my]
                else:
                    if value in mine:
                        row[field] = my

    def backoffice(self, isDevel):
        client = MongoClient()
        db = client.dariah
        self.backofficeTables = set()
        if True or isDevel:
            for table in self.BACKOFFICE:
                bt = table['name']
                self.backofficeTables.add(bt)
                rows = table['rows']
                self.allData[bt] = []
                self.relIndex[bt] = dict()
                for row in rows:
                    _id = self.mongo.newId()
                    newRow = dict()
                    newRow['_id'] = _id
                    ifield = 'key' if bt == 'criteria' else 'title'
                    self.relIndex[bt][row[ifield]] = _id
                    for (field, value) in row.items():
                        if field in {'startDate', 'endDate'}:
                            newRow[field] = value
                        elif field in {'dateCreated'}:
                            valueRep = now() if value == 'now' else value
                            newRow[field] = valueRep
                        elif field == 'creator':
                            newRow[field] = self.uidMapping[value]
                        elif field in {'typeContribution'}:
                            newRow[field] = [self.relIndex[field][self.norm(val)][0] for val in value]
                        elif field == 'package':
                            newRow[field] = self.relIndex['package'][value]
                        else: newRow[field] = value
                    self.allData[bt].append(newRow)
        else:
            for table in self.BACKOFFICE:
                bt = table['name']
                self.allData[bt] = [{}]

    def importMongo(self):
        client = MongoClient()
        client.drop_database('dariah')
        db = client.dariah
        for (mt, rows) in self.allData.items():
            info(mt)
            db[mt].insert_many(rows)

    def exportXlsx(self):
        workbook = xlsxwriter.Workbook(self.EXPORT_ORIG, {'strings_to_urls': False})
        for mt in self.rawData:
            worksheet = workbook.add_worksheet(mt)
            for (f, field) in enumerate(self.rawFields[mt]):
                    worksheet.write(0, f, field)
            for (r, row) in enumerate(self.rawData[mt]):
                for (f, field) in enumerate(self.rawFields[mt]):
                    val = row[field]
                    val = [] if val == None else val if type(val) is list else [val]
                    val = '|'.join(val)
                    worksheet.write(r+1, f, val)
        workbook.close()

        workbook = xlsxwriter.Workbook(self.EXPORT_MONGO, {'strings_to_urls': False})
        getName = lambda i: self.mongo.getName(i)
        for mt in self.allData:
            if mt in self.backofficeTables: continue
            worksheet = workbook.add_worksheet(mt)
            fields = sorted(self.allFields[mt])
            for (f, field) in enumerate(fields):
                    worksheet.write(0, f, field)
            for (r, row) in enumerate(self.allData[mt]):
                for (f, field) in enumerate(fields):
                    fmt = None
                    val = row.get(field, [])
                    if field == '_id': val = getName(val)
                    (ftype, fmult) = self.allFields[mt][field]
                    val = [] if val == None else [val] if type(val) is not list else val
                    exportVal = []
                    for v in val:
                        if type(v) is dict:
                            exportVal.append(','.join(str(getName(vv) if kk == '_id' else vv) for (kk, vv) in v.items()))
                        elif ftype == 'date' or ftype == 'datetime':
                            exportVal.append(v if type(v) is str else v.isoformat())
                        else:
                            exportVal.append(str(v))
                    worksheet.write(r+1, f, ' | '.join(exportVal))
        workbook.close()

    def run(self):
        isDevel = len(sys.argv) > 1 and sys.argv[1] == 'development'
        self.moneyWarnings = {}
        self.moneyNotes = {}
        self.valueDict = dict()
        self.rawFields = dict()
        self.allFields = dict()
        self.rawData = dict()
        self.allData = dict()
        self.uidMapping = dict()

        self.parser = etree.XMLParser(remove_blank_text=True, ns_clean=True)
        self.mongo = MongoId()

        self.readFmFields()
        self.readFmData()
        self.readLists()
        self.moveFields()
        self.countryTable()
        self.userTable()
        self.relTables()
        if isDevel: self.testTweaks()
        self.backoffice(isDevel)
        self.provenance()
        self.importMongo()
        #self.showData()
        #self.showMoney()
        if isDevel: self.exportXlsx()

FMConvert().run()





