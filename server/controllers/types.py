import re
from datetime import datetime as dt

from markdown import markdown
from bson.objectid import ObjectId

from controllers.config import Config as C, Names as N
from controllers.html import HtmlElements as H, htmlEscape as he
from controllers.utils import bencode, now, cap1, E, DOT, MIN, EURO, WHYPHEN


CT = C.table
CW = C.web

SCALAR_TYPES = set(CT.scalarTypes)
BOOLEAN_TYPES = CT.boolTypes
VALUE_TABLES = CT.valueTables

QQ = CW.unknown[N.generic]
ZERO = CW.unknown[N.number]
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
        ZERO
        if isInt else
        f"""{ZERO}{DOT}{ZERO}"""
    )


class TypeBase(object):
  widgetType = None
  pattern = None
  rawType = None
  needsField = False

  @classmethod
  def normalize(cls, strVal):
    return str(strVal).strip()

  @classmethod
  def fromStr(cls, editVal):
    if not editVal:
      return None
    val = cls.normalize(editVal)
    cast = cls.rawType
    return val if cast is None else cast(val)

  @classmethod
  def toDisplay(cls, val):
    return H.span(
        QQ
        if val is None else
        he(cls.normalize(str(val)))
    )

  @classmethod
  def toEdit(cls, val):
    return (
        E
        if val is None else
        cls.normalize(str(val))
    )

  @classmethod
  def toOrig(cls, val):
    if val is None:
      return None
    return str(val)

  @classmethod
  def widget(cls, val):
    atts = {}
    if cls.pattern:
      atts['pattern'] = cls.pattern
    validationMsg = Types.validationMsg(cls.name)

    widgetElem = H.input(
        cls.toEdit(val),
        type=N.text,
        cls="wvalue",
        **atts,
    )
    validationElem = (
        H.span('', valmsg=validationMsg)
        if validationMsg else
        E
    )
    return [widgetElem, validationElem]


class Text(TypeBase):
  widgetType = N.text


class Url(Text):
  pattern = (
      f"""{N.http}s?://"""
      """[A-Za-z0-9_-]+\\.[A-Za-z0-9_.-]+"""
  )

  @classmethod
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

  @classmethod
  def toDisplay(cls, val):
    if val is None:
      return H.span(QQ)

    val = he(cls.normalize(str(val)))
    return H.a(val, val)


class Email(Text):
  pattern = (
      f"""{N.mailto}:"""
      """[A-Za-z0-9][A-Za-z0-9_.-]*@[A-Za-z0-9_-]+\\.[A-Za-z0-9_.-]+"""
  )

  @classmethod
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

  @classmethod
  def toDisplay(cls, val):
    if val is None:
      return H.span(QQ)

    val = he(cls.normalize(str(val)))
    return H.a(val, val)


class Numeric(TypeBase):
  widgetType = N.text
  rawType = None

  @classmethod
  def normalize(cls, strVal):
    return cleanNumber(strVal, cls.rawType is int)


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

  @classmethod
  def toDisplay(cls, val):
    return H.span(
        QQ
        if val is None else
        f"""{EURO} {cls.normalize(str(val))}"""
    )


class Datetime(TypeBase):
  rawType = dt
  widgetType = N.text
  pattern = DATETIME_PATTERN

  @classmethod
  def partition(cls, strVal):
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

  @classmethod
  def normalize(cls, strVal):
    normalParts = cls.partition(strVal)
    if normalParts is None:
      return E
    return DATETIME_FORMAT.format(*normalParts)

  @classmethod
  def fromStr(cls, editVal):
    if not editVal:
      return None
    normalParts = cls.partition(editVal)
    if normalParts is None:
      return None
    cast = cls.rawType
    return cast(*normalParts)

  @classmethod
  def toDisplay(cls, val):
    return H.span(
        QQ
        if val is None else
        cls.normalize(val.isoformat())
    )

  @classmethod
  def toEdit(cls, val):
    return (
        E
        if val is None else
        cls.normalize(val.isoformat())
    )

  @classmethod
  def toOrig(cls, val):
    if val is None:
      return None
    return cls.normalize(val.isoformat())


class Markdown(TypeBase):
  widgetType = N.markdown

  @classmethod
  def normalize(cls, strVal):
    return strVal.strip()

  @classmethod
  def fromStr(cls, editVal):
    return cls.normalize(editVal)

  @classmethod
  def toDisplay(cls, val):
    return H.div(markdown(val or QQ))

  @classmethod
  def toEdit(cls, val):
    return val

  @classmethod
  def widget(cls, val):
    return H.textarea(
        val or E,
        cls="wvalue",
    )


