from itertools import chain
from markdown import markdown

from controllers.config import Config as C, Names as N
from controllers.html import HtmlElements as H, htmlEscape as he
from controllers.utils import (
    bencode,
    getNumberAsStr, getDatetimeAsStr,
    E, BLANK, WHYPHEN, AT, EURO
)

CT = C.table
CW = C.web


SCALAR_TYPES = set(CT.scalarTypes)
SPECIAL_TYPES = set(CT.specialTypes)
NUMERIC_TYPES = set(CT.numericTypes)
TEXT_TYPES = set(CT.textTypes)
BOOLEAN_TYPES = CT.boolTypes
WIDGET_TYPES = CT.widgetTypes

REFRESH = CW.messages[N.refresh]
QQ = CW.unknown[N.generic]
ZERO = CW.unknown[N.number]

WIDGET_FROM_TYPE = {
    tp: w
    for (w, tp) in chain.from_iterable(
        ((w, tp) for tp in tps)
        for (w, tps) in WIDGET_TYPES.items()
    )
}

WIDGET_RELATED = N.related


def labelDiv(label):
  return H.div(
      f"""{label}:""",
      cls="record-label",
  )


def getTitle(
    db, auth, table, isUserTable, record, markup=False, asEdit=False, active=None,
):
  titleText = ''

  if isUserTable:
    titleText = he(record.get(N.title, None)) or QQ

  elif table in SPECIAL_TYPES:
    if table == N.user:
      titleText = he(auth.identity(record))

    elif table == N.country:
      titleText = he(record.get(N.iso, None)) or QQ

    elif table == N.typeContribution:
      mainType = record.get(N.mainType, E)
      subType = record.get(N.subType, E)
      sep = WHYPHEN if mainType and subType else E
      titleText = he(f"""{mainType}{sep}{subType}""")

    elif table == N.criteria:
      titleText = he(record.get(N.criterion, None)) or QQ

    elif table == N.score:
      score = he(record.get(N.score, None)) or QQ
      level = he(record.get(N.level, None)) or QQ
      titleText = f"""{score} - {level}"""

  else:
    titleText = he(record.get(N.rep, record.get(N.title, None))) or QQ

  if markup:
    eid = record.get(N._id, None)
    atts = dict(
        cls=(
            f'{"label" if active == eid else "button"} medium field'
            if asEdit else
            "tag"
        ),
    )
    if asEdit:
      if eid is not None:
        atts['eid'] = str(eid)
        if eid == active:
          atts['cls'] = "tag active"

    if isUserTable:
      pass

    elif not isUserTable and table in SPECIAL_TYPES:
      if table == N.country:
        atts['title'] = record.get(N.name, QQ)

      elif table == N.typeContribution:
        atts['title'] = record.get(N.explanation, E)

    titleFormatted = H.span(
        titleText,
        **atts,
    )

    return (titleText, titleFormatted)

  else:
    return titleText


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

  def title(self, record, markup=False, asEdit=False, active=None):
    db = self.db
    auth = self.auth
    tp = self.tp
    return getTitle(
        db, auth, tp, False, record, markup=markup, asEdit=asEdit, active=active,
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

  def formatOrig(self, v):
    tp = self.tp
    if tp in BOOLEAN_TYPES:
      return v
    if tp not in SCALAR_TYPES:
      return v if v is None else str(v)
    return str(v)

  def valueEdDiv(self):
    tp = self.tp
    multiple = self.multiple
    value = self.value
    wType = WIDGET_FROM_TYPE.get(tp, WIDGET_RELATED)
    self.collapseMultiple = tp not in SCALAR_TYPES

    button = H.icon(
        N.eye,
        cls="button small field",
        action=N.view,
        **self.atts,
    )
    rep = self.getValueEd()
    origFmt = self.formatOrig
    origStr = (
        [
            origFmt(val)
            for val in value or []
        ]
        if multiple else
        origFmt(value)
    )
    atts = dict(
        orig=bencode(origStr),
        wtype=wType,
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
    multiple = self.multiple
    collapseMultiple = self.collapseMultiple
    value = self.value

    widget = (
        H.div(
            [
                self.formatEd(val)
                for val in (value or []) + [E]
            ],
            cls="values",
        )
        if multiple and not collapseMultiple else
        self.formatEd(value)
    )

    return widget

  # DISPLAY READONLY VALUES

  def formatRO(self, v):
    tp = self.tp
    if tp in SCALAR_TYPES:
      method = getattr(self, f'display_{tp}')
      return method(v)
    return self.displayRelated(v)

  def display_markdown(self, v):
    return H.div(markdown(v or QQ))

  def display_text(self, v):
    return H.span(he(v or QQ))

  def display_email(self, v):
    val = he(v or QQ)
    return (
        H.a(val, f"""{N.mailto}:{val}""")
        if AT in val else
        H.span(val, cls="error")
    )

  def display_url(self, v):
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
    return (
        H.a(val, raw)
        if isLink else
        H.span(val, cls="error")
    )

  def display_int(self, v):
    return H.span(he(v or ZERO))

  def display_decimal(self, v):
    return H.span(he(v or ZERO))

  def display_money(self, v):
    return H.span(EURO + BLANK + he(v or ZERO))

  def display_bool2(self, v):
    values = BOOLEAN_TYPES[N.bool2]
    return H.icon(
        values.get(v, values[False]),
        cls="label medium field",
    )

  def display_bool3(self, v):
    values = BOOLEAN_TYPES[N.bool3]
    return H.icon(
        values.get(v, values[None]),
        cls="label medium field",
    )

  def display_datetime(self, v):
    return H.span(he(v or QQ))

  def displayRelated(self, v):
    tp = self.tp

    record = getattr(self.db, tp).get(v, {})
    return self.title(record, markup=True)[1]

  # WIDGETS FOR EDITING VALUES

  def formatEd(self, v):
    tp = self.tp
    wType = WIDGET_FROM_TYPE.get(tp, WIDGET_RELATED)
    method = getattr(self, f'widget_{wType}')
    return method(v)

  def widget_text(self, v):
    tp = self.tp
    atts = {}
    passV = v
    wtp = tp
    if tp in NUMERIC_TYPES:
      wtp = 'number'
      atts = dict(step=1)
      passV = (
          v
          if type(v) is str else
          str(v)
          if tp == N.decimal else
          getNumberAsStr(v)
      ) or 0
    elif tp in TEXT_TYPES:
      if tp == N.url:
        atts = dict(pattern=f"""{N.http}s?://.+\\..+""")
      passV = v or E
    elif tp == N.datetime:
      passV = getDatetimeAsStr(v)

    return H.input(
        passV,
        **atts,
        type=wtp,
        wvalue=N.text,
    )

  def widget_markdown(self, v):
    passV = v or E
    return H.textarea(
        passV,
        wvalue=N.markdown,
    )

  def widget_bool(self, v):
    tp = self.tp

    refDefault = False if tp == N.bool2 else None
    values = BOOLEAN_TYPES[tp]
    refV = values.get(v, values[refDefault])
    return H.div(
        [
            H.icon(
                values[w],
                cls=f"{boolActive(values[w], refV)} medium field",
            )
            for w in values
        ],
        wvalue=N.bool,
    )

  def widget_related(self, v):
    db = self.db
    tp = self.tp

    return H.div(
        [
            formatted
            for (text, formatted) in sorted(
                (
                    self.title(record, markup=True, asEdit=True, active=v)
                    for record in [{}] + db.getValueRecords(tp)
                ),
                key=lambda x: x[0].lower()
            )
        ],
        wvalue=N.related,
    )


def boolActive(v, w):
  return (
      "label active"
      if v is w else
      "button"
  )
