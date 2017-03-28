import 'whatwg-fetch'

const rootUrl = '/api/'

const ask = ({ desc }) => ({
  type: 'notify',
  status: 'pending',
  desc,
})

const err = ({ desc }, data) => ({
  type: 'notify',
  status: 'error',
  desc,
  msgs: data,
})

const succeed = ({ desc }) => ({
  type: 'notify',
  status: 'success',
  desc,
})

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
      dispatch(err(task, [{kind: 'error', text: error}]))
  })
}

