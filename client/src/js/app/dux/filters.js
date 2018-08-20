import pickBy from 'lodash/pickby'

import { memoize } from 'memo'
import { makeReducer, updateAuto, emptyS, emptyA, emptyO } from 'utils'
import { headEntity, DETAILS } from 'tables'

/* ACTIONS */

export const changeFulltext = (table, filterTag, filterId, searchString) => ({
  type: 'fulltext',
  table,
  filterTag,
  filterId,
  data: searchString,
})
export const changeFacet = (table, filterTag, filterId, valueId, onOff) => ({
  type: 'facet',
  table,
  filterTag,
  filterId,
  data: [valueId, onOff],
})
export const changeFacetAll = (table, filterTag, filterId, onOff) => ({
  type: 'facetAll',
  table,
  filterTag,
  filterId,
  data: onOff,
})

export const initFiltering = (tables, table, filterTag) => {
  const { [table]: tableData } = tables
  const fieldIds = compileAllFieldIds(tableData)
  return { type: 'initFiltering', tables, table, filterTag, fieldIds }
}

/* REDUCER */

const flows = {
  initFiltering(state, { tables, table, filterTag, fieldIds }) {
    const { [table]: filterData = {} } = state
    const defaults = initFilterSettings(
      tables,
      table,
      filterData,
      filterTag,
      fieldIds,
    )
    return updateAuto(state, [table, filterTag], { $set: defaults })
  },
  fulltext(state, { table, filterTag, filterId, data }) {
    return updateAuto(state, [table, filterTag, filterId], { $set: data })
  },
  facetAll(state, { table, filterTag, filterId, data }) {
    const { [table]: { [filterTag]: { [filterId]: facets } } } = state
    const sameSettings = {}
    Object.keys(facets).forEach(valueId => {
      sameSettings[valueId] = data
    })
    return updateAuto(state, [table, filterTag, filterId], {
      $set: sameSettings,
    })
  },
  facet(state, { table, filterTag, filterId, data }) {
    const [valueId, filterSetting] = data
    return updateAuto(state, [table, filterTag, filterId, valueId], {
      $set: filterSetting,
    })
  },
}

export default makeReducer(flows)

/* SELECTORS */

export const getFilters = ({ filters }) => ({ filters })

/* HELPERS */

const compileAllFieldIds = memoize(
  tableData => {
    if (tableData == null) {
      return emptyO
    }
    const { valueLists, fields, filterList, fieldSpecs } = tableData
    if (filterList == null) {
      return emptyO
    }
    const presentFilterList = filterList.filter(x => fields[x.field])
    const filterFields = presentFilterList
      .filter(x => x.type !== 'Fulltext')
      .map(x => x.field)
    const gatherFields = filterFields.filter(x => valueLists[x] == null)
    return {
      ...pickBy(valueLists, (value, key) => filterFields.includes(key)),
      ...(gatherFields.length
        ? gatherAllIds(tableData, gatherFields, fieldSpecs)
        : emptyO),
    }
  },
  emptyO,
  { debug: 'compileAllFieldIds' },
)

const compileFieldIds = memoize(
  (tableData, filterTag, listIds) => {
    if (tableData == null) {
      return emptyO
    }
    const { valueLists, fields, filterList, fieldSpecs } = tableData
    if (filterList == null) {
      return emptyO
    }
    const presentFilterList = filterList.filter(x => fields[x.field])
    const filterFields = presentFilterList
      .filter(x => x.type !== 'Fulltext')
      .map(x => x.field)
    const these = filterTag.startsWith(DETAILS)
    const gatherFields = filterFields.filter(x => valueLists[x] == null)
    return these
      ? gatherIds(tableData, listIds, filterFields, fieldSpecs)
      : {
          ...pickBy(valueLists, (value, key) => filterFields.includes(key)),
          ...(gatherFields.length
            ? gatherIds(tableData, listIds, gatherFields, fieldSpecs)
            : emptyO),
        }
  },
  emptyO,
  { debug: 'compileFieldIds' },
)

export const compileValues = memoize(
  (tables, table, filterTag, listIds, filterField, filterRelField) => {
    const { [table]: tableData } = tables
    if (tableData == null) {
      return emptyO
    }
    const { fieldSpecs } = tableData
    const fieldIds = compileFieldIds(tableData, filterTag, listIds)[filterField]
    return gatherValues(
      tables,
      fieldSpecs,
      fieldIds,
      filterField,
      filterRelField,
    )
  },
  emptyO,
  { debug: 'compileValues' },
)

