import React from 'react'

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
