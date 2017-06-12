import React from 'react'
import { createSelector } from 'reselect'

import { memoize } from 'memo'

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

