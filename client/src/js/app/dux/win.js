import { makeReducer } from 'utils'

/* ACTIONS */

export const changeWinDim = () => dispatch => {
  dispatch({ type: 'windim', ...initWinDim() })
}

/* REDUCER */

const flows = {
  windim(state, { height, width }) {return { height, width }},
}

const initWinDim = () => {
  const { innerHeight: height, innerWidth: width } = window
  return { height, width }
}

export default makeReducer(flows, initWinDim())

/* SELECTORS */

export const getWinDim = ({ win: { height, width } }) => ({ height, width })

/* HELPERS */

const scrollBarWidth = 40
const leftMargin = 0

const topHeight = 50
const topMargin = 5

const divWidthSpec = {
  left: 120,
  rightLeft: 380,
  rightLeftNav: 150,
}

const floatSpec = {
  left: 'left',
  right: 'right',
  rightLeft: 'left',
  rightLeftNav: 'left',
  rightRight: 'right',
  rightRightBody: 'right',
  filter: 'left',
  list: 'right',
}

export function columnStyle(kind, { height, width }) {
  const divHeight = {
    left: height - topHeight,
    right: height - topHeight,
    rightLeft: height - topHeight - topMargin,
    rightLeftNav: height - topHeight - topMargin,
    rightRight: height - topHeight - topMargin,
    rightRightBody: height - topHeight - topMargin,
    filter: '100%',
    list: '100%',
  }
  const { left, rightLeft, rightLeftNav } = divWidthSpec
  const divWidth = {
    ...divWidthSpec,
    right: width - left - scrollBarWidth,
    rightRight: width - left - rightLeft - 2 * scrollBarWidth - leftMargin,
    rightRightBody: width - left - rightLeftNav - 2 * scrollBarWidth - leftMargin,
    filter: '40%',
    list: '58%',
  }

  const styles = {}
  if (divWidth[kind]) {styles.width = divWidth[kind]}
  if (divHeight[kind]) {styles.height = divHeight[kind]}
  if (floatSpec[kind]) {styles.float = floatSpec[kind]}

  return {
    width: divWidth[kind],
    height: divHeight[kind],
    float: floatSpec[kind],
  }
}

