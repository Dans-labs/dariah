from controllers.config import Config as C, Names as N, Tables as T
from controllers.html import HtmlElements as H
from controllers.utils import E

HOME = C.html[N.urls][N.home]

KINDS = C.table[N.kinds]
MAIN_TABLE = KINDS[N.main]
USER_TABLES = set(KINDS[N.user])
ITEM_NAMES = KINDS[N.items]

ALL_TABLES = T.all

SORTED_TABLES = (
    [MAIN_TABLE] +
    sorted(USER_TABLES - {MAIN_TABLE}) +
    sorted(ALL_TABLES - USER_TABLES - {MAIN_TABLE})
)


class Sidebar(object):
  def __init__(self, db, auth, path):
    self.db = db
    self.auth = auth
    self.path = path
    self.entries = []

  def addCaption(self, label, path):
    entries = self.entries
    active = path == self.path.startswith(path)
    navClass = "label medium" + (" active" if active else E)
    rep = H.div(label, cls=navClass)
    entries.append(rep)

  def addEntry(self, label, path):
    entries = self.entries
    active = path == self.path

    navClass = "button small nav" + (" active" if active else E)
    rep = H.a(label, path, cls=navClass)
    entries.append(rep)

  def tableEntry(self, table):
    auth = self.auth

    itemPlural = ITEM_NAMES.get(table, [table, f'{table}s'])[1]

    isAuth = auth.authenticated()
    isSuperUser = auth.superuser()
    country = auth.country()
    isUserTable = table in USER_TABLES

    if isUserTable or isSuperUser:
      self.addCaption(table, f'/{table}')
    if isUserTable:
      if isAuth:
        self.addEntry(f'My {itemPlural}', f'/{table}/{N.mylist}')

      if country:
        iso = country.get(N.iso, None)
        if iso:
          self.addEntry(f'{itemPlural} from {iso}', f'/{table}/{N.ourlist}')

    if isUserTable or isSuperUser:
      self.addEntry(f'All {itemPlural}', f'/{table}/list')

  def wrap(self):
    self.addEntry(HOME[N.text], HOME[N.url])

    for table in SORTED_TABLES:
      self.tableEntry(table)

    return E.join(self.entries)
