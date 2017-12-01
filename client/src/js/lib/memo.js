import { jString, emptyS } from 'utils'

/* global process */

let debugStyle
if (process.env.NODE_ENV === `development`) {
  debugStyle = {
    key: false,
    fName: true,
    fArgs: false,
    fResult: false,
    retrieved: true,
    computed: true,
    cleared: true,
    whiteList: {
      nothing: true,
      //handle: true,
      //compileFieldIds: true,
      //compileValues: true,
      //initFilterSettings: true,
      //computeFiltering: true,
      //compileActiveItems: true,
      //compileNotifications: true,
      //compileOptions: true,
      //compileAlternatives: true,
    },
  }
}

export const memoize = (f, levels, config) => {
  let retrieved = 0
  let computed = 0
  let cleared = 0
  let keyIndex = 0

  const memCache = {}
  const objMap = new WeakMap()

  const useLevels = levels || {}
  const useConfig = config || {}

  /* Report action in development mode
   */
  let report
  if (process.env.NODE_ENV === `development`) {
    report = (key, action, fArgs, fResult) => {
      const { debug: fName } = useConfig
      const { whiteList, whiteList: { [fName]: passes } } = debugStyle
      const nWhite = Object.keys(whiteList).length
      if (fName != null && (passes || nWhite === 0) && debugStyle[action]) {
        const Console = console
        Console.warn(
          `${action} ${debugStyle.fName ? fName : emptyS}`,
          debugStyle.key ? key : emptyS,
          debugStyle.fArgs ? fArgs : emptyS,
          debugStyle.fResult ? fResult : emptyS,
        )
      }
    }
  }
  /* clear a cacheItem after a fixed amount of time after it has been created
   */

  const clearCache = key => {
    delete memCache[key]
    cleared++
    if (process.env.NODE_ENV === `development`) {
      report(key, 'cleared')
    }
  }

  const resolveArg = (fArg, byId) => {
    const fArgType = typeof fArg
    if (fArg == null || (!byId && fArgType !== 'function')) {return jString(fArg)}
    if (fArgType === 'object' || fArgType === 'function') {
      let mArg
      if (objMap.has(fArg)) {
        mArg = objMap.get(fArg)
      }
      else {
        objMap.set(fArg, keyIndex)
        mArg = keyIndex
        keyIndex++
      }
      return [true, mArg]
    }
    else {return [false, fArg]}
  }
  const resolveToLevel = (fArg, level) => {
    if (level === -1) {return resolveArg(fArg, false)}
    if (level === 0) {return resolveArg(fArg, true)}
    const fArgType = typeof fArg
    if (fArg == null || fArgType !== 'object') {return resolveArg(fArg)}
    if (Array.isArray(fArg)) {return fArg.map(x => resolveToLevel(x, level - 1))}
    return Object.keys(fArg).sort().map(x => [x, resolveToLevel(fArg[x], level - 1)])
  }

  const memoF = (...fArgs) => {
    if (fArgs.length === 0) {
      return { cacheKeys: Object.keys(memCache), computed, retrieved, cleared }
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
     * object arguments add their unique integer, as held in the WeakMap.
     * The resulting array is JSON stringified.
     * For a bit more pecision: a non-object arg is translated to [false, arg],
     * and an object arg is translated to [true, objMap.get(arg)].
     * So there will not be clashes between real integer arguments and integers coming form keyMaps.
     */
    const memoKey = levels == null
    //? jString(fArgs)
    ? jString(fArgs.map(fArg => resolveToLevel(fArg, -1)))
    : jString(fArgs.map((fArg, i) => resolveToLevel(fArg, useLevels[i] || 0)))
    let { [memoKey]: result } = memCache
    if (result == null) {
      result = f.apply({}, fArgs)
      memCache[memoKey] = result
      computed += 1
      if (process.env.NODE_ENV === `development`) {
        report(memoKey, 'computed', fArgs, result)
      }
      setTimeout(() => clearCache(memoKey), (useConfig.clearCache || 1800) * 1000)
    }
    else {
      retrieved += 1
      if (process.env.NODE_ENV === `development`) {
        report(memoKey, 'retrieved', fArgs, result)
      }
    }
    return result
  }
  return memoF
}

export const makeSet = memoize(keys => new Set(keys))
