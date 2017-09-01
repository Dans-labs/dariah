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
    comment: 'just one record, note lastInserted, allIds, myIds',

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

    data: [
      { 
        table: 'person',
        values: { _id: 2, name: 'no Name' },
        fields: { name: true, surName: true, keyword: true, email: true, gender: true },
      },
    ],

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
    // INSERTITEM

    // ACTION
    action: 'insertItem',
    comment: 'multiple records, note lastInserted, allIds, myIds',

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
      address: {
        allIds: [1, 2],
        fields: { street: true, number: true, city: true },
        entities: {
          1: { values: { _id: 1, street: 'School street', number: '41', city: 'Zutphen' } },
          2: { values: { _id: 1, street: 'Church street', number: '42', city: 'Deventer' } },
        },
      },
    },

    // ACTION DATA and PROPS
    props: { table: 'person', select: 'myIds' },

    data: [
      { 
        table: 'person',
        values: { _id: 2, name: 'no Name' },
        fields: { name: true, surName: true, keyword: true, email: true, gender: true },
      },
      { 
        table: 'address',
        values: { _id: 3, street: 'Main street', number: '43', city: 'Zwolle' },
        fields: { street: true, number: true, city: true },
      },
      { 
        table: 'address',
        values: { _id: 4, street: 'High street', number: '44', city: 'Kampen' },
        fields: { street: true, number: true, city: true },
      },
    ],

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
      address: {
        allIds: [4, 3, 1, 2],
        lastInserted: 4,
        fields: { street: true, number: true, city: true },
        entities: {
          1: { values: { _id: 1, street: 'School street', number: '41', city: 'Zutphen' } },
          2: { values: { _id: 1, street: 'Church street', number: '42', city: 'Deventer' } },
          3: {
            values: { _id: 3, street: 'Main street', number: '43', city: 'Zwolle' },
            fields: { street: true, number: true, city: true },
          },
          4: {
            values: { _id: 4, street: 'High street', number: '44', city: 'Kampen' },
            fields: { street: true, number: true, city: true },
          },
        },
      },
    },
    inspect: [
      ['top',                x => x,                     false],
      ['person',             x => x.person,              false],
      ['address',            x => x.address,             false],
      ['entities (person)',  x => x.person.entities,     false],
      ['entities (address)', x => x.address.entities,    false],
      ['unaffected-entity',  x => x.person.entities[1],  true ],
      ['unaffected-entity',  x => x.address.entities[1], true ],
      ['unaffected-entity',  x => x.address.entities[2], true ],
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
