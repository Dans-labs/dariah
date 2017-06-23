import 'whatwg-fetch'
import { SubmissionError } from 'redux-form'
import update from 'immutability-helper'

import { makeReducer } from 'utils'

/* DEFINITIONS */

const rootUrl = '/api/'

/* ACTIONS */

const progress = (path, desc) => ({ type: 'async', status: 'progress', path, desc })
const ask = (path, desc) => ({ type: 'async', status: 'pending', path, desc })
const err = (path, desc, msgs) => ({ type: 'async', status: 'error', path, desc, msgs })
const succeed = (path, desc) => ({ type: 'async', status: 'success', path, desc })

/* global process */

export const accessData = task => (dispatch, getState) => {
  const { path, contentType, desc, sendData } = task
  const { [path]: asyncState } = getState().server
  if (asyncState > 0) {
    dispatch(progress(path, desc))
    return
  }
  dispatch(ask(path, desc))
  dispatch(task)

  let settings = { credentials: 'same-origin' }
  if (sendData != null) {
    settings = {
      ...settings,
      method: 'POST',
      body: JSON.stringify(sendData),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  }
  return fetch(`${rootUrl}${contentType}${path}`, settings)
  .then(response => response.json())
  .then(json => {
    const { msgs, good, data } = json
    if (good) {
      dispatch(succeed(path, desc))
      dispatch({ ...task, data })
    }
    else {
      dispatch(err(path, desc, msgs))
      if (data) {
        throw new SubmissionError(data)
      }
    }
  })
  .catch(error => {
    if (process.env.NODE_ENV === `development`) {console.error(error)}
    if (error instanceof SubmissionError) {
      throw error
    }
    else {
      dispatch(err(path, desc, [{kind: 'error', text: error.toString()}]))
    }
  })
}

/* REDUCER */

const subFlows = {
  progress(state, { path }) {
    return update(state, { [path]: { $apply: x => x + 1 } })
  },
  pending(state, { path }) {
    return update(state, { [path]: { $set: 1 } })
  },
  success(state, { path }) {
    return update(state, { [path]: { $set: 0 } })
  },
  error(state, { path }) {
    return update(state, { [path]: { $set: -1 } })
  },
}

const flows = {
  async(state, { status, path }) {
    const { [status]: subFlow } = subFlows
    return subFlow
    ? subFlow(state, { path })
    : state
  },
}

export default makeReducer(flows)
