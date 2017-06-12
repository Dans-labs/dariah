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

