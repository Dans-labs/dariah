from markdown import markdown

from controllers.config import Config as C, Names as N
from controllers.html import HtmlElements as H, htmlEscape as he
from controllers.utils import dtm, bencode, E, BLANK, WHYPHEN, AT, EURO, ONE


tableConfig = C.table

SCALAR_TYPES = tableConfig[N.scalarTypes]

WIDGET_FROM_TYPE = dict(
    text=(N.text, None),
    string=(N.input, N.text),
    email=(N.input, N.email),
    url=(N.input, N.url),
    int=(N.input, N.number),
    decimal=(N.input, N.number),
    money=(N.input, N.number),
    bool=(N.input, N.checkbox),
    bool3=(N.input, N.checkbox),
    datetime=(N.input, N.text),
)
WIDGET_RELATED = (N.related, None)

NUMERIC = tableConfig[N.numericTypes]

REFRESH = C.html[N.messages][N.refresh]
QQ = C.html[N.unknown][N.generic]
ZERO = C.html[N.unknown][N.number]


def labelDiv(label):
  return H.div(
      f"""{label}:""",
      cls="record-label",
  )


def getTitle(db, auth, table, isUser, isValue, record):
  if isUser:
    return he(record.get(N.title, None)) or QQ

  if table == N.user:
    return he(auth.identity(record))

  if table == N.country:
    return he(record.get(N.iso, None)) or QQ

  if table == N.typeContribution:
    mainType = record.get(N.mainType, E)
    subType = record.get(N.subType, E)
    sep = WHYPHEN if mainType and subType else E
    return he(f"""{mainType}{sep}{subType}""")

  if table == N.criteria:
    return he(record.get(N.criterion, None)) or QQ

  if table == N.score:
    score = he(record.get(N.score, None)) or QQ
    level = he(record.get(N.level, None)) or QQ
    return f"""{score} - {level}"""

  return he(record.get(N.rep, record.get(N.title, None))) or QQ


