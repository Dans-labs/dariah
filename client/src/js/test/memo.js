import assert from 'assert'
import padEnd from 'lodash/padend'

import { emptyA } from 'utils'

import { memoize, makeSet } from 'memo'

function memoizeOld(f) {
  const memCache = {}
  let retrieved = 0
  let computed = 0
  const memoF = (...fArgs) => {
    if (fArgs.length === 0) {
      return { cacheKeys: Object.keys(memCache), computed, retrieved }
    }
    const memoKey = JSON.stringify(fArgs)
    let { [memoKey]: result } = memCache
    if (result == null) {
      result = f.apply({}, fArgs)
      memCache[memoKey] = result
      computed += 1
    }
    else {retrieved += 1}
    return result
  }
  return memoF
}

/* Do different functions share the same cache?
 */

const testSeparation = () => {
  describe('Make sure that different memoized function do not share the same key space', function() {
    this.timeout(3000)
    const f1 = x => x + 1
    const f2 = x => x + 10
    const memF1 = memoize(f1, undefined, { clearCache: 1 })
    const memF2 = memoize(f2, undefined, { clearCache: 100 })
    it('Use memoized f1 on arg 5', () => {assert.equal(memF1(5), 6)})
    it('Use memoized f1 on arg 5', () => {assert.equal(memF1(5), 6)})
    it('Use memoized f2 on arg 5', () => {assert.equal(memF2(5), 15)})
    it('Use memoized f1 on arg 5', () => {assert.equal(memF1(5), 6)})
    it('Use memoized f2 on arg 5', () => {assert.equal(memF2(5), 15)})
    it('Use memoized f1 on arg 5', () => {assert.equal(memF1(5), 6)})
    it('Use memoized f1 on arg 6', () => {assert.equal(memF1(6), 7)})
    it('Use memoized f2 on arg 7', () => {assert.equal(memF2(7), 17)})
    it('Check cache keys f1', () => {assert.equal(memF1().cacheKeys[1], '["6"]')})
    it('Check cache keys f2', () => {assert.equal(memF2().cacheKeys[1], '["7"]')})
    it('Wait to clear cache memoF1', done => {setTimeout(done, 1300)})
    it('Cache of memF1', () => {
      assert.equal(memF1().cacheKeys.length, 0, 'cache of memF1')
      assert.equal(memF1().cleared, 2, 'cleared')
    })
    it('Cache of memF2', () => {
      assert.equal(memF2().cacheKeys.length, 2, 'cache of memF2')
      assert.equal(memF2().cleared, 0, 'cleared')
    })
  })
}

/* Performance tests
 */

const testPerformance = () => {
  describe('Performance comparison with plain stringified keys', function() {
    this.timeout(10000)
    const testF = (a1, a2, a3) => !!a1 && !!a2 && !!a3

    const scalar1 = 'foo'
    const scalar2 = 2
    const scalar3 = true

    const smallObject1 = { a1: 'foo', b1: 'bar' }
    const smallObject2 = { a2: 'foo', b2: 'bar' }
    const smallObject3 = { a3: 'foo', b3: 'bar' }

    const bigObject1 = {}
    const bigObject2 = {}
    const bigObject3 = {}
    it('Create objects', () => {
      for (let i = 0; i < 1000; i++) {
        bigObject1[`index${i}`] = { index: i, value: `foo 1 bar ${i}`}
        bigObject2[`index${i}`] = { index: i, value: `foo 2 bar ${i}`}
        bigObject3[`index${i}`] = { index: i, value: `foo 3 bar ${i}`}
      }
    })
  
    for (const [label, [arg1, arg2, arg3], answer] of [
      [
        'scalar',
        [scalar1, scalar2, scalar3],
        '[[false,"foo"],[false,2],[false,true]]',
      ],
      [
        'small-object',
        [smallObject1, smallObject2, smallObject3],
        '[[true,0],[true,1],[true,2]]',
      ],
      [
        'big-object',
        [bigObject1, bigObject2, bigObject3],
        '[[true,0],[true,1],[true,2]]',
      ],
    ]) {
      for (const [labelF, memoF, levels] of [
        ['memoizeOld', memoizeOld, null],
        ['memoize (object)', memoize, {}],
        ['memoize (stringify)', memoize, null],
      ]) {
        it(padEnd(`${label}-args, method (${labelF})`, 50, ' '), () => {
          const f = memoF(testF, levels)
          for (let i = 0; i < 1000; i++) {
            let r
            r = f(arg1, arg2, arg3)
          }
          const { cacheKeys, computed, retrieved, cleared } = f()
          assert.equal(cacheKeys.length, 1, 'number of cacheKeys')
          assert.equal(computed, 1, 'computed')
          if (labelF !== 'memoizeOld') {assert.equal(cleared, 0, 'cleared')}
          assert.equal(retrieved, 999)
          if (labelF === 'memoize' && levels != null) {
            assert.equal(answer, cacheKeys[0], 'value of cacheKey')
          }
        })
      }
    }
  })
}

/* Test function arguments: are different functions mapped to different keys?
 */

