
/* levels
 *
 * For small values, JSON.stringify is the most efficient.
 *
 * If the level params is null or undefined, all arguments will be stringified in one go.
 * If levels == {}, all object arguments will be treated by object identity.
 *
 * Otherwise, levels should be an object, keyed by number (argument position) and valued by
 * level.
 *
 * Level 0 means: use object identity as the key.
 * Level i+i means: JSON stringify the top i levels of the argument, and everything from level i+1
 * onwards is treated by obbject identity.
 * Level -1: JSON stringify that argument
 *
 * Object with keys: the argument numbers, and values: what to do with the argument
 * values:
 *  true: treat argument by value (use JSON.stringify to compute a key)
 *  null, false, absent: treat argument by ref: use object-identity and WeakMap to compute a key
 *  number: descend into the object that levels deep. At that level, treat objects by identity.
 *
 *  Example:
 *
 *  const tables = {
 *    person: { entities: { ... } },
 *    address: { entities: { ... } },
 *    job: { entities: { ... } },
 *    car: { entities: { ... } },
 *    profile: { entities: { ... } },
 *  }
 *
 *  const personal1 = {
 *    a: tables[person],
 *    b: tables[profile],
 *  }
 *
 *  const personal2 = {
 *    a: tables[person],
 *    b: tables[profile],
 *  }
 *
 *  const f = (tables) => tables.a
 *
 *  const memF = memoize(f)
 *
 *  memF(personal1) // computes
 *  memF(personal2) // computes again, because personal1 !== personal2
 *
 *  const memF1({0: 1}, f)
 *
 *  memF1(personal1) // computes
 *  memF1(personal2) // retrieves from cache, because personal1.a === personal2.a and personal1.b === personal2.b
 *
 *  Likewise if your component is an array
 *
 */

export const memoize = (f, levels, config) => {
  let retrieved = 0
  let computed = 0
  let cleared = 0
  let keyIndex = 0

  const memCache = {}
  const objMap = new WeakMap()

  const useLevels = levels || {}
  const useConfig = config || {}

  /* clear a cacheItem after a fixed amount of time after it has been created
   */

  const clearCache = key => {
    delete memCache[key]
    cleared++
  }

  const resolveArg = fArg => {
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
      return [true, mArg]
    }
    else {return [false, fArg]}
  }
  const resolveToLevel = (fArg, level) => {
    if (level == -1) {return JSON.stringify(fArg)}
    if (level == 0) {return resolveArg(fArg)}
    const fArgType = typeof fArg
    if (fArgType != 'object') {return resolveArg(fArg)}
    if (Array.isArray(fArg)) {return fArg.map(x => resolveToLevel(x, level - 1))}
    return Object.keys(fArg).sort().map(x => [x, resolveToLevel(fArg[x], level - 1)])
  }

  const memoF = (...fArgs) => {
    if (fArgs.length == 0) {
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
     * object arguments add their unique integer, as hold in the WeakMap.
     * The resulting array is JSON stringified.
     * For a bit more pecision: a non-object arg is translated to [false, arg],
     * and an object arg is translated to [true, objMap.get(arg)].
     * So there will not be clashes between real integer arguments and integers coming form keyMaps.
     */
    const memoKey = levels == null ?
      JSON.stringify(fArgs) :
      JSON.stringify(fArgs.map((fArg, i) => resolveToLevel(fArg, useLevels[i] || 0)))
    let { [memoKey]: result } = memCache
    if (result == null) {
      result = f.apply({}, fArgs)
      memCache[memoKey] = result
      computed += 1
      setTimeout(() => clearCache(memoKey), (useConfig.clearCache || 1800) * 1000)
    }
    else {retrieved += 1}
    return result
  }
  return memoF
}