class Field(object):
  def __init__(self, db, auth, table, eid, field, mayEdit, label, tp, multiple, value):
    self.db = db
    self.auth = auth
    self.table = table
    self.eid = eid
    self.field = field
    self.mayEdit = mayEdit
    self.label = label
    self.tp = tp
    self.multiple = multiple
    self.value = value
    self.atts = (
        dict(
            table=self.table,
            eid=self.eid,
            field=self.field,
        )
    )

  def wrap(self, action, withRefresh):
    self.withRefresh = withRefresh
    mayEdit = self.mayEdit

    asEdit = mayEdit and action == N.edit
    editClass = " edit" if asEdit else E
    rep = self.valueEdDiv() if asEdit else self.valueRODiv()

    if action is not None:
      return E.join(rep)

    return (
        H.div(
            [
                labelDiv(self.label),
                H.div(
                    rep,
                    cls=f"record-value {editClass}",
                ),
            ],
            cls="record-row",
        )
    )

  def valueRODiv(self):
    button = (
        H.icon(
            N.pencil,
            cls="button small field",
            action=N.edit,
            **self.atts,
        )
        if self.mayEdit else
        H.icon(
            N.refresh,
            cls="button small field",
            action=N.view,
            title=REFRESH,
            **self.atts,
        )
        if self.withRefresh else
        E
    )
    rep = self.getValueRO()

    return [button, rep]

  def valueEdDiv(self):
    tp = self.tp
    multiple = self.multiple
    value = self.value

    button = H.icon(
        N.eye,
        cls="button small field",
        action=N.save,
        **self.atts,
    )
    rep = self.getValueEd()
    origStr = (
        (
            [str(val) for val in value]
            if multiple else
            str(value)
        )
        if tp in NUMERIC else
        value
    )
    atts = dict(
        orig=bencode(origStr),
    )
    if multiple:
      atts[N.multiple] = True
    widget = H.div(
        rep,
        **atts,
        cls="value",
    )
    return [button, widget]

  def getValueRO(self):
    tp = self.tp
    multiple = self.multiple
    value = self.value
    cls = "values" if tp in SCALAR_TYPES else "tags"

    rep = (
        H.div(
            [
                self.formatRO(val)
                for val in value or []
            ],
            cls=cls,
        )
        if multiple else
        H.div(
            self.formatRO(value),
            cls="value",
        )
    )

    return rep

  def getValueEd(self):
    tp = self.tp
    multiple = self.multiple
    value = self.value

    (wName, wType) = WIDGET_FROM_TYPE.get(tp, WIDGET_RELATED)

    widget = (
        H.div(
            [
                self.formatEd(wName, wType, val)
                for val in (value or []) + [E]
            ],
            cls="values",
        )
        if multiple else
        self.formatEd(wName, wType, value)
    )

    return widget

  def formatRO(self, v):
    tp = self.tp

    if tp == N.text:
      return H.div(markdown(v or QQ))

    if tp == N.string:
      return H.span(he(v or QQ))

    if tp == N.email:
      val = he(v or QQ)
      return H.a(val, f"""{N.mailto}:{val}""") if AT in val else val

    if tp == N.url:
      raw = v or E
      val = he(raw or QQ)
      isWww = raw.startswith(f"""{N.www}.""")
      isLink = (
          isWww or
          raw.startswith(f"""{N.http}://""") or
          raw.startswith(f"""{N.https}://""")
      )
      if isWww:
        raw = f"""{N.https}://{raw}"""
      return H.a(val, raw) if isLink else val

    if tp == N.int or tp == N.decimal:
      return H.span(he(v or ZERO))

    if tp == N.money:
      return H.span(EURO + BLANK + he(v or ZERO))

    if tp == N.bool:
      atts = dict(readonly=True)
      if v:
        atts[N.checked] = True
      return H.input(E, type=N.checkbox, **atts)

    if tp == N.bool3:
      return H.span(
          QQ
          if v is None else
          N.Yes
          if v else
          N.No
      )

    if tp == N.datetime:
      return H.span(he(f"""{dtm(v.isoformat())[1]}""") if v else QQ)

    if tp == N.user:
      record = self.db.user.get(v, {})
      return H.span(
          he(self.auth.identity(record)),
          cls="tag",
      )

    if tp == N.country:
      record = self.db.country.get(v, {})
      return H.span(
          str(record.get(N.iso, QQ)),
          title=str(record.get(N.name, QQ)),
          cls="tag",
      )

    if tp == N.typeContribution:
      record = self.db.typeContribution.get(v, {})
      mainType = record.get(N.mainType, E)
      subType = record.get(N.subType, E)
      sep = WHYPHEN if mainType and subType else E
      explanation = record.get(N.explanation, E)
      active = record.get(N.active, False)
      inactive = E if active else " inactive"
      return H.span(
          f"""{mainType}{sep}{subType}""",
          title=explanation,
          cls=f"tag{inactive}",
      )

    if tp == N.criteria:
      record = self.db.criteria.get(v, {})
      return H.span(
          str(record.get(N.criterion, QQ)),
          cls="tag",
      )

    if tp == N.score:
      record = self.db.score.get(v, {})
      score = str(record.get(N.score, QQ))
      level = record.get(N.score, QQ)
      return H.span(
          f"""{score} - {level}""",
          cls="tag",
      )

    record = getattr(self.db, tp).get(v, {})
    return H.span(
        str(record.get(N.rep, record.get(N.title, QQ))),
        cls="tag",
    )

  def formatEd(self, wName, wType, v):
    if wName == N.input:
      atts = {}
      passV = v
      if wType == N.checkbox:
        atts = dict(checked=True) if v else {}
        passV = ONE
      elif wType in NUMERIC:
        atts = dict(step=1)
        passV = (
            v
            if type(v) is str else
            str(v)
            if wType == N.decimal else
            str(int(round(v)))
        )
      elif wType == N.url:
        atts = dict(pattern=f"""{N.http}s?://.+\\..+""")

      return H.input(self.trimEd(passV), **atts, type=wType, hasvalue=True)

    if wName == N.text:
      return H.textarea(self.trimEd(v), hasvalue=True)

    if wName == N.related:
      return self.formatRO(v)

  def trimEd(self, v):
    tp = self.tp
    return v or (0 if tp in NUMERIC else E),
