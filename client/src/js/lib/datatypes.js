import { countryBorders } from 'europe.geo'
import { emptyS } from 'utils'

export const getDateTime = (iso, absent = Number.NEGATIVE_INFINITY) => {
  if (iso == null) {
    return absent
  }
  let times
  try {
    times = new Date(iso)
  } catch (error) {
    return null
  }
  if (isNaN(times)) {
    return null
  }
  return times.valueOf()
}

const INTL = new Intl.Collator('en', { sensitivity: 'base' })

export const sortStringTemplate = template => (a, b) =>
  INTL.compare(template(a), template(b))

export const sortTimeInterval = (startField, endField) => (a, b) => {
  const aStart = getDateTime(a[startField], Number.NEGATIVE_INFINITY)
  const aEnd = getDateTime(a[endField], Number.POSITIVE_INFINITY)
  const bStart = getDateTime(b[startField], Number.NEGATIVE_INFINITY)
  const bEnd = getDateTime(b[endField], Number.POSITIVE_INFINITY)
  return aStart < bStart || (aStart === bStart && aEnd > bEnd)
    ? -1
    : aStart === bStart && aEnd === bEnd ? 0 : 1
}

const iso2s = new Set(
  countryBorders.features.map(({ properties: { iso2 } }) => iso2),
)

const dayInMilliSeconds = 24 * 3600000

export const trimDate = (text, table, field, settings) => {
  if (text == null) {
    return emptyS
  }
  let trim = settings.longDates[table] && settings.longDates[table][field]
  if (trim === 1) {
    let times
    try {
      times = new Date(text)
    } catch (error) {
      return text
    }
    const elapsed = (times - Date.now()) / dayInMilliSeconds
    trim = elapsed > 1
  }
  return trim ? text.replace(/T.*$/, emptyS) : text.replace(/\.[0-9]+/, emptyS)
}

export const validation = {
  datetime(val) {
    if (val == null) {
      return
    }
    let times
    try {
      times = new Date(val)
    } catch (error) {
      return `not a valid date/time - ${error}`
    }
    if (isNaN(times)) {
      return `not a valid date/time`
    }
  },
  url(val) {
    if (val == null) {
      return
    }
    if (!val.match(/^https?:\/\//)) {
      return `urls should start with http:// or https://`
    }
  },
  email(val) {
    if (val == null) {
      return
    }
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
    if (val == null) {
      return
    }
    if (isNaN(val)) {
      return `value must be a number`
    }
  },
  isoCountry(val) {
    if (val == null) {
      return
    }
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
    } catch (error) {
      return val
    }
  },
  number(val) {
    try {
      const properVal = Number(val)
      return properVal
    } catch (error) {
      return val
    }
  },
  bool(val) {
    try {
      const properVal = Boolean(val)
      return properVal
    } catch (error) {
      return val
    }
  },
}
