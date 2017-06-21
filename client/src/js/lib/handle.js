import { memoize } from 'memo'

export const handle = memoize((dispatch, action, ...actionArgs) => event => {
  if (event) {
    event.preventDefault()
    event.stopPropagation()
  }
  dispatch(action.apply({}, actionArgs))
}, null, { debug: 'handle' })

export const handlE = memoize((dispatch, action, ...actionArgs) => () => {
  dispatch(action.apply({}, actionArgs))
})

export const handlEV = memoize((dispatch, action, ...actionArgs) => event => {
  dispatch(action.apply({}, [...actionArgs, event.target.value]))
})

