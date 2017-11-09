import { emptyO } from 'utils'
import { memoize } from 'memo'

export const handle = memoize((dispatch, action, ...actionArgs) => event => {
  if (event) {
    event.preventDefault()
    //event.stopPropagation() // gives a problem in FireFox: no blinking cursor in input field
  }
  dispatch(action.apply({}, actionArgs))
}, emptyO, { debug: 'handle' })

export const handlE = memoize((dispatch, action, ...actionArgs) => () => {
  dispatch(action.apply({}, actionArgs))
}, emptyO)

export const handlEV = memoize((dispatch, action, ...actionArgs) => event => {
  dispatch(action.apply({}, [...actionArgs, event.target.value]))
}, emptyO)

