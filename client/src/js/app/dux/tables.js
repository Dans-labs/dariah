import { fetchData } from 'server.js'
import { propsChanged } from 'helpers.js'

/* ACTIONS */
/*
 * Most actions call fetchData, which will dispatch the ultimate fetch action.
 */

export const fetchTable = (table) => (
  fetchData({ type: 'fetchTable', contentType: 'db', path: `/list?table=${table}`, desc: `${table} table`, table })
)
export const fetchTableMy = (table) => (
  fetchData({ type: 'fetchTableMy', contentType: 'db', path: `/my?table=${table}`, desc: `${table} table (my records)`, table })
)
export const fetchItem = (props) => {
  const { table, eId, ownOnly } = props
  return fetchData({
    type: 'fetchItem',
    contentType: 'db',
    path: `/view?table=${table}&id=${eId}${ownOnly ? '&own=true' : ''}`,
    desc: `${table} record ${eId}`,
    table,
  })
}

/* REDUCER */

export default (state={}, { type, path, data, table }) => {
  switch (type) {
    case 'fetchTable': {
      if (data == null) {return { ...state, [table]: null }}
      const newState = { ...state }
      for (const t in data) {newState[t] = data[t]}
      return newState
    }
    case 'fetchTableMy': {
      if (data == null) {
        if (state[table] == null) { return { ...state, [table]: null }}
        return {
          ...state,
          [table]: {
            ...state[table],
            my: null,
          }
        }
      }
      const { [table]: { entities, order, ...rest }, ...otherTables } = data
      return {
        ...state,
        ...otherTables,
        [table]: {
          ...state[table],
          ...rest,
          my: order,
          entities: {
            ...(state[table] || {}).entities,
            ...entities,
          },
        },
      }
    }
    case 'fetchItem': {
      if (data == null) {return state}
      const { values: { _id } } = data
      return {
        ...state,
        [table]: {
          ...state[table],
          entities: {
            ...state[table].entities,
            [_id]: data,
          },
        },
      }
    }
    default: return state
  }
}

/* SELECTORS */

export const getTables = ({ tables }) => ({ tables })

export const getTableFilters =  ({ tables }, { table }) => {
  const { [table]: { fields, filterList } } = tables
  return { fields, filterList }
}

/* HELPERS */

export const needTables = (tables, tableNames, my=false) => {
  if (tables == null) {return true}
  const tNames = (!Array.isArray(tableNames)) ? [tableNames] : tableNames
  return tNames.some(table => (
    tables[table] == null ||
    (my && tables[table].my == null) ||
    (!my && tables[table].order == null)
  ))
}

export const needValues = (tables, table, eId) => (
  tables == null || tables[table] == null || tables[table].entities[eId] == null || !tables[table].entities[eId].complete
)

export const changedItem = (newProps, oldProps) => (
  propsChanged(newProps, needValues, oldProps, ['table', 'eId'])
)

const repUser = (valId, { user }) => {
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

const repCountry = (valId, { country }) => {
  const { entities: { [valId]: entity } } = country
  if (entity) {
    const { values: { name, iso } } = entity
    return `${iso}: ${name}`
  }
  else {return 'UNKNOWN'}
}

const repMap = {
  user: repUser,
  country: repCountry,
}

export const repr = (table, tables, valId) => repMap[table](valId, tables)

