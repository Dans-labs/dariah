import mergeWith from 'lodash/mergewith'

import { fetchData } from 'server.js'
import { propsChanged } from 'utils.js'

/* ACTIONS */
/*
 * Most actions call fetchData, which will dispatch the ultimate fetch action.
 */

export const fetchTable = table => (
  fetchData({ type: 'fetchTable', contentType: 'db', path: `/list?table=${table}`, desc: `${table} table`, table })
)
export const fetchTableMy = table => (
  fetchData({ type: 'fetchTableMy', contentType: 'db', path: `/my?table=${table}`, desc: `${table} table (my records)`, table })
)
export const fetchItem = props => {
  const { table, eId } = props
  return fetchData({
    type: 'fetchItem',
    contentType: 'db',
    path: `/view?table=${table}&id=${eId}`,
    desc: `${table} record ${eId}`,
    table,
  })
}

/* REDUCER */

export default (state = {}, { type, data, table }) => {
  switch (type) {
    case 'fetchTable': {
      if (data == null) {return state}
      return mergeWith({}, state, data, setComplete)
    }
    case 'fetchTableMy': {
      if (data == null) {return state}
      return mergeWith({}, state, data, setComplete)
    }
    case 'fetchItem': {
      if (data == null) {return state}
      const { values: { _id } } = data
      return mergeWith({}, state, { [table]: { entities: { [_id]: data } } }, setComplete)
    }
    default: return state
  }
}

/* SELECTORS */

export const getTables = ({ tables }) => ({ tables })

export const getTableFilters = ({ tables }, { table }) => {
  const { [table]: { fields, filterList } } = tables
  return { fields, filterList }
}

/* HELPERS */

const setComplete = (newValue, oldValue, key) => {
  if (key == 'complete') {return newValue || oldValue}
}

export const needTables = (tables, tableNames, my = false) => {
  if (tables == null) {return true}
  const tNames = (!Array.isArray(tableNames)) ? [tableNames] : tableNames
  return tNames.some(table => (
    tables[table] == null ||
    (my && tables[table].my == null) ||
    (!my && tables[table].order == null)
  ))
}

export const needValues = ({ tables, table, eId }) => (
  tables == null || tables[table] == null || tables[table].entities[eId] == null || !tables[table].entities[eId].complete
)

export const changedItem = (newProps, oldProps) => (
  propsChanged(newProps, needValues, oldProps, ['table', 'eId'])
)

const repUser = ({ user }, valId) => {
  let valRep
  const { entities: { [valId]: entity } } = user
  if (entity) {
    const { values: { eppn, firstName, lastName, emailPre, authority, mayLogin } } = entity
    const email = emailPre || ''
    let linkText = [firstName || '', lastName || ''].filter(x => x).join(' ')
    if (linkText == '') {linkText = email}
    const namePart = (linkText && email) ? (
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
}

const repCountry = ({ country }, valId) => {
  const { entities: { [valId]: entity } } = country
  if (entity) {
    const { values: { name, iso } } = entity
    return `${iso}: ${name}`
  }
  else {return 'UNKNOWN'}
}

const repValue = rel => (tables, valId) => {
  const { [rel]: { entities: { [valId]: entity } } } = tables
  if (entity) {
    const { values: { rep } } = entity
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

const trimDate = text => ((text == null) ? '' : text.replace(/\.[0-9]+/, ''))

export const repr = (tables, table, valType, value) => {
  if (value == null) {return ''}
  if (typeof valType == 'string') {
    switch (valType) {
      case 'datetime': return trimDate(value)
      default: return value
    }
  }
  else {
    const { values: rel } = valType
    return repRelated(tables, rel, value)
  }
}


