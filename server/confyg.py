import sys,os,collections,re,yaml
from glob import glob

from controllers.utils import serverprint

models = sys.argv[1]
controllers = sys.argv[2]
namesFile = '{}/names.py'.format(models)

def isName(val): return val.replace('_','').isalnum()

def getNames(val, doString=True):
    if type(val) is str: return {val} if doString and isName(val) else set()
    elif type(val) is list: return {v for v in val if type(v) is str and isName(v)}
    elif type(val) is dict: 
        names = set()
        for (k, v) in val.items():
            if isName(k): names.add(k)
            names |= getNames(v, doString=False)
        return names
    return set()

def putName(name): return "N_{:<20} = '{}'\n".format(name, name)

def doRoot(models):
    names = set()

    for path in glob('{}/*.yaml'.format(models)):
        fName = os.path.splitext(os.path.basename(path))[0]
        model = fName[0].upper()+fName[1:]
        serverprint('\t{}: .yaml => .py'.format(fName))
        src = '{}/{}.yaml'.format(models, fName)
        dst = '{}/{}.py'.format(models, fName)
        with open(src) as sh:
            data = yaml.load(sh)
            names |= getNames(data)
            with open(dst, 'w') as dh:
                dh.write('{}Model = {}'.format(model, repr(data)))

    with open(namesFile, 'w') as nh:
        for name in sorted(names):
            nh.write(putName(name))
    return names

def checkNames(controllers, names):
    quote = '[{}{}]'.format("'", '"')
    namesPat = '{}{}{}'.format(quote, '{}|{}'.format(quote, quote).join(sorted(names, key=lambda n: (-len(n), n))), quote)
    namesRe = re.compile(namesPat)
    NamesRe = re.compile('N_[A-Za-z0-9_]*')
    nfound = 0
    Nfound = 0
    occs = 0
    for path in glob('{}/*.py'.format(controllers)):
        fName = os.path.splitext(os.path.basename(path))[0]
        with open(path) as ph:
            for (i, line) in enumerate(ph):
                line = line.strip()
                matches = namesRe.findall(line)
                if matches:
                    for match in matches:
                        nfound += 1
                        serverprint('WARNING: {:<10}: line {:>3}: string  name {}'.format(fName, i, match))
                matches = NamesRe.findall(line)
                if matches:
                    for match in matches:
                        occs += 1
                        if match[2:] not in names:
                            Nfound += 1
                            serverprint('WARNING: {:<10}: line {:>3}: unknown name {}'.format(fName, i, match))
    serverprint('INFO   : {:>3} N_ names in {:>4} occurrences'.format(len(names), occs)) 
    if nfound:
        serverprint('WARNING: {:>3} string  name{} in controllers'.format(nfound, '' if nfound == 1 else 's'))
    else:
        serverprint('INFO   : no string  names in controllers')
    if Nfound:
        serverprint('WARNING: {:>3} unknown name{} in controllers'.format(Nfound, '' if Nfound == 1 else 's'))
    else:
        serverprint('INFO   : no unknown names in controllers')

names = doRoot(models)
checkNames(controllers, names)
