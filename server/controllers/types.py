import re
from datetime import datetime as dt

from markdown import markdown
from bson.objectid import ObjectId

from controllers.config import Config as C, Names as N
from controllers.html import HtmlElements as H, htmlEscape as he
from controllers.utils import (
    serverprint, bencode, now, cap1,
    E, DOT, MIN, EURO, WHYPHEN, NBSP,
)


CT = C.tables
CW = C.web

SCALAR_TYPES = set(CT.scalarTypes)
BOOLEAN_TYPES = CT.boolTypes
VALUE_TABLES = CT.valueTables
USER_TABLES = CT.userTables
USER_ENTRY_TABLES = CT.userEntryTables

QQ = CW.unknown[N.generic]
QN = CW.unknown[N.number]
MESSAGES = CW.messages


stripNonnumeric = re.compile(r'[^-0-9.,]')
stripFraction = re.compile(r'[.,][0-9]*$')
stripDecimal = re.compile(r'[.,]')
stripLeading = re.compile(r'^0+')
decimalSep = re.compile(r'[.,]+')
urlStart = re.compile(r'^https?://', re.I)
urlTrim = re.compile(r'^([htps:/]*)')
dtTrim = re.compile(r'[^0-9  T/:.-]+')
dtSep = re.compile(r'[ T/:.-]+')


TODAY = now()
DEFAULT_DATE = (
    TODAY.year,
    TODAY.month,
    TODAY.day,
    TODAY.hour,
    TODAY.minute,
    TODAY.second,
)
DATETIME_FORMAT = """{:>04}-{:>02}-{:>02} {:>02}:{:>02}:{:>02}"""


def genDatetimePattern():
  s = """[ /:.-]"""
  t = """[T /:.-]"""
  yr = f"""([12][0-9][0-9][0-9])"""
  mth = f"""((0[1-9])|(1[0-2])|[1-9])"""
  d = f"""((0[1-9])|([12][0-9])|(3[01])|[1-9])"""
  hr = f"""(([0-5][0-9])|[0-9])"""
  m = hr
  sec = hr
  return (
      """^"""
      f"""{yr}?({s}{mth})?({s}{d})?({t}{hr})?({s}{m})?({s}{sec})?"""
      """Z?"""
      """$"""
  )


DATETIME_PATTERN = genDatetimePattern()


""" General remarks on type classes

normalize:
  - takes a string rep
    and turns it into a normalized string rep

fromStr:
  - takes a string rep coming from an edit widget
    and turns it into a real value that can be saved

toDisplay:
  - takes a real value
    and turns it into a string for readonly display

toEdit:
  - takes a real value
    and turns it into a string for editable display

toOrig:
  - takes a real value
    and turns it into an (original) value
    for comparison with newly entered values
    at the client side.

    The delivered value must be represented using only
    - None
    - Boolean values
    - string values
"""


class TypeBase(object):
  widgetType = None
  pattern = None
  rawType = None
  needsDb = False
  needsAuth = False

  def normalize(self, strVal):
    return str(strVal).strip()

  def fromStr(self, editVal):
    if not editVal:
      return None
    val = self.normalize(editVal)
    cast = self.rawType
    return val if cast is None else cast(val)

  def toDisplay(self, val):
    return H.span(
        QQ
        if val is None else
        he(self.normalize(str(val)))
    )

  def toEdit(self, val):
    return (
        E
        if val is None else
        self.normalize(str(val))
    )

  def toOrig(self, val):
    if val is None:
      return None
    return str(val)

  def widget(self, val):
    atts = {}
    if self.pattern:
      atts['pattern'] = self.pattern
    validationMsg = Types.validationMsg(self.name)

    widgetElem = H.input(
        self.toEdit(val),
        type=N.text,
        cls="wvalue",
        **atts,
    )
    validationElem = (
        H.span('', valmsg=validationMsg)
        if validationMsg else
        E
    )
    return E.join([widgetElem, validationElem])


class Text(TypeBase):
  widgetType = N.text


