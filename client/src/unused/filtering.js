export const compileFiltering = (entities, order, fields, filterList) => {
  const presentFilterList = filterList.filter(x => fields[x.field])
  const filterFields = presentFilterList.filter(x => x.type !== 'FullText').map(x => x.field)
  const fieldValues = {}
  for (const f of filterFields) {
    fieldValues[f] = {['']: '-none-'}
  }
  for (const eId of order) {
    const entity = entities[eId]
    for (const field of filterFields) {
      const fFieldValues = fieldValues[field]
      const { values: { [field]: efValue } } = entity
      if (efValue != null && efValue.length !== 0) {
        for (const {_id: valueId, value: valueRep} of efValue) {
          fFieldValues[valueId] = valueRep
        }
      }
    }
  }
  const filterInit = {}
  presentFilterList.forEach((filterSpec, filterId) => {
    if (filterSpec.type == 'FullText') {
      filterInit[filterId] = ''
    }
    else {
      const facets = {}
      Object.keys(fieldValues[filterSpec.field]).forEach(valueId => {facets[valueId] = true})
      filterInit[filterId] = facets
    }
  })

  return {
    fieldValues,
    filterInit,
  }
}

export const computeFiltering = (entities, order, fields, filterList, fieldValues, filterSettings) => {
  const presentFilterList = filterList.filter(x => fields[x.field])
  const filterChecks = {}
  const otherFilteredData = {}
  presentFilterList.forEach((filterSpec, filterId) => {
    filterChecks[filterId] = (filterSpec.type === 'FullText' ? fullTextCheck : facetCheck)(filterSpec.field, filterSettings[filterId])
    otherFilteredData[filterId] = []
  })
  const filteredData = []

  for (const rid of order) {
    const entity = entities[rid]
    let theOneFail = null
    let v = true
    let discard = false
    Object.entries(filterChecks).forEach(([filterId, filterCheck]) => {
      if (!discard) {
        const pass = filterCheck(entity)
        if (!pass) {
          v = false
          if (theOneFail === null) {
            theOneFail = filterId
          }
          else {
            discard = true
          }
        }
      }
    })
    if (!discard) {
      if (v) {
        filteredData.push(entity)
        presentFilterList.forEach((filterSpec, filterId) => {
          otherFilteredData[filterId].push(entity)
        })
      }
      else {
        otherFilteredData[theOneFail].push(entity)
      }
    }
  }
  const amounts = {}
  presentFilterList.forEach(({ field, type }, filterId) => {
    amounts[filterId] = type === 'FullText' ? null : countFacets(field, fieldValues[field], otherFilteredData[filterId])
  })
  const filteredAmountOthers = {}
  Object.entries(otherFilteredData).forEach(([filterId, x]) => {filteredAmountOthers[filterId] = x.length})
  return {
    filteredData,
    filteredAmountOthers,
    amounts,
  }
}

export const newFilterSettings = (filterSettings, filterId, data) => {
  switch (typeof data) {
    case 'boolean': {
      const sameSettings = {}
      Object.keys(filterSettings[filterId]).forEach(valueId => {sameSettings[valueId] = data})
      return {
        ...filterSettings,
        [filterId]: sameSettings,
      }
    }
    case 'string': {
      return {
        ...filterSettings,
        [filterId]: data,
      }
    }
    default: {
      const [valueId, filterSetting] = data
      return {
        ...filterSettings,
        [filterId]: {
          ...filterSettings[filterId],
          [valueId]: data,
        },
      }
    }
  }
}

const fullTextCheck = (field, term) => {
  const search = term.toLowerCase()
  if (search == null || search == '') {
    return () => true
  }
  return entity => {
    let { values: { [field]: val } } = entity
    val = (val != null) ? val[0] : val
    return val != null && val.toLowerCase().indexOf(search) !== -1
  }
}

const facetCheck = (field, facetValues) => {
  if (facetValues.size === 0) {
    return () => false
  }
  return entity => {
    const { values: { [field]: fieldVals } } = entity
    if (fieldVals == null || fieldVals.length == 0) {
      return facetValues['']
    }
    for (const {_id: valueId} of fieldVals) {
      if (facetValues[valueId]) {
        return true
      }
    }
    return false
  }
}

const countFacets = (field, fieldValues, entities) => {
  const facetAmounts = {}
  Object.keys(fieldValues).forEach(valueId => {
    facetAmounts[valueId] = 0
  })
  for (const { [field]: fieldVals } of entities) {
    if (fieldVals == null || fieldVals.length == 0) {
      facetAmounts[''] += 1
    }
    else {
      for (const {_id: valueId} of fieldVals) {
        facetAmounts[valueId] += 1
      }
    }
  }
  return facetAmounts
}

export const placeFacets = (fieldValues, maxCols) => {
  if (fieldValues == null) {return []}
  const facets = Object.entries(fieldValues).sort((x, y) => x[1].localeCompare(y[1]))
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

export const testAllChecks = filterSettings => {
  let allTrue = true
  let allFalse = true
  for (const valueId of Object.keys(filterSettings)) {
    if (filterSettings[valueId]) {
      allFalse = false
    }
    else {
      allTrue = false
    }
  }
  return { allTrue, allFalse }
}

