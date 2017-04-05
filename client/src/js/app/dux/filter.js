import { memoBind } from 'helpers.js'
import { repr } from tables.js

/* ACTIONS */

export const changeFulltext = (table, filterId, searchString) => ({ type: 'fulltext', table, filterId, data: searchString })
export const changeFacet = (table, filterId, valueId, onOff) => ({ type: 'facet', table, filterId, data: [valueId, onOff] })
export const changeFacetAll = (table, filterId, onOff) => ({ type: 'facetAll', table, filterId, data: onOff })

export const setupFiltering = (table, tables) => dispatch => {
  const fieldValues = memoBind(fCC, 'compileFiltering', [table], [tables])
  const filterSettings = memoBind(fCC, 'initFiltering', [table], [tables, fieldValues])
  dispatch({ type: 'setupFiltering', table, filterSettings })
}

/* REDUCER */

export default (state={}, { type, table, filterId, data, filterSettings }) => {
  switch (type) {
    case 'setupFiltering': {
      return {
        ...state,
        [table]: { filterSettings, initialized: true }
      }
    }
    case 'fulltext': {
      return {
        ...state,
        [table]: {
          ...state[table],
          filterSettings: {
            ...state[table].filterSettings,
            [filterId]: data,
          },
        },
      }
    }
    case 'facetAll': {
      const sameSettings = {}
      Object.keys(state.filterSettings[filterId]).forEach(valueId => {sameSettings[valueId] = data})
      return {
        ...state,
        [table]: {
          ...state[table],
          filterSettings: {
            ...state[table].filterSettings,
            [filterId]: sameSettings,
          },
        },
      }
    }
    case 'facet': {
      const [valueId, filterSetting] = data
      return {
        ...state,
        [table]: {
          ...state[table],
          filterSettings: {
            ...state[table].filterSettings,
            [filterId]: {
              ...state[table].filterSettings[filterId],
              [valueId]: filterSetting,
            },
          },
        },
      }
    }
    default: return state
  }
}

/* SELECTORS */

export const getFilterSetting = ({ filter }, { table, filterId }) => ({
  filterSetting: filter[table].filterSettings[filterId],
})

export const getFieldValues = ({ tables }, { table, filterField }) => ({
  fieldValues: memoBind(fCC, 'compileFiltering', [table], [tables])[filterField]
})

export const getFiltersApplied = ({ tables, filter }, { table }) => {
  const { [table]: filterStatus = { filterSettings: {}, initialized: false } } = filter
  const { filterSettings, initialized } = filterStatus
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

/* HELPERS */

class FilterCompileCache {
  compileFiltering = (table, tables) => {
    const { [table]: { entities, order, valueLists, fields, filterList, fieldSpecs } } = tables
    const presentFilterList = filterList.filter(x => fields[x.field])
    const filterFields = presentFilterList.filter(x => x.type !== 'FullText').map(x => x.field)
    const fieldValues = {}
    for (const field of filterFields) {
      const { [field]: { valType } = fieldSpecs 
      const { [field]: vals } = valueLists
      const fFieldValues = {['']: '-none-'}
      const orderedVals = Object.keys(vals).sort()
      if ((typeof valType == 'string') || ( valType.values == 'values')) {
        orderedVals.forEach((v,i) => {fFieldValues[i] = v}
      }
      else {
        const { values: table } = valType
        orderedVals.forEach(v => {fFieldValues[v] = repr(table, tables, v)} 
      }
      fieldValues[field] = fFieldValues
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
    filterChecks[filterId] = (
      filterSpec.type === 'FullText' ?
        fulltextCheck(table, tables) :
        facetCheck
    )(filterSpec.field, filterSettings[filterId])
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

const getUnpack = (table, tables, field, fieldSpec) => {
  const { [field]: { valType, multiple } = fieldSpecs 
  let unpack;
  if ((typeof valType == 'string') || (valType.values == 'values')) {
    if (multiple) {
      unpack = v => (v == null)?'':v.join(' ')
    }
    else {
      unpack = v => (v == null)?'':v
    }
  }
  else {
    const { values: table } = valType
    if (multiple) {
      unpack = v => (v == null)?'':v.map(v => repr(table, tables, v).join(' ')
    }
    else {
      unpack = v => (v == null)?'':repr(table, tables, v)
    }
  }
}

const fulltextCheck = (table, tables) => {
  const { [table]: { fieldSpecs: { [field]: fieldSpec } } } = tables
  const unpack = getUnpack(table, tables, field, fieldSpec)
  return (field, term) => {
    const search = term.toLowerCase()
    if (search == null || search == '') {
      return () => true
    }
    return entity => {
      const { values: { [field]: val } } = entity
      const rep = unpack(val)
      return rep != null && rep.toLowerCase().indexOf(search) !== -1
    }
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