class Url(Text):
  pattern = (
      f"""^{N.http}s?://"""
      """[A-Za-z0-9%_-]+\\.[A-Za-z0-9%_.-]+"""
      """([/][^&?=]*)?"""
      """([?&].*)?"""
      """$"""
  )

  def normalize(cls, strVal):
    normalVal = str(strVal).strip()
    if not normalVal:
      return E
    if not urlStart.match(normalVal):
      match = urlTrim.match(normalVal)
      if match and len(match.group(1)) > 3:
        normalVal = urlTrim.sub('', normalVal)
      normalVal = f"""{N.https}://{normalVal}"""
    if DOT not in normalVal:
      normalVal += f"""{DOT}{N.org}"""
    return normalVal

  def toDisplay(self, val):
    if val is None:
      return H.span(QQ)

    val = he(self.normalize(str(val)))
    return H.a(val, val)


class Email(Text):
  pattern = (
      """^[A-Za-z0-9][A-Za-z0-9_.-]*@[A-Za-z0-9_-]+\\.[A-Za-z0-9_.-]+$"""
  )

  def normalize(self, strVal):
    normalVal = str(strVal).strip()
    if not normalVal:
      return E
    return normalVal

  def toDisplay(self, val):
    if val is None:
      return H.span(QQ)

    val = he(self.normalize(str(val)))
    return H.a(val, val)


class Numeric(TypeBase):
  widgetType = N.text
  rawType = None

  def normalize(self, strVal):
    return cleanNumber(strVal, self.rawType is int)


class Int(Numeric):
  rawType = int
  pattern = (
      """(^$)|(^0$)|(^-?[1-9][0-9]*$)"""
  )


class Decimal(Numeric):
  rawType = float
  pattern = (
      """(^$)|(^-?0$)|(^-?[1-9][0-9]*$)"""
      """|(^-?[0-9]+[.,][0-9]+$)"""
  )


class Money(Decimal):

  def toDisplay(self, val):
    return H.span(
        QQ
        if val is None else
        f"""{EURO} {self.normalize(str(val))}"""
    )


class Datetime(TypeBase):
  rawType = dt
  widgetType = N.text
  pattern = DATETIME_PATTERN

  def partition(self, strVal):
    normalVal = dtTrim.sub('', strVal)
    if not normalVal:
      return None
    normalParts = [
        int(p) for p in dtSep.split(normalVal)
    ]
    if len(normalParts) == 0:
      return None
    if not 1900 <= normalParts[0] <= 2100:
      return None
    if len(normalParts) > 6:
      normalParts = normalParts[0:6]
    if len(normalParts) < 6:
      normalParts = [
          normalParts[i] if i < len(normalParts) else DEFAULT_DATE[i]
          for i in range(6)
      ]
    try:
      dt(*normalParts)  # only for checking
    except Exception:
      normalParts = DEFAULT_DATE
    return normalParts

  def normalize(self, strVal):
    normalParts = self.partition(strVal)
    if normalParts is None:
      return E
    return DATETIME_FORMAT.format(*normalParts)

  def fromStr(self, editVal):
    if not editVal:
      return None
    normalParts = self.partition(editVal)
    if normalParts is None:
      return None
    cast = self.rawType
    return cast(*normalParts)

  def toDisplay(self, val):
    return H.span(
        QQ
        if val is None else
        self.normalize(val.isoformat())
    )

  def toEdit(self, val):
    return (
        E
        if val is None else
        self.normalize(val.isoformat())
    )

  def toOrig(self, val):
    if val is None:
      return None
    return self.normalize(val.isoformat())


class Markdown(TypeBase):
  widgetType = N.markdown

  def normalize(self, strVal):
    return strVal.strip()

  def fromStr(self, editVal):
    return self.normalize(editVal)

  def toDisplay(self, val):
    return H.div(markdown(val or QQ))

  def toEdit(self, val):
    return val

  def widget(self, val):
    return H.textarea(
        val or E,
        cls="wvalue",
    )


class Bool(TypeBase):
  widgetType = N.bool

  def normalize(self, strVal):
    return strVal

  def fromStr(self, editVal):
    return editVal

  def toDisplay(self, val):
    values = BOOLEAN_TYPES[self.name]
    noneValue = False if len(values) == 2 else None

    return H.icon(
        values.get(val, values[noneValue]),
        cls="label medium",
    )

  def toEdit(self, val):
    return val

  def toOrig(self, val):
    return val

  def widget(self, val):
    values = BOOLEAN_TYPES[self.name]
    noneValue = False if len(values) == 2 else None
    refV = values.get(val, values[noneValue])

    return H.div(
        [
            H.icon(
                values[w],
                cls=(
                    (
                        "label active"
                        if values[w] is refV else
                        "button"
                    )
                    +
                    " medium"
                ),
            )
            for w in values
        ],
        cls="wvalue",
    )


