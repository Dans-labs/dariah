from controllers.config import Config as C, Names as N, Tables as T
from controllers.html import HtmlElements as H
from controllers.utils import E
from controllers.table import Table

HOME = C.html[N.urls][N.home]


class Sidebar(object):
  def __init__(self, db, auth, path):
    self.db = db
    self.auth = auth
    self.path = path
    self.entries = []

  def makeCaption(self, label, path, entries, open=False):
    active = self.path.startswith(path)
    navClass = " active" if active else E
    atts = dict(cls=f"nav {navClass}")
    if open:
      atts['open'] = True
    return H.details(label, entries, **atts)

  def makeEntry(self, label, path):
    active = path == self.path

    navClass = "button small nav" + (" active" if active else E)
    return H.a(label, path, cls=navClass)

  def tableEntry(self, table):
    db = self.db
    auth = self.auth

    tableObj = Table(db, auth, table)
    isMainTable = tableObj.isMainTable
    isUserTable = tableObj.isUserTable
    isValueTable = tableObj.isValueTable
    itemPlural = tableObj.itemLabels[1]

    isAuth = auth.authenticated()
    isSuperUser = auth.superuser()
    country = auth.country()

    entries = []

    if isUserTable:
      if isAuth:
        entries.append(
            self.makeEntry(
                f"""My {itemPlural}""",
                f"""/{table}/{N.mylist}"""
            )
        )

      if country:
        iso = country.get(N.iso, None)
        if iso:
          entries.append(
              self.makeEntry(
                  f"""{itemPlural} from {iso}""",
                  f"""/{table}/{N.ourlist}"""
              )
          )

    if isUserTable or isSuperUser:
      prefix = '' if isValueTable else """All """
      entries.append(
          self.makeEntry(
              f"""{prefix}{itemPlural}""",
              f"""/{table}/list"""
          )
      )

    if isUserTable and isAuth:
      entries = [
          self.makeCaption(table, f'/{table}', entries, open=isMainTable)
      ]
    self.entries.extend(entries)

  def wrap(self):
    entries = self.entries
    entries.append(
        self.makeEntry(HOME[N.text], HOME[N.url])
    )

    for table in T.sorted:
      self.tableEntry(table)

    return E.join(self.entries)
