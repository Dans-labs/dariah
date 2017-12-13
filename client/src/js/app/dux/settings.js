import update from 'immutability-helper'
import { makeReducer } from 'utils'

/* ACTIONS */

export const adjust = (key, value) => ({ type: 'setSetting', key, value })

/* REDUCER */

const flows = {
	setSetting(state, { key, value }) {
		return update(state, { [key]: { $set: value } })
	},
}

/* trim dates:
 *
 * true: trim time always
 * 1:    trim time is longer than 1 day ago
 * false or absent: trim milliseconds only
 */

const initSettings = () => ({
	provenanceFields: new Set(['creator', 'dateCreated', 'modified']),
	hideProvenance: true,
	longDates: {
		assessment: {
			dateSubmitted: 1,
			dateWithdrawn: 1,
		},
    review: {
      dateDecided: 1,
    },
	},
	showTooltips: true,
})

export default makeReducer(flows, initSettings())

/* SELECTORS */

export const getSettings = ({ settings }) => ({ settings })

/* HELPERS */
