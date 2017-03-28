import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

const configureStore = (reducer) => {
  const middlewares = [thunkMiddleware]
  if (process.env.NODE_ENV === `development`) {
    const { createLogger } = require(`redux-logger`)
    middlewares.push(createLogger())
  }

  const store = createStore(
    reducer,
    applyMiddleware(...middlewares)
  )
  return store
}

export default configureStore
