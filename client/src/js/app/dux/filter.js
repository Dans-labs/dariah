import memoBind from 'memoBind.js'

/* REDUCER */

export default (state={
  filterSettings: {},
  initialized: false,
}, { type, filterId, data, ...rest }) => {
  switch (type) {
    case 'setupFiltering': {
      return { ...state, ...rest, initialized: true }
    }
    case 'fulltext': {
      return {
        ...state,
        filterSettings: {
          ...state.filterSettings,
          [filterId]: data,
        },
      }
    }
    case 'facetAll': {
      const sameSettings = {}
      Object.keys(state.filterSettings[filterId]).forEach(valueId => {sameSettings[valueId] = data})
      return {
        ...state,
        filterSettings: {
          ...state.filterSettings,
          [filterId]: sameSettings,
        },
      }
    }
    case 'facet': {
      const [valueId, filterSetting] = data
      return {
        ...state,
        filterSettings: {
          ...state.filterSettings,
          [filterId]: {
            ...state.filterSettings[filterId],
            [valueId]: filterSetting,
          },
        },
      }
    }
    default: return state
  }
}

/* SELECTORS */

export const getFilterSetting = ({ filter: { filterSettings } }, { filterId }) => ({
  filterSetting: filterSettings[filterId],
})

export const getFieldValues = ({ tables }, { table, filterField }) => ({
  fieldValues: memoBind(fCC, 'compileFiltering', [table], [tables])[filterField]
})

export const getFilterApplied = ({ tables, filter: { filterSettings, initialized } }, { table }) => {
  const fieldValues = memoBind(fCC, 'compileFiltering', [table], [tables])
  if (initialized) {
    return {
      tables,
      initialized,
      fieldValues,
      filterSettings,
      ...computeFiltering(table, tables, fieldValues, filterSettings),
    }
  }
  else {
    return {
      tables,
      initialized,
      fieldValues,
    }
  }
}

/* ACTIONS */

export const changeFulltext = (filterId, searchString) => ({ type: 'fulltext', filterId, data: searchString })
export const changeFacet = (filterId, valueId, onOff) => ({ type: 'facet', filterId, data: [valueId, onOff] })
export const changeFacetAll = (filterId, onOff) => ({ type: 'facetAll', filterId, data: onOff })

export const setupFiltering = (table, tables) => dispatch => {
  const fieldValues = memoBind(fCC, 'compileFiltering', [table], [tables])
  const filterSettings = memoBind(fCC, 'initFiltering', [table], [tables, fieldValues])
  dispatch({ type: 'setupFiltering', filterSettings })
}

/* HELPERS */

class FilterCompileCache {
  compileFiltering = (table, tables) => {
    const { [table]: { entities, order, fields, filterList } } = tables
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
    return fieldValues
  }
  initFiltering = (table, tables, fieldValues) => {
    const { [table]: { entities, order, fields, filterList } } = tables
    const presentFilterList = filterList.filter(x => fields[x.field])
    const filterSettings = {}
    presentFilterList.forEach((filterSpec, filterId) => {
      if (filterSpec.type == 'FullText') {
        filterSettings[filterId] = ''
      }
      else {
        const facets = {}
        Object.keys(fieldValues[filterSpec.field]).forEach(valueId => {facets[valueId] = true})
        filterSettings[filterId] = facets
      }
    })
    return filterSettings
  }
}
const fCC = new FilterCompileCache()

const computeFiltering = (table, tables, fieldValues, filterSettings) => {
  const { [table]: { entities, order, fields, filterList } } = tables
  const presentFilterList = filterList.filter(x => fields[x.field])
  const filterChecks = {}
  const otherFilteredData = {}
  presentFilterList.forEach((filterSpec, filterId) => {
    filterChecks[filterId] = (filterSpec.type === 'FullText' ? fulltextCheck : facetCheck)(filterSpec.field, filterSettings[filterId])
    otherFilteredData[filterId] = []
  })
  const filteredData = []

  for (const eId of order) {
    const entity = entities[eId]
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
      const { values: { _id } } = entity
      if (v) {
        filteredData.push(_id)
        presentFilterList.forEach((filterSpec, filterId) => {
          otherFilteredData[filterId].push(_id)
        })
      }
      else {
        otherFilteredData[theOneFail].push(_id)
      }
    }
  }
  const amounts = {}
  presentFilterList.forEach(({ field, type }, filterId) => {
    amounts[filterId] = type === 'FullText' ? null : countFacets(field, fieldValues[field], otherFilteredData[filterId], entities)
  })
  const filteredAmountOthers = {}
  Object.entries(otherFilteredData).forEach(([filterId, x]) => {filteredAmountOthers[filterId] = x.length})
  return {
    filteredData,
    filteredAmountOthers,
    amounts,
  }
}

const fulltextCheck = (field, term) => {
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

const facetCheck = (field, facetSettings) => {
  if (facetSettings.size === 0) {
    return () => false
  }
  return entity => {
    const { values: { [field]: fieldVals } } = entity
    if (fieldVals == null || fieldVals.length == 0) {
      return facetSettings['']
    }
    for (const {_id: valueId} of fieldVals) {
      if (facetSettings[valueId]) {
        return true
      }
    }
    return false
  }
}

const countFacets = (field, fieldValues, filteredData, entities) => {
  const facetAmounts = {}
  Object.keys(fieldValues).forEach(valueId => {
    facetAmounts[valueId] = 0
  })
  for (const eId of filteredData) {
    const { values: { [field]: fieldVals } } = entities[eId]
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
  for (const [valueId, valueRep] of Object.entries(filterSettings)) {
    if (valueRep) {allFalse = false}
    else {allTrue = false}
  }
  return { allTrue, allFalse }
}

