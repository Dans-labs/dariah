import reducer from 'filters.js'

import { runActionTest } from 'genericReducer.js'

/* Tests for our reducers
 */

/* see test fiel tables.js for how to set this up */

const actionTests = [
]

describe('Filters reducer', ()  => {
  for (const actionTest of actionTests) {runActionTest(reducer, actionTest)}
})
