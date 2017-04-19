import { accessData } from 'server.js'

/* ACTIONS */
/*
 * Most actions call accessData, which will dispatch the ultimate fetch action.
 */
export const fetchMe = () => (
  accessData({ type: 'fetchMe', contentType: 'db', path: '/who/ami', desc: 'me' })
)

/* REDUCER */

export default (state = {}, { type, data }) => {
  switch (type) {
    case 'fetchMe': {
      if (data == null) {return {}}
      return { ...data }
    }
    default: return state
  }
}

/* SELECTORS */

export const getMe = ({ me }) => ({ me })

/* HELPERS */