class Bool2(Bool):
  pass


class Bool3(Bool):
  pass


class Related(TypeBase):
  needsDb = True

  def __init__(self, db):
    self.db = db

  def normalize(self, strVal):
    return strVal

  def toDisplay(self, val):
    return self.title(eid=val, markup=True)[1]

  def titleStr(self, record):
    return he(record.get(N.title, None) or record.get(N.rep, None) or QQ)

  def titleHint(self, record):
    return None

  def title(
      self,
      record=None, eid=None,
      markup=False, active=None,
  ):
    if record is None and eid is None:
      return QQ

    if record is None:
      db = self.db
      table = self.name
      record = db.getItem(table, eid)

    titleStr = self.titleStr(record)
    titleHint = self.titleHint(record)

    if markup:
      if eid is None:
        eid = record.get(N._id, None)

      atts = dict(cls=f"tag medium field")
      if titleHint:
        atts['title'] = titleHint

      href = f'/{table}/item/{eid}'
      titleFormatted = H.a(titleStr, href, target=N._blank, **atts)
      return (titleStr, titleFormatted)
    else:
      return titleStr


class Master(Related):
  widgetType = N.master

  def __init__(self, db):
    self.db = db


class CriteriaEntry(Master):
  def __init__(self, db):
    super().__init__(db)

  def titleStr(self, record):
    types = self.types

    seq = he(record.get(N.seq, None) or QN)
    eid = record.get(N.criteria, None)
    title = (
        QQ
        if eid is None else
        types.criteria.title(eid=eid)
    )
    return f"""{seq}. {title}"""


class ReviewEntry(Master):
  def __init__(self, db):
    super().__init__(db)

  def titleStr(self, record):
    types = self.types

    seq = he(record.get(N.seq, None) or QN)
    eid = record.get(N.criteria, None)
    title = (
        QQ
        if eid is None else
        types.criteria.title(eid=eid)
    )
    return f"""{seq}. {title}"""


class Value(Related):
  widgetType = N.related

  def __init__(self, db):
    self.db = db

  def fromStr(self, editVal, uid=None, eppn=None, extensible=False):
    if not editVal:
      return None
    if type(editVal) is list:
      if extensible and editVal:
        db = self.db
        table = self.name
        return db.insertItem(table, uid, eppn, rep=editVal[0])
      else:
        return None
    return ObjectId(editVal)

  def toEdit(self, val):
    return val

  def toOrig(self, val):
    return val if val is None else str(val)

  def widget(self, val, multiple, extensible):
    db = self.db
    table = self.name

    filterControl = [
        H.input(
            E,
            type=N.text,
            placeholder=MESSAGES.get(N.filter, E),
            cls="wfilter",
        ),
        H.icon(
            N.plus,
            cls="button small add",
            title="add value",
        ) if extensible else E,
        H.icon(
            N.times,
            cls="button small wfilter",
            title="clear filter",
        )
    ]
    return H.div(
        filterControl
        +
        [
            formatted
            for (text, formatted) in (
                (
                    []
                    if multiple else
                    [self.title(
                        record={},
                        markup=True, asEdit=True, active=val,
                    )]
                )
                +
                sorted(
                    (
                        self.title(
                            record=record,
                            markup=True, asEdit=True, multiple=multiple, active=val,
                        )
                        for record in db.getValueRecords(table)
                    ),
                    key=lambda x: x[0].lower()
                )
            )
        ],
        cls="wvalue",
    )

  def title(
      self,
      eid=None, record=None,
      markup=False, asEdit=False, multiple=False, active=None,
  ):
    if record is None and eid is None:
      return QQ

    if record is None:
      db = self.db
      table = self.name
      record = db.getItem(table, eid)

    titleStr = self.titleStr(record)
    titleHint = self.titleHint(record)

    if markup:
      if eid is None:
        eid = record.get(N._id, None)

      isActive = (
          eid in (active or [])
          if multiple else
          eid is not None and eid == active
      )
      baseCls = (
          (
              "button " if multiple or not isActive else "label "
          )
          if asEdit else
          "tag "
      )
      activeCls = "active " if isActive else E
      atts = dict(cls=f"{baseCls}{activeCls}medium field")
      if asEdit and eid is not None:
        atts[N.eid] = str(eid)

      if titleHint:
        atts['title'] = titleHint

      titleIcon = (
          (NBSP + H.icon(
              N.times if isActive else N.plus,
          ))
          if multiple else
          E
      )

      titleFormatted = H.span(
          [
              titleStr,
              titleIcon,
          ],
          lab=titleStr.lower(),
          **atts,
      )
      return (titleStr, titleFormatted)
    else:
      return titleStr


