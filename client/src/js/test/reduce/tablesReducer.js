import reducer from 'tables.js'

import { runActionTest } from 'genericReducer.js'

/* Tests for our reducers
 */

const actionTests = [
  {
    // FETCHITEM

    // ACTION
    action: 'fetchItem',
    comment: 'with scalar fields only',

    // OLD STATE
    state: {
      person: {
        fields: { name: true, surName: true },
        entities: {
          1: {
            values: { _id: 1, name: 'John', surName: 'White', email: 'john@white.org', gender: 'm' },
            fields: { name: true, surName: true, email: true, gender: true },
          },
          2: { values: { _id: 2, name: 'Mary', surName: 'Black' } },
        },
      },
    },

    // ACTION DATA and PROPS
    props: { table: 'person' },

    data: {
      values: { _id: 2, name: 'Mary', surName: 'Black', email: 'mary@black.com', gender: 'b' },
      fields: { name: true, surName: true, email: true, gender: true },
    },

    // NEW STATE
    predictedState: {
      person: {
        fields: { name: true, surName: true },
        entities: {
          1: {
            values: { _id: 1, name: 'John', surName: 'White', email: 'john@white.org', gender: 'm' },
            fields: { name: true, surName: true, email: true, gender: true },
          },
          2: {
            values: { _id: 2, name: 'Mary', surName: 'Black', email: 'mary@black.com', gender: 'b' },
            fields: { name: true, surName: true, email: true, gender: true },
          },
        },
      },
    },
    inspect: [
      ['top',               x => x,                    false],
      ['person',            x => x.person,             false],
      ['affected-entity',   x => x.person.entities[2], false],
      ['unaffected-entity', x => x.person.entities[1], true ],
    ],
  },
  {
    // FETCHITEM

    // ACTION
    action: 'fetchItem',
    comment: 'with an array field',

    // OLD STATE
    state: {
      person: {
        fields: { name: true, surName: true, keyword: true },
        entities: {
          1: {
            values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'], email: 'john@white.org', gender: 'm' },
            fields: { name: true, surName: true, keyword: true, email: true, gender: true },
          },
          2: { values: { _id: 2, name: 'Mary', surName: 'Black', keyword: ['a', 'c'] } },
        },
      },
    },

    // ACTION DATA and PROPS
    props: { table: 'person' },

    data: {
      values: { _id: 2, name: 'Mary', surName: 'Black', keyword: ['a', 'c'], email: 'mary@black.com', gender: 'b' },
      fields: { name: true, surName: true, keyword: true, email: true, gender: true },
    },

    // NEW STATE
    predictedState: {
      person: {
        fields: { name: true, surName: true, keyword: true },
        entities: {
          1: {
            values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'], email: 'john@white.org', gender: 'm' },
            fields: { name: true, surName: true, keyword: true, email: true, gender: true },
          },
          2: {
            values: { _id: 2, name: 'Mary', surName: 'Black', keyword: ['a', 'c'], email: 'mary@black.com', gender: 'b' },
            fields: { name: true, surName: true, keyword: true, email: true, gender: true },
          },
        },
      },
    },
    inspect: [
      ['top',               x => x,                    false],
      ['person',            x => x.person,             false],
      ['entities',          x => x.person.entities,    false],
      ['affected-entity',   x => x.person.entities[2], false],
      ['unaffected-entity', x => x.person.entities[1], true ],
    ],
  },
  {
    // FETCHITEM

    // ACTION
    action: 'fetchItem',
    comment: 'with absent data',

    // OLD STATE
    state: {
      person: {
        fields: { name: true, surName: true, keyword: true },
      },
    },

    // ACTION DATA and PROPS
    props: { table: 'person' },

    data: {
      values: { _id: 2, name: 'Mary', surName: 'Black', keyword: ['a', 'c'], email: 'mary@black.com', gender: 'b' },
      fields: { name: true, surName: true, keyword: true, email: true, gender: true },
    },

    // NEW STATE
    predictedState: {
      person: {
        fields: { name: true, surName: true, keyword: true },
        entities: {
          2: {
            values: { _id: 2, name: 'Mary', surName: 'Black', keyword: ['a', 'c'], email: 'mary@black.com', gender: 'b' },
            fields: { name: true, surName: true, keyword: true, email: true, gender: true },
          },
        },
      },
    },
    inspect: [
      ['top',               x => x,                    false],
      ['person',            x => x.person,             false],
    ],
  },
  {
    // INSERTITEM

    // ACTION
    action: 'insertItem',
    comment: 'note lastInserted, allIds, myIds',

    // OLD STATE
    state: {
      person: {
        allIds: [1],
        fields: { name: true, surName: true, keyword: true },
        entities: {
          1: {
            values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'] },
          },
        },
      },
    },

    // ACTION DATA and PROPS
    props: { table: 'person', select: 'myIds' },

    data: { 
      values: { _id: 2, name: 'no Name' },
      fields: { name: true, surName: true, keyword: true, email: true, gender: true },
    },

    // NEW STATE
    predictedState: {
      person: {
        allIds: [2, 1],
        myIds: [2],
        lastInserted: 2,
        fields: { name: true, surName: true, keyword: true },
        entities: {
          1: {
            values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'] },
          },
          2: {
            values: { _id: 2, name: 'no Name' },
            fields: { name: true, surName: true, keyword: true, email: true, gender: true },
          },
        },
      },
    },
    inspect: [
      ['top',               x => x,                    false],
      ['person',            x => x.person,             false],
      ['entities',          x => x.person.entities,    false],
      ['unaffected-entity', x => x.person.entities[1], true ],
    ],
  },
  {
    // MODITEM

    // ACTION
    action: 'modItem',
    comment: 'without related data',

    // OLD STATE
    state: {
      person: {
        fields: { name: true, surName: true, keyword: true },
        entities: {
          1: { values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'] } },
          2: {
            values: { _id: 2, name: 'Mary', surName: 'Black', keyword: ['a', 'c'], email: 'mary@black.com', gender: 'b' },
            fields: { name: true, surName: true, keyword: true, email: true, gender: true },
          },
        },
      },
    },

    // ACTION DATA and PROPS
    props: { table: 'person' },

    data: {
      values: { _id: 2, name: 'Marie', surName: 'Blacque', keyword: ['a', 'd'], email: 'marie@blacque.com', gender: 'x' },
      fields: { name: true, surName: true, keyword: true, email: true, gender: true },
    },

    // NEW STATE
    predictedState: {
      person: {
        fields: { name: true, surName: true, keyword: true },
        entities: {
          1: { values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'] } },
          2: {
            values: { _id: 2, name: 'Marie', surName: 'Blacque', keyword: ['a', 'd'], email: 'marie@blacque.com', gender: 'x' },
            fields: { name: true, surName: true, keyword: true, email: true, gender: true },
          },
        },
      },
    },
    inspect: [
      ['top',               x => x,                    false],
      ['person',            x => x.person,             false],
      ['entities',          x => x.person.entities,    false],
      ['affected-entity',   x => x.person.entities[2], false],
      ['unaffected-entity', x => x.person.entities[1], true ],
    ],
  },
  {
    // MODITEM

    // ACTION
    action: 'modItem',
    comment: 'without related data and selective field updates',

    // OLD STATE
    state: {
      person: {
        fields: { name: true, surName: true, keyword: true },
        entities: {
          1: { values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'] } },
          2: {
            values: { _id: 2, name: 'Mary', surName: 'Black', keyword: ['a', 'c'], email: 'mary@black.com', gender: 'b' },
            fields: { name: true, surName: true, keyword: true, email: true, gender: true },
          },
        },
      },
    },

    // ACTION DATA and PROPS
    props: { table: 'person' },

    data: {
      values: { _id: 2, surName: 'Blacque', email: 'marie@blacque.com' },
    },

    // NEW STATE
    predictedState: {
      person: {
        fields: { name: true, surName: true, keyword: true },
        entities: {
          1: { values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'] } },
          2: {
            values: { _id: 2, name: 'Mary', surName: 'Blacque', keyword: ['a', 'c'], email: 'marie@blacque.com', gender: 'b' },
            fields: { name: true, surName: true, keyword: true, email: true, gender: true },
          },
        },
      },
    },
    inspect: [
      ['top',               x => x,                    false],
      ['person',            x => x.person,             false],
      ['entities',          x => x.person.entities,    false],
      ['affected-entity',   x => x.person.entities[2], false],
      ['unaffected-entity', x => x.person.entities[1], true ],
    ],
  },
  {
    // MODITEM

    // ACTION
    action: 'modItem',
    comment: 'with related data',

    // OLD STATE
    state: {
      person: {
        fields: { name: true, surName: true, keyword: true },
        entities: {
          1: { values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'] } },
          2: {
            values: { _id: 2, name: 'Mary', surName: 'Black', keyword: ['a', 'c'], email: 'mary@black.com', gender: 'b' },
            fields: { name: true, surName: true, keyword: true, email: true, gender: true },
          },
        },
        valueLists: {
          keyword: ['a', 'b', 'c', 'd'],
        },
      },
      keyword: {
        fields: { _id: true, rep: true },
        entities: {
          a: { values: { _id: 'a', rep: 'kwa' } },
          b: { values: { _id: 'b', rep: 'kwb' } },
          c: { values: { _id: 'c', rep: 'kwc' } },
          d: { values: { _id: 'd', rep: 'kwd' } },
        },
      },
    },

    // ACTION DATA and PROPS
    props: { table: 'person' },

    data: {
      values: { _id: 2, name: 'Marie', surName: 'Blacque', keyword: ['x', 'y'], email: 'marie@blacque.com', gender: 'x' },
      fields: { name: true, surName: true, keyword: true, email: true, gender: true },
      newValues: [
        { _id: 'x', rep: 'kwx', relTable: 'keyword', field: 'keyword' },
        { _id: 'y', rep: 'kwy', relTable: 'keyword', field: 'keyword' },
      ]
    },

    // NEW STATE
    predictedState: {
      person: {
        fields: { name: true, surName: true, keyword: true },
        entities: {
          1: { values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'] } },
          2: {
            values: { _id: 2, name: 'Marie', surName: 'Blacque', keyword: ['x', 'y'], email: 'marie@blacque.com', gender: 'x' },
            fields: { name: true, surName: true, keyword: true, email: true, gender: true },
          },
        },
        valueLists: {
          keyword: ['y', 'x', 'a', 'b', 'c', 'd'],
        },
      },
      keyword: {
        fields: { _id: true, rep: true },
        entities: {
          a: { values: { _id: 'a', rep: 'kwa' } },
          b: { values: { _id: 'b', rep: 'kwb' } },
          c: { values: { _id: 'c', rep: 'kwc' } },
          d: { values: { _id: 'd', rep: 'kwd' } },
          x: { values: { _id: 'x', rep: 'kwx' } },
          y: { values: { _id: 'y', rep: 'kwy' } },
        },
      },
    },
    inspect: [
      ['top',               x => x,                    false],
      ['person',            x => x.person,             false],
      ['entities',          x => x.person.entities,    false],
      ['affected-entity',   x => x.person.entities[2], false],
      ['unaffected-entity', x => x.person.entities[1], true ],
    ],
  },
  {
    // DELITEM

    // ACTION
    action: 'delItem',
    comment: 'with data present',

    // OLD STATE
    state: {
      person: {
        allIds: [1, 2],
        myIds: [2],
        fields: { name: true, surName: true, keyword: true },
        entities: {
          1: { values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'] } },
          2: { values: { _id: 2, name: 'Mary', surName: 'Black', keyword: ['a', 'c'] } },
        },
      },
    },

    // ACTION DATA and PROPS
    props: { table: 'person' },

    data: 2,

    // NEW STATE
    predictedState: {
      person: {
        allIds: [1],
        myIds: [],
        fields: { name: true, surName: true, keyword: true },
        entities: {
          1: { values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'] } },
        },
      },
    },
    inspect: [
      ['top',               x => x,                    false],
      ['person',            x => x.person,             false],
      ['entities',          x => x.person.entities,    false],
      ['unaffected-entity', x => x.person.entities[1], true ],
    ],
  },
  {
    // DELITEM

    // ACTION
    action: 'delItem',
    comment: 'with data absent',

    // OLD STATE
    state: {
      person: {
        fields: { name: true, surName: true, keyword: true },
        entities: {
          1: { values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'] } },
        },
      },
    },

    // ACTION DATA and PROPS
    props: { table: 'person' },

    data: 2,

    // NEW STATE
    predictedState: {
      person: {
        fields: { name: true, surName: true, keyword: true },
        entities: {
          1: { values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'] } },
        },
      },
    },
    inspect: [
      ['top',               x => x,                    true],
      ['person',            x => x.person,             true],
      ['entities',          x => x.person.entities,    true],
      ['unaffected-entity', x => x.person.entities[1], true],
    ],
  },
  {
    // FETCHTABLE

    // ACTION
    action: 'fetchTable',
    comment: 'with existing tables',

    // OLD STATE
    state: {
      person: {
        fields: { name: true, surName: true, keyword: true },
        entities: {
          1: {
            values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'], email: 'john@white.org', gender: 'm' },
            fields: { name: true, surName: true, keyword: true, email: true, gender: true },
          },
          2: { values: { _id: 2, name: 'Mary', surName: 'Black', keyword: ['a', 'c'] } },
        },
      },
    },

    // ACTION DATA and PROPS
    props: {},

    data: {
      genders: {
        fields: { code: true },
        entities: {
          6: { values: { _id: 6, code: 'f' } },
          7: { values: { _id: 7, code: 'm' } },
        },
      },
    },

    // NEW STATE
    predictedState: {
      person: {
        fields: { name: true, surName: true, keyword: true },
        entities: {
          1: {
            values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'], email: 'john@white.org', gender: 'm' },
            fields: { name: true, surName: true, keyword: true, email: true, gender: true },
          },
          2: { values: { _id: 2, name: 'Mary', surName: 'Black', keyword: ['a', 'c'] } },
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
    inspect: [
      ['top',               x => x,                    false],
      ['unaffected-table',  x => x.person,             true ],
    ],
  },
]

describe('Tables reducer', ()  => {
  for (const actionTest of actionTests) {runActionTest(reducer, actionTest)}
})
