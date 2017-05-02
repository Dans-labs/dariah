import merge from 'lodash/merge'
import { makeReducer } from 'utils'

/* ACTIONS */

export const nextAlt = (tag, nAlts, initial) => ({ type: 'nextAlt', tag, nAlts, initial })

/* REDUCER */

const flows = {
  nextAlt(state, { tag, initial, nAlts }) {
    const { [tag]: oldAlt = (initial || 0) } = state
    const newAlt = (oldAlt + 1) % nAlts
    return merge({}, state, { [tag]: newAlt })
  },
}

export default makeReducer(flows)

/* SELECTORS */

export const getAlt = ({ alter }, { tag, initial }) => {
  const { [tag]: alt = initial || 0 } = alter
  return { alt }
}

/* HELPERS */

