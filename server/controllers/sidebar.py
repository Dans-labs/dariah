from flask import request

from controllers.config import Config as C, Names as N
from controllers.html import HtmlElements as H
from controllers.utils import E, Q, AMP, ZERO
from controllers.table import Table

CT = C.tables
CW = C.web


SORTED_TABLES = CT.sorted

HOME = CW.urls[N.home]
OPTIONS = CW.options
CAPTIONS = CW.captions


class Sidebar(object):
  def __init__(self, control, path):
    self.control = control
    self.path = path
    self.entries = []
    self.mainEntries = []
    self.userEntries = []
    self.userPaths = []
    self.userEntryEntries = []
    self.userEntryPaths = []
    self.valueEntries = []
    self.valuePaths = []
    self.options = {
        option: request.args.get(option, ZERO)
        for option in OPTIONS.keys()
    }

  def makeCaption(self, label, path, entries, rule=False):
    if not entries:
      return E

    refPath = self.path
    active = (
        refPath.startswith(f"""/{path}/""")
        if type(path) is str else
        any(refPath.startswith(f"""/{p}/""") for p in path)
    )
    navClass = " active" if active else E
    atts = dict(
        cls=f"nav {navClass}",
    )
    itemkey = path if type(path) is str else label
    if rule:
      atts[N.addClass] = " ruleabove"

    entriesRep = H.div(entries, cls="sidebarsec")
    return H.details(label, entriesRep, itemkey, **atts)

  def makeEntry(self, label, path, withOptions=False):
    options = self.options
    active = path == self.path

    navClass = "button small nav" + (" active" if active else E)

    optionsRep = (
        AMP.join(
            f"""{name}={value}"""
            for (name, value) in options.items()
        )
        if withOptions else
        E
    )
    if optionsRep:
      optionsRep = Q + optionsRep

    return H.a(label, path + optionsRep, hrefbase=path, cls=navClass)

  def makeOptions(self):
    options = self.options

    filterRep = [
        H.input(
            E,
            type=N.text,
            id="cfilter",
            placeholder="match title",
        ),
    ]
    optionsRep = [
        H.span(
            [
                H.checkbox(name, trival=value),
                OPTIONS[name][N.label],
            ],
            cls=N.option,
        )
        for (name, value) in options.items()
    ]

    return filterRep + optionsRep

  def tableEntry(self, table):
    control = self.control
    auth = control.auth

    tableObj = Table(control, table)
    isMainTable = tableObj.isMainTable
    isUserTable = tableObj.isUserTable
    isUserEntryTable = tableObj.isUserEntryTable
    isValueTable = tableObj.isValueTable
    itemPlural = tableObj.itemLabels[1]

    isAuth = auth.authenticated()
    isSuperUser = auth.superuser()
    isSysAdmin = auth.sysadmin()
    country = auth.country()

    if isMainTable:
      entries = []
      entries.extend(self.makeOptions())

      if isAuth:
        entries.append(
            self.makeEntry(
                f"""my {itemPlural}""",
                f"""/{table}/{N.mylist}""",
                withOptions=True,
            )
        )

      if country:
        iso = country.get(N.iso, None)
        if iso:
          entries.append(
              self.makeEntry(
                  f"""{iso} {itemPlural}""",
                  f"""/{table}/{N.ourlist}""",
                  withOptions=True,
              )
          )

      entries.append(
          self.makeEntry(
              f"""all {itemPlural}""",
              f"""/{table}/list""",
              withOptions=True,
          )
      )

      entries = [
          self.makeCaption("""Contributions""", table, entries)
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
        self.userPaths.append(table)
      return

    if isUserEntryTable:
      if isSysAdmin:
        self.userEntries.append(
            self.makeEntry(
                f"""{itemPlural}""",
                f"""/{table}/list""",
            )
        )
        self.userPaths.append(table)

    if isValueTable:
      if isSuperUser:
        self.valueEntries.append(
            self.makeEntry(
                f"""{itemPlural}""",
                f"""/{table}/list""",
            )
        )
        self.valuePaths.append(table)
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
            CAPTIONS[N.user],
            self.userPaths,
            self.userEntries,
            rule=True,
        )
        +
        self.makeCaption(
            CAPTIONS[N.office],
            self.valuePaths,
            self.valueEntries,
            rule=True,
        )
    )
