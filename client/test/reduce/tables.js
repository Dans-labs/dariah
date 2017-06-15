import reducer from 'tables.js'

import { runActionTest } from './lib.js'

/* Tests for our reducers
 */

const actionTests = [
  {
    /* FETCHITEM
    */

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
  {
    /* FETCHITEM
    */

    // ACTION
    action: 'fetchItem',
    comment: 'with unmodified core data and an array field',

    // OLD STATE
    state: {
      core: {
        person: {
          fields: { name: true, surName: true, keyword: true },
          entities: {
            1: { values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'] } },
            2: { values: { _id: 2, name: 'Mary', surName: 'Black', keyword: ['a', 'c'] } },
          },
        },
      },
      more: {
        person: {
          entities: {
            1: { values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'], email: 'john@white.org', gender: 'm' } },
          },
        },
      },
    },

    // ACTION DATA and PROPS
    props: { table: 'person' },

    data: {
      values: { _id: 2, name: 'Mary', surName: 'Black', keyword: ['a', 'c'], email: 'mary@black.com', gender: 'b' },
    },

    // NEW STATE
    predictedState: {
      core: {
        person: {
          fields: { name: true, surName: true, keyword: true },
          entities: {
            1: { values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'] } },
            2: { values: { _id: 2, name: 'Mary', surName: 'Black', keyword: ['a', 'c'] } },
          },
        },
      },
      more: {
        person: {
          entities: {
            1: { values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'], email: 'john@white.org', gender: 'm' } },
            2: { values: { _id: 2, name: 'Mary', surName: 'Black', keyword: ['a', 'c'], email: 'mary@black.com', gender: 'b' } },
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
  {
    /* FETCHITEM
    */

    // ACTION
    action: 'fetchItem',
    comment: 'with modified core data',

    // OLD STATE
    state: {
      core: {
        person: {
          fields: { name: true, surName: true, keyword: true },
          entities: {
            1: { values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'] } },
            2: { values: { _id: 2, name: 'Mary', surName: 'Black', keyword: ['a', 'c'] } },
          },
        },
      },
      more: {
        person: {
          entities: {
            1: { values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'], email: 'john@white.org', gender: 'm' } },
          },
        },
      },
    },

    // ACTION DATA and PROPS
    props: { table: 'person' },

    data: {
      values: { _id: 2, name: 'Marie', surName: 'Blacque', keyword: ['a', 'd'], email: 'marie@black.com', gender: 'b' },
    },

    // NEW STATE
    predictedState: {
      core: {
        person: {
          fields: { name: true, surName: true, keyword: true },
          entities: {
            1: { values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'] } },
            2: { values: { _id: 2, name: 'Marie', surName: 'Blacque', keyword: ['a', 'd'] } },
          },
        },
      },
      more: {
        person: {
          entities: {
            1: { values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'], email: 'john@white.org', gender: 'm' } },
            2: { values: { _id: 2, name: 'Marie', surName: 'Blacque', keyword: ['a', 'd'], email: 'marie@black.com', gender: 'b' } },
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
  },
  {
    /* FETCHITEM
    */

    // ACTION
    action: 'fetchItem',
    comment: 'with absent core and "more" data',

    // OLD STATE
    state: {
      core: {
        person: {
          fields: { name: true, surName: true, keyword: true },
        },
      },
      more: {}
    },

    // ACTION DATA and PROPS
    props: { table: 'person' },

    data: {
      values: { _id: 2, name: 'Mary', surName: 'Black', keyword: ['a', 'c'], email: 'mary@black.com', gender: 'b' },
    },

    // NEW STATE
    predictedState: {
      core: {
        person: {
          fields: { name: true, surName: true, keyword: true },
          entities: {
            2: { values: { _id: 2, name: 'Mary', surName: 'Black', keyword: ['a', 'c'] } },
          },
        },
      },
      more: {
        person: {
          entities: {
            2: { values: { _id: 2, name: 'Mary', surName: 'Black', keyword: ['a', 'c'], email: 'mary@black.com', gender: 'b' } },
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
  },
  {
    /* INSERTITEM
    */

    // ACTION
    action: 'insertItem',
    comment: 'note lastInserted, allIds, myIds',

    // OLD STATE
    state: {
      core: {
        person: {
          allIds: [1],
          fields: { name: true, surName: true, keyword: true },
          entities: {
            1: { values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'] } },
          },
        },
      },
      more: {
        person: {
          entities: {
            1: { values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'], email: 'john@white.org', gender: 'm' } },
          },
        },
      },
    },

    // ACTION DATA and PROPS
    props: { table: 'person', select: 'myIds' },

    data: { 
      values: { _id: 2, name: 'Mary', surName: 'Black', keyword: ['a', 'c'], email: 'mary@black.com', gender: 'b' },
    },

    // NEW STATE
    predictedState: {
      core: {
        person: {
          allIds: [2, 1],
          myIds: [2],
          lastInserted: 2,
          fields: { name: true, surName: true, keyword: true },
          entities: {
            1: { values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'] } },
            2: { values: { _id: 2, name: 'Mary', surName: 'Black', keyword: ['a', 'c'] } },
          },
        },
      },
      more: {
        person: {
          entities: {
            1: { values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'], email: 'john@white.org', gender: 'm' } },
            2: { values: { _id: 2, name: 'Mary', surName: 'Black', keyword: ['a', 'c'], email: 'mary@black.com', gender: 'b' } },
          },
        },
      },
    },
    inspect: [
      ['top',                    x => x,                         false],
      ['top-core',               x => x.core,                    false ],
      ['top-more',               x => x.more,                    false],
      ['core-person',            x => x.core.person,             false ],
      ['more-person',            x => x.more.person,             false],
      ['core-entities',          x => x.core.person.entities,    false ],
      ['more-entities',          x => x.more.person.entities,    false],
      ['core-unaffected-entity', x => x.core.person.entities[1], true ],
      ['more-unaffected-entity', x => x.more.person.entities[1], true ],
    ],
  },
  {
    /* MODITEM
    */

    // ACTION
    action: 'modItem',
    comment: 'without related data',

    // OLD STATE
    state: {
      core: {
        person: {
          fields: { name: true, surName: true, keyword: true },
          entities: {
            1: { values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'] } },
            2: { values: { _id: 2, name: 'Mary', surName: 'Black', keyword: ['a', 'c'] } },
          },
        },
      },
      more: {
        person: {
          entities: {
            1: { values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'], email: 'john@white.org', gender: 'm' } },
            2: { values: { _id: 2, name: 'Mary', surName: 'Black', keyword: ['a', 'c'], email: 'mary@black.com', gender: 'b' } },
          },
        },
      },
    },

    // ACTION DATA and PROPS
    props: { table: 'person' },

    data: {
      values: { _id: 2, name: 'Marie', surName: 'Blacque', keyword: ['a', 'd'], email: 'marie@blacque.com', gender: 'x' },
    },

    // NEW STATE
    predictedState: {
      core: {
        person: {
          fields: { name: true, surName: true, keyword: true },
          entities: {
            1: { values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'] } },
            2: { values: { _id: 2, name: 'Marie', surName: 'Blacque', keyword: ['a', 'd'] } },
          },
        },
      },
      more: {
        person: {
          entities: {
            1: { values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'], email: 'john@white.org', gender: 'm' } },
            2: { values: { _id: 2, name: 'Marie', surName: 'Blacque', keyword: ['a', 'd'], email: 'marie@blacque.com', gender: 'x' } },
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
  },
  {
    /* MODITEM
    */

    // ACTION
    action: 'modItem',
    comment: 'with related data',

    // OLD STATE
    state: {
      core: {
        person: {
          fields: { name: true, surName: true, keyword: true },
          entities: {
            1: { values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'] } },
            2: { values: { _id: 2, name: 'Mary', surName: 'Black', keyword: ['a', 'c'] } },
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
      more: {
        person: {
          entities: {
            1: { values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'], email: 'john@white.org', gender: 'm' } },
            2: { values: { _id: 2, name: 'Mary', surName: 'Black', keyword: ['a', 'c'], email: 'mary@black.com', gender: 'b' } },
          },
        },
        keyword: {
          entities: {
            a: { values: { _id: 'a', rep: 'kwa' } },
            b: { values: { _id: 'b', rep: 'kwb' } },
            c: { values: { _id: 'c', rep: 'kwc' } },
            d: { values: { _id: 'd', rep: 'kwd' } },
          },
        },
      },
    },

    // ACTION DATA and PROPS
    props: { table: 'person' },

    data: {
      values: { _id: 2, name: 'Marie', surName: 'Blacque', keyword: ['x', 'y'], email: 'marie@blacque.com', gender: 'x' },
      newValues: [
        { _id: 'x', rep: 'kwx', relTable: 'keyword', field: 'keyword' },
        { _id: 'y', rep: 'kwy', relTable: 'keyword', field: 'keyword' },
      ]
    },

    // NEW STATE
    predictedState: {
      core: {
        person: {
          fields: { name: true, surName: true, keyword: true },
          entities: {
            1: { values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'] } },
            2: { values: { _id: 2, name: 'Marie', surName: 'Blacque', keyword: ['x', 'y'] } },
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
      more: {
        person: {
          entities: {
            1: { values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'], email: 'john@white.org', gender: 'm' } },
            2: { values: { _id: 2, name: 'Marie', surName: 'Blacque', keyword: ['x', 'y'], email: 'marie@blacque.com', gender: 'x' } },
          },
        },
        keyword: {
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
  },
  {
    /* DELITEM
    */

    // ACTION
    action: 'delItem',
    comment: 'with more and core data present',

    // OLD STATE
    state: {
      core: {
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
      more: {
        person: {
          entities: {
            1: { values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'], email: 'john@white.org', gender: 'm' } },
            2: { values: { _id: 2, name: 'Mary', surName: 'Black', keyword: ['a', 'c'], email: 'mary@black.com', gender: 'b' } },
          },
        },
      },
    },

    // ACTION DATA and PROPS
    props: { table: 'person' },

    data: 2,

    // NEW STATE
    predictedState: {
      core: {
        person: {
          allIds: [1],
          myIds: [],
          fields: { name: true, surName: true, keyword: true },
          entities: {
            1: { values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'] } },
          },
        },
      },
      more: {
        person: {
          entities: {
            1: { values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'], email: 'john@white.org', gender: 'm' } },
          },
        },
      },
    },
    inspect: [
      ['top',                    x => x,                         false],
      ['top-core',               x => x.core,                    false ],
      ['top-more',               x => x.more,                    false],
      ['core-person',            x => x.core.person,             false ],
      ['more-person',            x => x.more.person,             false],
      ['core-entities',          x => x.core.person.entities,    false ],
      ['more-entities',          x => x.more.person.entities,    false],
      ['core-unaffected-entity', x => x.core.person.entities[1], true ],
      ['more-unaffected-entity', x => x.more.person.entities[1], true ],
    ],
  },
  {
    /* DELITEM
    */

    // ACTION
    action: 'delItem',
    comment: 'with more data absent',

    // OLD STATE
    state: {
      core: {
        person: {
          fields: { name: true, surName: true, keyword: true },
          entities: {
            1: { values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'] } },
            2: { values: { _id: 2, name: 'Mary', surName: 'Black', keyword: ['a', 'c'] } },
          },
        },
      },
      more: {
        person: {
          entities: {
            1: { values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'], email: 'john@white.org', gender: 'm' } },
          },
        },
      },
    },

    // ACTION DATA and PROPS
    props: { table: 'person' },

    data: 2,

    // NEW STATE
    predictedState: {
      core: {
        person: {
          fields: { name: true, surName: true, keyword: true },
          entities: {
            1: { values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'] } },
          },
        },
      },
      more: {
        person: {
          entities: {
            1: { values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'], email: 'john@white.org', gender: 'm' } },
          },
        },
      },
    },
    inspect: [
      ['top',                    x => x,                         false],
      ['top-core',               x => x.core,                    false],
      ['top-more',               x => x.more,                    true],
      ['core-person',            x => x.core.person,             false],
      ['more-person',            x => x.more.person,             true],
      ['core-entities',          x => x.core.person.entities,    false],
      ['more-entities',          x => x.more.person.entities,    true ],
      ['core-unaffected-entity', x => x.core.person.entities[1], true ],
      ['more-unaffected-entity', x => x.more.person.entities[1], true ],
    ],
  },
  {
    /* DELITEM
    */

    // ACTION
    action: 'delItem',
    comment: 'with core data absent',

    // OLD STATE
    state: {
      core: {
        person: {
          fields: { name: true, surName: true, keyword: true },
          entities: {
            1: { values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'] } },
          },
        },
      },
      more: {
        person: {
          entities: {
            1: { values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'], email: 'john@white.org', gender: 'm' } },
            2: { values: { _id: 2, name: 'Mary', surName: 'Black', keyword: ['a', 'c'], email: 'mary@black.com', gender: 'b' } },
          },
        },
      },
    },

    // ACTION DATA and PROPS
    props: { table: 'person' },

    data: 2,

    // NEW STATE
    predictedState: {
      core: {
        person: {
          fields: { name: true, surName: true, keyword: true },
          entities: {
            1: { values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'] } },
          },
        },
      },
      more: {
        person: {
          entities: {
            1: { values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'], email: 'john@white.org', gender: 'm' } },
          },
        },
      },
    },
    inspect: [
      ['top',                    x => x,                         false],
      ['top-core',               x => x.core,                    true],
      ['top-more',               x => x.more,                    false],
      ['core-person',            x => x.core.person,             true],
      ['more-person',            x => x.more.person,             false],
      ['core-entities',          x => x.core.person.entities,    true],
      ['more-entities',          x => x.more.person.entities,    false ],
      ['core-unaffected-entity', x => x.core.person.entities[1], true ],
      ['more-unaffected-entity', x => x.more.person.entities[1], true ],
    ],
  },
  {
    /* DELITEM
    */

    // ACTION
    action: 'delItem',
    comment: 'with more and core data absent',

    // OLD STATE
    state: {
      core: {
        person: {
          fields: { name: true, surName: true, keyword: true },
          entities: {
            1: { values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'] } },
          },
        },
      },
      more: {
        person: {
          entities: {
            1: { values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'], email: 'john@white.org', gender: 'm' } },
          },
        },
      },
    },

    // ACTION DATA and PROPS
    props: { table: 'person' },

    data: 2,

    // NEW STATE
    predictedState: {
      core: {
        person: {
          fields: { name: true, surName: true, keyword: true },
          entities: {
            1: { values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'] } },
          },
        },
      },
      more: {
        person: {
          entities: {
            1: { values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'], email: 'john@white.org', gender: 'm' } },
          },
        },
      },
    },
    inspect: [
      ['top',                    x => x,                         true],
      ['top-core',               x => x.core,                    true],
      ['top-more',               x => x.more,                    true],
      ['core-person',            x => x.core.person,             true],
      ['more-person',            x => x.more.person,             true],
      ['core-entities',          x => x.core.person.entities,    true],
      ['more-entities',          x => x.more.person.entities,    true ],
      ['core-unaffected-entity', x => x.core.person.entities[1], true ],
      ['more-unaffected-entity', x => x.more.person.entities[1], true ],
    ],
  },
  {
    /* FETCHTABLE
    */

    // ACTION
    action: 'fetchTable',
    comment: 'with existing tables',

    // OLD STATE
    state: {
      core: {
        person: {
          fields: { name: true, surName: true, keyword: true },
          entities: {
            1: { values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'] } },
            2: { values: { _id: 2, name: 'Mary', surName: 'Black', keyword: ['a', 'c'] } },
          },
        },
      },
      more: {
        person: {
          entities: {
            1: { values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'], email: 'john@white.org', gender: 'm' } },
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
    predictedState: {
      core: {
        person: {
          fields: { name: true, surName: true, keyword: true },
          entities: {
            1: { values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'] } },
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
      more: {
        person: {
          entities: {
            1: { values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'], email: 'john@white.org', gender: 'm' } },
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
  },
  {
    /* FETCHTABLE
    */

    // ACTION
    action: 'fetchTable',
    comment: 'a table without "more" data',

    // OLD STATE
    state: {
      core: {
        person: {
          fields: { name: true, surName: true, keyword: true },
          entities: {
            1: { values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'] } },
            2: { values: { _id: 2, name: 'Mary', surName: 'Black', keyword: ['a', 'c'] } },
          },
        },
      },
      more: {
        person: {
          entities: {
            1: { values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'], email: 'john@white.org', gender: 'm' } },
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
    predictedState: {
      core: {
        person: {
          fields: { name: true, surName: true, keyword: true },
          entities: {
            1: { values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'] } },
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
      more: {
        person: {
          entities: {
            1: { values: { _id: 1, name: 'John', surName: 'White', keyword: ['a', 'b'], email: 'john@white.org', gender: 'm' } },
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
  },
]

describe('Tables reducer', ()  => {
  for (const actionTest of actionTests) {runActionTest(reducer, actionTest)}
})
