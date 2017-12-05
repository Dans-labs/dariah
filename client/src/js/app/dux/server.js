import 'whatwg-fetch'
import { SubmissionError } from 'redux-form'
import update from 'immutability-helper'

import { makeReducer } from 'utils'

/* DEFINITIONS */

const rootUrl = '/api/'

/* ACTIONS */

const progress = (path, desc) => ({
	type: 'async',
	status: 'progress',
	path,
	desc,
})
const ask = (path, desc) => ({ type: 'async', status: 'pending', path, desc })
const err = (path, desc, msgs) => ({
	type: 'async',
	status: 'error',
	path,
	desc,
	msgs,
})
const succeed = (path, desc, msgs) => ({
	type: 'async',
	status: 'success',
	path,
	desc,
	msgs,
})

/* global process */

export const accessData = task => (dispatch, getState) => {
	const { path, contentType, desc, sendData } = task
	const { [path]: asyncState } = getState().server
	if (asyncState > 0) {
		dispatch(progress(path, desc))
		return
	}
	dispatch(ask(path, desc))

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
	const actionUrl = `${rootUrl}${contentType}${path}`
	return fetch(actionUrl, settings)
		.then(
			response =>
				response.ok
					? response.json()
					: {
							good: false,
							msgs: [
								{
									kind: 'error',
									text: `No valid response from the server to ${actionUrl}`,
								},
							],
						},
		)
		.then(json => {
			const { msgs, good, data } = json
			if (good) {
				dispatch(succeed(path, desc, msgs))
				dispatch({ ...task, data })
			} else {
				dispatch(err(path, desc, msgs))
			}
			if (data && data.diags && Object.keys(data.diags).length > 0) {
				throw new SubmissionError(data.diags)
			}
		})
		.catch(error => {
			if (process.env.NODE_ENV === `development`) {
				console.error(error)
			}
			if (error instanceof SubmissionError) {
				throw error
			} else {
				dispatch(err(path, desc, [{ kind: 'error', text: error.toString() }]))
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
		return subFlow ? subFlow(state, { path }) : state
	},
}

export default makeReducer(flows)
