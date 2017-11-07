import update from 'immutability-helper'

import { accessData } from 'server'
import { memoize } from 'memo'
import { makeReducer, updateAuto, emptyS, emptyA, emptyO } from 'utils'

import { compileAlternatives } from 'alter'

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
  path: `/${select === MYIDS ? 'my' : emptyS}list?table=${table}&complete=${complete}`,
  desc: `${table} table`,
  table,
})

export const fetchTables = (tables, tableList, dispatch) => {
  tableList.forEach(([table, select = ALLIDS, complete = true]) => {
    if (needTable(tables, table, select, complete)) {dispatch(fetchTable(table, select, complete))}
  })
}

export const fetchItem = (table, eId, head) => accessData({
  type: 'fetchItem',
  contentType: 'db',
  path: `/view?table=${table}&id=${eId}`,
  desc: `${table} record ${head}`,
  table,
})

export const fetchItems = (table, eIds, alterSection, alt) => accessData({
  type: 'fetchItems',
  contentType: 'db',
  path: `/view?table=${table}`,
  desc: `${table} records ${eIds.length}`,
  sendData: eIds,
  table,
  eIds, alterSection, alt,
})

export const modItem = (table, eId, head, values) => accessData({
  type: 'modItem',
  contentType: 'db',
  path: `/mod?table=${table}&action=update`,
  desc: `${table} update record ${head}`,
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

export const delItem = (table, eId, head) => accessData({
  type: 'delItem',
  contentType: 'db',
  path: `/mod?table=${table}&action=delete`,
  desc: `${table} delete record ${head}`,
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

const updateEntities = (stateEntities, entities) => {
  let newEntities = entities
  Object.entries(stateEntities).forEach(([_id, stateEntity]) => {
    const newEntity = newEntities[_id]
    if (newEntity != null && stateEntity.fields != null && newEntity.fields == null) {
      const theseValues = update(stateEntity.values, { $merge: newEntity.values })
      newEntities = update(
        newEntities, {
          [_id]: {
            fields: { $set: stateEntity.fields },
            values: { $merge: theseValues },
          },
        },
      )
    }
  })
  return update(stateEntities, { $merge: newEntities })
}

const flows = {
  fetchTable(state, { data }) {
    if (data == null) {return state}
    let newState = state
    Object.entries(data).forEach(([table, tableData]) => {
      const { [table]: stateTableData = emptyO } = state
      const { entities: stateEntities = emptyO } = stateTableData
      const { entities } = tableData

      const newEntities = updateEntities(stateEntities, entities)
      const newTableData = update(tableData, { entities: { $set: newEntities } })
      newState = updateAuto(newState, [table], { $merge: newTableData })
    })
    return newState
  },
  fetchItem(state, { data, table }) {
    if (data == null) {return state}
    const { values: { _id } } = data
    return updateAuto(state, [table, 'entities', _id], { $set: data })
  },
  fetchItems(state, { data, table }) {
    if (data == null || data.length == 0) {return state}
    let newState = state
    for (const dataSlice of data) {
      const { values: { _id } } = dataSlice
      newState = updateAuto(newState, [table, 'entities', _id], { $set: dataSlice })
    }
    return newState
  },
  modItem(state, { data, table }) {
    if (data == null) {return state}
    const { values, values: { _id }, newValues } = data
    const fieldUpdates = {}
    Object.entries(values).forEach(([key, value]) => {fieldUpdates[key] = { $set: value }})
    let newState = updateAuto(state, [table, 'entities', _id, 'values'], fieldUpdates)
    if (newValues != null) {
      for (const { _id, rep, repName, relTable, field } of newValues) {
        newState = update(newState, { [table]: { valueLists: { [field]: { $push: [_id] } } } })
        newState = updateItemWithFields(newState, relTable, _id, ['_id', repName], { _id, [repName]: rep })
      }
    }
    return newState
  },
  insertItem(state, { data, table, select }) {
    if (data == null || data.length == 0) {return state}
    let newState = state
    for (const dataSlice of data) {
      const { table: thisTable, ...dataRest } = dataSlice
      const { values: { _id } } = dataRest
      newState = updateAuto(newState, [thisTable, 'entities', _id], { $set: dataRest })
      if (newState[thisTable][ALLIDS] != null) {
        newState = updateAuto(newState, [thisTable, ALLIDS], { $push: [_id] }, true)
      }
      if (select === MYIDS && table === thisTable) {
        newState = updateAuto(newState, [table, MYIDS], { $push: [_id] }, true)
      }
      newState = update(newState, {
        [thisTable]: {
          lastInserted: { $set: _id },
        },
      })
    }
    return newState
  },
  delItem(state, { data }) {
    if (data == null || data.length == 0) {return state}
    let newState = state
    for (const dataSlice of data) {
      const [thisTable, _id] = dataSlice
      newState = update(newState, { [thisTable]: { entities: { $unset: [_id] } } })
      const { [thisTable]: { myIds, allIds } } = newState
      for (const [name, list] of Object.entries({ myIds, allIds})) {
        if (list != null) {
          const otherIds = list.filter(x => x !== _id)
          newState = update(newState, { [thisTable]: { [name]: { $set: otherIds } } })
        }
      }
    }
    return newState
  },
}

export default makeReducer(flows)

/* SELECTORS */

export const getTables = ({ tables }) => ({ tables })

/* HELPERS */

export const toDb = memoize((table, eId, head, dispatch) => values => dispatch(modItem(table, eId, head, values)))

const hasTableKey = (tables, table, key, value = null) => {
  if (tables == null) {return false}
  const { [table]: tableData } = tables
  if (tableData == null) {return false}
  return tableData[key] != null && (value == null || tableData[key] === value)
}

export const needTable = (tables, table, select = ALLIDS, complete) => {
  if (!hasTableKey(tables, table, select)) {return true}
  if (complete && !hasTableKey(tables, table, 'complete', true)) {return true}
  //const { [table]: { fieldSpecs, detailOrder = emptyA } } = tables
  const { [table]: { fieldSpecs } } = tables
  const relTables = Array.from(
    new Set(
      Object.entries(fieldSpecs).
      filter(entry => ((typeof entry[1].valType) === 'object') && entry[1].valType.relTable != null).
      map(entry => entry[1].valType.relTable)
    )
  )
  //).concat(detailOrder)
  if (relTables.some(relTable => !hasTableKey(tables, relTable, ALLIDS))) {return true}
  return false
}

export const needTables = (tables, tableList) =>
  tableList.some(([table, select = ALLIDS, complete = true]) =>
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

/* Record and Field value representation
 *
 * In this dux (tables), we provide export functions to
 *
 * A. convert a raw entity into a string value that can act as a heading for that record
 *    headEntity()
 *
 * B. convert a raw value of any field into an appropriate string.
 *    repr()
 *
 * In the library file 'fields' we provide a function (wrappedRepr)
 * to get field values into appropriate elements * with appropriate attributes.
 *
 * There are complications.
 *
 * 1. tables are really special
 * 2. fields may have multiple values
 * 3. field values may refer to other tables by id
 *
 * Ad 1: Special tables
 * For special tables, such as user, country, and a bunch of others, we write special head functions.
 * headEntity() will make the switch, based on the name of the table.
 *
 * Ad 2: Multiplicity
 * Whenever we encounter fields with multiple values, we do the relevant operations value-wise.
 * repr() works such that if an array of values goes in, an array of representations goes out.
 * Unless the 'sep' parameter is passed.
 * In that case, if there are multiple values, their reps will be joined by means of the 'sep'.
 *
 * Ad 3: Releated tables
 * When a field is an id referring to an entity in another table,
 * there are various options.
 * The default case is to use the headEntity of the related record as representation.
 * It is also possible to pass a detail field name.
 * In that case, the repr of that field of the detail record will be taken.
 *
 * Combination of 2 and 3.
 * It is possible that a field that points to a related table, has multiple values.
 * It is possible that the detail field, used to represent the detail records, itself has multiple values.
 * repr() deals with all cases.
 * Without the sep parameter, it might return:
 *
 * (a) a single string (if field and detail field are both not multiple)
 * (b1) an array of strings (if field is not multiple, but detail field is multiple)
 * (b2) an array of strings (if field is multiple, but detail field is not multiple)
 * (c) an array of an array of strings (if field and detail field are both multiple)
 *
 * You can pass a 'sep' and a 'detail sep' to repr().
 * If you pass 'sep', and field is multiple, the resulting reps will be joined with sep.
 * If you pass 'detail sep' and detail field is multiple, the resulting detail reps will be joined with detail sep.
 *
 * One caveat: if both field and detail field are multiple, and sep is given, detail sep must also be given,
 * otherwise the detail reps would be arrays, which cannot be string-joined.
 * If a detail sep is not passed in this case, we assume a default value: a single space.
 *
 */

/* The table specific head functions
 */

const headUser = memoize((tables, valId) => {
  const { user: { entities: { [valId]: entity } } } = tables
  if (entity) {
    const {
      values: {
        eppn = emptyS,
        firstName = emptyS,
        lastName = emptyS,
        email = emptyS,
        org = emptyS,
      },
    } = entity
    const orgRep = org
    ? ` (${org})`
    : emptyS
    const nameParts = [firstName, lastName].filter(x => x)
    if (nameParts.length) {return (nameParts.join(' ')) + orgRep}
    return ([email, eppn, 'no name'].filter(x => x)[0]) + orgRep
  }
  else {return 'UNKNOWN'}
}, emptyO)

const headCountry = memoize((tables, valId) => {
  const { country: { entities: { [valId]: entity } } } = tables
  if (entity) {
    const { values: { name, iso } } = entity
    return `${iso}: ${name}`
  }
  else {return 'UNKNOWN'}
}, emptyO)

const headType = memoize((tables, valId) => {
  const { typeContribution: { entities: { [valId]: entity } } } = tables
  if (entity) {
    const { values: { mainType, subType } } = entity
    const sep = (mainType && subType) ? ' / ' : emptyS
    return `${mainType}${sep}${subType}`
  }
  else {return 'UNKNOWN'}
}, emptyO)

const headScore = memoize((tables, valId) => {
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

const headRelated = relTable =>
  memoize((tables, valId, settings) => {
    const { [relTable]: { title = 'rep', entities: { [valId]: entity }, fieldSpecs } } = tables
    if (entity) {
      const { values: { [title]: rep } } = entity
      const { [title]: { valType } } = fieldSpecs
      return repr1Head(tables, relTable, valType, rep, settings)
    }
    else {return 'UNKNOWN'}
  }, emptyO)

/* The head switch function
 */

const headSwitch = {
  user: headUser,
  country: headCountry,
  typeContribution: headType,
  score: headScore,
  default: headRelated,
}

/* The generic head function is exported
 */

export const headEntity = (tables, table, valId, settings) =>
  (headSwitch[table] || headSwitch.default(table))(tables, valId, settings)

const trimDate = (text, dateOnly) =>
  text == null
  ? emptyS
  : dateOnly
    ? text.replace(/T.*$/, emptyS)
    : text.replace(/\.[0-9]+/, emptyS)

/*
 * The repr functions
 *
 * repr() has to deal with very many cases, so we break it down
 * into simpler functions.
 *
 * repr1Head()
 *
 * Deals with a single value
 * When a field points to a related record, headEntity() is used as representation.
 * So no complications with detail fields.
 * The result is always a string.
 *
 * reprHead()
 * Deals with single and multiple values.
 * When a field points to a related record, headEntity() is used as representation.
 * So no complications with detail fields.
 * If the field is multiple, it will be joined by sep, if sep is not null.
 * The result is a string, except when the field is multiple and sep is null.
 *
 */
const repr1Head = (tables, table, valType, value, settings) => {
  if (value == null) {return emptyS}
  if (valType == null || typeof valType === 'string') {
    switch (valType) {
      case 'datetime': return trimDate(value, settings && settings.shortDates)
      case 'bool': return value ? 'Yes' : 'No'
      default: return value
    }
  }
  else {
    const { relTable } = valType
    return relTable == null
    ? emptyS
    : headEntity(tables, relTable, value)
  }
}

const reprHead = (tables, table, valType, multiple, value, settings, sep) => {
  const rep = multiple
  ? (value || emptyA).map(val => repr1Head(tables, table, valType, val, settings))
  : repr1Head(tables, table, valType, value, settings)
  return multiple && sep != null
  ? rep.join(sep)
  : rep
}

/*
 * The exported repr() function.
 *
 * It can deal with a detail field, with multiplicity in field and detail field, in any combination,
 * and it can do joining.
 * If sep is present, detail sep should also be present.
 * If not, we take a single space as default.
 */
export const repr = memoize(
  (tables, table, valType, multiple, relField, value, settings, sep, relSep) => {
    if (relField == null) {
      return reprHead(tables, table, valType, multiple, value, settings, sep)
    }

    const { relTable } = valType
    if (relTable == null) {return emptyS}
    const {
      [relTable]: {
        fieldSpecs: { [relField]: { multiple: relMultiple, valType: relValType } },
      },
    } = tables
    const relValues = multiple
    ? value.map(val => tables[relTable].entities[val].values[relField])
    : tables[relTable].entities[value].values[relField]

    const theRelSep = multiple && relMultiple && sep != null && relSep == null
    ? ' '
    : relSep
    const rep = multiple
    ? relValues.map(relValue => reprHead(tables, relTable, relValType, relMultiple, relValue, settings, theRelSep))
    : reprHead(tables, relTable, relValType, relMultiple, relValues, settings, relSep)

    return multiple && sep != null
    ? rep.join(sep)
    : rep
  },
  emptyO,
)

export const handleOpenAll = memoize((alter, alterSection, nAlts, initial, table, items, dispatch) => {
  const makeAlternatives = compileAlternatives(alterSection, nAlts, initial, dispatch)
  const theAlt = (initial + 1) % nAlts
  return () => {
    const alts = []
    items.forEach(eId => {
      const { getAlt } = makeAlternatives(eId)
      const alt = getAlt(alter)
      if (alt !== theAlt) {
        alts.push(eId)
      }
    })
    if (alts.length) {
      dispatch(fetchItems(table, alts, alterSection, theAlt))
    }
  }
}, emptyO)