const initFilterSettings = memoize(
  (tables, table, filterData, filterTag, fieldIds) => {
    const { [table]: tableData } = tables
    if (tableData == null) {
      return emptyO
    }
    const { fields, filterList } = tableData
    if (filterList == null) {
      return emptyO
    }
    const { [filterTag]: filterSettings = emptyO } = filterData || emptyO
    const presentFilterList = filterList.filter(x => fields[x.field])
    const newFilterSettings = {}
    presentFilterList.forEach((filterSpec, filterId) => {
      const { [filterId]: filterSetting } = filterSettings
      if (filterSpec.type === 'Fulltext') {
        if (filterSetting == null) {
          newFilterSettings[filterId] = emptyS
        }
      } else {
        const theFacets = filterSetting || emptyO
        const newFacets = {}
        const { field, relField } = filterSpec
        const { [field]: theseIds } = fieldIds
        if (relField) {
          const { fieldSpecs } = tableData
          const fieldValues = gatherValues(
            tables,
            fieldSpecs,
            theseIds,
            field,
            relField,
          )
          for (const value of Object.keys(fieldValues)) {
            newFacets[value] =
              theFacets[value] == null ? true : theFacets[value]
          }
        } else {
          theseIds.forEach(valueId => {
            newFacets[valueId] =
              theFacets[valueId] == null ? true : theFacets[valueId]
          })
        }
        newFacets[emptyS] = theFacets[emptyS] == null ? true : theFacets[emptyS]
        if (Object.keys(newFacets).length) {
          newFilterSettings[filterId] = newFacets
        }
      }
    })
    return newFilterSettings
  },
  emptyO,
  { debug: 'initFilterSettings' },
)

