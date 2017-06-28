import assert from 'assert'
import padStart from 'lodash/padstart'
import padEnd from 'lodash/padend'
import merge from 'lodash/merge'
import update from 'immutability-helper'
import { jString, updateAuto } from 'utils'

/* Merging */

/* There are several approaches to merge new data into the state.
 * We want the method that does not replaced unchanged parts of the state by new objects.
 * The update method of Immutability Helper is the best, better even than lodash merge.
 */

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
          const data = methodLabel === 'update' ? dataSets[1] : dataSets[0]
          const newState = method(state, data)
          const vAnswer = answers[dataLabel][methodLabel].v
          const stateValue = jString(state, 2)
          const newStateValue = jString(newState, 2)
          it(`${methodLabel}: ${vAnswer ? 'equal' : 'UNequal'} by value`, () => {
            if (vAnswer) {
              assert.equal(newStateValue, stateValue, 'equal values')
            }
            else {
              assert.equal(newStateValue === stateValue, false, 'unequal values')
            }
          })
          inspect.forEach((f, level) => {
            const piece = f(state)
            const newPiece = f(newState)
            const answer = answers[dataLabel][methodLabel][level]
            it(`level ${level} = ${jString(piece)}: ${answer ? 'equal' : 'UNequal'}`, () => {
              assert.equal(piece === newPiece, answer, `level ${level}`)
            })
          })
        }
      })
    }
  })
}

/* updatAuto */

/* We adopt the update method.
 * A recurring task is to change deep bits of the state, withou being sure whether
 * it exists. In that case, we have to make it on the fly.
 * This is a bit painful to code, so we have written an autoVivification function.
 */

