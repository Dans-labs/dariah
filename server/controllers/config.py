import os
import yaml

from controllers.utils import E, LOW

CONFIG_EXT = '.yaml'
CONFIG_DIR = 'yaml'
TABLE_DIR = 'tables'

ALL = 'all'


def isName(val):
    return val.replace(LOW, E).isalnum()


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

with os.scandir(TABLE_DIR) as sd:
  files = tuple(e.name for e in sd if e.is_file() and e.name.endswith(CONFIG_EXT))

tables = set()

for tableFile in files:
  table = os.path.splitext(tableFile)[0]
  with open(f"""{TABLE_DIR}/{table}{CONFIG_EXT}""") as fh:
    specs = yaml.load(fh)
  setattr(Tables, table, specs)
  tables.add(table)
  names |= getNames(specs)
names |= tables

for n in sorted(names):
  setattr(Names, n, n)

N = Names

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
