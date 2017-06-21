import update from 'immutability-helper'

import { makeReducer, emptyS, emptyA } from 'utils'

/* ACTIONS */

export const notify = msgs => ({ type: 'msgs', msgs })
export const clear = () => ({ type: 'clear' })
export const display = onOff => ({ type: 'display', onOff })

/* REDUCER */

const subFlows = {
  pending(state, { desc, busy, extraMsgs }) {
    return update(state, {
      notes: { $push: [...extraMsgs, { kind: 'special', text: `waiting for ${desc}`}] },
      busy: { $set: busy + 1 },
    })
  },
  success(state, { desc, busy, extraMsgs }) {
    return update(state, {
      notes: { $push: [...extraMsgs, { kind: 'info', text: `${desc} ok` }] },
      busy: { $set: busy - 1 },
    })
  },
  error(state, { desc, busy, extraMsgs }) {
    return update(state, {
      notes: { $push: [...extraMsgs, { kind: 'error', text: `${desc} failed` }] },
      busy: { $set: busy - 1 },
      show: { $set: true },
    })
  },
}

const flows = {
  async(state, { msgs, status, desc }) {
    const { busy } = state
    const extraMsgs = msgs || emptyA
    const { [status]: subFlow } = subFlows
    return subFlow
    ? subFlow(state, { extraMsgs, desc, busy })
    : state
  },
  msgs(state, { msgs }) {
    return update(state, {
      notes: { $push: msgs },
      show: { $set: true },
    })
  },
  clear(state) {
    return update(state, {
      notes: { $set: emptyA },
      show: { $set: false },
    })
  },
  display(state, { onOff }) {
    return update(state, {
      show: { $set: onOff },
    })
  },
}

export default makeReducer(flows, { notes: emptyA, busy: 0, show: false })

/* SELECTORS */

export const getNotifications = ({ notify }) => {
  const { notes, busy, show } = notify
  let lastNote = -1
  let lastKind = emptyS
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

