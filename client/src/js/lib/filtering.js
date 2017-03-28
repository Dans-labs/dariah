import { lsHas, lsGet, lsSet } from 'localstorage.js'

const initf = (tag, key, defaultVal) => {
  const lskey = `flt_${tag}.${key}`
  return lsHas(lskey) ? lsGet(lskey) : defaultVal
}
export const setf = (tag, key, val) => {
  const lskey = `flt_${tag}.${key}`
  lsSet(lskey, val)
}

export function compileFiltering(records, order, fields, filterList) {
  const presentFilterList = filterList.filter(x => fields[x.field])
  const filterFields = presentFilterList.filter(x => x.type !== 'FullText').map(x => x.field)
  const fieldValues = new Map(filterFields.map(f => [f, new Map([['', '-none-']])]))
  for (const rid of order) {
    const row = records[rid]
    for (const field of filterFields) {
      const fFieldValues = fieldValues.get(field)
      const { [field]: metaraw } = row
      if (metaraw != null && metaraw.length !== 0) {
        for (const {_id: valueId, value: valueRep} of metaraw) {
          if (!fFieldValues.has(valueId)) {fFieldValues.set(valueId, valueRep)}
        }
      }
    }
  }
  const filterInit = new Map(presentFilterList.map((filterSpec, filterId) => [
    filterId,
    filterSpec.type === 'FullText' ? initf(filterId, '', '') : new Map(
      [...fieldValues.get(filterSpec.field).keys()].map(valueId => [valueId, initf(filterId, valueId, true)])
    ),
  ]))

  return {
    fieldValues,
    filterInit,
  }
}

export function computeFiltering(records, order, fields, filterList, fieldValues, filterSettings) {
  const presentFilterList = filterList.filter(x => fields[x.field])
  const filterChecks = new Map(presentFilterList.map((filterSpec, filterId) => (
    [filterId, (filterSpec.type === 'FullText' ? fullTextCheck : facetCheck)(filterSpec.field, filterSettings.get(filterId))]
  )))
  const filteredData = []
  const otherFilteredData = new Map(presentFilterList.map((filterSpec, filterId) => [filterId, []]))

  for (const rid of order) {
    const row = records[rid]
    let theOneFail = null
    let v = true
    let discard = false
    for (const [filterId, filterCheck] of filterChecks) {
      const pass = filterCheck(row)
      if (!pass) {
        v = false
        if (theOneFail === null) {
          theOneFail = filterId
        }
        else {
          discard = true
          break
        }
      }
    }
    if (!discard) {
      if (v) {
        filteredData.push(row)
        presentFilterList.forEach((filterSpec, filterId) => {
          otherFilteredData.get(filterId).push(row)
        })
      }
      else {
        otherFilteredData.get(theOneFail).push(row)
      }
    }
  }
  const amounts = new Map(presentFilterList.map(({ field, type }, filterId) => (
    [filterId, type === 'FullText' ? null : countFacets(field, fieldValues.get(field), otherFilteredData.get(filterId))]
  )))
  return {
    filteredData,
    filteredAmountOthers: new Map([...otherFilteredData.entries()].map(([filterId, x]) => [filterId, x.length])),
    amounts,
  }
}

export const newFilterSettings = (filterSettings, filterId, data) => {
  switch (typeof data) {
    case 'boolean': {
      const filterSetting = filterSettings.get(filterId)
      filterSettings.set(filterId, new Map([...filterSetting.keys()].map(valueId => [valueId, data])))
      break
    }
    case 'string': {
      filterSettings.set(filterId, data)
      break
    }
    default: {
      const [valueId, filterSetting] = data
      filterSettings.get(filterId).set(valueId, filterSetting)
      break
    }
  }
  return filterSettings
}

const fullTextCheck = (field, term) => {
  const search = term.toLowerCase()
  if (search == null || search == '') {
    return () => true
  }
  return row => {
    let { [field]: val } = row
    val = (val != null) ? val[0] : val
    return val != null && val.toLowerCase().indexOf(search) !== -1
  }
}

const facetCheck = (field, facetValues) => {
  if (facetValues.size === 0) {
    return () => false
  }
  return row => {
    const { [field]: fieldVals } = row
    if (fieldVals == null || fieldVals.length == 0) {
      return facetValues.get('')
    }
    for (const {_id: valueId} of fieldVals) {
      if (facetValues.get(valueId)) {
        return true
      }
    }
    return false
  }
}

function countFacets(field, fieldValues, rows) {
  const facetAmounts = new Map()
  for (const valueId of fieldValues.keys()) {
    facetAmounts.set(valueId, 0)
  }
  for (const { [field]: fieldVals } of rows) {
    if (fieldVals == null || fieldVals.length == 0) {
      facetAmounts.set('', facetAmounts.get('') + 1)
    }
    else {
      for (const {_id: valueId} of fieldVals) {
        facetAmounts.set(valueId, facetAmounts.get(valueId) + 1)
      }
    }
  }
  return facetAmounts
}

export function placeFacets(fieldValues, maxCols) {
  if (fieldValues == null) {return []}
  const facets = [...fieldValues.entries()].sort((x, y) => x[1].localeCompare(y[1]))
  if (facets.length == 0) {return []}
  const rows = []
  const { length: lf } = facets
  const nrows = Math.floor(lf / maxCols) + ((lf % maxCols) ? 1 : 0)
  const ncols = Math.floor(lf / nrows) + ((lf % nrows) ? 1 : 0)
  for (let r = 0; r < nrows; r++) {
    const row = []
    for (let c = 0; c < ncols; c++) {
      const f = nrows * c + r
      row.push((f < lf) ? facets[f] : null)
    }
    rows.push(row)
  }
  return rows
}

export function testAllChecks(filterSettings) {
  let allTrue = true
  let allFalse = true
  for (const valueId of filterSettings.keys()) {
    if (filterSettings.get(valueId)) {
      allFalse = false
    }
    else {
      allTrue = false
    }
  }
  return { allTrue, allFalse }
}

