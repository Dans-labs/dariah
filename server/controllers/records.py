from markdown import markdown

from controllers.html import HtmlElements as H, htmlEscape as he


def titleSort(records):
  return sorted(records, key=lambda r: (r.get('title', '') or '').lower())


def labelDiv(label):
  return H.div(
      f'{label}:',
      cls='record-label',
  )


def valueRODiv(value, mayEdit, withRefresh=False, **atts):
  button = (
      H.icon(
          'pencil',
          cls='button small field',
          action='edit',
          **atts,
      )
      if mayEdit else
      H.icon(
          'refresh',
          cls='button small field',
          action='view',
          title='refresh modification history',
          **atts,
      )
      if withRefresh else
      ''
  )
  rep = H.div(value, cls="value")

  return [button, rep]


def valueEdDiv(value, **atts):
  button = H.icon(
      'eye',
      cls='button small field',
      action='save',
      **atts,
  )
  rep = H.div(value, cls="value")
  return [button, rep]


def valueScalar(value, action, multiple, iType, editWidget, editTrim, roTrim):
  if action == 'edit':
    if multiple:
      return ''.join(
          editWidget(val, editTrim, iType)
          for val in value
      )
    else:
      return editWidget(value, editTrim, iType)
  else:
    if multiple:
      return ''.join(roTrim(val) for val in value)
    else:
      return roTrim(value)


def editInput(v, editTrim, iType):
  return H.input(editTrim(v), type=iType, hasvalue=True)


def editText(v, editTrim, iType):
  return H.textarea(editTrim(v), hasvalue=True)


def roText(v):
  return H.div(markdown(v or '??'))


def editNumber(v):
  return v or '0'


def roNumber(v):
  return he(v or '0')


def valueNumber(value, action, multiple=False):
  return valueScalar(value, action, multiple, 'number', editInput, editNumber, roNumber)


def editString(v):
  return v or ''


def roString(v):
  return he(v or '??')


def valueString(value, action, multiple=False):
  return valueScalar(value, action, multiple, 'text', editInput, editString, roString)


def editUrl(v):
  return v or ''


def roUrl(v):
  raw = v or ''
  val = he(raw or '??')
  isWww = raw.startswith('www.')
  isLink = isWww or raw.startswith('http://') or raw.startswith('https://')
  if isWww:
    raw = f'https://{raw}'
  return H.a(val, raw) if isLink else val


def valueUrl(value, action, multiple=False):
  return valueScalar(value, action, multiple, 'url', editInput, editUrl, roUrl)


def editEmail(v):
  return v or ''


def roEmail(v):
  val = he(v or '??')
  return H.a(val, f'mailto:{val}') if '@' in v else val


def valueEmail(value, action, multiple=False):
  return valueScalar(value, action, multiple, 'email', editInput, editEmail, roEmail)


def valueText(value, action, multiple=False):
  return valueScalar(value, action, multiple, None, editText, editString, roText)
