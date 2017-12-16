//import update from 'immutability-helper'

import { memoize } from 'memo'
import { makeReducer, updateAuto, emptyO } from 'utils'
import { handle } from 'handle'

/* ACTIONS */

export const nextAlt = (alterSection, alterTag, nAlts, initial) => ({
  type: 'nextAlt',
  alterSection,
  alterTag,
  nAlts,
  initial,
})
export const setAlt = (alterSection, alterTag, alt) => ({
  type: 'setAlt',
  alterSection,
  alterTag,
  alt,
})
export const setItems = (alts, alterSection, alt) => ({
  type: 'setItems',
  eIds: alts,
  alterSection,
  alt,
})

/* REDUCER */

const flows = {
  nextAlt(state, { alterSection, alterTag, initial, nAlts }) {
    const {
      [alterSection]: { [alterTag]: oldAlt = initial || 0 } = emptyO,
    } = state
    const newAlt = (oldAlt + 1) % nAlts
    return updateAuto(state, [alterSection, alterTag], { $set: newAlt })
  },
  setAlt(state, { alterSection, alterTag, alt }) {
    return updateAuto(state, [alterSection, alterTag], { $set: alt })
  },
  fetchItems(state, { data, eIds, alterSection, alt }) {
    let newState = state
    if (data && eIds != null) {
      for (const eId of eIds) {
        newState = updateAuto(newState, [alterSection, eId], { $set: alt })
      }
    }
    return newState
  },
  setItems(state, { eIds, alterSection, alt }) {
    let newState = state
    if (eIds != null) {
      for (const eId of eIds) {
        newState = updateAuto(newState, [alterSection, eId], { $set: alt })
      }
    }
    return newState
  },
}

export default makeReducer(flows)

/* SELECTORS */

export const getAltSection = ({ alter }, { alterSection }) => ({
  alter: alter[alterSection] || emptyO,
})

/* HELPERS */

export const compileAlternatives = memoize(
  (alterSection, nAlts, initial, dispatch) => alterTag => ({
    getAlt: alter => {
      const { [alterTag]: alt = initial || 0 } = alter
      return alt
    },
    nextAlt: handle(dispatch, nextAlt, alterSection, alterTag, nAlts, initial),
    initAlt: handle(dispatch, setAlt, alterSection, alterTag, initial),
    setAlt: alt => handle(dispatch, setAlt, alterSection, alterTag, alt),
    putAlt: alt => dispatch(setAlt(alterSection, alterTag, alt)),
  }),
  null,
  { debug: 'compileAlternatives' },
)
