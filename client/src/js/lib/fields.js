import pickBy from 'lodash/pickby'

import React from 'react'

import { memoize } from 'memo'
import { emptyS, emptyA, emptyO } from 'utils'

import { repr } from 'tables'

import { countryBorders } from 'europe.geo'

import Input from 'Input'
import MarkdownArea from 'MarkdownArea'

export const editClass = (dirty, invalid) => invalid ? 'invalid' : dirty ? 'dirty' : emptyS

/* Workaround (6.6.3) for issue https://github.com/erikras/redux-form/issues/2841
 * We do a mostly unnecessary reset() after a successful submit.
 * There is bug in redux-form: if you remove a field from a field array, a spurious
 * empty field will be present after a submit.
 * This reset removes that field.
 *
 * Still needed in 6.7.0
 */
export const onSubmitSuccess = (result, dispatch, { reset }) => reset()

const valTypes = {
  bool: { component: Input, type: 'checkbox', props: emptyO },
  text: { component: Input, type: 'text', props: emptyO },
  datetime: { component: Input, type: 'text', props: emptyO },
  email: { component: Input, type: 'text', props: emptyO },
  url: { component: Input, type: 'text', props: emptyO },
  textarea: { component: MarkdownArea, type: 'text', props: { alterSection: 'markdownfield' } },
}
const { text: DEFAULT_TYPE } = valTypes

export const getValType = valType => {
  const { [valType]: typing = DEFAULT_TYPE } = valTypes
  return typing
}

const iso2s = new Set(countryBorders.features.map(({ properties: { iso2 } }) => iso2))

const mergeClassnames = (classNames, attributes) => {
  const className = classNames.join(' ')
  return attributes == null
  ? { className }
  : { ...attributes, className: `${className} ${attributes.className || emptyS}` }
}

const valuePrepare = memoize((tables, table, valType, activeItems, inactive, settings) => value => {
  const rep = repr(tables, table, valType, value, settings)
  if (valType === 'textarea') {return [rep]}
  if (valType === 'url') {return [rep, { href: rep, target: '_blank' }, 'a']}
  if (valType === 'email') {
    const mailLink = rep == null || rep.startsWith('mailto:') ? rep : `mailto:${rep}`
    return [
      rep,
      { href: mailLink, target: '_blank' },
      'a',
    ]
  }
  const classNames = []
  const link = {}
  let elem = 'span'
  if (typeof valType === 'object') {
    classNames.push('tag')
    const { values: detailTable } = valType
    link.href = `/data/${detailTable}/list/item/${value}`
    elem = 'a'
  }
  const className = classNames.length ? { className: classNames.join(' ') } : emptyO

  if (activeItems == null || inactive == null || activeItems.has(value)) {
    return [
      rep,
      { ...className, ...link },
      elem,
    ]
  }
  const { disabled, attributes } = inactive
  if (disabled) {classNames.push('disabled')}
  return [rep, classNames.length ? mergeClassnames(classNames, attributes) : attributes]
}, emptyO)

const putElem = ([rep, attributes, elem], i) => {
  if (i == null && attributes == null && elem == null) {return rep}
  const r = rep || emptyS
  const atts = { ...(attributes || emptyO), key: i }
  const Elem = elem || 'span'
  return <Elem {...atts} >{r}</Elem>
}

export const readonlyValue = memoize(
  (tables, table, valType, multiple, activeItems, inactive, values, settings) => {
    const prepare = valuePrepare(tables, table, valType, activeItems, inactive, settings)
    const reps = multiple
    ? (values || emptyA).map(value => prepare(value)).filter(x => x != null)
    : prepare(values)

    if (valType === 'textarea') {
      return multiple
      ? reps.map(repItem => repItem[0])
      : reps[0]
    }

    return multiple
    ? reps.map((repItem, i) => putElem(repItem, i))
    : putElem(reps)
  },
  emptyO,
)

export const composeAttributes = memoize((activeItems, inactive) => (value, className) => {
  const isInactive = activeItems != null && !activeItems.has(value)
  const { disabled, attributes } = isInactive ? (inactive || emptyO) : emptyO
  const finalAttributes = className == null
  ? attributes
  : attributes == null
    ? { className }
    : { ...attributes, className: `${className} ${attributes.className || emptyS}` }
  return disabled ? mergeClassnames(['disabled'], finalAttributes) : finalAttributes
}, emptyO)

export const checkDisabled = (activeItems, inactive) => value =>
  inactive && inactive.disabled && activeItems != null && !activeItems.has(value)

export const someEditable = (fields, perm) =>
  fields && Object.keys(fields).some(field => perm && perm.update && perm.update[field])

