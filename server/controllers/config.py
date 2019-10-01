import os
import yaml

from controllers.utils import E, LOW, HYPHEN

CONFIG_EXT = '.yaml'
CONFIG_DIR = 'yaml'
TABLE_DIR = 'tables'

ALL = 'all'


def isName(val):
    return val.replace(LOW, E).replace(HYPHEN, E).isalnum()


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


def setName(val):
  return (val.replace(HYPHEN, LOW), val)


class Config(object):
  pass


class Tables(object):
  pass


class Names(object):
  pass


names = set()

with os.scandir(CONFIG_DIR) as sd:
  files = tuple(e.name for e in sd if e.is_file() and e.name.endswith(CONFIG_EXT))
for configFile in files:
  section = os.path.splitext(configFile)[0]
  with open(f"""{CONFIG_DIR}/{section}{CONFIG_EXT}""") as fh:
    settings = yaml.load(fh)
  setattr(Config, section, settings)
  names |= getNames(settings)

for n in names:
  setattr(Names, *setName(n))

namesDone = names
names = set()

N = Names
C = Config

tableConfig = C.table
SCALAR_TYPES = set(tableConfig[N.scalarTypes])

with os.scandir(TABLE_DIR) as sd:
  files = tuple(e.name for e in sd if e.is_file() and e.name.endswith(CONFIG_EXT))

tables = set()
reference = {}

for tableFile in files:
  table = os.path.splitext(tableFile)[0]
  with open(f"""{TABLE_DIR}/{table}{CONFIG_EXT}""") as fh:
    specs = yaml.load(fh)
    for (field, fieldSpecs) in specs.items():
      fieldType = fieldSpecs.get(N.type, None)
      if fieldType not in SCALAR_TYPES:
        reference.setdefault(fieldType, set()).add((table, field))
  setattr(Tables, table, specs)
  tables.add(table)
  names |= getNames(specs)
names |= tables

for n in names - namesDone:
  setattr(Names, *setName(n))

tableInfo = Config.table[N.kinds]
mainTable = tableInfo[N.mainTable]
userTables = set(tableInfo[N.userTables])
valueTables = set(tableInfo[N.valueTables])

tables = (
    tables |
    userTables |
    valueTables
)
sortedTables = (
    [mainTable] +
    sorted(userTables - {mainTable}) +
    sorted(tables - userTables - {mainTable})
)

setattr(Tables, ALL, tables)
setattr(Tables, N.mainTable, mainTable)
setattr(Tables, N.userTables, userTables)
setattr(Tables, N.valueTables, valueTables)
setattr(Tables, N.sorted, sortedTables)
setattr(Tables, N.items, tableInfo[N.items])
setattr(Tables, N.reference, reference)
