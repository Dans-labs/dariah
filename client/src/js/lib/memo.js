/* global process */

export function memoize(f) {
  const memCache = {}
  let retrieved
  let computed
  if (process.env.NODE_ENV === `development`) {
    retrieved = 0
    computed = 0
  }
  const memoF = (...fArgs) => {
    if (process.env.NODE_ENV === `development`) {
      if (fArgs.length == 0) {
        const Console = console
        Console.warn(`Computed: ${computed} x`)
        Console.warn(`Retrieved: ${retrieved} x`)
        return
      }
    }
    const memoKey = JSON.stringify(fArgs)
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
