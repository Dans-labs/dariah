from controllers.config import Config as C, Names as N
from controllers.utils import asString, E, AMP, LT, APOS, QUOT, DOLLAR, ONE, MINONE

CW = C.web

EMPTY_ELEMENTS = set(CW.emptyElements)
ICONS = set(CW.fontAwesome)

CLASS = 'class'


def htmlEscape(val):
  return E if val is None else (
      str(val)
      .replace(AMP, f"""&{N.amp};""")
      .replace(LT, f"""&{N.lt};""")
      .replace(APOS, f"""&{N.apos};""")
      .replace(QUOT, f"""&{N.quot};""")
      .replace(DOLLAR, f"""<{N.span}>{DOLLAR}</{N.span}>""")
  )


def atNormal(k):
  return CLASS if k == N.cls else k


def attStr(atts, addClass=None):
    if addClass:
      if atts and N.cls in atts:
        atts[N.cls] += addClass
      elif atts:
        atts[N.cls] = addClass
      else:
        atts = dict(cls=addClass)
    return E.join(
        f""" {atNormal(k)}""" + (E if v is True else f'="{v}"')
        for (k, v) in atts.items()
    )


class HtmlElement(object):
  def __init__(self, name):
    self.name = name

  def wrap(self, material, addClass=None, **atts):
    name = self.name
    content = asString(material)
    attributes = attStr(atts, addClass=addClass)
    return (
        f"""<{name}{attributes}>"""
        if name in EMPTY_ELEMENTS else
        f"""<{name}{attributes}>{content}</{name}>"""
    )


class HtmlElements(object):
  @staticmethod
  def a(material, href, **atts):
    return HtmlElement(N.a).wrap(material, href=href, **atts)

  @staticmethod
  def br():
    return HtmlElement(N.br).wrap(E)

  @staticmethod
  def dd(material, **atts):
    return HtmlElement(N.dd).wrap(material, **atts)

  @staticmethod
  def details(summary, material, itemkey, **atts):
    content = asString(material)
    return HtmlElement(N.details).wrap(
        HtmlElement(N.summary).wrap(summary) + content,
        itemkey=itemkey, **atts
    )

  @staticmethod
  def mydetails(
      icons,
      material,
      itemkey,
      openAtts=None, closeAtts=None,
      **atts,
  ):
    content = asString(material)
    (iconOpen, iconClose) = (
        (icons, icons)
        if type(icons) is str else
        icons
    )
    triggerElements = [
        (HtmlElements.icon if icon in ICONS else HtmlElements.span)(
            icon,
            itemkey=itemkey,
            trigger=value,
            **openAtts,
        )
        for (icon, value) in ((iconOpen, ONE), (iconClose, MINONE))
    ]
    return (
        *triggerElements,
        HtmlElement(N.div).wrap(
            content,
            itemkey=itemkey,
            body=ONE,
            **atts
        ),
    )

  @staticmethod
  def div(material, **atts):
    return HtmlElement(N.div).wrap(material, **atts)

  @staticmethod
  def dl(items, **atts):
    return HtmlElement(N.dl).wrap(
        [
            HtmlElement(N.dt).wrap(item[0]) + HtmlElement(N.dd).wrap(item[1])
            for item in items
        ],
        **atts,
    )

  @staticmethod
  def dt(material, **atts):
    return HtmlElement(N.dt).wrap(material, **atts)

  @staticmethod
  def icon(icon, **atts):
    iconClass = f" fa fa-{icon}"
    if N.href in atts:
      return HtmlElement(N.a).wrap(E, addClass=iconClass, **atts)
    return HtmlElement(N.span).wrap(E, addClass=iconClass, **atts)

  @staticmethod
  def input(material, **atts):
    content = asString(material)
    return HtmlElement(N.input).wrap(
        E, value=htmlEscape(content), **atts,
    )

  @staticmethod
  def checkbox(var, **atts):
    return HtmlElement(N.input).wrap(
        E,
        type=N.checkbox,
        id=var,
        addClass=N.option,
        **atts,
    )

  @staticmethod
  def p(material, **atts):
    return HtmlElement(N.p).wrap(material, **atts)

  @staticmethod
  def span(material, **atts):
    return HtmlElement(N.span).wrap(material, **atts)

  @staticmethod
  def textarea(material, **atts):
    content = asString(material)
    return HtmlElement(N.textarea).wrap(content, **atts)
