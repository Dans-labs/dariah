import { makeReducer } from 'utils'

/* ACTIONS */

export const changeWinDim = () => dispatch => {
  dispatch({ type: 'windim', ...initWinDim() })
}
export const tooltip = ref => ({ type: 'tooltip', tooltip: ref })

/* REDUCER */

const flows = {
  windim(state, { height, width }) {return { ...state, height, width }},
  tooltip(state, { tooltip }) {return { ...state, tooltip }},
}

const initWinDim = () => {
  const { innerHeight: height, innerWidth: width } = window
  return { height, width }
}

export default makeReducer(flows, initWinDim())

/* SELECTORS */

export const getWinDim = ({ win }) => ({ win })
export const getTooltip = ({ win: { tooltip } }) => ({ tooltip })

/* HELPERS */

