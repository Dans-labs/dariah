import update from 'immutability-helper'
import { makeReducer } from 'utils'

/* ACTIONS */

export const set = (key, value) => ({ type: 'setSetting', key, value })

/* REDUCER */

const flows = {
  set(state, { key, value }) {return update(state, { [key]: { $set: value } })},
}

const initSettings = () => ({
  provenanceFields: new Set(['creator', 'dateCreated', 'modified']),
  hideProvenance: true,
  shortDates: true,
})

export default makeReducer(flows, initSettings())

/* SELECTORS */

export const getSettings = ({ settings }) => ({ settings })

/* HELPERS */

