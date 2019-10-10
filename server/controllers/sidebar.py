from flask import request

from controllers.config import Config as C, Names as N
from controllers.html import HtmlElements as H
from controllers.utils import E
from controllers.table import Table

CT = C.table
CW = C.web


SORTED_TABLES = CT.sorted

HOME = CW.urls[N.home]
OPTIONS = CW.options


class Sidebar(object):
  def __init__(self, db, auth, path):
    self.db = db
    self.auth = auth
    self.path = path
    self.entries = []
    self.mainEntries = []
    self.userEntries = []
    self.userPaths = []
    self.userEntryEntries = []
    self.userEntryPaths = []
    self.valueEntries = []
    self.valuePaths = []

  def makeCaption(self, label, path, entries, rule=False):
    if not entries:
      return E

    refPath = self.path
    active = (
        refPath.startswith(path)
        if type(path) is str else
        any(refPath.startswith(p) for p in path)
    )
    navClass = " active" if active else E
    atts = dict(cls=f"nav {navClass}", itemkey=label)
    if rule:
      atts['addClass'] = " ruleabove"
    return H.details(label, entries, **atts)

  def makeEntry(self, label, path, options=None):
    active = path == self.path

    navClass = "button small nav" + (" active" if active else E)
    return (
        H.a(label, path, cls=navClass)
        if options is None else
        H.a(label, E, hrefpre=path, cls=navClass)
    )

  def makeOptions(self, options):
    return [
        H.span(
            [
                H.checkbox(option, trival=request.args.get(option, '0')),
                OPTIONS[option][N.label],
            ],
            cls=N.option,
        )
        for option in options
    ]

  def tableEntry(self, table):
    db = self.db
    auth = self.auth

    tableObj = Table(db, auth, table)
    isMainTable = tableObj.isMainTable
    isUserTable = tableObj.isUserTable
    isUserEntryTable = tableObj.isUserEntryTable
    isValueTable = tableObj.isValueTable
    itemPlural = tableObj.itemLabels[1]

    isAuth = auth.authenticated()
    isSuperUser = auth.superuser()
    isSysAdmin = auth.sysadmin()
    country = auth.country()

    options = list(OPTIONS.keys())

    if isMainTable:
      entries = []
      entries.extend(self.makeOptions(options))

      if isAuth:
        entries.append(
            self.makeEntry(
                f"""my {itemPlural}""",
                f"""/{table}/{N.mylist}""",
                options=options,
            )
        )

      if country:
        iso = country.get(N.iso, None)
        if iso:
          entries.append(
              self.makeEntry(
                  f"""{iso} {itemPlural}""",
                  f"""/{table}/{N.ourlist}""",
                  options=options,
              )
          )

      entries.append(
          self.makeEntry(
              f"""all {itemPlural}""",
              f"""/{table}/list""",
              options=options,
          )
      )

      if isAuth:
        entries = [
            self.makeCaption(table, f'/{table}/', entries)
        ]

      self.mainEntries.extend(entries)
      return

    if isUserTable:
      if isSuperUser:
        self.userEntries.append(
            self.makeEntry(
                f"""{itemPlural}""",
                f"""/{table}/list""",
            )
        )
        self.userPaths.append(f'/{table}/')
      return

    if isUserEntryTable:
      if isSysAdmin:
        self.userEntries.append(
            self.makeEntry(
                f"""{itemPlural}""",
                f"""/{table}/list""",
            )
        )
        self.userPaths.append(f'/{table}/')

    if isValueTable:
      if isSuperUser:
        self.valueEntries.append(
            self.makeEntry(
                f"""{itemPlural}""",
                f"""/{table}/list""",
            )
        )
        self.valuePaths.append(f'/{table}/')
      return

  def wrap(self):
    entries = self.entries
    entries.append(
        self.makeEntry(HOME[N.text], HOME[N.url])
    )

    for table in SORTED_TABLES:
      self.tableEntry(table)

    return (
        E.join(self.mainEntries)
        +
        self.makeCaption(
            'User tables',
            self.userPaths,
            self.userEntries,
            rule=True,
        )
        +
        self.makeCaption(
            'Value tables',
            self.valuePaths,
            self.valueEntries,
            rule=True,
        )
    )