class Bool(TypeBase):
  widgetType = N.bool

  @classmethod
  def normalize(cls, strVal):
    return strVal

  @classmethod
  def fromStr(cls, editVal):
    return editVal

  @classmethod
  def toDisplay(cls, val):
    values = BOOLEAN_TYPES[cls.name]
    noneValue = False if len(values) == 2 else None

    return H.icon(
        values.get(val, values[noneValue]),
        cls="label medium field",
    )

  @classmethod
  def toEdit(cls, val):
    return val

  @classmethod
  def toOrig(cls, val):
    return val

  @classmethod
  def widget(cls, val):
    values = BOOLEAN_TYPES[cls.name]
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
                    " medium field"
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
  widgetType = N.related
  needsField = True

  @classmethod
  def normalize(cls, strVal):
    return strVal

  @classmethod
  def fromStr(cls, editVal):
    if not editVal:
      return None
    return ObjectId(editVal)

  @classmethod
  def toDisplay(cls, val, db, auth):
    record = getattr(db, cls.name).get(val, {})
    return cls.title(
        record,
        cls.titleStr(db, auth, record),
        cls.titleHint(record),
        markup=True,
    )[1]

  @classmethod
  def toEdit(cls, val):
    return val

  @classmethod
  def toOrig(cls, val):
    return val if val is None else str(val)

  @classmethod
  def widget(cls, val, db, auth):
    return H.div(
        [
            formatted
            for (text, formatted) in (
                [cls.title(
                    {},
                    cls.titleStr(db, auth, {}),
                    cls.titleHint({}),
                    markup=True, asEdit=True, active=val,
                )]
                +
                sorted(
                    (
                        cls.title(
                            record,
                            cls.titleStr(db, auth, record),
                            cls.titleHint(record),
                            markup=True, asEdit=True, active=val,
                        )
                        for record in db.getValueRecords(cls.name)
                    ),
                    key=lambda x: x[0].lower()
                )
            )
        ],
        cls="wvalue",
    )

  @classmethod
  def titleStr(cls, db, auth, record):
    return he(record.get(N.rep, record.get(N.title, None))) or QQ

  @classmethod
  def titleHint(cls, record):
    return None

  @classmethod
  def title(cls, record, titleStr, titleHint, markup=False, asEdit=False, active=None):

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

      if titleHint:
        atts['title'] = titleHint

      titleFormatted = H.span(
          titleStr,
          **atts,
      )

      return (titleStr, titleFormatted)

    else:
      return titleStr


class User(Related):
  @classmethod
  def titleStr(cls, db, auth, record):
    return he(auth.identity(record))


class Country(Related):
  @classmethod
  def titleStr(cls, db, auth, record):
    return he(record.get(N.iso, None)) or QQ

  @classmethod
  def titleHint(cls, record):
    return record.get(N.name, QQ)


class TypeContribution(Related):
  @classmethod
  def titleStr(cls, db, auth, record):
    mainType = record.get(N.mainType, E)
    subType = record.get(N.subType, E)
    sep = WHYPHEN if mainType and subType else E
    return he(f"""{mainType}{sep}{subType}""")

  @classmethod
  def titleHint(cls, record):
    return record.get(N.explanation, E)


class Criteria(Related):
  @classmethod
  def titleStr(cls, db, auth, record):
    return he(record.get(N.criterion, None)) or QQ


class Score(Related):
  @classmethod
  def titleStr(cls, db, auth, record):
    score = he(record.get(N.score, None)) or QQ
    level = he(record.get(N.level, None)) or QQ
    return f"""{score} - {level}"""


class Types(object):
  @classmethod
  def make(cls, tp):
    """make a class with a dynamic name

    tp: the name of the class

    The class will be based on the Related class defined earlier
    """

    TpClass = type(tp, (Related,), {})
    cls.register(TpClass, tp)

  @classmethod
  def register(cls, typeClass, tp):
    setattr(typeClass, N.name, tp)
    setattr(cls, tp, typeClass)

  @staticmethod
  def toOrig(val, tp, multiple):
    typeClass = getattr(Types, tp)
    method = typeClass.toOrig
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

  @classmethod
  def defineAll(cls):
    for tp in SCALAR_TYPES:
      typeName = cap1(tp)
      typeClass = globals().get(typeName, None)
      if typeClass:
        cls.register(typeClass, tp)

    for tp in VALUE_TABLES:
      typeName = cap1(tp)
      typeClass = globals().get(typeName, None)
      if not typeClass:
        cls.make(tp)
      else:
        cls.register(typeClass, tp)


Types.defineAll()
