import { accessData } from 'server'
import { makeReducer, emptyO } from 'utils'

/* ACTIONS */
/*
 * Most actions call accessData, which will dispatch the ultimate fetch action.
 */
export const fetchMe = () => (
  accessData({ type: 'fetchMe', contentType: 'db', path: '/who/ami', desc: 'me' })
)

/* REDUCER */

const flows = {
  fetchMe(state, { data }) {
    if (data == null) {return emptyO}
    return { ...data }
  },
}

export default makeReducer(flows)

/* SELECTORS */

export const getMe = ({ me }) => ({ me })

/* HELPERS */

