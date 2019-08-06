import sys
import os
import collections
import re
import yaml
import pprint
from glob import glob
from keyword import iskeyword

from controllers.utils import serverprint

controllers = 'controllers'
xcontrollers = {'info', 'cons'}
modelSource = 'models/model.yaml'
tableSource = 'models/tables'
compiled = 'models/compiled'
namesFile = 'models/compiled/names.py'
modelFile = 'models/compiled/model.py'


def combine(topData, tableData):
    extraNames = topData.pop('names')
    defaults = topData.pop('defaults')
    provenanceOrder = topData.pop('provenanceOrder')
    provenanceSpecs = topData.pop('provenanceSpecs')
    for (table, tableInfo) in tableData.items():
        for (df, dfInfo) in defaults.items():
            if df not in tableInfo:
                tableInfo[df] = dfInfo
        fieldOrder = []
        fieldOrder.extend(tableInfo['fieldOrder'])
        fieldOrder.extend(provenanceOrder)
        tableInfo['fieldOrder'] = fieldOrder
        for (p, pInfo) in provenanceSpecs.items():
            if p not in tableInfo['fieldSpecs']:
                tableInfo['fieldSpecs'][p] = pInfo

    modelData = {'tables': tableData}
    for x in topData.items():
        if x[0] == 'tables':
            serverprint(
                'ERROR: key tables occurs top-level in {}'.format(modelSource)
            )
            sys.exit(1)
        modelData[x[0]] = x[1]

    names = getNames(modelData)

    nd = 0
    for name in sorted(extraNames):
        if name in names:
            serverprint('WARNING: no need to declare {}'.format(name))
            nd += 1
        else:
            names.add(name)
    if nd:
        serverprint(
            'WARNING: {} name{} in the names section of {} can be removed'.
            format(
                nd,
                '' if nd == 1 else 's',
                modelSource,
            )
        )
    return (modelData, names, set(extraNames))


def isName(val):
    return val.replace('_', '').isalnum()


def getNames(val, doString=True):
    if type(val) is str:
        return {val} if doString and isName(val) else set()
    elif type(val) is list:
        names = set()
        for v in val:
            if type(v) is str and isName(v):
                names.add(v)
            elif type(v) is dict:
                names |= getNames(v, doString=False)
        return names
    elif type(val) is dict:
        names = set()
        for (k, v) in val.items():
            if type(k) is str and isName(k):
                names.add(k)
            names |= getNames(v, doString=False)
        return names
    return set()


def putNameK(name):
    return "setattr(N, '{}', '{}')\n".format(name, name)


def putName(name):
    return "    {} = '{}'\n".format(name, name)


def checkNames(names, extraNames):
    quote = '[{}{}]'.format("'", '"')
    stringNamesPat = '{}{}{}'.format(
        quote,
        '{}|{}'.format(quote, quote).join(
            sorted(names, key=lambda n: (-len(n), n)),
        ),
        quote,
    )
    stringNamesRe = re.compile(stringNamesPat)
    getattrNamesPat = r'getattr\(N\s*,\s*{}([A-Za-z0-9_]+){}'.format(
        quote, quote
    )
    getattrNamesRe = re.compile(getattrNamesPat)
    NNamesRe = re.compile(r'N\.([A-Za-z0-9_]*)')
    nfound = 0
    Nfound = 0
    occs = 0
    Nnames = collections.Counter()
    for path in glob('{}/*.py'.format(controllers)):
        fName = os.path.splitext(os.path.basename(path))[0]
        if fName in xcontrollers:
          continue
        with open(path) as ph:
            for (i, line) in enumerate(ph):
                line = line.strip()
                getattrMatches = getattrNamesRe.findall(line)
                stringMatches = [m[1:-1] for m in stringNamesRe.findall(line)]
                NMatches = NNamesRe.findall(line)
                if stringMatches:
                    for match in stringMatches:
                        if match in getattrMatches:
                            continue
                        nfound += 1
                        serverprint(
                            'WARNING: {:<10}: line {:>3}: string  name {}'.
                            format(fName, i + 1, match),
                        )
                allNMatches = NMatches + getattrMatches
                if allNMatches:
                    for Nname in allNMatches:
                        occs += 1
                        Nnames[Nname] += 1
                        if Nname not in names:
                            Nfound += 1
                            serverprint(
                                'WARNING: {:<10}: line {:>3}: unknown name {}'.
                                format(fName, i + 1, Nname),
                            )
    serverprint(
        'INFO   : {:>3} N. names in {:>4} occurrences'.format(
            len(names), occs
        )
    )
    unusedNames = extraNames - set(Nnames)
    lun = len(unusedNames)
    if lun:
        for name in sorted(unusedNames):
            serverprint('WARNING: unused name {}'.format(name), )
        serverprint(
            'WARNING: {:>3} unused name{} in names section of {}'.format(
                lun,
                '' if lun == 1 else 's',
                modelSource,
            ),
        )
    else:
        serverprint(
            'INFO   : no unused  names in names section of {}'.format(
                modelSource,
            )
        )
    if nfound:
        serverprint(
            'WARNING: {:>3} string  name{} in controllers'.format(
                nfound,
                '' if nfound == 1 else 's',
            ),
        )
    else:
        serverprint('INFO   : no string  names in controllers')
    if Nfound:
        serverprint(
            'WARNING: {:>3} unknown name{} in controllers'.format(
                Nfound,
                '' if Nfound == 1 else 's',
            ),
        )
    else:
        serverprint('INFO   : no unknown names in controllers')


def doRoot():
    tableData = {}
    with open(modelSource) as sh:
        topData = yaml.load(sh)

    for path in glob('{}/*.yaml'.format(tableSource)):
        table = os.path.splitext(os.path.basename(path))[0]
        serverprint('\treading table {}.yaml'.format(table))
        with open(path) as sh:
            tableData[table] = yaml.load(sh)

    (modelData, names, extraNames) = combine(topData, tableData)

    with open(modelFile, 'w') as mh:
        pp = pprint.PrettyPrinter(
            indent=2, width=100, compact=False, stream=mh
        )
        mh.write('model = ')
        pp.pprint(modelData)

    with open(namesFile, 'w') as nh:
        nh.write('''
class N:
''')
        for name in sorted(n for n in names if not iskeyword(n)):
            nh.write(putName(name))
        for name in sorted(n for n in names if iskeyword(n)):
            nh.write(putNameK(name))

    checkNames(names, extraNames)


doRoot()
