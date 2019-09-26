def htmlEscape(val):
  return '' if val is None else (
      str(val)
      .replace('&', '&amp;')
      .replace('<', '&lt;')
      .replace("'", '&apos;')
      .replace('"', '&quot;')
      .replace('$', '<span>$</span>')
  )


def atNormal(k):
  return 'class' if k == 'cls' else k


def attStr(atts, addClass=None):
    if addClass:
      if atts and 'cls' in atts:
        atts['cls'] += addClass
      elif atts:
        atts['cls'] = addClass
      else:
        atts = dict(cls=addClass)
    return ''.join(
        f' {atNormal(k)}' + ('' if v is True else f'="{v}"')
        for (k, v) in atts.items()
    )


def materialStr(material):
  tp = type(material)
  return (
      ''
      if material is None else
      material
      if tp is str or tp is int else
      ''.join(material)
  )


class HtmlElement(object):
  def __init__(self, name):
    self.name = name

  def wrap(self, material, addClass=None, **atts):
    name = self.name
    content = materialStr(material)
    attributes = attStr(atts, addClass=addClass)
    return (
        f'''<{name}{attributes}>{content}</{name}>'''
        if content else
        f'''<{name}{attributes}/>'''
    )


class HtmlElements(object):
  @staticmethod
  def a(material, href, **atts):
    return HtmlElement('a').wrap(material, href=href, **atts)

  @staticmethod
  def br():
    return HtmlElement('br').wrap('')

  @staticmethod
  def details(summary, material, **atts):
    content = materialStr(material)
    return HtmlElement('details').wrap(
        HtmlElement('summary').wrap(summary) + content,
        **atts
    )

  @staticmethod
  def div(material, **atts):
    return HtmlElement('div').wrap(material, **atts)

  @staticmethod
  def icon(icon, **atts):
    iconClass = f' fa fa-{icon}'
    return HtmlElement('span').wrap('', addClass=iconClass, **atts)

  @staticmethod
  def input(material, **atts):
    content = materialStr(material)
    return HtmlElement('input').wrap(
        '', value=htmlEscape(content), **atts,
    )

  @staticmethod
  def p(material, **atts):
    return HtmlElement('p').wrap(material, **atts)

  @staticmethod
  def span(material, **atts):
    return HtmlElement('span').wrap(material, **atts)

  @staticmethod
  def textarea(material, **atts):
    content = materialStr(material)
    return HtmlElement('textarea').wrap(content, **atts)
