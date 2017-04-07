import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

const configureStore = (reducer) => {
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

export default configureStore
