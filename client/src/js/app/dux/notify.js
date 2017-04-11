import mergeWith from 'lodash/mergewith'

/* ACTIONS */

export const ask = desc => ({ type: 'async', status: 'pending', desc })
export const err = (desc, msgs) => ({ type: 'async', status: 'error', desc, msgs })
export const succeed = desc => ({ type: 'async', status: 'success', desc })

export const notify = msgs => ({ type: 'msgs', msgs })
export const clear = () => ({ type: 'clear' })
export const display = onOff => ({ type: 'display', onOff })

/* REDUCER */

export default (state = { items: [], busy: 0, show: false }, { type, desc, status, msgs, onOff }) => {
  switch (type) {
    case 'async': {
      const { busy } = state
      const extraMsgs = msgs || []
      switch (status) {
        case 'pending': {
          return mergeWith({}, state, {
            items: [
              ...extraMsgs,
              { kind: 'special', text: `waiting for ${desc}`},
            ],
            busy: busy + 1,
          }, addItems)
        }
        case 'success': {
          return mergeWith({}, state, {
            items: [
              ...extraMsgs,
              { kind: 'info', text: `${desc} ok` },
            ],
            busy: busy - 1,
          }, addItems)
        }

        case 'error': {
          return mergeWith({}, state, {
            items: [
              ...extraMsgs,
              { kind: 'error', text: `${desc} failed` },
            ],
            busy: busy - 1,
            show: true,
          }, addItems)
        }
        default: return state
      }
    }
    case 'msgs': {
      return mergeWith({}, state, {
        items: [
          ...msgs,
        ],
        show: true,
      }, addItems)
    }
    case 'clear': {
      return {
        ...state,
        items: [],
        show: false,
      }
    }
    case 'display': {
      return {
        ...state,
        show: onOff,
      }
    }
    default: return state
  }
}

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
    return (objValue == null) ? srcValue : objValue.concat(srcValue)
  }
}

