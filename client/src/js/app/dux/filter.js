import { memoBind } from 'helpers.js'
import { repr } from 'tables.js'

/* ACTIONS */

export const changeFulltext = (table, filterId, searchString) => ({ type: 'fulltext', table, filterId, data: searchString })
export const changeFacet = (table, filterId, valueId, onOff) => ({ type: 'facet', table, filterId, data: [valueId, onOff] })
export const changeFacetAll = (table, filterId, onOff) => ({ type: 'facetAll', table, filterId, data: onOff })

export const setupFiltering = (tables, table) => dispatch => {
  const fieldValues = memoBind(fCC, 'compileFiltering', [table], [tables, table])
  const filterSettings = memoBind(fCC, 'initFiltering', [table], [tables, table, fieldValues])
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
  fieldValues: memoBind(fCC, 'compileFiltering', [table], [tables, table])[filterField]
})

export const getFiltersApplied = ({ tables, filter }, { table }) => {
  const { [table]: filterStatus = { filterSettings: {}, initialized: false } } = filter
  const { filterSettings, initialized } = filterStatus
  const fieldValues = memoBind(fCC, 'compileFiltering', [table], [tables, table])
  if (initialized) {
    return {
      tables,
      initialized,
      fieldValues,
      filterSettings,
      ...computeFiltering(tables, table, fieldValues, filterSettings),
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
  compileFiltering = (tables, table) => {
    const { [table]: { entities, order, valueLists, fields, filterList, fieldSpecs } } = tables
    const presentFilterList = filterList.filter(x => fields[x.field])
    const filterFields = presentFilterList.filter(x => x.type !== 'FullText').map(x => x.field)
    const fieldValues = {}
    for (const field of filterFields) {
      const { [field]: { valType } } = fieldSpecs 
      const { [field]: vals } = valueLists
      const fFieldValues = {['']: '-none-'}
      const orderedVals = Object.keys(vals).sort()
      if (typeof valType == 'string') {
        orderedVals.forEach((v,i) => {fFieldValues[i] = v})
      }
      else {
        const { values: rel } = valType
        orderedVals.forEach(v => {
          fFieldValues[v] = repr(tables, rel, v)
        }) 
      }
      fieldValues[field] = fFieldValues
    }
    return fieldValues
  }
  initFiltering = (tables, table, fieldValues) => {
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


const computeFiltering = (tables, table, fieldValues, filterSettings) => {
  const { [table]: { entities, order, fields, fieldSpecs, filterList } } = tables
  const presentFilterList = filterList.filter(x => fields[x.field])
  const filterChecks = {}
  const otherFilteredData = {}

  const makeFilterCheck= (filterSpec, filterId) => {
    const { field } = filterSpec
    const { [filterId]: filterSetting } = filterSettings
    const { [field]: fieldSpec } = fieldSpecs
    return (
      filterSpec.type === 'FullText' ?
          fulltextCheck :
          facetCheck
      )(tables, field, fieldSpec, filterSetting)
  }

  presentFilterList.forEach((filterSpec, filterId) => {
    filterChecks[filterId] = makeFilterCheck(filterSpec, filterId)
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
    const { [field]: fieldSpec } = fieldSpecs
    amounts[filterId] = type === 'FullText' ? null : countFacets(
      tables, field, fieldSpec, fieldValues[field], otherFilteredData[filterId], entities
    )
  })
  const filteredAmountOthers = {}
  Object.entries(otherFilteredData).forEach(([filterId, x]) => {filteredAmountOthers[filterId] = x.length})
  return {
    filteredData,
    filteredAmountOthers,
    amounts,
  }
}

const getUnpack = (tables, fieldSpec, asString=false) => {
  const { valType, multiple } = fieldSpec 
  let unpack;
  if (typeof valType == 'string') {
    unpack = multiple ? (
      asString ? (
        v => (v == null) ? '' : v.join(' ')
      ) : (
        v => (v == null) ? [] : v
      )
    ) : (
      asString ? (
        v => (v == null) ? '' : v
      ) : (
        v => (v == null) ? [] : [v]
      )
    )
  }
  else {
    const { values: rel } = valType
    unpack = multiple ? (
      asString ? (
        v => (v == null) ? '' : v.map(v => repr(tables, rel, v).join(' '))
      ) : (
        v => (v == null) ? [] : v
      )
    ) : (
      asString ? (
        v => (v == null) ? '' : repr(tables, rel, v)
      ) : (
        v => (v == null) ? [] : [v]
      )
    )
  }
  return unpack
}

const fulltextCheck = (tables, field, fieldSpec, term) => {
  const unpack = getUnpack(tables, fieldSpec, true)
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

const facetCheck = (tables, field, fieldSpec, facetSettings) => {
  const unpack = getUnpack(tables, fieldSpec)
  if (facetSettings.size === 0) {
    return () => false
  }
  return entity => {
    const { values: { [field]: val } } = entity
    const rep = unpack(val)
    if (rep.length == 0) {
      return facetSettings['']
    }
    for (const r of rep) {
      if (facetSettings[r]) {
        return true
      }
    }
    return false
  }
}

const countFacets = (tables, field, fieldSpec, fieldValues, filteredData, entities) => {
  const unpack = getUnpack(tables, fieldSpec)
  const facetAmounts = {}
  Object.keys(fieldValues).forEach(r => {facetAmounts[r] = 0})
  for (const eId of filteredData) {
    const { [eId]: { values: { [field]: val } } } = entities
    const rep = unpack(val)
    if (rep.length == 0) {
      facetAmounts[''] += 1
    }
    else {
      for (const r of rep) {
        facetAmounts[r] += 1
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

