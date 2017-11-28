import assert from 'assert'
import padStart from 'lodash/padstart'
import { jString } from 'utils'

export const runActionTest = (reducer,
  { action, comment, state, data, props, predictedState, inspect },
) => {
  describe(`${action} (${comment})`, () => {
    const newState = reducer(state, { type: action, data, ...props })
    it('new state has predicted value', () => {
      const newStateValue = jString(newState, 2)
      const predictedStateValue = jString(predictedState, 2)
      assert.equal(newStateValue, predictedStateValue, 'by value')
    })
    for (const [label, selector, answer] of inspect) {
      if (selector != null) {
        const piece = selector(state)
        const newPiece = selector(newState)
        it(`${padStart(answer ? '===' : '!===', 4, ' ')} ${label}`, () => {
          assert.equal(piece === newPiece, answer, label)
        })
      }
    }
  })
}

