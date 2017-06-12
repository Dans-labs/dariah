import merge from 'lodash/merge'
import pickBy from 'lodash/pickby'

import { memoize } from 'memo'
import { makeReducer, emptyO } from 'utils'
import { repRelated, DETAILS } from 'tables'

/* ACTIONS */

export const changeFulltext = (table, filterTag, filterId, searchString) => ({ type: 'fulltext', table, filterTag, filterId, data: searchString })
export const changeFacet = (table, filterTag, filterId, valueId, onOff) => ({ type: 'facet', table, filterTag, filterId, data: [valueId, onOff] })
export const changeFacetAll = (table, filterTag, filterId, onOff) => ({ type: 'facetAll', table, filterTag, filterId, data: onOff })

export const initFiltering = (tableData, table, filterTag, listIds) => {
  const fieldIds = compileFieldIds({ tableData, filterTag, listIds })
  return { type: 'initFiltering', tableData, table, filterTag, fieldIds }
}

/* REDUCER */

const flows = {
  initFiltering(state, { tableData, table, filterTag, fieldIds }) {
    const { [table]: filterData = {} } = state
    const defaults = initFilterSettings(tableData, filterData, filterTag, fieldIds)
    return merge({}, state, { [table]: { [filterTag]: defaults } })
  },
  fulltext(state, { table, filterTag, filterId, data }) {
    return merge({}, state, { [table]: { [filterTag]: { [filterId]: data } } })
  },
  facetAll(state, { table, filterTag, filterId, data }) {
    const { [table]: { [filterTag]: { [filterId]: facets } } } = state
    const sameSettings = {}
    Object.keys(facets).forEach(valueId => {sameSettings[valueId] = data})
    return merge({}, state, { [table]: { [filterTag]: { [filterId]: sameSettings } } })
  },
  facet(state, { table, filterTag, filterId, data }) {
    const [valueId, filterSetting] = data
    return merge({}, state, { [table]: { [filterTag]: { [filterId]: { [valueId]: filterSetting } } } })
  },
}

export default makeReducer(flows)

/* SELECTORS */

/* selector computers */

const gatherIds = memoize((tableData, listIds, filterFields, fieldSpecs) => {
  const theseIds = {}
  const { entities } = tableData
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
    theseIds[field] = Array.from(new Set(valueSet))
  }
  return theseIds
}, emptyO)

const compileFieldIds = memoize(({ tableData, filterTag, listIds }) => {
  if (tableData == null) {return emptyO}
  const { valueLists, fields, filterList, fieldSpecs } = tableData
  if (filterList == null) {return emptyO}
  const presentFilterList = filterList.filter(x => fields[x.field])
  const filterFields = presentFilterList.filter(x => x.type !== 'Fulltext').map(x => x.field)
  const these = filterTag.startsWith(DETAILS)
  return these ?
    gatherIds(tableData, listIds, filterFields, fieldSpecs) :
    pickBy(valueLists, (value, key) => filterFields.includes(key))
}, emptyO)

const initFilterSettings = memoize((tableData, filterData, filterTag, fieldIds) => {
  if (tableData == null) {return emptyO}
  const { fields, filterList } = tableData
  if (filterList == null) {return emptyO}
  const { [filterTag]: filterSettings = emptyO } = filterData || emptyO
  const presentFilterList = filterList.filter(x => fields[x.field])
  const newFilterSettings = {}
  presentFilterList.forEach((filterSpec, filterId) => {
    const { [filterId]: filterSetting } = filterSettings
    if (filterSpec.type == 'Fulltext') {
      if (filterSetting == null) {newFilterSettings[filterId] = ''}
    }
    else {
      const theFacets = filterSetting || emptyO
      const newFacets = {}
      fieldIds[filterSpec.field].forEach(valueId => {
        if (theFacets[valueId] == null) {newFacets[valueId] = true}
      })
      if (theFacets[''] == null) {newFacets[''] = true}
      if (Object.keys(newFacets).length) {newFilterSettings[filterId] = newFacets}
    }
  })
  return newFilterSettings
}, { 3: -1 })

