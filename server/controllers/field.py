from markdown import markdown

from controllers.html import HtmlElements as H, htmlEscape as he
from controllers.utils import dtm, bencode


FORMATS_SCALAR = set('''
    text
    string
    email
    url
    number
    money
    datetime
    bool3
)
'''.strip().split())

FORMATS_SPECIAL = set('''
    user
    country
    typeContribution
'''.strip().split())

FORMATS = FORMATS_SCALAR | FORMATS_SPECIAL

WIDGET_FROM_TYPE = dict(
    text=('text', None),
    string=('input', 'text'),
    email=('input', 'email'),
    url=('input', 'url'),
    number=('input', 'number'),
    money=('input', 'number'),
    bool3=('input', 'checkbox'),
    datetime=('input', 'text'),
)
WIDGET_RELATED = ('related', None)

NUMERIC = set('''
    number
    money
'''.strip().split())


def labelDiv(label):
  return H.div(
      f'{label}:',
      cls='record-label',
  )


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

    asEdit = mayEdit and action == 'edit'
    editClass = ' edit' if asEdit else ''
    rep = self.valueEdDiv() if asEdit else self.valueRODiv()

    if action is not None:
      return ''.join(rep)

    return (
        H.div(
            [
                labelDiv(self.label),
                H.div(
                    rep,
                    cls=f'record-value {editClass}',
                ),
            ],
            cls='record-row',
        )
    )

  def valueRODiv(self):
    button = (
        H.icon(
            'pencil',
            cls='button small field',
            action='edit',
            **self.atts,
        )
        if self.mayEdit else
        H.icon(
            'refresh',
            cls='button small field',
            action='view',
            title='refresh modification history',
            **self.atts,
        )
        if self.withRefresh else
        ''
    )
    rep = self.getValueRO()

    return [button, rep]

  def valueEdDiv(self):
    tp = self.tp
    multiple = self.multiple
    value = self.value

    button = H.icon(
        'eye',
        cls='button small field',
        action='save',
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
    widget = H.div(
        rep,
        orig=bencode(origStr),
        cls="value",
    )
    return [button, widget]

  def getValueRO(self):
    tp = self.tp
    multiple = self.multiple
    value = self.value
    cls = 'values' if tp in FORMATS_SCALAR else 'tags'

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
            cls='value',
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
                for val in value or []
            ],
            cls='values',
        )
        if multiple else
        self.formatEd(wName, wType, value)
    )

    return widget

  def formatRO(self, v):
    tp = self.tp

    if tp == 'text':
      return H.div(markdown(v or '??'))

    if tp == 'string':
      return H.span(he(v or '??'))

    if tp == 'email':
      val = he(v or '??')
      return H.a(val, f'mailto:{val}') if '@' in v else val

    if tp == 'url':
      raw = v or ''
      val = he(raw or '??')
      isWww = raw.startswith('www.')
      isLink = isWww or raw.startswith('http://') or raw.startswith('https://')
      if isWww:
        raw = f'https://{raw}'
      return H.a(val, raw) if isLink else val

    if tp == 'number':
      return H.span(he(v or '0'))

    if tp == 'money':
      return H.span('€ ' + he(v or '0'))

    if tp == 'bool3':
      return H.span(
          '??'
          if v is None else
          'Yes'
          if v else
          'No'
      )

    if tp == 'datetime':
      return H.span(he(f'{dtm(v.isoformat())[1]}') if v else '??')

    if tp == 'user':
      record = self.db.user.get(v, {})
      return H.span(
          he(self.auth.identity(record)),
          cls='tag',
      )

    if tp == 'country':
      record = self.db.country.get(v, {})
      return H.span(
          str(record.get('iso', '??')),
          title=str(record.get('name', '??')),
          cls='tag',
      )

    if tp == 'typeContribution':
      print(v)
      record = self.db.typeContribution.get(v, {})
      mainType = record.get('mainType', '')
      subType = record.get('subType', '')
      sep = ' - ' if mainType and subType else ''
      explanation = record.get('explanation', '')
      active = record.get('active', False)
      inactive = '' if active else ' inactive'
      return H.span(
          f'{mainType}{sep}{subType}',
          title=explanation,
          cls=f'tag{inactive}',
      )

    else:
      record = getattr(self.db, tp).get(v, {})
      return H.span(
          str(record.get('rep', '??')),
          cls='tag',
      )

  def formatEd(self, wName, wType, v):
    if wName == 'input':
      if wType == 'checkbox':
        atts = dict(checked=True) if v else {}
        passV = '1'
      elif wType in NUMERIC:
        atts = dict(step=1)
        passV = v if type(v) is str else str(int(round(v)))
      else:
        atts = {}
        passV = v

    return H.input(self.trimEd(passV), **atts, type=wType, hasvalue=True)

    if wName == 'text':
      return H.textarea(self.trimEd(v), hasvalue=True)

    if wName == 'related':
      return self.formatRO(v)

  def trimEd(self, v):
    tp = self.tp
    return v or (0 if tp in NUMERIC else ''),
