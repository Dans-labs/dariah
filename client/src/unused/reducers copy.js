import { combineReducers } from 'redux'
import { getWinDim } from 'ui.js'

const win = (state = getWinDim(), { type, height, width }) => {
  switch (type) {
    case 'windim': {
      return { height, width }
    }
    default: return state
  }
}

const notify = (state = {}, { type, desc, status, msgs }) => {
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

const doc = (state = {}, { type, path, data }) => {
  switch (type) {
    case 'fetchDoc': {
      if (data == null) {return { ...state, [path]: null }}
      return { ...state, [path]: data }
    }
    default: return state
  }
}

const me = (state = {}, { type, path, data }) => {
  switch (type) {
    case 'fetchMe': {
      if (data == null) {return {}}
      return { ...data }
    }
    default: return state
  }
}

const tables = (state={}, { type, path, data, table }) => {
  switch (type) {
    case 'fetchTable': {
      if (data == null) {return { ...state, [table]: null }}
      return {
        ...state,
        [table]: data,
      }
    }
    case 'fetchTableMy': {
      if (data == null) {
        if (state[table] == null) { return { ...state, [table]: null }}
        return {
          ...state,
          [table]: {
            ...state[table],
            my: null,
          }
        }
      }
      const { entities, order, fieldSpecs, fieldOrder } = data
      return {
        ...state,
        [table]: {
          ...state[table],
          my: order,
          entities: {
            ...state[table].entities,
            ...entities,
          },
          fieldSpecs,
          fieldOrder,
        },
      }
    }
    case 'fetchItem': {
      if (data == null) {return state}
      const { _id } = data
      return {
        ...state,
        [table]: {
          ...state[table],
          entities: {
            ...state[table].entities,
            [_id]: data,
          },
        },
      }
    }
    default: return state
  }
}

export default combineReducers({
  win,
  notify,
  doc,
  tables,
  me,
})

