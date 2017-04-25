import React from 'react'

export const editClass = (dirty, invalid) => invalid ? 'invalid' : dirty ? 'dirty' : ''

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
export const makeComponent = (Component, boundProps) => props => <Component {...boundProps} {...props} />

export const makeReducer = (flows, init = {}) => (state = init, action) => {
  const { type } = action
  const { [type]: flow } = flows
  return flow ? flow(state, action) : state
}


