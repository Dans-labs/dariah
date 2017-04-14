import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { reducer as form } from 'redux-form'

import win from 'win.js'
import notify from 'notify.js'
import doc from 'doc.js'
import tables from 'tables.js'
import me from 'me.js'
import filter from 'filter.js'
import alter from 'alter.js'

/* ACTIONS */

/* global process */
/* global require */

const configureStore = reducer => {
  const middlewares = [thunkMiddleware]
  const storeComponents = [reducer]
  if (process.env.NODE_ENV === `development`) {
    const { createLogger } = require(`redux-logger`)
    middlewares.push(createLogger())
    storeComponents.push(
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    )
  }
  storeComponents.push(
    applyMiddleware(...middlewares),
  )

  const store = createStore(
    ...storeComponents
  )
  return store
}

/* REDUCER */

export default configureStore(combineReducers({
  win,
  notify,
  doc,
  tables,
  me,
  filter,
  alter,
  form,
}))

/* SELECTORS */

export const combineSelectors = function(...selectors) {
  return (state, props) => {
    const result = {}
    for (const selector of selectors) {
      Object.assign(result, selector(state, props))
    }
    return result
  }
}

/* HELPERS */

