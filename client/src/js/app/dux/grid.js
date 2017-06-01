import orderBy from 'lodash/orderby'
import mapValues from 'lodash/mapvalues'
import createCachedSelector from 're-reselect'
import { makeReducer } from 'utils'

import { getTables, repr } from 'tables'

/* ACTIONS */

export const resetSort = tag => ({ type: 'resetSort', tag })
export const addColumn = (tag, column, direction) => ({ type: 'addColumn', tag, column, direction })
export const turnColumn = (tag, column) => ({ type: 'turnColumn', tag, column })
export const delColumn = (tag, column) => ({ type: 'delColumn', tag, column })

/* REDUCER */

const flows = {
  resetSort(state, { tag }) {
    return { ...state, [tag]: [] }
  },
  addColumn(state, { tag, column, direction }) {
    const { [tag]: sortSpec } = state
    return { ...state, [tag]: (sortSpec || []).filter(x => x[0] != column).concat([[column, direction]]) }
  },
  delColumn(state, { tag, column }) {
    const { [tag]: sortSpec } = state
    return { ...state, [tag]: (sortSpec || []).filter(x => x[0] != column) }
  },
  turnColumn(state, { tag, column }) {
    const { [tag]: sortSpec } = state
    return { ...state, [tag]: (sortSpec || []).map(x => [x[0], x[0] == column ? -x[1] : x[1]]) }
  },
}

export default makeReducer(flows, {})

/* SELECTORS */

/* selector computers */

const reprX = (tables, table) => {
  const { [table]: { fieldSpecs } } = tables
  return (myValues, field) => {
    if (field == '_id') {return myValues}
    const { [field]: { valType, multiple } } = fieldSpecs
    return multiple ?
      (myValues || []).map(value => repr(tables, table, valType, value)).join('|') :
      repr(tables, table, valType, myValues)
  }
}

const sortData = ({ tables }, { table, listIds, sortSpec }) => {
  const sortColumns = sortSpec.map(x => x[0])
  const sortDirs = sortSpec.map(x => x[1] == 1 ? 'asc' : 'desc')
  const { [table]: { entities } } = tables
  const r = reprX(tables, table)
  const fullData = listIds.map(_id => mapValues(entities[_id].values, r))
  return { sortedData: orderBy(fullData, sortColumns, sortDirs).map(x => x._id) }
}

/* selectors for export */

export const getSort = ({ grid }, { table, tag, listIds }) => ({ table, tag, listIds, sortSpec: grid[tag] || [] })

export const getSortedData = createCachedSelector(
  getTables,
  getSort,
  sortData,
)((state, { tag }) => tag)

/* HELPERS */


