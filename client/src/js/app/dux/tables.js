import mergeWith from 'lodash/mergewith'
import merge from 'lodash/merge'
import { createSelector } from 'reselect'

import { accessData } from 'server'
import { memoize } from 'memo'
import { makeReducer, emptyA, emptyO } from 'utils'

/* DEFS */

export const DETAILS = 'details'
export const ALLIDS = 'allIds'
export const MYIDS = 'myIds'

/* ACTIONS */
/*
 * Most actions call accessData, which will dispatch the ultimate fetch action.
 */

export const fetchTable = (table, select = ALLIDS, grid) => accessData({
  type: 'fetchTable',
  contentType: 'db',
  path: `/${select == 'myIds' ? 'my' : ''}list?table=${table}&grid=${grid}`,
  desc: `${table} table`,
  table,
})

export const fetchItem = (table, eId) => accessData({
  type: 'fetchItem',
  contentType: 'db',
  path: `/view?table=${table}&id=${eId}`,
  desc: `${table} record ${eId}`,
  table,
})

export const modItem = (table, eId, values) => accessData({
  type: 'modItem',
  contentType: 'db',
  path: `/mod?table=${table}&action=update`,
  desc: `${table} update record ${eId}`,
  sendData: { _id: eId, values },
  table,
})

export const insertItem = (table, select = ALLIDS, masterId = null, linkField = null) => accessData({
  type: 'insertItem',
  contentType: 'db',
  path: `/mod?table=${table}&action=insert`,
  desc: `${table} insert new record`,
  sendData: { masterId, linkField },
  table,
  select,
})

export const delItem = (table, eId) => accessData({
  type: 'delItem',
  contentType: 'db',
  path: `/mod?table=${table}&action=delete`,
  desc: `${table} delete record ${eId}`,
  sendData: { _id: eId },
  table,
})

/* REDUCER */

const flows = {
  fetchTable(state, { data }) {
    if (data == null) {return state}
    return mergeWith({}, state, data, setComplete)
  },
  fetchItem(state, { data, table }) {
    if (data == null) {return state}
    const { fields, ...restData } = data
    const { values, values: { _id } } = restData
    const newState = merge({}, state, { [table]: { fields, entities: { [_id]: restData } } })
    newState[table].entities[_id].values = values
    return newState
  },
  modItem(state, { data, table }) {
    if (data == null) {return state}
    const { values: { _id }, newValues } = data
    const newState = merge({}, state, { [table]: { entities: { [_id]: data } } })
    newState[table].entities[_id].values = data.values

    for (const { _id, rep, relTable, field } of newValues) {
      newState[relTable].entities[_id] = { values: { _id, rep } }
      newState[table].valueLists[field].unshift(_id)
    }
    return newState
  },
  insertItem(state, { data, table, select }) {
    if (data == null) {return state}
    const { fields, ...restData } = data
    const { values: { _id } } = restData
    return mergeWith({}, state, { [table]: { lastInserted: _id, fields, entities: { [_id]: data }, [select]: [_id] } }, addKey(select))
  },
  delItem(state, { data, table }) {
    if (data == null) {return state}
    const _id = data
    const { [table]: { entities: { [_id]: del, ...otherEntities }, myIds, allIds } } = state
    const otherMyIds = myIds == null ? null : myIds.filter(x => x != _id)
    const otherAllIds = allIds == null ? null : allIds.filter(x => x != _id)
    return {
      ...state,
      [table]: {
        ...state[table],
        entities: otherEntities,
        allIds: otherAllIds,
        myIds: otherMyIds,
      },
    }
  },
}

export default makeReducer(flows)

/* SELECTORS */

export const getTables = ({ tables }) => ({ tables })

export const getTable = ({ tables }, { table }) => ({ tableData: tables[table] })

export const getTableFilters = ({ tables }, { table }) => {
  const { [table]: { fields, filterList } } = tables
  return { fields, filterList }
}

export const getValueList = ({ tables }, { table, field }) => {
  const { [table]: { valueLists, fieldSpecs } } = tables
  const { [field]: { valType } } = fieldSpecs
  if (valueLists == null) {
    return { valType, table }
  }
  const { [field]: valueList } = valueLists
  return { valType, valueList, table }
}

