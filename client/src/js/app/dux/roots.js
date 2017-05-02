import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { reducer as form } from 'redux-form'

import win from 'win'
import notify from 'notify'
import docs from 'docs'
import tables from 'tables'
import me from 'me'
import filters from 'filters'
import alter from 'alter'
import select from 'select'

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
  docs,
  tables,
  me,
  filters,
  alter,
  form,
  select,
}))

/* SELECTORS */

/*
export const combineSelectors = function(...selectors) {
  return (state, props) => {
    const result = {}
    for (const selector of selectors) {
      Object.assign(result, selector(state, props))
    }
    return result
  }
}
*/

/* HELPERS */

