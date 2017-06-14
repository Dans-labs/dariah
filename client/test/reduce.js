import assert from 'assert'
import padEnd from 'lodash/padend'
import padStart from 'lodash/padstart'
import tableReducer from '../src/js/app/dux/tables.js'

/* Tests for our reducers
 */

const runActionTest = ({ action, comment, reducer, state, data, props, predictedNewState, inspect }) => {
  describe(`${action} (${comment})`, () => {
    const newState = reducer(state, { type: action, data, ...props })
    it('new state has predicted value', () => {
      const value = JSON.stringify(newState)
      const predictedValue = JSON.stringify(predictedNewState)
      const valueEqual = value == predictedValue
      if (!valueEqual) {
        console.log('newState         ', JSON.stringify(newState, undefined, 2))
        console.log('predictedNewState', JSON.stringify(predictedNewState, undefined, 2))
      }
      assert.equal(valueEqual, true, 'by value')
    })
    for (const [label, selector, answer] of inspect) {
      const piece = selector(state)
      const newPiece = selector(newState)
      it(`${padStart(answer ? '===' : '!===', 4, ' ')} ${label}`, () => {
        assert.equal(piece === newPiece, answer, label)
      })
    }
  })
}

const testTables = () => {
  describe('Tables reducer', ()  => {
    runActionTest({

      // ACTION
      action: 'fetchItem',
      comment: 'with unmodified core data',

      // REDUCER
      reducer: tableReducer,

      // OLD STATE
      state: {
        core: {
          person: {
            fields: { name: true, surName: true, keywords: true },
            entities: {
              1: { values: { _id: 1, name: 'John', surName: 'White', keywords: ['a', 'b'] } },
              2: { values: { _id: 2, name: 'Mary', surName: 'Black', keywords: ['a', 'c'] } },
            },
          },
        },
        more: {
          person: {
            entities: {
              1: { values: { _id: 1, name: 'John', surName: 'White', keywords: ['a', 'b'], email: 'john@white.org', gender: 'm' } },
            },
          },
        },
      },

      // ACTION DATA and PROPS
      props: { table: 'person' },

      data: {
        values: { _id: 2, name: 'Mary', surName: 'Black', keywords: ['a', 'c'], email: 'mary@black.com', gender: 'b' },
      },

      // NEW STATE
      predictedNewState: {
        core: {
          person: {
            fields: { name: true, surName: true, keywords: true },
            entities: {
              1: { values: { _id: 1, name: 'John', surName: 'White', keywords: ['a', 'b'] } },
              2: { values: { _id: 2, name: 'Mary', surName: 'Black', keywords: ['a', 'c'] } },
            },
          },
        },
        more: {
          person: {
            entities: {
              1: { values: { _id: 1, name: 'John', surName: 'White', keywords: ['a', 'b'], email: 'john@white.org', gender: 'm' } },
              2: { values: { _id: 2, name: 'Mary', surName: 'Black', keywords: ['a', 'c'], email: 'mary@black.com', gender: 'b' } },
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
    })
    runActionTest({

      // ACTION
      action: 'fetchItem',
      comment: 'with modified core data',

      // REDUCER
      reducer: tableReducer,

      // OLD STATE
      state: {
        core: {
          person: {
            fields: { name: true, surName: true, keywords: true },
            entities: {
              1: { values: { _id: 1, name: 'John', surName: 'White', keywords: ['a', 'b'] } },
              2: { values: { _id: 2, name: 'Mary', surName: 'Black', keywords: ['a', 'c'] } },
            },
          },
        },
        more: {
          person: {
            entities: {
              1: { values: { _id: 1, name: 'John', surName: 'White', keywords: ['a', 'b'], email: 'john@white.org', gender: 'm' } },
            },
          },
        },
      },

      // ACTION DATA and PROPS
      props: { table: 'person' },

      data: {
        values: { _id: 2, name: 'Marie', surName: 'Blacque', keywords: ['a', 'd'], email: 'marie@black.com', gender: 'b' },
      },

      // NEW STATE
      predictedNewState: {
        core: {
          person: {
            fields: { name: true, surName: true, keywords: true },
            entities: {
              1: { values: { _id: 1, name: 'John', surName: 'White', keywords: ['a', 'b'] } },
              2: { values: { _id: 2, name: 'Marie', surName: 'Blacque', keywords: ['a', 'd'] } },
            },
          },
        },
        more: {
          person: {
            entities: {
              1: { values: { _id: 1, name: 'John', surName: 'White', keywords: ['a', 'b'], email: 'john@white.org', gender: 'm' } },
              2: { values: { _id: 2, name: 'Marie', surName: 'Blacque', keywords: ['a', 'd'], email: 'marie@black.com', gender: 'b' } },
            },
          },
        },
      },
      inspect: [
        ['top',                    x => x,                         false],
        ['top-core',               x => x.core,                    false],
        ['top-more',               x => x.more,                    false],
        ['core-person',            x => x.core.person,             false],
        ['more-person',            x => x.more.person,             false],
        ['core-entities',          x => x.core.person.entities,    false],
        ['more-entities',          x => x.more.person.entities,    false],
        ['core-affected-entity',   x => x.core.person.entities[2], false],
        ['more-affected-entity',   x => x.more.person.entities[2], false],
        ['core-unaffected-entity', x => x.core.person.entities[1], true ],
        ['more-unaffected-entity', x => x.more.person.entities[1], true ],
      ],
    })
    runActionTest({

      // ACTION
      action: 'fetchItem',
      comment: 'with absent core and more data',

      // REDUCER
      reducer: tableReducer,

      // OLD STATE
      state: {
        core: {
          person: {
            fields: { name: true, surName: true, keywords: true },
          },
        },
        more: {}
      },

      // ACTION DATA and PROPS
      props: { table: 'person' },

      data: {
        values: { _id: 2, name: 'Mary', surName: 'Black', keywords: ['a', 'c'], email: 'mary@black.com', gender: 'b' },
      },

      // NEW STATE
      predictedNewState: {
        core: {
          person: {
            fields: { name: true, surName: true, keywords: true },
            entities: {
              2: { values: { _id: 2, name: 'Mary', surName: 'Black', keywords: ['a', 'c'] } },
            },
          },
        },
        more: {
          person: {
            entities: {
              2: { values: { _id: 2, name: 'Mary', surName: 'Black', keywords: ['a', 'c'], email: 'mary@black.com', gender: 'b' } },
            },
          },
        },
      },
      inspect: [
        ['top',                    x => x,                         false],
        ['top-core',               x => x.core,                    false],
        ['top-more',               x => x.more,                    false],
        ['core-person',            x => x.core.person,             false],
        ['more-person',            x => x.more.person,             false],
      ],
    })
    runActionTest({

      // ACTION
      action: 'fetchTable',
      comment: 'with existing tables',

      // REDUCER
      reducer: tableReducer,

      // OLD STATE
      state: {
        core: {
          person: {
            fields: { name: true, surName: true, keywords: true },
            entities: {
              1: { values: { _id: 1, name: 'John', surName: 'White', keywords: ['a', 'b'] } },
              2: { values: { _id: 2, name: 'Mary', surName: 'Black', keywords: ['a', 'c'] } },
            },
          },
        },
        more: {
          person: {
            entities: {
              1: { values: { _id: 1, name: 'John', surName: 'White', keywords: ['a', 'b'], email: 'john@white.org', gender: 'm' } },
            },
          },
        },
      },

      // ACTION DATA and PROPS
      props: {},

      data: {
        core: {
          genders: {
            fields: { code: true },
            entities: {
              6: { values: { _id: 6, code: 'f' } },
              7: { values: { _id: 7, code: 'm' } },
            },
          },
        },
        more: {
          genders: {
            fields: { code: true, rep: true },
            entities: {
              6: { values: { _id: 6, code: 'f', rep: 'male' } },
              7: { values: { _id: 7, code: 'm', rep: 'female' } },
            },
          },
        },
      },

      // NEW STATE
      predictedNewState: {
        core: {
          person: {
            fields: { name: true, surName: true, keywords: true },
            entities: {
              1: { values: { _id: 1, name: 'John', surName: 'White', keywords: ['a', 'b'] } },
              2: { values: { _id: 2, name: 'Mary', surName: 'Black', keywords: ['a', 'c'] } },
            },
          },
          genders: {
            fields: { code: true },
            entities: {
              6: { values: { _id: 6, code: 'f' } },
              7: { values: { _id: 7, code: 'm' } },
            },
          },
        },
        more: {
          person: {
            entities: {
              1: { values: { _id: 1, name: 'John', surName: 'White', keywords: ['a', 'b'], email: 'john@white.org', gender: 'm' } },
            },
          },
          genders: {
            fields: { code: true, rep: true },
            entities: {
              6: { values: { _id: 6, code: 'f', rep: 'male' } },
              7: { values: { _id: 7, code: 'm', rep: 'female' } },
            },
          },
        },
      },
      inspect: [
        ['top',                    x => x,                         false ],
        ['top-core',               x => x.core,                    false ],
        ['top-more',               x => x.more,                    false ],
        ['core-unaffected-table',  x => x.core.person,             true  ],
        ['more-unaffected-table',  x => x.more.person,             true  ],
      ],
    })
    runActionTest({

      // ACTION
      action: 'fetchTable',
      comment: 'a table without more data',

      // REDUCER
      reducer: tableReducer,

      // OLD STATE
      state: {
        core: {
          person: {
            fields: { name: true, surName: true, keywords: true },
            entities: {
              1: { values: { _id: 1, name: 'John', surName: 'White', keywords: ['a', 'b'] } },
              2: { values: { _id: 2, name: 'Mary', surName: 'Black', keywords: ['a', 'c'] } },
            },
          },
        },
        more: {
          person: {
            entities: {
              1: { values: { _id: 1, name: 'John', surName: 'White', keywords: ['a', 'b'], email: 'john@white.org', gender: 'm' } },
            },
          },
        },
      },

      // ACTION DATA and PROPS
      props: {},

      data: {
        core: {
          genders: {
            fields: { code: true },
            entities: {
              6: { values: { _id: 6, code: 'f' } },
              7: { values: { _id: 7, code: 'm' } },
            },
          },
        },
      },

      // NEW STATE
      predictedNewState: {
        core: {
          person: {
            fields: { name: true, surName: true, keywords: true },
            entities: {
              1: { values: { _id: 1, name: 'John', surName: 'White', keywords: ['a', 'b'] } },
              2: { values: { _id: 2, name: 'Mary', surName: 'Black', keywords: ['a', 'c'] } },
            },
          },
          genders: {
            fields: { code: true },
            entities: {
              6: { values: { _id: 6, code: 'f' } },
              7: { values: { _id: 7, code: 'm' } },
            },
          },
        },
        more: {
          person: {
            entities: {
              1: { values: { _id: 1, name: 'John', surName: 'White', keywords: ['a', 'b'], email: 'john@white.org', gender: 'm' } },
            },
          },
        },
      },
      inspect: [
        ['top',                    x => x,                         false ],
        ['top-core',               x => x.core,                    false ],
        ['top-more',               x => x.more,                    true  ],
        ['core-unaffected-table',  x => x.core.person,             true  ],
        ['more-unaffected-table',  x => x.more.person,             true  ],
      ],
    })
  })
}

describe('Reducers', () => {
  testTables()
})

