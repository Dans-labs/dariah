import merge from 'lodash/merge'
import { makeReducer, emptyO } from 'utils'

/* ACTIONS */

export const setSearch = (selectTag, search) => ({ type: 'setSearch', selectTag, search })
export const setPopUp = (selectTag, onOff) => ({ type: 'setPopUp', selectTag, onOff })
export const togglePopUp = selectTag => ({ type: 'togglePopUp', selectTag })

/* REDUCER */

const flows = {
  setSearch(state, { selectTag, search }) {
    const init = initSelect(state, selectTag)
    return merge(init, state, { [selectTag]: { search } })
  },
  setPopUp(state, { selectTag, onOff }) {
    const init = initSelect(state, selectTag)
    return merge(init, state, { [selectTag]: { popUp: onOff } })
  },
  togglePopUp(state, { selectTag }) {
    const init = initSelect(state, selectTag)
    const { [selectTag]: myState } = state
    const newOnOff = myState == null ? true : !myState.popUp
    return merge(init, state, { [selectTag]: { popUp: newOnOff } })
  },
}

export default makeReducer(flows, emptyO)

/* SELECTORS */

export const getSelect = ({ select }, { selectTag }) => ({ ...(select[selectTag] || emptyO) })

/* HELPERS */

const initSelect = (state, selectTag) => {
  const { [selectTag]: myState } = state
  return myState == null ?
    { [selectTag]: { search: '', popUp: false } } :
    {}
}
