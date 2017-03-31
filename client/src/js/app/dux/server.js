import 'whatwg-fetch'

import { ask, err, succeed } from 'notify.js'

const rootUrl = '/api/'

/* ACTIONS */
/*
 * Generic action to fetch data from the server.
 * The query is configured by the task object.
 * It can be used for database queries or file content.
 * During request, notify actions will be dispatched.
 */

export const fetchData = task => dispatch => {
  const { type, path, contentType, desc } = task
  dispatch(ask(desc))
  dispatch({ ...task, data: null })

  const settings = {credentials: 'same-origin'}
  fetch(`${rootUrl}${contentType}${path}`, settings)
  .then(response => response.json())
  .then(json => {
    const { msgs, good, data } = json
    if (good) {
      dispatch(succeed(desc))
      dispatch({ ...task, data })
    }
    else {
      dispatch(err(desc, msgs))
    }
  })
  .catch(error => {
      dispatch(err(desc, [{kind: 'error', text: error.toString()}]))
  })
}

/* REDUCER */
/*
 * no dedicated reducer.
 * Results of actions will be reduced by dedicated reducers.
 */

/* SELECTORS */
/*
 * no dedicated selectors.
 * See the selectors corresponding to the dedicated reducers.
 */

/* HELPERS */

