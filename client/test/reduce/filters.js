import reducer from 'filters.js'

import { runActionTest } from './lib.js'

/* Tests for our reducers
 */

const actionTests = [
  /* borrowed from tables, need to be rewritten for the filter flows 
  {
    // ACTION
    action: 'fetchItem',
    comment: 'with unmodified core data and scalar fields only',

    // OLD STATE
    state: {
      core: {
        person: {
          fields: { name: true, surName: true, keyword: true },
          entities: {
            1: { values: { _id: 1, name: 'John', surName: 'White' } },
            2: { values: { _id: 2, name: 'Mary', surName: 'Black' } },
          },
        },
      },
      more: {
        person: {
          entities: {
            1: { values: { _id: 1, name: 'John', surName: 'White', email: 'john@white.org', gender: 'm' } },
          },
        },
      },
    },

    // ACTION DATA and PROPS
    props: { table: 'person' },

    data: {
      values: { _id: 2, name: 'Mary', surName: 'Black', email: 'mary@black.com', gender: 'b' },
    },

    // NEW STATE
    predictedState: {
      core: {
        person: {
          fields: { name: true, surName: true, keyword: true },
          entities: {
            1: { values: { _id: 1, name: 'John', surName: 'White' } },
            2: { values: { _id: 2, name: 'Mary', surName: 'Black' } },
          },
        },
      },
      more: {
        person: {
          entities: {
            1: { values: { _id: 1, name: 'John', surName: 'White', email: 'john@white.org', gender: 'm' } },
            2: { values: { _id: 2, name: 'Mary', surName: 'Black', email: 'mary@black.com', gender: 'b' } },
          },
        },
      },
    },
    inspect: [
      ['top',                    x => x,                         false],
      ['top-core',               x => x.core,                    true ],
      ['top-more',               x => x.more,                    false],
      ['core-person',            x => x.core.person,             true ],
      ['more-person',            x => x.more.person,             false],
      ['core-entities',          x => x.core.person.entities,    true ],
      ['more-entities',          x => x.more.person.entities,    false],
      ['core-affected-entity',   x => x.core.person.entities[2], true ],
      ['more-affected-entity',   x => x.more.person.entities[2], false],
      ['core-unaffected-entity', x => x.core.person.entities[1], true ],
      ['more-unaffected-entity', x => x.more.person.entities[1], true ],
    ],
  },
  */
]

describe('Filters reducer', ()  => {
  for (const actionTest of actionTests) {runActionTest(reducer, actionTest)}
})