export const computeFiltering = memoize(
  (tables, filters, table, filterTag, listIds) => {
    const { [table]: tableData } = tables
    if (tableData == null) {
      return emptyO
    }
    const { entities, fields, fieldSpecs, filterList } = tableData
    if (filterList == null) {
      return { filteredIds: listIds }
    }

    const { [table]: filterData = emptyO } = filters
    const { [filterTag]: filterSettings } = filterData
    if (filterSettings == null) {
      return emptyO
    }

    const fieldIds = compileFieldIds(tableData, filterTag, listIds)
    const presentFilterList = filterList.filter(x => fields[x.field])

    const filterChecks = {}

    const makeFilterCheck = (filterSpec, filterId) => {
      const { [filterId]: filterSetting } = filterSettings
      const { field, relField } = filterSpec
      const { [field]: fieldSpec } = fieldSpecs
      const filterCheck =
        filterSpec.type === 'Fulltext' ? fulltextCheck : facetCheck
      filterChecks[filterId] = filterCheck(
        tables,
        field,
        relField,
        fieldSpec,
        filterSetting,
      )
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
            if (theOneFail === null) {
              theOneFail = filterId
            } else {
              discard = true
            }
          }
        }
      })
      if (!discard) {
        if (v) {
          filteredIds.push(eId)
          presentFilterList.forEach((filterSpec, filterId) => {
            otherFilteredIds[filterId].push(eId)
          })
        } else {
          otherFilteredIds[theOneFail].push(eId)
        }
      }
    }
    const amounts = {}
    presentFilterList.forEach(({ field, relField, type }, filterId) => {
      amounts[filterId] =
        type === 'Fulltext'
          ? null
          : countFacets(
              tables,
              field,
              relField,
              fieldSpecs,
              fieldIds[field],
              otherFilteredIds[filterId],
              entities,
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
  },
  emptyO,
  { debug: 'computeFiltering' },
)

const gatherIds = memoize(
  (tableData, listIds, filterFields, fieldSpecs) => {
    const theseIds = {}
    const { entities } = tableData
    const records = listIds.map(eId => entities[eId].values)
    for (const field of filterFields) {
      const { [field]: { multiple } } = fieldSpecs
      const valueSet = new Set()
      for (const r of records) {
        const { [field]: val } = r
        if (val == null) {
          continue
        }
        if (multiple) {
          for (const v of val) {
            valueSet.add(v)
          }
        } else {
          valueSet.add(val)
        }
      }
      theseIds[field] = Array.from(new Set(valueSet))
    }
    return theseIds
  },
  emptyO,
  { debug: 'gatherIds' },
)

const gatherAllIds = memoize(
  (tableData, filterFields, fieldSpecs) => {
    const theseIds = {}
    const { entities } = tableData
    for (const field of filterFields) {
      const { [field]: { multiple } } = fieldSpecs
      const valueSet = new Set()
      for (const e of Object.values(entities)) {
        const { values: { [field]: val } } = e
        if (val == null) {
          continue
        }
        if (multiple) {
          for (const v of val) {
            valueSet.add(v)
          }
        } else {
          valueSet.add(val)
        }
      }
      theseIds[field] = Array.from(new Set(valueSet))
    }
    return theseIds
  },
  emptyO,
  { debug: 'gatherAllIds' },
)

const gatherValues = memoize(
  (tables, fieldSpecs, fieldIds, filterField, filterRelField) => {
    const { [filterField]: { valType } } = fieldSpecs
    if (fieldIds == null) {
      return emptyO
    }
    const fieldValues = { [emptyS]: '-none-' }
    if (typeof valType === 'string') {
      fieldIds.forEach(_id => {
        fieldValues[_id] = _id
      })
    } else {
      const { relTable } = valType
      if (filterRelField == null) {
        fieldIds.forEach(_id => {
          fieldValues[_id] = headEntity(tables, relTable, _id)
        })
      } else {
        const { [relTable]: { entities: relEntities } } = tables
        const relValues = Array.from(
          new Set(fieldIds.map(_id => (((relEntities[_id] || emptyO).values) || emptyO)[filterRelField])),
        ).sort()
        relValues.forEach(val => {
          fieldValues[val] = val
        })
      }
    }
    return fieldValues
  },
  emptyO,
  { debug: 'gatherValues' },
)

export const makeTag = (select, masterId, linkField) =>
  masterId == null ? select : `${select}-${masterId}-${linkField}`

const entityFieldVal = memoize(
  relField => (tables, relTable, valId) => {
    const {
      [relTable]: {
        entities: {
          [valId]: {
            values: {
              [relField]: result,
            } = emptyO,
          } = emptyO,
        } = emptyO,
      } = emptyO,
    } = tables
    return result
  },
  emptyO,
)

const getUnpack = (tables, fieldSpec, asString = false, relField = null) => {
  const { valType, multiple } = fieldSpec
  let unpack
  //prettier-ignore
  if (typeof valType === 'string') {
    unpack = multiple
    ? asString
      ? v => v == null
        ? emptyS
        : v.join(' ')
      : v => v == null
        ? emptyA
        : v
    : asString
      ? v => v == null
        ? emptyS
        : v
      : v => v == null
        ? emptyA
        : [v]
  }
  else {
    const { relTable } = valType
    const entityRep = relField
    ? entityFieldVal(relField)
    : headEntity
    unpack = multiple
    ? asString
      ? v => v == null
        ? emptyS
        : v.map(w => entityRep(tables, relTable, w).join(' '))
      : v => v == null
        ? emptyA
        : relField == null
          ? v
          : entityRep(tables, relTable, v)
    : asString
      ? v => v == null
        ? emptyS
        : entityRep(tables, relTable, v)
      : v => v == null
        ? emptyA
        : relField == null
          ? [v]
          : [entityRep(tables, relTable, v)]
  }
  return unpack
}

const fulltextCheck = memoize(
  (tables, field, relField, fieldSpec, term) => {
    const unpack = getUnpack(tables, fieldSpec, true)
    const search = (term || emptyS).toLowerCase()
    if (search == null || search === emptyS) {
      return () => true
    }
    return entity => {
      const { values: { [field]: val } } = entity
      const rep = unpack(val)
      return rep != null && rep.toLowerCase().indexOf(search) !== -1
    }
  },
  emptyO,
  { debug: fulltextCheck },
)

const facetCheck = memoize(
  (tables, field, relField, fieldSpec, facetSettings) => {
    const unpack = getUnpack(tables, fieldSpec, false, relField)
    if ((facetSettings || emptyO).size === 0) {
      return () => false
    }
    return entity => {
      const { values: { [field]: val } } = entity
      const rep = unpack(val)
      if (rep.length === 0) {
        return facetSettings[emptyS]
      }
      for (const r of rep) {
        if (facetSettings[r]) {
          return true
        }
      }
      return false
    }
  },
  emptyO,
  { debug: facetCheck },
)

const countFacets = memoize(
  (tables, field, relField, fieldSpecs, fieldIds, filteredIds, entities) => {
    const { [field]: fieldSpec } = fieldSpecs
    const unpack = getUnpack(tables, fieldSpec, false, relField)
    const facetAmounts = {}
    facetAmounts[emptyS] = 0
    if (relField) {
      const fieldValues = gatherValues(
        tables,
        fieldSpecs,
        fieldIds,
        field,
        relField,
      )
      for (const value of Object.keys(fieldValues)) {
        facetAmounts[value] = 0
      }
    } else {
      fieldIds.forEach(_id => {
        facetAmounts[_id] = 0
      })
    }
    for (const eId of filteredIds) {
      const { [eId]: { values: { [field]: val } } } = entities
      const rep = unpack(val)
      if (rep.length === 0) {
        facetAmounts[emptyS] += 1
      } else {
        for (const r of rep) {
          facetAmounts[r] += 1
        }
      }
    }
    return facetAmounts
  },
  emptyO,
  { debug: 'countFacets' },
)

export const testAllChecks = filterSetting => {
  let allTrue = true
  let allFalse = true
  if (filterSetting == null) {
    return { allTrue, allFalse }
  }
  for (const valueEntry of Object.entries(filterSetting)) {
    if (valueEntry[1]) {
      allFalse = false
    } else {
      allTrue = false
    }
  }
  return { allTrue, allFalse }
}