export const makeFields = ({ tables, table, eId, fields, perm, ...props }) => {
  const { initialValues } = props
  const { [table]: { fieldSpecs, fieldOrder } } = tables

  const fragments = []
  for (const field of fieldOrder) {
    const { [field]: f } = fields
    if (f == null) {continue}
    const { [field]: { label, valType } } = fieldSpecs
    const { update: { [field]: editable } } = perm
    const { [field]: myValues } = initialValues
    const theField = {
      editable,
      table,
      myValues,
      ...props,
    }
    if (editable) {
      const { values, link } = valType
      if (link != null) {
        const { [table]: { entities: { [eId]: { values: { [link]: masterValue } = emptyO } = emptyO } = emptyO } = emptyO } = tables
        if (masterValue != null) {
          const { [values]: { entities } } = tables
          if (entities != null) {
            const allowed = Object.keys(entities).filter(_id => entities[_id].values[link] === masterValue)
            theField.allowed = allowed
          }
        }
      }
    }
    fragments.push({ field, label, fragment: theField })
  }
  return fragments
}

export const makeDetails = ({ tables, table, eId }) => {
  const { [table]: { details, detailOrder } } = tables
  return (detailOrder || emptyA).map(name => {
    const { table: detailTable, linkField } = details[name]
    const {
      [detailTable]: {
        title: detailTitle,
        item: detailItem,
        perm: detailPerm,
        entities: detailEntities,
        allIds: detailAllIds,
        fieldSpecs: { [linkField]: multiple },
      },
    } = tables
    const detailListIds = multiple
    ? detailAllIds.filter(_id => (detailEntities[_id].values[linkField] || emptyA).includes(eId))
    : detailAllIds.filter(_id => detailEntities[_id].values[linkField] === eId)
    return {
      name,
      detailItem,
      detailTitle,
      detailTable,
      detailListIds,
      detailPerm,
    }
  })
}

export const getDateTime = (iso, absent = Number.NEGATIVE_INFINITY) => {
  if (iso == null) {return absent}
  let times
  try {
    times = (new Date(iso))
  }
  catch (error) {
    return null
  }
  if (isNaN(times)) {
    return null
  }
  return times.valueOf()
}

const INTL = new Intl.Collator('en', { sensitivity: 'base' })

export const sortStringTemplate = template => (a, b) => INTL.compare(template(a), template(b))

export const sortTimeInterval = (startField, endField) => (a, b) => {
  const aStart = getDateTime(a[startField], Number.NEGATIVE_INFINITY)
  const aEnd = getDateTime(a[endField], Number.POSITIVE_INFINITY)
  const bStart = getDateTime(b[startField], Number.NEGATIVE_INFINITY)
  const bEnd = getDateTime(b[endField], Number.POSITIVE_INFINITY)
  return (aStart < bStart) || ((aStart === bStart) && (aEnd > bEnd))
  ? -1
  : (aStart === bStart && aEnd === bEnd)
    ? 0
    : 1
}

export const dealWithProvenance = memoize((settings, fields) => {
  const { provenanceFields, hideProvenance } = settings
  return hideProvenance
  ? pickBy(fields, (value, key) => !provenanceFields.has(key))
  : fields
})

export const validation = {
  datetime(val) {
    if (val == null) {return}
    let times
    try {
      times = new Date(val)
    }
    catch (error) {
      return `not a valid date/time - ${error}`
    }
    if (isNaN(times)) {
      return `not a valid date/time`
    }
  },
  url(val) {
    if (val == null) {return}
    if (!val.match(/^https?:\/\//)) {
      return `urls should start with http:// or https://`
    }
  },
  email(val) {
    if (val == null) {return}
    if (val.match(/[^@a-zA-Z0-9_.-]/)) {
      return `email addresses may only contain alphanumeric characters, - _ and .`
    }
    if (!val.match(/@/)) {
      return `email addresses must contain one @`
    }
    if (val.match(/@.*@/)) {
      return `email addresses must contain exactly one @`
    }
    if (!val.match(/@[^.]+\.[^.]+.*$/)) {
      return `email addresses must end with a domain`
    }
  },
  number(val) {
    if (val == null) {return}
    if (isNaN(val)) {
      return `value must be a number`
    }
  },
  isoCountry(val) {
    if (val == null) {return}
    if (!iso2s.has(val)) {
      return `country code ${val} is not on the European map`
    }
  },
}

export const normalization = {
  datetime(val) {
    try {
      const times = new Date(val)
      return times.toISOString()
    }
    catch (error) {
      return val
    }
  },
}