const testUpdateAuto = () => {
  describe('updatAuto', ()  => {
    const states = [
      ['empty',         {}],
      ['person',        { person: {} }],
      ['entities',      { person: { entities: {} } }],
      ['e-1',           { person: { entities: { 1: {} } } }],
      ['e-1-values',    { person: { entities: { 1: { values: {} } } } }],
      ['e-1-name',      { person: { entities: { 1: { values: { _id: 1, name: 'John' } } } } }],
      ['e-1+e-2',       { person: { entities: {
                                                1: { values: { _id: 1, name: 'John' } },
                                                2: { values: { _id: 2, name: 'Mary' } },
                         } } }],
      ['e-1-kw-xx',     { person: { entities: { 1: { values: { _id: 1, name: 'John', keyword: ['a', 'b'] } } } } }],
      ['e-1-kw-eq',     { person: { entities: { 1: { values: { _id: 1, name: 'John', keyword: ['c', 'd'] } } } } }],
    ]
    const tasks = [
      {
        args: [['person', 'entities', 1, 'values', 'keyword'], { $set: ['c', 'd'] }, true],
        predictedStates: [
          { person: { entities: { 1: { values: { keyword: ['c', 'd'] } } } } },
          { person: { entities: { 1: { values: { keyword: ['c', 'd'] } } } } },
          { person: { entities: { 1: { values: { keyword: ['c', 'd'] } } } } },
          { person: { entities: { 1: { values: { keyword: ['c', 'd'] } } } } },
          { person: { entities: { 1: { values: { keyword: ['c', 'd'] } } } } },
          { person: { entities: { 1: { values: { _id: 1, name: 'John', keyword: ['c', 'd'] } } } } },
          { person: { entities: {
            1: { values: { _id: 1, name: 'John', keyword: ['c', 'd'] } },
            2: { values: { _id: 2, name: 'Mary' } },
          } } },
          { person: { entities: { 1: { values: { _id: 1, name: 'John', keyword: ['c', 'd'] } } } } },
          { person: { entities: { 1: { values: { _id: 1, name: 'John', keyword: ['c', 'd'] } } } } },
        ],
        inspectors: [
          [],
          [],
          [],
          [],
          [],
          [],
          ['unaffected-entity', x => x.person.entities[2], true ],
          ['state',             x => x,                    false],
          ['state',             x => x,                    true ],
        ],
      },
      {
        args: [['person', 'entities', 1, 'values'], { $merge: { keyword: ['c', 'd'] } }, false],
        predictedStates: [
          { person: { entities: { 1: { values: { keyword: ['c', 'd'] } } } } },
          { person: { entities: { 1: { values: { keyword: ['c', 'd'] } } } } },
          { person: { entities: { 1: { values: { keyword: ['c', 'd'] } } } } },
          { person: { entities: { 1: { values: { keyword: ['c', 'd'] } } } } },
          { person: { entities: { 1: { values: { keyword: ['c', 'd'] } } } } },
          { person: { entities: { 1: { values: { _id: 1, name: 'John', keyword: ['c', 'd'] } } } } },
          { person: { entities: {
            1: { values: { _id: 1, name: 'John', keyword: ['c', 'd'] } },
            2: { values: { _id: 2, name: 'Mary' } },
          } } },
          { person: { entities: { 1: { values: { _id: 1, name: 'John', keyword: ['c', 'd'] } } } } },
          { person: { entities: { 1: { values: { _id: 1, name: 'John', keyword: ['c', 'd'] } } } } },
        ],
        inspectors: [
          [],
          [],
          [],
          [],
          [],
          [],
          ['unaffected-entity', x => x.person.entities[2], true ],
          ['state',             x => x,                    false],
          ['state',             x => x,                    true ],
        ],
      },
      {
        args: [['person', 'entities', 2, 'values'], { $set: { _id: 2 } }],
        predictedStates: [
          { person: { entities: { 2: { values: { _id: 2 } } } } },
          { person: { entities: { 2: { values: { _id: 2 } } } } },
          { person: { entities: { 2: { values: { _id: 2 } } } } },
          { person: { entities: { 1: {}, 2: { values: { _id: 2 } } } } },
          { person: { entities: { 1: { values: {} }, 2: { values: { _id: 2 } } } } },
          { person: { entities: { 1: { values: { _id: 1, name: 'John', } }, 2: { values: { _id: 2 } } } } },
          { person: { entities: {
            1: { values: { _id: 1, name: 'John' } },
            2: { values: { _id: 2 } },
          } } },
          { person: { entities: {
            1: { values: { _id: 1, name: 'John', keyword: ['a', 'b'] } },
            2: { values: { _id: 2 } },
          } } },
          { person: { entities: {
            1: { values: { _id: 1, name: 'John', keyword: ['c', 'd'] } },
            2: { values: { _id: 2 } },
          } } },
        ],
        inspectors: [
          [],
          [],
          [],
          ['unaffected-entity', x => x.person.entities[1], true],
          ['unaffected-entity', x => x.person.entities[1], true],
          ['unaffected-entity', x => x.person.entities[1], true],
          ['state',             x => x,                    false],
          ['unaffected-entity', x => x.person.entities[1], true],
          ['unaffected-entity', x => x.person.entities[1], true],
        ],
      },
      {
        args: [['person', 'entities', 2, 'values'], { $merge: { _id: 2 } }],
        predictedStates: [
          { person: { entities: { 2: { values: { _id: 2 } } } } },
          { person: { entities: { 2: { values: { _id: 2 } } } } },
          { person: { entities: { 2: { values: { _id: 2 } } } } },
          { person: { entities: { 1: {}, 2: { values: { _id: 2 } } } } },
          { person: { entities: { 1: { values: {} }, 2: { values: { _id: 2 } } } } },
          { person: { entities: { 1: { values: { _id: 1, name: 'John', } }, 2: { values: { _id: 2 } } } } },
          { person: { entities: {
            1: { values: { _id: 1, name: 'John' } },
            2: { values: { _id: 2, name: 'Mary' } },
          } } },
          { person: { entities: {
            1: { values: { _id: 1, name: 'John', keyword: ['a', 'b'] } },
            2: { values: { _id: 2 } },
          } } },
          { person: { entities: {
            1: { values: { _id: 1, name: 'John', keyword: ['c', 'd'] } },
            2: { values: { _id: 2 } },
          } } },
        ],
        inspectors: [
          [],
          [],
          [],
          ['unaffected-entity', x => x.person.entities[1], true ],
          ['unaffected-entity', x => x.person.entities[1], true ],
          ['unaffected-entity', x => x.person.entities[1], true ],
          ['state',             x => x,                    true],
          ['unaffected-entity', x => x.person.entities[1], true ],
          ['unaffected-entity', x => x.person.entities[1], true ],
        ],
      },
    ]
    tasks.forEach(({ args, predictedStates, inspectors }) => {
      describe(`updateAuto(${jString(args)})`, () => {
        states.forEach(([stateLabel, state], i) => {
          const predictedState = predictedStates[i]
          const newState = updateAuto(state, ...args)
          it(`${stateLabel}: new state has predicted value`, () => {
            const newStateValue = jString(newState, 2)
            const predictedStateValue = jString(predictedState, 2)
            assert.equal(newStateValue, predictedStateValue, stateLabel)
          })
          const [label, selector, answer] = inspectors[i]
          if (selector != null) {
            const piece = selector(state)
            const newPiece = selector(newState)
            it(`${padStart(answer ? '===' : '!===', 4, ' ')} ${label}`, () => {
              assert.equal(piece === newPiece, answer, label)
            })
          }
        })
      })
    })
  })
}

describe('Merge', () => {
  testMergeBasic()
  testUpdateAuto()
})