const testFunctionArgs = () => {
  describe('function arguments (if considering object identity)', () => {
    const testFunc = (f, x) => f(x)
    const fApply = memoize(testFunc, {})

    const func1 = x => x + 1
    const func2 = x => x + 2
    const func3 = function(x) {return x + 3}
    it('Apply with argument func1 and 0, should return 1', () => {assert.equal(fApply(func1, 0), 1)})
    it('Apply with argument func2 and 0, should return 2', () => {assert.equal(fApply(func2, 0), 2)})
    it('Apply with argument func3 and 0, should return 3', () => {assert.equal(fApply(func3, 0), 3)})
    it('Apply with argument func1 and 0, should return 1', () => {assert.equal(fApply(func1, 0), 1)})
    it('Apply with argument func2 and 0, should return 2', () => {assert.equal(fApply(func2, 0), 2)})
    it('Apply with argument func3 and 0, should return 3', () => {assert.equal(fApply(func3, 0), 3)})
    it('Cache inspection', () => {
      const { computed, retrieved, cacheKeys } = fApply()
      assert.equal(computed, 3, 'computed')
      assert.equal(retrieved, 3, 'retrieved')
    })
  })
  describe('function arguments (if considering object value)', () => {
    const testFunc = (f, x) => f(x)
    const fApply = memoize(testFunc)

    const func1 = x => x + 1
    const func2 = x => x + 2
    const func3 = function(x) {return x + 3}
    it('Apply with argument func1 and 0, should return 1', () => {assert.equal(fApply(func1, 0), 1)})
    it('Apply with argument func2 and 0, should return 2', () => {assert.equal(fApply(func2, 0), 2)})
    it('Apply with argument func3 and 0, should return 3', () => {assert.equal(fApply(func3, 0), 3)})
    it('Apply with argument func1 and 0, should return 1', () => {assert.equal(fApply(func1, 0), 1)})
    it('Apply with argument func2 and 0, should return 2', () => {assert.equal(fApply(func2, 0), 2)})
    it('Apply with argument func3 and 0, should return 3', () => {assert.equal(fApply(func3, 0), 3)})
    it('Cache inspection', () => {
      const { computed, retrieved, cacheKeys } = fApply()
      assert.equal(computed, 3, 'computed')
      assert.equal(retrieved, 3, 'retrieved')
    })
  })
}

const testCacheInvalidation = () => {

  describe('cache invalidation', function() {
    const f = x => x + 1
    const memF = memoize(f, undefined, { clearCache: 2 })
    this.timeout(4000)
    it('before call 1', () => {
      const { computed, retrieved, cleared, cacheKeys } = memF()
      assert.equal(computed, 0, 'computed')
      assert.equal(retrieved, 0, 'retrieved')
      assert.equal(cleared, 0, 'cleared')
      assert.equal(cacheKeys.length, 0, 'cacheKeys')
    })
    it('call 1', () => {
      memF(0)
      const { computed, retrieved, cleared, cacheKeys } = memF()
      assert.equal(computed, 1, 'computed')
      assert.equal(retrieved, 0, 'retrieved')
      assert.equal(cleared, 0, 'cleared')
      assert.equal(cacheKeys.length, 1, 'cacheKeys')
    })
    it('call 2', () => {
      memF(0)
      const { computed, retrieved, cleared, cacheKeys } = memF()
      assert.equal(computed, 1, 'computed')
      assert.equal(retrieved, 1, 'retrieved')
      assert.equal(cleared, 0, 'cleared')
      assert.equal(cacheKeys.length, 1, 'cacheKeys')
    })
    it('call 3', () => {
      memF(0)
      const { computed, retrieved, cleared, cacheKeys } = memF()
      assert.equal(computed, 1, 'computed')
      assert.equal(retrieved, 2, 'retrieved')
      assert.equal(cleared, 0, 'cleared')
      assert.equal(cacheKeys.length, 1, 'cacheKeys')
    })
    it('Wait to clear cache', done => {setTimeout(done, 2010)})
    it('Cache cleared', () => {
      const { computed, retrieved, cleared, cacheKeys } = memF()
      assert.equal(computed, 1, 'computed')
      assert.equal(retrieved, 2, 'retrieved')
      assert.equal(cleared, 1, 'cleared')
      assert.equal(cacheKeys.length, 0, 'cacheKeys')
    })
  })
}

