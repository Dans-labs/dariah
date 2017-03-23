export default function memoBind(thisArg, funcName, keyArgs, extraArgs) {
  if (typeof thisArg !== 'object' || !thisArg) {
    throw new TypeError('Invalid thisArg parameter.')
  }

  const { [funcName]: func } = thisArg
  if (typeof func !== 'function') {
    throw new TypeError(`'${funcName}' is not a function.`)
  }

  if (thisArg._memCache == null) {thisArg._memCache = new Map()}
  if (!thisArg._memCache.has(funcName)) {
    thisArg._memCache.set(funcName, new Map())
  }
  const cache = thisArg._memCache.get(funcName)

  const memoKey = JSON.stringify(keyArgs)
  if (!cache.has(memoKey)) {
    cache.set(memoKey, func.apply(thisArg, [...keyArgs, ...(extraArgs || [])]))
  }
  return cache.get(memoKey)
}
