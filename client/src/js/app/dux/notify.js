/* ACTIONS */

export const ask =     (desc)       => ({ type: 'notify', status: 'pending', desc })
export const err =     (desc, data) => ({ type: 'notify', status: 'error',   desc, msgs: data })
export const succeed = (desc)       => ({ type: 'notify', status: 'success', desc })

/* REDUCER */

export default (state = {}, { type, desc, status, msgs }) => {
  switch (type) {
    case 'notify': {
      switch (status) {
        case 'pending', 'success': {
          return { ...state, [desc]: { status } }
        }
        case 'error': {
          return { ...state, [desc]: { status, msgs } }
        }
        default: return state
      }
    }
    default: return state
  }
}

/* SELECTORS */

export const getNotify = ({ notify }) => ({ notify })

/* HELPERS */