const testLogic = () => {
  describe('Logic', () => {
    describe('null arguments', () => {
      const f = x => x == null ? -1 : x.count + 1
      const memF = memoize(f, {})
      it('pass ordinary argument to memF', () => {
        assert.equal(memF({count: 3}), 4, 'ordinary')
      })
      it('pass null argument to memF', () => {
        assert.equal(memF(null), -1, 'null')
      })
      it('call again with null argument to memF', () => {
        assert.equal(memF(null), -1, 'null again')
        const { computed, retrieved } = memF()
        assert.equal(computed, 2, 'computed check')
        assert.equal(retrieved, 1, 'retrieved check')
      })
    })
    const getItem = (tables, table, eid) => tables[table][eid]
    const f = memoize(getItem, {})
    const tables = {
      person: {
        1: 'John',
        2: 'Mary',
        3: 'Paul',
        4: 'Catherine',
      },
      job: {
        1: 'researcher',
        2: 'builder',
        3: 'teacher',
      },
    }
    const person1a = f(tables, 'person', 1)
    const person2a = f(tables, 'person', 2)
    const person3a = f(tables, 'person', 3)
    const person1b = f(tables, 'person', 1)
    const person2b = f(tables, 'person', 2)
    const person3b = f(tables, 'person', 3)
    describe('Correctness', () => {
      it('person 1', () => {assert.equal(person1a, 'John')})
      it('person 2', () => {assert.equal(person2a, 'Mary')})
      it('person 3', () => {assert.equal(person3a, 'Paul')})
    })
    describe('Consistency', () => {
      it('person 1', () => {assert.equal(person1b, person1a)})
      it('person 2', () => {assert.equal(person2b, person2a)})
      it('person 3', () => {assert.equal(person3b, person3a)})
    })

    describe('Level behaviour:', () => {
      const tablesShallowCopy = { ...tables }

      const f0 = memoize(getItem, {})
      const f1 = memoize(getItem, {0: 1})

      const person1c = f0(tables, 'person', 1)
      const person1cc = f0(tablesShallowCopy, 'person', 1)
      const { cacheKeys: cacheKeysC, retrieved: retrievedC, computed: computedC } = f0()

      const person1d = f1(tables, 'person', 1)
      const person1dc = f1(tablesShallowCopy, 'person', 1)
      const { cacheKeys: cacheKeysD, retrieved: retrievedD, computed: computedD } = f1()

      it('Level 0: cache miss for shallow copy', () => {assert.equal(retrievedC, 0)})
      it('Level 1: cache hit for shallow copy', () => {assert.equal(retrievedD, 1)})
    })

    describe('Nested example', () => {
      /*
       * thing0 is the original
       * thingi is a shallow copy of level i
       */
      const thing0 = {
        label: 'x',
        children: [
          {
            label: 'x-l',
            children: [
              { label: 'x-ll' },
              { label: 'x-lr' },
            ],
          },
          {
            label: 'x-r',
            children: [
              { label: 'x-rl' },
              { label: 'x-rr' },
            ],
          },
        ],
      }
      const thing1 = { ...thing0 }

      const thing2 = {
        ...thing0,
        children: [...thing0.children],
      }

      const thing3 = {
        ...thing0,
        children: [
          { ...thing0.children[0] },
          thing0.children[1],
        ],
      }

      const thing4 = {
        ...thing0,
        children: [
          {
            ...thing0.children[0],
            children: [...thing0.children[0].children],
          },
          thing0.children[1],
        ],
      }

      const getLabels = thing => {
        const result = [thing.label];
        (thing.children || emptyA).forEach(child => {
          result.push(...getLabels(child))
        })
        return result
      }
      const g = thing => getLabels(thing).join(', ')
    
      const fresult = 'x, x-l, x-ll, x-lr, x-r, x-rl, x-rr'

      it('Check getLabels', () => {assert.equal(g(thing1), fresult)})

      for (const level of [0, 1, 2, 3, 4]) {
        const memG = memoize(g, {0: level});
        [thing0, thing1, thing2, thing3, thing4].forEach((copy, i) => {
          it(`Check g${level} on copy${i}`, () => {assert.equal(memG(copy), fresult)})
        })
        it(`Check cache hits g${level} = ${level}`, () => {
          assert.equal(
            memG().retrieved,
            level,
            `\n${memG().cacheKeys.join('\n')}`,
          )
        })
      }
    })
  })
}

const testMakeSet = () => {
  describe('run makeSet twice and check object identity', () => {
    const data1 = { x: 1, y: 2, z: 3 }
    const data2 = { x: 1, y: 2, z: 3 }
    const keys1 = Object.keys(data1)
    const keys2 = Object.keys(data2)
    const keys3 = Object.keys(data2)
    const mkeys1 = makeSet(Object.keys(data1))
    const mkeys2 = makeSet(Object.keys(data2))
    const mkeys3 = makeSet(Object.keys(data2))
    describe('without makeSet, key sets have different identity', () => {
      it('keys of different objects', () => {
        assert.equal(keys1 === keys2, false, 'data1 and data2')
      })
      it('twice the keys of the same object', () => {
        assert.equal(keys2 === keys3, false, '2 x data2')
      })
    })
    describe('with makeSet, key sets have same identity', () => {
      it('keys of different objects', () => {
        assert.equal(mkeys1 === mkeys2, true, 'data1 and data2')
      })
      it('twice the keys of the same object', () => {
        assert.equal(mkeys2 === mkeys3, true, '2 x data2')
      })
    })
  })
}

describe('Memoize', () => {
  testSeparation()
  testPerformance()
  testFunctionArgs()
  testCacheInvalidation()
  testLogic()
  testMakeSet()
})

