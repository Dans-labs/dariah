import mergeWith from 'lodash/mergewith'
import { makeReducer, emptyA } from 'utils'

/* ACTIONS */

export const notify = msgs => ({ type: 'msgs', msgs })
export const clear = () => ({ type: 'clear' })
export const display = onOff => ({ type: 'display', onOff })

/* REDUCER */

const subFlows = {
  pending(state, { desc, busy, extraMsgs }) {
    return mergeWith({}, state, {
      notes: [
        ...extraMsgs,
        { kind: 'special', text: `waiting for ${desc}`},
      ],
      busy: busy + 1,
    }, addItems)
  },
  success(state, { desc, busy, extraMsgs }) {
    return mergeWith({}, state, {
      notes: [
        ...extraMsgs,
        { kind: 'info', text: `${desc} ok` },
      ],
      busy: busy - 1,
    }, addItems)
  },
  error(state, { desc, busy, extraMsgs }) {
    return mergeWith({}, state, {
      notes: [
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
    const extraMsgs = msgs || emptyA
    const { [status]: subFlow } = subFlows
    return subFlow ? subFlow(state, { extraMsgs, desc, busy }) : state
  },
  msgs(state, { msgs }) {
    return mergeWith({}, state, {
      notes: [
        ...msgs,
      ],
      show: true,
    }, addItems)
  },
  clear(state) {
    return {
      ...state,
      notes: emptyA,
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

export default makeReducer(flows, { notes: emptyA, busy: 0, show: false })

/* SELECTORS */

export const getNotifications = ({ notify }) => {
  const { notes, busy, show } = notify
  let lastNote = -1
  let lastKind = ''
  notes.forEach((note, i) => {
    const { kind } = note
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
  return { notifications: notes, busy, show, lastMsg: notes.length - 1, lastNote, lastKind }
}

/* HELPERS */

const addItems = (objValue, srcValue, key) => {
  if (key == 'notes') {
    return objValue == null ? srcValue : objValue.concat(srcValue)
  }
}

