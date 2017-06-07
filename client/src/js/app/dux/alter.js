import merge from 'lodash/merge'
import { makeReducer, memoize, handle } from 'utils'

/* ACTIONS */

export const nextAlt = (tag, nAlts, initial) => ({ type: 'nextAlt', tag, nAlts, initial })
export const setAlt = (tag, alt) => ({ type: 'setAlt', tag, alt })

/* REDUCER */

const flows = {
  nextAlt(state, { tag, initial, nAlts }) {
    const { [tag]: oldAlt = (initial || 0) } = state
    const newAlt = (oldAlt + 1) % nAlts
    return merge({}, state, { [tag]: newAlt })
  },
  setAlt(state, { tag, alt }) {
    return merge({}, state, { [tag]: alt })
  },
}

export default makeReducer(flows)

/* SELECTORS */

export const getAlt = ({ alter }, { tag, initial }) => {
  const { [tag]: alt = initial || 0 } = alter
  return { alt }
}

export const getAlts = ({alter }) => ({ alter })

/* HELPERS */

export const makeAlt = ({ alter, dispatch }, { tag, initial, nAlts }) => {
  const { [tag]: alt = initial } = alter
  return ({
    alt,
    nextAlt: handle(dispatch, nextAlt, tag, nAlts, initial),
    initAlt: handle(dispatch, setAlt, tag, initial),
    setAlt: memoize(alt => handle(dispatch, setAlt, tag, alt)),
  })
}
