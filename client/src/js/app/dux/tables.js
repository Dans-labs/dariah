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
export const fetchCountries = () => (
  fetchData({ type: 'fetchTable', contentType: 'db', path: `/member_country`, desc: `country table`, table: 'country' })
)
export const fetchUsers = () => (
  fetchData({ type: 'fetchTable', contentType: 'db', path: `/user`, desc: `user table`, table: 'user' })
)
export const fetchItem = (props) => {
  const { tables, table, eId, ownOnly, fetch } = props
  const { [table]: { entities, title } } = tables
  const { [eId]: { values: { [title]: eHead } } } = entities
  return fetchData({
    type: 'fetchItem',
    contentType: 'db',
    path: `/view?table=${table}&id=${eId}${ownOnly ? '&own=true' : ''}`,
    desc: `${table} record ${eHead}`,
    table,
  })
}

/* REDUCER */

export default (state={}, { type, path, data, table }) => {
  switch (type) {
    case 'fetchTable': {
      if (data == null) {return { ...state, [table]: null }}
      return {
        ...state,
        [table]: data,
      }
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
      const { entities, order, ...rest } = data
      return {
        ...state,
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

export const getCountry = ({ tables: { country } }) => ({ country })

export const getUser = ({ tables: { user } }) => ({ user })

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