const computeOptions = ({ tables }, { valType, valueList, table }) => {
  if (valueList == null) {
    return { options: emptyA, optionLookup: emptyO }
  }
  const options = valueList.map(val => ({ value: val, label: repr(tables, table, valType, val) }))
  const optionLookup = {}
  options.forEach(({ value: val, label: lab }) => {optionLookup[val] = lab})
  return { options, optionLookup }
}

export const getOptions = createSelector(
  getTables,
  getValueList,
  computeOptions,
)

/* HELPERS */

export const toDb = memoize((table, eId, dispatch) => values => dispatch(modItem(table, eId, values)))

const setComplete = (newValue, oldValue, key) => {
  if (key == 'complete') {return newValue || oldValue}
}

const addKey = listKey => (objValue, srcValue, key) => {
  if (key == listKey) {
    return objValue == null ? srcValue : srcValue.concat(objValue)
  }
}

const hasTableKey = (tables, table, key, value = null) => {
  if (tables == null) {return false}
  const { [table]: tableData } = tables
  if (tableData == null) {return false}
  return tableData[key] != null && (value == null || tableData[key] == value)
}

export const needTables = (tables, table, select = ALLIDS, complete) => {
  if (!hasTableKey(tables, table, select)) {return true}
  if (complete && !hasTableKey(tables, table, 'complete', true)) {return true}
  const { [table]: fieldSpecs } = tables
  const relTables = Array.from(
    new Set(
      Object.entries(fieldSpecs).
      filter(entry => ((typeof entry[1].valType) == 'object') && entry[1].valType.values != null).
      map(entry => entry[1].valType.values)
    )
  )
  return relTables.some(relTable => !hasTableKey(tables, relTable, ALLIDS))
}

export const needValues = ({ tableData, eId }) => (
  tableData == null ||
  tableData.entities[eId] == null ||
  tableData.entities[eId].perm == null ||
  !tableData.entities[eId].complete
)

export const listValues = memoize(({ tables, table, eId, field }) => (
  tables == null ? emptyA :
  tables[table] == null ? emptyA :
  tables[table].entities[eId] == null ? emptyA :
  new Set(tables[table].entities[eId][field])
), emptyO)

const repUser = memoize(({ user }, valId) => {
  let valRep
  const { entities: { [valId]: entity } } = user
  if (entity) {
    const { values: { eppn, firstName, lastName, emailPre, authority, mayLogin } } = entity
    const email = emailPre || ''
    let linkText = [firstName || '', lastName || ''].filter(x => x).join(' ')
    if (linkText == '') {linkText = email}
    const namePart = linkText && email ? (
      `[${linkText}](mailto:${email})`
    ) : (
      linkText + email
    )
    const eppnPart = eppn ? ` eppn=${eppn} ` : ''
    const authorityPart = authority ? ` authenticated by=${authority} ` : ''
    const mayLoginPart = mayLogin ? ` active=${mayLogin} ` : ''
    valRep = [namePart, eppnPart, authorityPart, mayLoginPart].filter(x => x).join('; ')
  }
  else {valRep = 'UNKNOWN'}
  return valRep
})

const repCountry = ({ country }, valId) => {
  const { entities: { [valId]: entity } } = country
  if (entity) {
    const { values: { name, iso } } = entity
    return `${iso}: ${name}`
  }
  else {return 'UNKNOWN'}
}

const repValue = rel => (tables, valId) => {
  const { [rel]: { title, entities: { [valId]: entity } } } = tables
  const useTitle = title || 'rep'
  if (entity) {
    const { values: { [useTitle]: rep } } = entity
    return rep
  }
  else {return 'UNKNOWN'}
}

const repMap = {
  user: repUser,
  country: repCountry,
  default: repValue,
}

export const repRelated = (tables, rel, valId) => (repMap[rel] || repMap.default(rel))(tables, valId)

const trimDate = text => (text == null ? '' : text.replace(/\.[0-9]+/, ''))

export const repr = (tables, table, valType, value) => {
  if (value == null) {return ''}
  if (typeof valType == 'string') {
    switch (valType) {
      case 'datetime': return trimDate(value)
      case 'bool': return value ? 'Yes' : 'No'
      default: return value
    }
  }
  else {
    const { values: rel } = valType
    return repRelated(tables, rel, value)
  }
}

