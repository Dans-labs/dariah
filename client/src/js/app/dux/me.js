import { fetchData } from 'server.js'

/* ACTIONS */
/*
 * Most actions call fetchData, which will dispatch the ultimate fetch action.
 */
export const fetchMe = () => (
  fetchData({ type: 'fetchMe', contentType: 'db', path: '/who/ami', desc: 'me' })
)

/* REDUCER */

export default (state = {}, { type, path, data }) => {
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

