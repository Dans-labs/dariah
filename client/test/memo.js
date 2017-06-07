import assert from 'assert'
import padStart from 'lodash/padstart'
import { memoize, memoizeX } from '../src/js/lib/utils.js'

/* memoizeOld and memoize
 * Store results in cache, retrieve results
 * when called with same arguments.
 *
 * memoizeOld used JSON stringify.
 * If some of the arguments are (large) objects,
 * this was getting (very) slow, because the arguments are
 * JSON-stringified.
 *
 * The new memoize is hundreds of times faster in those cases.
 * However, if all arguments are scalars or small objects, memoizeOld is still 2-3 times faster.
 * For scalars and small objects, the overhead of key computation is so small,
 * (100,000 times per second) that we can incur performance hits.
 *
 * Caveat: the new memoize is based on object identity, not the semantic value of objects.
 * In Redux we work with objects that do not mutate. 
 * So a different value will be packaged in a different object.
 *
 * Note that because of this we have to use WeakMap, otherwise this memo function
 * would effectively prevent those big data structures to be garbage collected.
 * However, the keys of WeakMaps can only be objects. All other arguments we still stringify.
 *
 */
function memoizeOld(f) {
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

const tm = tdelta => `${(tdelta[0] * 1000000000 + tdelta[1])/1000000000} s`

console.warn('Memo: memoizeOld and memoize')

const testF = (a1, a2, a3) => !!a1 && !!a2 && !!a3
const testFunc = (f, x) => f(x)

const scalar1 = 'foo'
const scalar2 = 2
const scalar3 = true

const smallObject1 = { a1: 'foo', b1: 'bar' }
const smallObject2 = { a2: 'foo', b2: 'bar' }
const smallObject3 = { a3: 'foo', b3: 'bar' }

const bigObject1 = {}
const bigObject2 = {}
const bigObject3 = {}

const func1 = x => x + 1
const func2 = x => x + 2
const func3 = function(x) {return x + 3}

console.warn('             START Create objects')
let t0 = process.hrtime()

for (let i = 0; i < 1000; i++) {
  bigObject1[`index${i}`] = { index: i, value: `foo 1 bar ${i}`}
  bigObject2[`index${i}`] = { index: i, value: `foo 2 bar ${i}`}
  bigObject3[`index${i}`] = { index: i, value: `foo 3 bar ${i}`}
}

let t1 = process.hrtime(t0)
console.log(`${tm(t1)} END   Create objects`)

const times = []

for (const [label, [arg1, arg2, arg3]] of [
  ['scalar', [scalar1, scalar2, scalar3]],
  ['small-object', [smallObject1, smallObject2, smallObject3]],
  ['big-object', [bigObject1, bigObject2, bigObject3]],
]) {
  for (const [labelF, memoF] of [
    ['memoizeOld', memoizeOld],
    ['memoize', memoize],
  ]) {
    console.log(`START ${label}-args, method (${labelF})`)
    let t0 = process.hrtime()
    const f = memoF(testF)
    for (let i = 0; i < 1000; i++) {
      let r
      r = f(arg1, arg2, arg3)
    }
    let t1 = process.hrtime(t0)
    times.push([label, labelF, tm(t1)])
    f()
    console.log(`END   ${label}-args, method (${labelF})`)
  }
}
for (const [label, labelF, t] of times) {
  console.log(`${padStart(label, 20, ' ')} ${padStart(labelF, 20, ' ')} ${t}`)
}

const fApply = memoize(testFunc)
console.warn(fApply(func1, 0))
console.warn(fApply(func2, 0))
console.warn(fApply(func3, 0))
console.warn(fApply())
