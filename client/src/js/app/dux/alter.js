/* REDUCER */

export default (state = {}, { type, tag, initial, nAlts }) => {
  switch (type) {
    case 'nextAlt': {
      const { [tag]: oldAlt = (initial || 0) } = state
      const newAlt = (oldAlt + 1) % nAlts
      return { ...state, [tag]: newAlt }
    }
    default: return state
  }
}

/* SELECTORS */

export const getAlt = ({ alter }, { tag, initial }) => {
  const { [tag]: alt = initial || 0 } = alter
  return { alt }
}

/* ACTIONS */
/*
 * Actions are dispatch in the process of fetching data from the server
 */

export const nextAlt = (tag, nAlts, initial) => ({ type: 'nextAlt', tag, nAlts, initial })

/* HELPERS */


