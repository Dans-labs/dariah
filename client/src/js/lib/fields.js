import pickBy from 'lodash/pickby'

import React from 'react'
import Markdown from 'react-markdown'

import { memoize } from 'memo'
import { emptyS, emptyA, emptyO } from 'utils'
import { applyTemplate } from 'presentation'

import { repr } from 'tables'

import { countryBorders } from 'europe.geo'

import Input from 'Input'
import MarkdownArea from 'MarkdownArea'

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
  number: { component: Input, type: 'text', props: emptyO },
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

export const makeSubmit = memoize((dirty, invalid, submitting, submit) =>
  dirty && !invalid && !submitting
  ? submit
  : () => null
)

export const makeSubmitTime = memoize(submit => () => setTimeout(submit, 10))

export const itemReadField = (field, label, fvalue, key) => (
  <div
    {...(key == null ? emptyO : { key })}
    className={'grid-row form'}
  >
    <div className={'grid-head-cell label-col'}>{label}{':'}</div>
    <div className={'grid-cell value-col'} >
      {fvalue}
    </div>
  </div>
)

export const makeReset = memoize((type, reset) =>
  type == 'checkbox'
  ? emptyO
  : { onKeyUp: e => {if (e.keyCode == 27) {e.preventDefault(); reset()}} }
)

export const itemEditField = (field, label, fevalue, editable, key) => (
  <div
    {...(key == null ? emptyO : { key })}
    className={'grid-row form'}
  >
    <div className={`grid-head-cell label-col ${editable ? 'edit' : emptyS}`}>{label}{':'}</div>
    <div className={`grid-cell value-col ${editable ? 'edit' : emptyS}`} >
      {fevalue}
    </div>
  </div>
)


const iso2s = new Set(countryBorders.features.map(({ properties: { iso2 } }) => iso2))

const mergeClassnames = (classNames, attributes) => {
  const className = classNames.join(' ')
  return attributes == null
  ? { className }
  : { ...attributes, className: `${className} ${attributes.className || emptyS}` }
}

const valuePrepare = memoize((settings, tables, table, valType, relField, activeItems, inactive) => (value, rep) => {
  if (valType === 'textarea') {return [rep, { source: rep }, 'Markdown']}
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
    const { relTable } = valType
    const relRecord = tables[relTable].entities[value]
    const linkMe = `/data/${relTable}/list/item/${value}`
    if (value != null) {
      const templateApplied = applyTemplate(settings, tables, relTable, 'related', table, relRecord.values, null, linkMe)
      if (templateApplied) {return [templateApplied]}
    }
    if (relField == null) {
      classNames.push('tag')
      link.href = linkMe
      elem = 'a'
    }
    else {
      const { [relTable]: { fieldSpecs: { [relField]: {
        valType: relValType,
        multiple: relMultiple,
      } } } } = tables
      const relPrepare = valuePrepare(settings, tables, relTable, relValType, null, activeItems, inactive)
      const relValues = relRecord.values[relField]
      const xReps = relMultiple
      ? (relValues || emptyA).map((relValue, i) => relPrepare(relValue, rep[i])).filter(x => x != null)
      : relPrepare(relValues, rep)
      return relMultiple
      ? [(xReps || emptyA).map((r, i) => putElem(r, i)), emptyO, 'div']
      : xReps
    }
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
  return [
    rep,
    { ...link, ...(classNames.length ? mergeClassnames(classNames, attributes) : attributes) },
    elem,
  ]
}, emptyO)

const putElem = ([rep, attributes, elem], i) => {
  const r = rep || emptyS
  if (i == null && attributes == null && elem == null) {return r}
  const keyAtt = i == null ? emptyO : { key: i }
  const atts = { ...(attributes || emptyO), ...keyAtt }
  if (elem == 'Markdown') {
    return <Markdown {...atts} />
  }
  const Elem = elem || 'span'
  return <Elem {...atts} >{r}</Elem>
}

/*
 * Retrieve a value of a field and package it for readonly usage.
 * Depending on settings and active items it might be wrapped into elements with attributes.
 */