class User(Value):
  needsAuth = True

  def __init__(self, db, auth):
    super().__init__(db)
    self.auth = auth

  def titleStr(self, record):
    auth = self.auth

    return he(auth.identity(record))


class Country(Value):
  def __init__(self, db):
    super().__init__(db)

  def titleStr(self, record):
    return he(record.get(N.iso, None)) or QQ

  def titleHint(self, record):
    return record.get(N.name, None) or QQ


class TypeContribution(Value):
  def __init__(self, db):
    super().__init__(db)

  def titleStr(self, record):
    mainType = record.get(N.mainType, None) or E
    subType = record.get(N.subType, None) or E
    sep = WHYPHEN if mainType and subType else E
    return he(f"""{mainType}{sep}{subType}""")

  def titleHint(self, record):
    return E.join(record.get(N.explanation, None) or [])


class Criteria(Value):
  def __init__(self, db):
    super().__init__(db)

  def titleStr(self, record):
    return he(record.get(N.criterion, None) or QQ)


class Score(Value):
  def __init__(self, db):
    super().__init__(db)

  def titleStr(self, record):
    score = he(record.get(N.score, None) or QQ)
    level = he(record.get(N.level, None) or QQ)
    return f"""{score} - {level}"""


class Types(object):
  def __init__(self, db, auth):
    self.db = db
    self.auth = auth
    self.defineAll()

  def make(self, tp, Base=None, TypeClass=None):
    """make an object in class with a dynamic name and register it

    tp: the name of the class
    Base: the class on which the class is based

    If TypeClass is given, do not make a new class but use TypeClass.

    Once the class is created, an object of this class
    is constructed, with given attributes.

    This object is registered.
    """

    db = self.db
    auth = self.auth

    if TypeClass is None:
      TypeClass = type(tp, (Base,), {})

    atts = []
    if TypeClass.needsDb:
      atts.append(db)
    if TypeClass.needsAuth:
      atts.append(auth)

    typeObj = TypeClass(*atts)
    self.register(typeObj, tp)

  def register(self, typeObj, tp):
    setattr(typeObj, N.name, tp)
    setattr(typeObj, N.types, self)
    setattr(self, tp, typeObj)

  def toOrig(self, val, tp, multiple):
    typeObj = getattr(self, tp)
    method = typeObj.toOrig
    origStr = (
        [
            method(v)
            for v in val or []
        ]
        if multiple else
        method(val)
    )
    return bencode(origStr)

  @staticmethod
  def validationMsg(tp):
    return MESSAGES.get(tp, None)

  def defineAll(self):
    done = set()

    for tp in SCALAR_TYPES:
      if tp in done:
        serverprint(f"""Duplicate type (scalar): {tp}""")
        continue
      done.add(tp)

      typeName = cap1(tp)
      TypeClass = globals()[typeName]
      self.make(tp, TypeClass=TypeClass)

    for tp in VALUE_TABLES + USER_TABLES + USER_ENTRY_TABLES:
      if tp in done:
        serverprint(f"""Duplicate type (value): {tp}""")
        continue
      done.add(tp)

      typeName = cap1(tp)
      TypeClass = globals().get(typeName, None)
      if not TypeClass:
        self.make(tp, Base=Value if tp in VALUE_TABLES else Master)
      else:
        self.make(tp, TypeClass=TypeClass)


def cleanNumber(strVal, isInt):
    normalVal = str(strVal).strip()
    normalVal = stripNonnumeric.sub(E, normalVal)
    isNegative = normalVal.startswith(MIN)
    normalVal = normalVal.replace(MIN, E)
    if isNegative:
      normalVal = f'{MIN}{normalVal}'
    if isInt:
      normalVal = stripFraction.sub(E, normalVal)
      normalVal = stripDecimal.sub(E, normalVal)
    normalVal = stripLeading.sub(E, normalVal)
    if not isInt:
      parts = decimalSep.split(normalVal)
      if len(parts) > 2:
        parts = parts[0:2]
      normalVal = DOT.join(parts)
    return normalVal or (
        QN
        if isInt else
        f"""{QN}{DOT}{QN}"""
    )
