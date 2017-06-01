import mergeWith from 'lodash/mergewith'
import { makeReducer } from 'utils'

/* ACTIONS */

export const notify = msgs => ({ type: 'msgs', msgs })
export const clear = () => ({ type: 'clear' })
export const display = onOff => ({ type: 'display', onOff })

/* REDUCER */

const subFlows = {
  pending(state, { desc, busy, extraMsgs }) {
    return mergeWith({}, state, {
      items: [
        ...extraMsgs,
        { kind: 'special', text: `waiting for ${desc}`},
      ],
      busy: busy + 1,
    }, addItems)
  },
  success(state, { desc, busy, extraMsgs }) {
    return mergeWith({}, state, {
      items: [
        ...extraMsgs,
        { kind: 'info', text: `${desc} ok` },
      ],
      busy: busy - 1,
    }, addItems)
  },
  error(state, { desc, busy, extraMsgs }) {
    return mergeWith({}, state, {
      items: [
        ...extraMsgs,
        { kind: 'error', text: `${desc} failed` },
      ],
      busy: busy - 1,
      show: true,
    }, addItems)
  },
}

const flows = {
  async(state, { msgs, status, desc }) {
    const { busy } = state
    const extraMsgs = msgs || []
    const { [status]: subFlow } = subFlows
    return subFlow ? subFlow(state, { extraMsgs, desc, busy }) : state
  },
  msgs(state, { msgs }) {
    return mergeWith({}, state, {
      items: [
        ...msgs,
      ],
      show: true,
    }, addItems)
  },
  clear(state) {
    return {
      ...state,
      items: [],
      show: false,
    }
  },
  display(state, { onOff }) {
    return {
      ...state,
      show: onOff,
    }
  },
}

export default makeReducer(flows, { items: [], busy: 0, show: false })

/* SELECTORS */

export const getNotifications = ({ notify }) => {
  const { items, busy, show } = notify
  let lastNote = -1
  let lastKind = ''
  items.forEach((item, i) => {
    const { kind } = item
    if (kind == 'error') {
      lastNote = i
      lastKind = 'error'
    }
    else if (kind == 'warning') {
      if (lastKind != 'error') {
        lastNote = i
        lastKind = 'warning'
      }
    }
  })
  return { notifications: items, busy, show, lastMsg: items.length - 1, lastNote, lastKind }
}

/* HELPERS */

const addItems = (objValue, srcValue, key) => {
  if (key == 'items') {
    return objValue == null ? srcValue : objValue.concat(srcValue)
  }
}

