import update from 'immutability-helper'
import { makeReducer } from 'utils'

/* ACTIONS */

export const adjust = (key, value) => ({ type: 'setSetting', key, value })

/* REDUCER */

const flows = {
  setSetting(state, { key, value }) {return update(state, { [key]: { $set: value } })},
}

const initSettings = () => ({
  provenanceFields: new Set(['creator', 'dateCreated', 'modified']),
  hideProvenance: true,
  longDates: {
    assessment: {
      dateSubmitted: true,
      dateWithdrawn: true,
    },
  },
  showTooltips: true,
})

export default makeReducer(flows, initSettings())

/* SELECTORS */

export const getSettings = ({ settings }) => ({ settings })

/* HELPERS */

