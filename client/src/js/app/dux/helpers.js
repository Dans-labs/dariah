export function memoBind(thisArg, funcName, keyArgs, allArgs) {
  if (typeof thisArg !== 'object' || !thisArg) {
    throw new TypeError('Invalid thisArg parameter.')
  }

  const { [funcName]: func } = thisArg
  if (typeof func !== 'function') {
    throw new TypeError(`'${funcName}' is not a function.`)
  }

  if (thisArg._memCache == null) {thisArg._memCache = {}}
  if (thisArg._memCache[funcName] == null) {
    thisArg._memCache[funcName] = {}
  }
  const { _memCache: { [funcName]: cache } } = thisArg

  const memoKey = JSON.stringify(keyArgs)
  if (cache[memoKey] == null) {
    cache[memoKey] = func.apply(thisArg, allArgs)
  }
  return cache[memoKey]
}

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

export const combineSelectors = function(...selectors) {
  return (state, props) => {
    const result = {}
    for (const selector of selectors) {
      Object.assign(result, selector(state, props))
    }
    return result
  }
}
