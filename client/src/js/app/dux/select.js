import merge from 'lodash/merge'
import { makeReducer } from 'utils'

/* ACTIONS */

export const setSearch = (tag, search) => ({ type: 'setSearch', tag, search })
export const setPopUp = (tag, onOff) => ({ type: 'setPopUp', tag, onOff })
export const togglePopUp = tag => ({ type: 'togglePopUp', tag })

/* REDUCER */

const flows = {
  setSearch(state, { tag, search }) {
    const init = initSelect(state, tag)
    return merge(init, state, { [tag]: { search } })
  },
  setPopUp(state, { tag, onOff }) {
    const init = initSelect(state, tag)
    return merge(init, state, { [tag]: { popUp: onOff } })
  },
  togglePopUp(state, { tag }) {
    const init = initSelect(state, tag)
    const { [tag]: myState } = state
    const newOnOff = (myState == null) ? true : !myState.popUp
    return merge(init, state, { [tag]: { popUp: newOnOff } })
  },
}

export default makeReducer(flows, {})

/* SELECTORS */

export const getSelect = ({ select }, { tag }) => ({ ...(select[tag] || {}) })

/* HELPERS */

const initSelect = (state, tag) => {
  const { [tag]: myState } = state
  return (myState == null) ?
    { [tag]: { search: '', popUp: false } } :
    {}
}
