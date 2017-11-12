import orderBy from 'lodash/orderby'
import mapValues from 'lodash/mapvalues'

import { memoize } from 'memo'
import { makeReducer, emptyA, emptyO } from 'utils'

import { repr } from 'tables'

/* ACTIONS */

export const resetSort = gridTag => ({ type: 'resetSort', gridTag })
export const addColumn = (gridTag, column, direction) => ({ type: 'addColumn', gridTag, column, direction })
export const delColumn = (gridTag, column) => ({ type: 'delColumn', gridTag, column })
export const turnColumn = (gridTag, column) => ({ type: 'turnColumn', gridTag, column })

/* REDUCER */

const flows = {
  resetSort(state, { gridTag }) {
    return { ...state, [gridTag]: emptyA }
  },
  addColumn(state, { gridTag, column, direction }) {
    const { [gridTag]: sortSpec } = state
    return { ...state, [gridTag]: (sortSpec || emptyA).filter(x => x[0] !== column).concat([[column, direction]]) }
  },
  delColumn(state, { gridTag, column }) {
    const { [gridTag]: sortSpec } = state
    return { ...state, [gridTag]: (sortSpec || emptyA).filter(x => x[0] !== column) }
  },
  turnColumn(state, { gridTag, column }) {
    const { [gridTag]: sortSpec } = state
    return { ...state, [gridTag]: (sortSpec || emptyA).map(x => [x[0], x[0] === column ? -x[1] : x[1]]) }
  },
}

export default makeReducer(flows, emptyO)

/* SELECTORS */

export const getGrid = ({ grid }) => ({ grid })

/* HELPERS */

export const compileSortedData = memoize((tables, table, listIds, sortSpec, settings) => {
  const sortColumns = sortSpec.map(x => x[0])
  const sortDirs = sortSpec.map(x => x[1] === 1 ? 'asc' : 'desc')
  const { [table]: { entities } } = tables
  const r = reprX(tables, table, settings)
  const fullData = listIds.map(_id => mapValues(entities[_id].values, r))
  return orderBy(fullData, sortColumns, sortDirs).map(x => x._id)
}, emptyO)

const reprX = (tables, table, settings) => {
  const { [table]: { fieldSpecs } } = tables
  return (myValues, field) => {
    if (field === '_id') {return myValues}
    const { [field]: { valType, multiple } } = fieldSpecs
    return repr(tables, table, field, valType, multiple, null, myValues, settings, '|')
  }
}



