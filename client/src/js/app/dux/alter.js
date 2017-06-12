import merge from 'lodash/merge'

import { memoize } from 'memo'
import { makeReducer, handle } from 'utils'

/* ACTIONS */

export const nextAlt = (alterTag, nAlts, initial) => ({ type: 'nextAlt', alterTag, nAlts, initial })
export const setAlt = (alterTag, alt) => ({ type: 'setAlt', alterTag, alt })

/* REDUCER */

const flows = {
  nextAlt(state, { alterTag, initial, nAlts }) {
    const { [alterTag]: oldAlt = (initial || 0) } = state
    const newAlt = (oldAlt + 1) % nAlts
    return merge({}, state, { [alterTag]: newAlt })
  },
  setAlt(state, { alterTag, alt }) {
    return merge({}, state, { [alterTag]: alt })
  },
}

export default makeReducer(flows)

/* SELECTORS */

export const getAlt = ({ alter }, { alterTag, initial }) => {
  const { [alterTag]: alt = initial || 0 } = alter
  return { alt }
}

export const getAlts = ({alter }) => ({ alter })

/* HELPERS */

export const makeAlt = ({ alter, dispatch }, { alterTag, initial, nAlts }) => {
  const { [alterTag]: alt = initial } = alter
  return ({
    alt,
    nextAlt: handle(dispatch, nextAlt, alterTag, nAlts, initial),
    initAlt: handle(dispatch, setAlt, alterTag, initial),
    setAlt: memoize(alt => handle(dispatch, setAlt, alterTag, alt)),
  })
}
