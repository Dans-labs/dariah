/* ACTIONS */

export const ask =     (desc)       => ({ type: 'async', status: 'pending', desc })
export const err =     (desc, msgs) => ({ type: 'async', status: 'error',   desc, msgs })
export const succeed = (desc)       => ({ type: 'async', status: 'success', desc })

export const notify =  (msgs)       => ({ type: 'msgs', msgs })
export const clear  =  ()           => ({ type: 'clear' })
export const display = (onOff)      => ({ type: 'display', onOff })

/* REDUCER */

export default (state = { items: [], busy: 0, show: false }, { type, desc, status, msgs, onOff }) => {
  switch (type) {
    case 'async': {
      const { items, busy, msgs } = state
      const extraMsgs = msgs || []
      switch (status) {
        case 'pending': {
          return {
            ...state, items: [
              ...items,
              ...extraMsgs,
              { kind: 'special', text: `waiting for ${desc}` },
            ],
            busy: busy + 1,
            show: true,
          }
        }
        case 'success': {
          return {
            ...state,
            items: [
              ...items,
              ...extraMsgs,
              { kind: 'info', text: `${desc} ok` },
            ],
            busy: busy - 1,
            show: false,
          }
        }
        
        case 'error': {
          return {
            ...state,
            items: [
              ...items,
              ...extraMsgs,
              { kind: 'error', text: `${desc} failed` },
            ],
            busy: busy - 1,
            show: true,
          }
        }
        default: return state
      }
    }
    case 'msgs': {
      const { items } = state
      return {
        ...state,
        items: [
          ...items,
          ...msgs,
        ],
        show: true,
      }
    }
    case 'clear': {
      return {
        ...state,
        items: [],
        show: false
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

export const getNotify = ({ notify }) => ({ notify })

export const getNotifications = ({ notify }) => {
  const { items, busy, show } = notify
  let lastNote = -1
  let lastKind = ''
  items.forEach((item, i) => {
    const { kind, text } = item
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

