import {countryBorders} from 'europe.geo'

import Input from 'Input'
import MarkdownArea from 'MarkdownArea'

const valTypes = {
  bool: { component: Input, type: 'checkbox' },
  text: { component: Input, type: 'text' },
  datetime: { component: Input, type: 'text' },
  email: { component: Input, type: 'text' },
  url: { component: Input, type: 'text' },
  textarea: { component: MarkdownArea, type: 'text' },
}
const { text: DEFAULT_TYPE } = valTypes

export const getValType = valType => {
  const { [valType]: typing = DEFAULT_TYPE } = valTypes
  return typing
}

const iso2s = new Set(countryBorders.features.map(({ properties: { iso2 } }) => iso2))

export const makeFields = ({ tables, table, fields, perm, ...props }) => {
  const { initialValues } = props
  const { [table]: { fieldSpecs, fieldOrder } } = tables

  const fragments = []
  let hasEditable = false
  for (const field of fieldOrder) {
    const { [field]: f } = fields
    if (f == null) {continue}
    const { [field]: { label } } = fieldSpecs
    const { update: { [field]: editable } } = perm
    const { [field]: myValues } = initialValues
    if (editable) {hasEditable = true}
    const theField = {
      editable,
      table,
      myValues,
      ...props,
    }
    fragments.push({ field, label, fragment: theField })
  }
  return { fragments, hasEditable }
}

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

