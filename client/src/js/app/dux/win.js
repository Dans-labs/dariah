/* ACTIONS */

export const changeWinDim = () => dispatch => {
  dispatch({ type: 'windim', ...initWinDim() })
}

/* REDUCER */

export default (state = initWinDim(), { type, height, width }) => {
  switch (type) {
    case 'windim': {
      return { height, width }
    }
    default: return state
  }
}

/* SELECTORS */

export const getWinDim = ({ win: { height, width } }) => ({ height, width })

/* HELPERS */

const initWinDim = () => {
  const { innerHeight: height, innerWidth: width } = window
  return { height, width }
}

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
}

export function columnStyle(kind, { height, width }) {
  const divHeight = {
    left: height - topHeight,
    right: height - topHeight,
    rightLeft: height - topHeight - topMargin,
    rightLeftNav: height - topHeight - topMargin,
    rightRight: height - topHeight - topMargin,
    rightRightBody: height - topHeight - topMargin,
  }
  const { left, rightLeft, rightLeftNav } = divWidthSpec
  const divWidth = {
    ...divWidthSpec,
    right: width - left - scrollBarWidth,
    rightRight: width - left - rightLeft - 2 * scrollBarWidth - leftMargin,
    rightRightBody: width - left - rightLeftNav - 2 * scrollBarWidth - leftMargin,
  }

  return {
    width: divWidth[kind],
    height: divHeight[kind],
    float: floatSpec[kind],
  }
}

