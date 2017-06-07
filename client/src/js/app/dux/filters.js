import merge from 'lodash/merge'
import { createSelectorCreator, defaultMemoize } from 'reselect'
import createCachedSelector from 're-reselect'

import { makeReducer, levelOneEq, emptyO } from 'utils'
import { repRelated } from 'tables'

/* ACTIONS */

export const changeFulltext = (table, filterId, searchString) => ({ type: 'fulltext', table, filterId, data: searchString })
export const changeFacet = (table, filterId, valueId, onOff) => ({ type: 'facet', table, filterId, data: [valueId, onOff] })
export const changeFacetAll = (table, filterId, onOff) => ({ type: 'facetAll', table, filterId, data: onOff })

export const setupFiltering = (tables, table) => dispatch => {
  const filterSettings = getFiltersInitialized({ tables }, { table })
  dispatch({ type: 'setupFiltering', table, filterSettings })
}

/* REDUCER */

const flows = {
  setupFiltering(state, { table, filterSettings }) {
    return merge({}, state, { [table]: { filterSettings, initialized: true } })
  },
  fulltext(state, { table, filterId, data }) {
    return merge({}, state, { [table]: { filterSettings: { [filterId]: data } } })
  },
  facetAll(state, { table, filterId, data }) {
    const { [table]: { filterSettings: { [filterId]: facets } } } = state
    const sameSettings = {}
    Object.keys(facets).forEach(valueId => {sameSettings[valueId] = data})
    return merge({}, state, { [table]: { filterSettings: { [filterId]: sameSettings } } })
  },
  facet(state, { table, filterId, data }) {
    const [valueId, filterSetting] = data
    return merge({}, state, { [table]: { filterSettings: { [filterId]: { [valueId]: filterSetting } } } })
  },
}

export default makeReducer(flows)

/* SELECTORS */

/* selector creator */

const createLevelOneSelector = createSelectorCreator(
  defaultMemoize,
  levelOneEq,
)

/* basic selectors */

const getFilterData = ({ tables }, { table, select, listIds }) => {
  const { [table]: { valueLists, fields, filterList, fieldSpecs } } = tables
  const selection = { tables, table, valueLists, fields, filterList, fieldSpecs, select, listIds }
  for (const field of Object.keys(valueLists)) {
    const { [field]: { valType: { values: relTable } } } = fieldSpecs
    const { [relTable]: relTableData } = tables
    selection[relTable] = relTableData
  }
  return selection
}

/* selector computers */

const gatherValues = (tables, table, listIds, filterFields, fieldSpecs) => {
  const theseValues = {}
  const { [table]: { entities } } = tables
  const records = listIds.map(eId => entities[eId].values)
  for (const field of filterFields) {
    const { [field]: { multiple } } = fieldSpecs
    const valueSet = new Set()
    for (const r of records) {
      const { [field]: val } = r
      if (val == null) {continue}
      if (multiple) {for (const v of val) {valueSet.add(v)}}
      else {valueSet.add(val)}
    }
    theseValues[field] = Array.from(new Set(valueSet))
  }
  return theseValues
}
const compileFiltering = ({
  tables, table, valueLists,
  select, listIds,
  fields, filterList, fieldSpecs,
  ...relTables
}) => {
  console.warn('LISTIDS', listIds)
  if (filterList == null) {return emptyO}
  const presentFilterList = filterList.filter(x => fields[x.field])
  const filterFields = presentFilterList.filter(x => x.type !== 'Fulltext').map(x => x.field)
  const these = select == 'details'
  let theseValueLists = valueLists
  console.warn('THESE', these)
  if (these) {
    theseValueLists = gatherValues(tables, table, listIds, filterFields, fieldSpecs)
    console.warn('THESE', theseValueLists)
  }
  const fieldValues = {}
  for (const field of filterFields) {
    const { [field]: { valType } } = fieldSpecs
    const { [field]: vals } = theseValueLists
    console.warn('VALS', vals)
    if (vals == null) {continue}
    const fFieldValues = {'': '-none-'}
    if (typeof valType == 'string') {
      vals.forEach((v, i) => {fFieldValues[i] = v})
    }
    else {
      const { values: relTable } = valType
      vals.forEach(v => {
        fFieldValues[v] = repRelated(relTables, relTable, v)
      })
    }
    fieldValues[field] = fFieldValues
  }
  console.warn('FIELDVALUES', fieldValues)
  return fieldValues
}

