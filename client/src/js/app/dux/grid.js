import orderBy from 'lodash/orderby'
import mapValues from 'lodash/mapvalues'
import createCachedSelector from 're-reselect'
import { makeReducer, emptyA, emptyO } from 'utils'

import { getTables, repr } from 'tables'

/* ACTIONS */

export const resetSort = gridTag => ({ type: 'resetSort', gridTag })
export const addColumn = (gridTag, column, direction) => ({ type: 'addColumn', gridTag, column, direction })
export const turnColumn = (gridTag, column) => ({ type: 'turnColumn', gridTag, column })
export const delColumn = (gridTag, column) => ({ type: 'delColumn', gridTag, column })

/* REDUCER */

const flows = {
  resetSort(state, { gridTag }) {
    return { ...state, [gridTag]: emptyA }
  },
  addColumn(state, { gridTag, column, direction }) {
    const { [gridTag]: sortSpec } = state
    return { ...state, [gridTag]: (sortSpec || emptyA).filter(x => x[0] != column).concat([[column, direction]]) }
  },
  delColumn(state, { gridTag, column }) {
    const { [gridTag]: sortSpec } = state
    return { ...state, [gridTag]: (sortSpec || emptyA).filter(x => x[0] != column) }
  },
  turnColumn(state, { gridTag, column }) {
    const { [gridTag]: sortSpec } = state
    return { ...state, [gridTag]: (sortSpec || emptyA).map(x => [x[0], x[0] == column ? -x[1] : x[1]]) }
  },
}

export default makeReducer(flows, emptyO)

/* SELECTORS */

/* selector computers */

const reprX = (tables, table) => {
  const { [table]: { fieldSpecs } } = tables
  return (myValues, field) => {
    if (field == '_id') {return myValues}
    const { [field]: { valType, multiple } } = fieldSpecs
    return multiple ?
      (myValues || emptyA).map(value => repr(tables, table, valType, value)).join('|') :
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

export const getSort = ({ grid }, { table, gridTag, listIds }) => ({ table, gridTag, listIds, sortSpec: grid[gridTag] || emptyA })

export const getSortedData = createCachedSelector(
  getTables,
  getSort,
  sortData,
)((state, { gridTag }) => gridTag)

/* HELPERS */