const computeFiltering = memoize((tables, table, listIds, fieldIds, filterSettings) => {
  if (filterSettings == null) {return emptyO}
  const { [table]: { entities, fields, fieldSpecs, filterList } } = tables
  if (filterList == null) {return { filteredIds: listIds }}
  const presentFilterList = filterList.filter(x => fields[x.field])

  const filterChecks = {}

  const makeFilterCheck = (filterSpec, filterId) => {
    const { [filterId]: filterSetting } = filterSettings
    const { field } = filterSpec
    const { [field]: fieldSpec } = fieldSpecs
    const filterCheck = filterSpec.type === 'Fulltext' ? fulltextCheck : facetCheck
    filterChecks[filterId] = filterCheck(tables, field, fieldSpec, filterSetting)
  }

  const otherFilteredIds = {}
  presentFilterList.forEach((filterSpec, filterId) => {
    makeFilterCheck(filterSpec, filterId)
    otherFilteredIds[filterId] = []
  })
  const filteredIds = []

  for (const eId of listIds) {
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
      tables, field, fieldSpec, fieldIds[field], otherFilteredIds[filterId], entities
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
}, { 3: -1 })

/* selectors for export */

export const getFieldValues = memoize(({ tables }, { table, filterTag, listIds, filterField }) => {
  const { [table]: tableData } = tables
  if (tableData == null) {return emptyO}
  const { fieldSpecs } = tableData
  const fieldIds = compileFieldIds({ tableData, filterTag, listIds })[filterField]

  const { [filterField]: { valType } } = fieldSpecs
  if (fieldIds == null) {return emptyO}
  const fieldValues = {'': '-none-'}
  const { values: relTable } = valType
  fieldIds.forEach(_id => {
    fieldValues[_id] = repRelated(tables, relTable, _id)
  })
  return { fieldValues }
}, emptyO)

export const getFilterSetting = memoize(({ filters }, { table, filterTag, filterId }) => {
  const { [table]: filterData } = filters
  if (filterData == null) {return emptyO}
  const { [filterTag]: filterSettings = emptyO } = filterData
  const { [filterId]: filterSetting } = filterSettings
  return { filterSetting }
}, emptyO)

export const getFiltersApplied = memoize(({ tables, filters }, { table, filterTag, listIds }) => {
  const { [table]: tableData } = tables
  const { [table]: filterData = emptyO } = filters
  if (tableData == null) {return emptyO}
  const fieldIds = compileFieldIds({ tableData, filterTag, listIds })
  const { [filterTag]: filterSettings } = filterData
  if (filterSettings == null) {return { tableData }}
  return {
    tableData,
    filterSettings,
    ...computeFiltering(tables, table, listIds, fieldIds, filterSettings),
  }
}, emptyO)

/* HELPERS */

export const makeTag = (select, masterId, linkField) => masterId == null ?
  select :
  `${select}-${masterId}-${linkField}`

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

const fulltextCheck = memoize((tables, field, fieldSpec, term) => {
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
}, {})

const facetCheck = memoize((tables, field, fieldSpec, facetSettings) => {
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
}, {})

const countFacets = (tables, field, fieldSpec, fieldIds, filteredIds, entities) => {
  const unpack = getUnpack(tables, fieldSpec)
  const facetAmounts = {}
  fieldIds.forEach(_id => {facetAmounts[_id] = 0})
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

export const placeFacets = memoize((fieldValues, maxCols) => {
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
})

export const testAllChecks = filterSetting => {
  let allTrue = true
  let allFalse = true
  if (filterSetting == null) {return { allTrue, allFalse }}
  for (const valueEntry of Object.entries(filterSetting)) {
    if (valueEntry[1]) {allFalse = false}
    else {allTrue = false}
  }
  return { allTrue, allFalse }
}