const initFiltering = ({ fields, filterList }, fieldValues) => {
  if (filterList == null) {return emptyO}
  const presentFilterList = filterList.filter(x => fields[x.field])
  const filterSettings = {}
  presentFilterList.forEach((filterSpec, filterId) => {
    if (filterSpec.type == 'Fulltext') {
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

const computeFiltering = (tables, table, fieldValues, filterSettings) => {
  const { [table]: { entities, allIds, fields, fieldSpecs, filterList } } = tables
  if (filterList == null) {return { filteredIds: allIds }}
  const presentFilterList = filterList.filter(x => fields[x.field])
  const filterChecks = {}
  const otherFilteredIds = {}

  const makeFilterCheck = (filterSpec, filterId) => {
    const { field } = filterSpec
    const { [filterId]: filterSetting } = filterSettings
    const { [field]: fieldSpec } = fieldSpecs
    return (
      filterSpec.type === 'Fulltext' ?
          fulltextCheck :
          facetCheck
      )(tables, field, fieldSpec, filterSetting)
  }

  presentFilterList.forEach((filterSpec, filterId) => {
    filterChecks[filterId] = makeFilterCheck(filterSpec, filterId)
    otherFilteredIds[filterId] = []
  })
  const filteredIds = []

  for (const eId of allIds) {
    const { [eId]: entity } = entities
    let theOneFail = null
    let v = true
    let discard = false
    Object.entries(filterChecks).forEach(([filterId, filterCheck]) => {
      if (!discard) {
        const pass = filterCheck(entity)
        if (!pass) {
          v = false
          if (theOneFail === null) {theOneFail = filterId}
          else {discard = true}
        }
      }
    })
    if (!discard) {
      const { values: { _id } } = entity
      if (v) {
        filteredIds.push(_id)
        presentFilterList.forEach((filterSpec, filterId) => {
          otherFilteredIds[filterId].push(_id)
        })
      }
      else {otherFilteredIds[theOneFail].push(_id)}
    }
  }
  const amounts = {}
  presentFilterList.forEach(({ field, type }, filterId) => {
    const { [field]: fieldSpec } = fieldSpecs
    amounts[filterId] = type === 'Fulltext' ? null : countFacets(
      tables, field, fieldSpec, fieldValues[field], otherFilteredIds[filterId], entities
    )
  })
  const filteredAmountOthers = {}
  Object.entries(otherFilteredIds).forEach(([filterId, x]) => {
    filteredAmountOthers[filterId] = x.length
  })
  return {
    filteredIds,
    filteredAmountOthers,
    amounts,
  }
}

/* selectors for export */

const getFiltersCompiled = createLevelOneSelector(
  getFilterData,
  compileFiltering,
)

export const getFieldValues = ({ tables }, { table, filterField }) => ({
  fieldValues: getFiltersCompiled({ tables }, { table })[filterField],
})

const getFiltersInitialized = createLevelOneSelector(
  getFilterData,
  getFiltersCompiled,
  initFiltering,
)

export const getFilterSetting = ({ filters }, { table, filterId }) => ({
  filterSetting: filters[table].filterSettings[filterId],
})

const getFiltersAppliedBase = ({ tables, filters, table, select, listIds }) => {
  const { [table]: filterStatus = { filterSettings: emptyO, initialized: false } } = filters
  const { filterSettings, initialized } = filterStatus
  const fieldValues = getFiltersCompiled({ tables }, { table, select, listIds })
  const result = initialized ?
    ({
      tables,
      initialized,
      fieldValues,
      filterSettings,
      ...computeFiltering(tables, table, fieldValues, filterSettings),
    }) :
    ({
      tables,
      initialized,
      fieldValues,
    })
  return result
}

const getFilterArgs = ({ tables, filters }, { table, select, listIds }) => ({ tables, table, select, listIds, filters })

export const getFiltersApplied = createCachedSelector(
  getFilterArgs,
  getFiltersAppliedBase,
)(({ tables, filters }, { table, select }) => `${table}-${select}`)

/* HELPERS */

const getUnpack = (tables, fieldSpec, asString = false) => {
  const { valType, multiple } = fieldSpec
  let unpack
  if (typeof valType == 'string') {
    unpack = multiple ? (
      asString ? (
        v => v == null ? '' : v.join(' ')
      ) : (
        v => v == null ? [] : v
      )
    ) : (
      asString ? (
        v => v == null ? '' : v
      ) : (
        v => v == null ? [] : [v]
      )
    )
  }
  else {
    const { values: relTable } = valType
    unpack = multiple ? (
      asString ? (
        v => v == null ? '' : v.map(v => repRelated(tables, relTable, v).join(' '))
      ) : (
        v => v == null ? [] : v
      )
    ) : (
      asString ? (
        v => v == null ? '' : repRelated(tables, relTable, v)
      ) : (
        v => v == null ? [] : [v]
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

const countFacets = (tables, field, fieldSpec, fieldValues, filteredIds, entities) => {
  const unpack = getUnpack(tables, fieldSpec)
  const facetAmounts = {}
  Object.keys(fieldValues).forEach(r => {facetAmounts[r] = 0})
  for (const eId of filteredIds) {
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

const INTL = new Intl.Collator('en', { sensitivity: 'base' })
const sortEntries = (x, y) => INTL.compare(x[1], y[1])

export const placeFacets = (fieldValues, maxCols) => {
  if (fieldValues == null) {return []}
  const facets = Object.entries(fieldValues).sort(sortEntries)
  if (facets.length == 0) {return []}
  const rows = []
  const { length: lf } = facets
  const nrows = Math.floor(lf / maxCols) + (lf % maxCols ? 1 : 0)
  const ncols = Math.floor(lf / nrows) + (lf % nrows ? 1 : 0)
  for (let r = 0; r < nrows; r++) {
    const row = []
    for (let c = 0; c < ncols; c++) {
      const f = nrows * c + r
      row.push(f < lf ? facets[f] : null)
    }
    rows.push(row)
  }
  return rows
}

export const testAllChecks = filterSettings => {
  let allTrue = true
  let allFalse = true
  for (const valueEntry of Object.entries(filterSettings)) {
    if (valueEntry[1]) {allFalse = false}
    else {allTrue = false}
  }
  return { allTrue, allFalse }
}

