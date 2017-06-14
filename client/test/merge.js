import assert from 'assert'
import padEnd from 'lodash/padend'
import mergeWith from 'lodash/mergewith'
import merge from 'lodash/merge'
import update from 'immutability-helper'

/* Merging
 */

const table = 'person'
const _id = 2

const state = {
  [table]: {
    fields: { name: true },
  },
}

const data = { values: 'Mary Black' }

let newState = update(state, {
  [table]: {
    $apply: t => update(t || {}, {
      entities: {
        $apply: e => update(e || {}, {
          [_id]: { $set: data },
        }),
      },
    }),
  },
})
console.log(JSON.stringify(newState, 2))

newState = update(state, { _id: { $set: 1 }, rep: { $set: 'one' } })
console.log(JSON.stringify(newState, 2))

/*
const testMergeBasic = () => {
  describe('Make sure that different ways of object merging leave unchanged paths intact', ()  => {
    const state = {
      person: {
        entities: {
          1: { name: 'John', gender: 'm' },
          2: { name: 'Mary', gender: 'f' },
        },
      },
    }
    const updates = [
      ['empty', [{}, {}]],
      ['deepNochange',
        [
          {
            person: {
              entities: {
                1: { name: 'John' },
              },
            },
          },
          {
            person: {
              entities: {
                1: { name: { $set: 'John' } },
              },
            },
          },
        ],
      ],
      ['deepChange',
        [
          {
            person: {
              entities: {
                1: { name: 'Jon' },
              },
            },
          },
          {
            person: {
              entities: {
                1: { name: { $set: 'Jon' } },
              },
            },
          },
        ],
      ],
    ]
    
    const methods = [
      ['assign', (state, data) => Object.assign({}, state, data)],
      ['spread', (state, data) => ({ ...state, ...data })],
      ['merge', (state, data) => merge({}, state, data)],
      ['update', (state, data) => update(state, data)],
    ]

    const inspect = [
      x => x,
      x => x.person,
      x => x.person.entities,
      x => x.person.entities[1],
      x => x.person.entities[1].name,
      x => x.person.entities[2],
    ]

    const answers = {
      empty: {
        assign: { v: true, 0: false, 1: true, 2: true, 3: true, 4: true, 5: true },
        spread: { v: true, 0: false, 1: true, 2: true, 3: true, 4: true, 5: true },
        merge:  { v: true, 0: false, 1: false, 2: false, 3: false, 4: true, 5: false },
        update:  { v: true, 0: true, 1: true, 2: true, 3: true, 4: true, 5: true },
      },
      deepNochange: {
        assign: { v: false, 0: false, 1: false, 2: false, 3: false, 4: true, 5: false },
        spread: { v: false, 0: false, 1: false, 2: false, 3: false, 4: true, 5: false },
        merge:  { v: true, 0: false, 1: false, 2: false, 3: false, 4: true, 5: false },
        update:  { v: true, 0: true, 1: true, 2: true, 3: true, 4: true, 5: true },
      },
      deepChange: {
        assign: { v: false, 0: false, 1: false, 2: false, 3: false, 4: false, 5: false },
        spread: { v: false, 0: false, 1: false, 2: false, 3: false, 4: false, 5: false },
        merge:  { v: false, 0: false, 1: false, 2: false, 3: false, 4: false, 5: false },
        update:  { v: false, 0: false, 1: false, 2: false, 3: false, 4: false, 5: true },
      },
    }

    for (const [dataLabel, dataSets] of updates) {
      describe(`Updating with ${dataLabel}`, () => {
        for (const [methodLabel, method] of methods) {
          const data = methodLabel == 'update' ? dataSets[1] : dataSets[0]
          const newState = method(state, data)
          const vAnswer = answers[dataLabel][methodLabel].v
          it(`${methodLabel}: ${vAnswer ? 'equal' : 'UNequal'} by value`, () => {
            assert.equal(JSON.stringify(state) == JSON.stringify(newState), vAnswer, 'by value')
          })
          inspect.forEach((f, level) => {
            const piece = f(state)
            const newPiece = f(newState)
            const answer = answers[dataLabel][methodLabel][level]
            it(`level ${level} = ${JSON.stringify(piece)}: ${answer ? 'equal' : 'UNequal'}`, () => {
              assert.equal(piece === newPiece, answer, `level ${level}`)
            })
          })
        }
      })
    }
  })
}

describe('Merge', () => {
  testMergeBasic()
})

*/
