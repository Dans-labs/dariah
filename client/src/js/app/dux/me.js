import update from 'immutability-helper'

import { accessData } from 'server'
import { makeReducer, emptyO, emptyA } from 'utils'

/* ACTIONS */
/*
 * Most actions call accessData, which will dispatch the ultimate fetch action.
 */
export const fetchMe = () =>
	accessData({
		type: 'fetchMe',
		contentType: 'db',
		path: '/who/ami',
		desc: 'me',
	})

/* REDUCER */

const flows = {
	fetchMe(state, { data }) {
		if (data == null) {
			return emptyO
		}
		return { ...data }
	},
	modItem(state, { data, table }) {
		if (table === 'user') {
			const { records = emptyA } = data
			let newState = state
			for (const { values, groupValues = emptyO } of records) {
				if (values._id == state._id) {
					newState = update(newState, { $merge: values })
					newState = update(newState, { $merge: groupValues })
				}
			}
			return newState
		} else {
			return state
		}
	},
}

export default makeReducer(flows)

/* SELECTORS */

export const getMe = ({ me }) => ({ me })

/* HELPERS */
