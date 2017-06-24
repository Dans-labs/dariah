import update from 'immutability-helper'

import { accessData } from 'server'
import { memoize } from 'memo'
import { makeReducer, updateAuto, emptyS, emptyA, emptyO } from 'utils'

/* DEFS */

export const DETAILS = 'details'
export const ALLIDS = 'allIds'
export const MYIDS = 'myIds'

/* ACTIONS */
/*
 * Most actions call accessData, which will dispatch the ultimate fetch action.
 */

export const fetchTable = (table, select = ALLIDS, complete) => accessData({
  type: 'fetchTable',
  contentType: 'db',
  path: `/${select == 'myIds' ? 'my' : emptyS}list?table=${table}&complete=${complete}`,
  desc: `${table} table`,
  table,
})

export const fetchTables = (tables, tableList, dispatch) => {
  tableList.forEach(([table, select = ALLIDS, complete = true]) => {
    if (needTable(tables, table, select, complete)) {dispatch(fetchTable(table, select, complete))}
  })
}

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

const updateItemWithFields = (state, table, _id, fields, values) => {
  const newVals = {}
  fields.forEach(field => {newVals[field] = values[field]})
  return updateAuto(
    state,
    [table, 'entities', _id, 'values'],
    { $merge: newVals },
  )
}

const flows = {
  fetchTable(state, { data }) {
    if (data == null) {return state}
    return update(state, { $merge: data })
  },
  fetchItem(state, { data, table }) {
    if (data == null) {return state}
    const { values: { _id } } = data
    return updateAuto(state, [table, 'entities', _id], { $set: data })
  },
  modItem(state, { data, table }) {
    if (data == null) {return state}
    const { values, values: { _id }, newValues } = data
    const useRelFields = ['_id', 'rep']
    let newState = updateAuto(state, [table, 'entities', _id, 'values'], { $set: values })
    if (newValues != null) {
      for (const { _id, rep, relTable, field } of newValues) {
        newState = update(newState, { [table]: { valueLists: { [field]: { $unshift: [_id] } } } })
        newState = updateItemWithFields(newState, relTable, _id, useRelFields, { _id, rep })
      }
    }
    return newState
  },
  insertItem(state, { data, table, select }) {
    if (data == null) {return state}
    const { values: { _id } } = data
    let newState = updateAuto(state, [table, 'entities', _id], { $set: data })
    newState = updateAuto(newState, [table, ALLIDS], { $unshift: [_id] }, true)
    if (select == MYIDS) {
      newState = updateAuto(newState, [table, MYIDS], { $unshift: [_id] }, true)
    }
    return update(newState, {
      [table]: {
        lastInserted: { $set: _id },
      },
    })
  },
  delItem(state, { data, table }) {
    if (data == null) {return state}
    const { [table]: { myIds, allIds } } = state
    const _id = data
    let newState = update(state, { [table]: { entities: { $unset: [_id] } } })
    Object.entries({ myIds, allIds }).forEach(([name, list]) => {
      if (list != null) {
        const otherIds = list.filter(x => x != _id)
        newState = update(newState, { [table]: { [name]: { $set: otherIds } } })
      }
    })
    return newState
  },
}

export default makeReducer(flows)

/* SELECTORS */

export const getTables = ({ tables }) => ({ tables })

/* HELPERS */

export const toDb = memoize((table, eId, dispatch) => values => dispatch(modItem(table, eId, values)))

const hasTableKey = (tables, table, key, value = null) => {
  if (tables == null) {return false}
  const { [table]: tableData } = tables
  if (tableData == null) {return false}
  return tableData[key] != null && (value == null || tableData[key] == value)
}

export const needTable = (tables, table, select = ALLIDS, complete) => {
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
  if (relTables.some(relTable => !hasTableKey(tables, relTable, ALLIDS))) {return true}
  return false
}

export const needTables = (tables, tableList) => tableList.some(([table, select = ALLIDS, complete = true]) =>
  needTable(tables, table, select, complete)
)

export const needValues = (entities, eId) => (
  entities == null
  || entities[eId] == null
  || entities[eId].fields == null
)

export const listValues = memoize(({ tables, table, eId, field }) => (
  tables == null
  ? emptyA
  : tables[table] == null
    ? emptyA
    : tables[table].entities[eId] == null
      ? emptyA
      : new Set(tables[table].entities[eId][field])
), emptyO)

const repUser = memoize((tables, valId) => {
  let valRep
  const { user: { entities: { [valId]: entity } } } = tables
  if (entity) {
    const {
      values: {
        eppn = emptyS,
        firstName = emptyS,
        lastName = emptyS,
        email = emptyS,
        authority,
        mayLogin,
      },
    } = entity
    let linkText = [firstName, lastName].filter(x => x).join(' ')
    if (linkText == emptyS) {linkText = email}
    const namePart = linkText && email
    ? `[${linkText}](mailto:${email})`
    : linkText + email
    const eppnPart = eppn ? ` eppn=${eppn} ` : emptyS
    const authorityPart = authority ? ` authenticated by=${authority} ` : emptyS
    const mayLoginPart = mayLogin ? ` active=${mayLogin} ` : emptyS
    valRep = [namePart, eppnPart, authorityPart, mayLoginPart].filter(x => x).join('; ')
  }
  else {valRep = 'UNKNOWN'}
  return valRep
}, emptyO)

const repCountry = memoize((tables, valId) => {
  const { country: { entities: { [valId]: entity } } } = tables
  if (entity) {
    const { values: { name, iso } } = entity
    return `${iso}: ${name}`
  }
  else {return 'UNKNOWN'}
}, emptyO)

const repType = memoize((tables, valId) => {
  const { typeContribution: { entities: { [valId]: entity } } } = tables
  if (entity) {
    const { values: { mainType, subType } } = entity
    const sep = (mainType && subType) ? ' / ' : emptyS
    return `${mainType}${sep}${subType}`
  }
  else {return 'UNKNOWN'}
}, emptyO)

const repScore = memoize((tables, valId) => {
  let valRep
  const { score: { entities: { [valId]: entity } } } = tables
  if (entity) {
    const { values: { score = 'N/A', level = 'N/A', description = emptyS } } = entity
    valRep = (score || level)
    ? `${score} - ${level}`
    : description
  }
  else {valRep = 'UNKNOWN'}
  return valRep
}, emptyO)

const repValue = relTable =>
  memoize((tables, valId) => {
    const { [relTable]: { title = 'rep', entities: { [valId]: entity } } } = tables
    if (entity) {
      const { values: { [title]: rep } } = entity
      return rep
    }
    else {return 'UNKNOWN'}
  }, emptyO)

const repMap = {
  user: repUser,
  country: repCountry,
  typeContribution: repType,
  score: repScore,
  default: repValue,
}

export const entityHead = (tables, relTable, valId) =>
  (repMap[relTable] || repMap.default(relTable))(tables, valId)

const trimDate = text => (text == null ? emptyS : text.replace(/\.[0-9]+/, emptyS))

export const repr = (tables, table, valType, value) => {
  if (value == null) {return emptyS}
  if (typeof valType == 'string') {
    switch (valType) {
      case 'datetime': return trimDate(value)
      case 'bool': return value ? 'Yes' : 'No'
      default: return value
    }
  }
  else {
    const { values: relTable } = valType
    return entityHead(tables, relTable, value)
  }
}

