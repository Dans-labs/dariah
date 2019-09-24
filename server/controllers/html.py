def atNormal(k):
  return 'class' if k == 'cls' else k


def attStr(atts):
    return ''.join(
        f' {atNormal(k)}="{v}"'
        for (k, v) in atts.items()
    )


class HtmlElements(object):
  @staticmethod
  def a(text, href, **atts):
    return f'''<a href="{href}"{attStr(atts)}>{text}</a>'''

  @staticmethod
  def br():
    return '<br/>'

  @staticmethod
  def details(summary, material, **atts):
    return f'''
<details{attStr(atts)}>
  <summary>{summary}</summary>
  {material}
</details>'''

  @staticmethod
  def div(material, **atts):
    if material is None:
      material = ''
    elif type(material) is not str:
      material = ''.join(material)
    return f'''
<div{attStr(atts)}>
  {material}
</div>
'''

  @staticmethod
  def span(material, **atts):
    if material is None:
      material = ''
    elif type(material) is not str:
      material = ''.join(material)
    return f'''
<span{attStr(atts)}>
  {material}
</span>
'''

  @staticmethod
  def icon(icon, **atts):
    iconClass = f' fa fa-{icon}'
    if atts and 'cls' in atts:
      atts['cls'] += iconClass
    elif atts:
      atts['cls'] = iconClass
    else:
      atts = dict(cls=iconClass)
    return f'''<span{attStr(atts)}/>'''
