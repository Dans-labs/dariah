import update from 'immutability-helper'
import { makeReducer, emptyS, emptyO } from 'utils'

/* DEFINITIONS */

const initSelect = { search: emptyS, popUp: false }

/* ACTIONS */

export const setSearch = (selectTag, search) => ({ type: 'setSearch', selectTag, search })
export const setPopUp = (selectTag, onOff) => ({ type: 'setPopUp', selectTag, onOff })
export const togglePopUp = selectTag => ({ type: 'togglePopUp', selectTag })

/* REDUCER */

const flows = {
  setSearch(state, { selectTag, search }) {
    return update(state, {
      [selectTag]: {
        $apply: st => update(st || initSelect, { search: { $set: search } }),
      },
    })
  },
  setPopUp(state, { selectTag, onOff }) {
    return update(state, {
      [selectTag]: {
        $apply: st => update(st || initSelect, { popUp: { $set: onOff } }),
      },
    })
  },
  togglePopUp(state, { selectTag }) {
    const { [selectTag]: myState } = state
    const newOnOff = myState == null ? true : !myState.popUp
    return update(state, {
      [selectTag]: {
        $apply: st => update(st || initSelect, { popUp: { $set: newOnOff } }),
      },
    })
  },
}

export default makeReducer(flows, emptyO)

/* SELECTORS */

export const getSelect = ({ select }, { selectTag }) => ({ ...(select[selectTag] || emptyO) })

/* HELPERS */

