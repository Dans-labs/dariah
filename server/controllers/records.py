from controllers.html import HtmlElements as H


def titleSort(records):
  return sorted(records, key=lambda r: (r.get('title', '') or '').lower())


def labelDiv(label):
  return H.div(
      f'{label}:',
      cls='record-label',
  )


def valueRODiv(value, mayEdit, **atts):
  button = (
      H.icon(
          'pencil',
          cls='button small field',
          action='edit',
          **atts,
      )
      if mayEdit else
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
