import React from 'react'
import { createSelector } from 'reselect'

/* global process */

export const emptyA = []
export const emptyO = {}
export const emptyF = () => null

export const propsChanged = (newProps, need, oldProps, keyPropNames) => {
  let result = false
  if (oldProps == null) {
    if (need(newProps)) {result = true}
  }
  else {
    if (keyPropNames.some(a => newProps[a] != oldProps[a]) && need(newProps)) {result = true}
  }
  return result
}

export const withParams = Component => ({ params, route, ...props }) => {
  const allProps = { ...props, ...params, ...route }
  return <Component {...allProps} />
}

export const makeReducer = (flows, init = emptyO) => (state = init, action) => {
  const { type } = action
  const { [type]: flow } = flows
  return flow ? flow(state, action) : state
}

const mergeObject = (...objects) => Object.assign({}, ...objects)
export const combineSelectors = (...selectors) => createSelector(...selectors, mergeObject)

export function memoize(f) {
  const memCache = {}
  let retrieved
  let computed
  let keyIndex = 0
  const objMap = new WeakMap()

  if (process.env.NODE_ENV === `development`) {
    retrieved = 0
    computed = 0
  }
  const memoF = (...fArgs) => {
    if (process.env.NODE_ENV === `development`) {
      if (fArgs.length == 0) {
        const Console = console
        Console.warn(`Cache keys:`, Object.keys(memCache))
        Console.warn(`Computed: ${computed} x`)
        Console.warn(`Retrieved: ${retrieved} x`)
        return
      }
    }
    /* We have to compute a key from the arguments.
     * If the arguments are not objects, we can easily stringify them.
     * If they are objects, we could also stringify them, but for large objects
     * that will give a hefty performance penalty.
     * We can use the objects as keys in a WeakMap.
     * But if there are multiple arguments, how do we distil a key for the whole ensemble?
     * Trick: maintain a WeakMap (called objMap) that maps objects to unique integers. Use that integer
     * in the cache key. WeakMaps do not accept non-objects as keys.
     * So we build an array of key parts as follows: non-object arguments are added as they are,
     * object arguments add their unique integer, as hold in the WeakMap.
     * The resulting array is JSON stringified.
     * For a bit more pecision: a non-object arg is translated to [false, arg],
     * and an object arg is translated to [true, objMap.get(arg)].
     * So there will not be clashes between real integer arguments and integers coming form keyMaps.
     */
    const memoKeyParts = []
    fArgs.forEach(fArg => {
      const fArgType = typeof fArg
      if (fArgType == 'object' || fArgType == 'function') {
        let mArg
        if (objMap.has(fArg)) {
          mArg = objMap.get(fArg)
        }
        else {
          objMap.set(fArg, keyIndex)
          mArg = keyIndex
          keyIndex++
        }
        memoKeyParts.push([true, mArg])
      }
      else {
        memoKeyParts.push([false, fArg])
      }
    })
    const memoKey = JSON.stringify(memoKeyParts)
    let { [memoKey]: result } = memCache
    if (result == null) {
      result = f.apply({}, fArgs)
      memCache[memoKey] = result
      if (process.env.NODE_ENV === `development`) {
        computed += 1
      }
    }
    else {
      if (process.env.NODE_ENV === `development`) {
        retrieved += 1
      }
    }
    return result
  }
  return memoF
}

export const levelOneEq = (a, b) => {
  if (typeof a != typeof b) {return false}
  if (typeof a == 'object') {
    const ka = Object.keys(a)
    if (ka.length != Object.keys(b).length) {return false}
    return ka.every(k => a[k] === b[k])
  }
  return a === b
}

export const handle = memoize((dispatch, action, ...actionArgs) => event => {
  if (event) {event.preventDefault()}
  dispatch(action.apply({}, actionArgs))
})

export const handlE = memoize((dispatch, action, ...actionArgs) => () => {
  dispatch(action.apply({}, actionArgs))
})

export const handlEV = memoize((dispatch, action, ...actionArgs) => event => {
  dispatch(action.apply({}, [...actionArgs, event.target.value]))
})