export const wrappedRepr = memoize(
  (tables, table, field, valType, multiple, relField, activeItems, inactive, values, settings) => {
    const prepare = valuePrepare(settings, tables, table, valType, relField, activeItems, inactive)
    const reps = repr(tables, table, field, valType, multiple, relField, values, settings)
    const xReps = multiple
    ? (values || emptyA).map((value, i) => prepare(value, reps[i])).filter(x => x != null)
    : prepare(values, reps)
    return multiple
    ? <div>{xReps.map((rep, i) => putElem(rep, i))}</div>
    : putElem(xReps)
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

export const someEditable = (fields, perm, workflow) =>
  !(workflow && workflow.locked)
  && fields
  && Object.keys(fields).some(field => perm && perm.update && perm.update[field])

export const makeFields = ({ tables, table, eId, fields, perm, ...props }) => {
  const { initialValues } = props
  const { [table]: { fieldSpecs, fieldOrder } } = tables

  const fragments = []
  for (const field of fieldOrder) {
    const { [field]: f } = fields
    if (f == null) {continue}
    const { [field]: { label, valType, multiple } } = fieldSpecs
    const { update: { [field]: editable } } = perm
    const { [field]: myValues } = initialValues
    const theField = {
      editable,
      table,
      myValues,
      ...props,
    }
    if (editable && typeof valType === 'object') {
      const { relTable, link } = valType
      if (relTable != null && link != null) {
        const { [table]: { entities: { [eId]: { values: { [link]: masterValue } = emptyO } = emptyO } = emptyO } = emptyO } = tables
        if (masterValue != null) {
          const { [relTable]: { entities } } = tables
          if (entities != null) {
            const allowed = Object.keys(entities).filter(_id => entities[_id].values[link] === masterValue)
            theField.allowed = allowed
          }
        }
      }
    }
    fragments.push({ field, label, valType, multiple, fragment: theField })
  }
  return fragments
}

export const toFieldInfo = (eId, fragments) => {
  const fieldInfo = { _id: eId }
  for (const { field, fragment: { myValues: value } } of fragments) {
    fieldInfo[field] = value
  }
  return fieldInfo
}

export const makeDetails = ({ tables, table, eId }) => {
  const { [table]: { details, detailOrder } } = tables
  return (detailOrder || emptyA).map(name => {
    const { table: detailTable, linkField, ...detailSpecs } = details[name]
    const { [detailTable]: detailTableData } = tables
    if (detailTableData == null) {return null}
    const {
        title: detailTitle,
        item: detailItem,
        perm: detailPerm,
        entities: detailEntities,
        allIds: detailAllIds,
        fieldSpecs: { [linkField]: { multiple } },
    } = detailTableData
    const detailListIds = multiple
    ? detailAllIds.filter(_id => (detailEntities[_id].values[linkField] || emptyA).includes(eId))
    : detailAllIds.filter(_id => detailEntities[_id].values[linkField] === eId)
    return {
      name,
      detailItem,
      detailTitle,
      detailTable,
      linkField,
      detailListIds,
      detailPerm,
      detailSpecs,
    }
  })
  .filter(x => x != null)
}

export const getMasterTable = (tables, table, linkField) => {
  let masterTable = null
  if (linkField != null) {
    const {
      [table]: {
        fieldSpecs: {
          [linkField]: {
            valType: { relTable } = emptyO,
          } = emptyO },
      },
    } = tables
    masterTable = relTable
    return masterTable
  }
}

export const makeKeepInfo = detailFragments => {
  const keep = {}
  for (const detailFragment of detailFragments) {
    const { detailSpecs: { cascade }, detailTable, detailItem, detailListIds } = detailFragment
    if (!cascade && detailListIds.length) {
      keep[detailTable] = `${detailItem[0]}(${detailListIds.length}x)`
    }
  }
  return keep
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
      const properVal = new Date(val)
      return properVal.toISOString()
    }
    catch (error) {
      return val
    }
  },
  number(val) {
    try {
      const properVal = Number(val)
      return properVal
    }
    catch (error) {
      return val
    }
  },
  bool(val) {
    try {
      const properVal = Boolean(val)
      return properVal
    }
    catch (error) {
      return val
    }
  },
}

