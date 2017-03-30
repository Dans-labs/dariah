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

/* ACTIONS */
/*
 * Actions are dispatch in the process of fetching data from the server
 */

/* HELPERS */

