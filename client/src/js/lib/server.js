import 'whatwg-fetch'

const rootUrl = '/api/'

const ask = desc => ({ type: 'async', status: 'pending', desc })
const err = (desc, msgs) => ({ type: 'async', status: 'error', desc, msgs })
const succeed = desc => ({ type: 'async', status: 'success', desc })

export const fetchData = task => dispatch => {
  const { path, contentType, desc } = task
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

