import 'whatwg-fetch'

import { ask, err, succeed } from 'notify.js'

const rootUrl = '/api/'

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

/* ACTIONS */
/*
 * Generic action to fetch data from the server.
 * The query is configured by the task object.
 * It can be used for database queries or file content.
 * During request, notify actions will be dispatched.
 */

export const fetchData = task => dispatch => {
  const { type, path, contentType } = task
  dispatch(ask(task))
  dispatch({ ...task, data: null })

  const settings = {credentials: 'same-origin'}
  fetch(`${rootUrl}${contentType}${path}`, settings)
  .then(response => response.json())
  .then(json => {
    const { msgs, good, data } = json
    if (good) {
      dispatch(succeed(task))
      dispatch({ ...task, data })
    }
    else {
      dispatch(err(task, msgs))
    }
  })
  .catch(error => {
      console.err(error)
      dispatch(err(task, [{kind: 'error', text: error}]))
  })
}

/* HELPERS */

