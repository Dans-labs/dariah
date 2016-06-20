/* TOP LEVEL: PAGE
 * This is the page function. 
 * It creates a ViewState function, which contains the current state.
 * The state is created on the basis of request variables, and from then it
 * reflects the user actions.
 * The page specifies all components and initializes them.
 * A component is specfied by the following fields
 * - destination: left => left sidebar; right => right sidebar; middle => middle column
 * - name: a string that can be used to refer to the component later on, via method getComponent
 * - subcomponents: a list of names for which a subcomponent will be made. The html will be generated per subcomponent.
 * - fetch: boolean which says whether this component needs data from the server
 * - work first: boolean which says that child components can only be wired after work of the parent component.
 * - specific: an object that holds the specific functionality of this component.
 * The control component has work first = true, because only after choosing a list, the list control can fetch the specific list and wire itself.
 * All other components have work first = false, because it is desirable that child components start wiring as soon as possible.
 * For example: the facet component is parent of the individual facets.
 * When facet starts working, the individual controls should already be wired.
 * Because work first = false, wiring of the individual facets will be triggered after wiring of the generic facet component.
 * N.B. Individual facets can only be wired after the list component (their grandfather) has been wired.
 * This will go OK, because after wiring the list, the facet will be wired and then the individual facets.
 * The _routing dictionary specifies when the work methods of components should be triggered.
 * Its keys are the labels of components, and for every component a list of other component keys is given.
 * These are the components that will be applied (in that order) after the key component. 
 * 
 *  work from page: if true, this component's work method will be called directly by the page's work method;
 *   if false, the page will skip this component when working. It is assumed that this component will be applied by another component.
 *   This practice must be followed, if the application of state to a component should come after a fetch of another component.
 *   If the page would work the viewstate directly to this component, it would happen before the other's components data had been loaded.
 *   Example: a filter component F, that filters a big list fetched by another component L. L's work should call F's work.
 * After every user action, the state is changed, and a call to the Page's work() method is issued.
 * The page will issue the work call forth to all components.
 */

const g = require('./generic.js');
const ViewState = require('./viewstate.js');
const Share = require('./share.js');
const CType = require('./ctype.js');
const TadirahO = require('./tadiraho.js');
const TadirahA = require('./tadiraha.js');
const TadirahT = require('./tadiraht.js');
const EUmap = require('./eumap.js');
const Filter = require('./filter.js');
const Facet = require('./facet.js');
const List = require('./list.js');
const Item = require('./item.js');
const Control = require('./control.js');
const Component = require('./components.js');

function Page() { // the one and only page object
    this.name = 'page';
    this.state = new ViewState(this);
    const main_lists = this.state.getValues('list');
    const contrib_list = new Set(['contrib']);
    const empty_list = new Set(['']);
    this._component_specs = new Map([
        ['share',    {dest: 'body',    variants: empty_list,   fetch_url: null,       specific: Share}], 
        ['control',  {dest: 'left',    variants: main_lists,   fetch_url: null,       specific: Control}],
        ['list',     {dest: 'middle' , variants: main_lists,   fetch_url: 'list',     specific: List}],
        ['item',     {dest: 'list',    variants: main_lists,   fetch_url: 'item',     specific: Item}],
        ['facet',    {dest: 'control', variants: main_lists,   fetch_url: null,       specific: Facet}],
        ['filter',   {dest: 'facet',   variants: main_lists,   fetch_url: null,       specific: Filter}],
        ['eumap',    {dest: 'facet',   variants: contrib_list, fetch_url: 'country',  specific: EUmap}],
        ['ctype',    {dest: 'facet',   variants: contrib_list, fetch_url: 'type',     specific: CType}],
        ['tadiraha', {dest: 'facet',   variants: contrib_list, fetch_url: 'tadiraha', specific: TadirahA}],
        ['tadiraho', {dest: 'facet',   variants: contrib_list, fetch_url: 'tadiraho', specific: TadirahO}],
        ['tadiraht', {dest: 'facet',   variants: contrib_list, fetch_url: 'tadiraht', specific: TadirahT}],
    ]),
    /* some components are being dealt with on the basis of additional identifiers, such as item
     * Those components are specified below, and the specs of all components will get an extra attribute
     * by_id, which is true if the component needs an id.
     * The actual ids come from a request variable name_xxx, where name is the name of the component and xxx is the name of a list.
     */
    this._by_id = new Set([
        'item',
    ]),
    this.stages = new Map([
        ['weld', true],
        ['wire', true],
        ['work', false],
    ]); // true means: once only, false means: my be repeated
    this.stages_prev = new Map([
        ['wire', 'weld'],
        ['work', 'wire'],
    ]);
    this._before = new Map([
        ['weld', new Map([
            ['item',     new Set(['list'])],
            ['facet',    new Set(['control', 'list'])],
            ['filter',   new Set(['facet'])],
            ['eumap',    new Set(['facet', 'filter'])],
            ['ctype',    new Set(['facet', 'eumap'])],
            ['tadiraha', new Set(['facet', 'ctype'])],
            ['tadiraho', new Set(['facet', 'tadiraha'])],
            ['tadiraht', new Set(['facet', 'tadiraho'])],
            ['share',    new Set(['facet', 'list'])],
        ])],
        ['wire', new Map([
            ['item',     new Set(['list'])],
            ['facet',    new Set(['filter', 'eumap', 'ctype', 'tadiraha', 'tadiraho', 'tadiraht'])],
            ['filter',   new Set(['list'])],
            ['eumap',    new Set(['list'])],
            ['ctype',    new Set(['list'])],
            ['tadiraha', new Set(['list'])],
            ['tadiraho', new Set(['list'])],
            ['tadiraht', new Set(['list'])],
        ])],
        ['work', new Map([
            ['facet',    new Set(['filter', 'eumap', 'ctype', 'tadiraha', 'tadiraho', 'tadiraht'])],
        ])],
    ]);
    this._ignore = new Set([
        //'ctype',
        //'tadiraha',
        //'tadiraht',
        //'tadiraho',
        //'eumap',
        //'filter',
    ]),
    this.components = new Map();
    for (const [name, spec] of this._component_specs) {
        if (this._ignore.has(name)) {continue}
        spec.by_id = this._by_id.has(name);
        const component = new Component(name, spec, this);
        component.children = new Map();
        this.components.set(name, component);
    }
    for (const [name, child_component] of this.components) {
        const dest_name = this._component_specs.get(name).dest;
        if (this.components.has(dest_name)) {
            const parent_component = this.components.get(dest_name);
            parent_component.children.set(name, child_component);
        }
    }
    this._resolveTiming();
    this._setHeight(80);
    History.Adapter.bind(window, 'statechange', this.state.work());
};

Page.prototype = {
    _setHeight(subtract) { // the heights of the sidebars are set, depending on the height of the window
        const wh = `${window.innerHeight - subtract}px`;
        for (const w of new Set(['middle', 'left', 'right'])) {
            $(`#${w}`).css('height', wh);
        }
    },
    _resolveTiming() {
        /* the time constraints must form a directed acyclic graph.
         * If that is the case, we need a linear order in which we can make the promises
         * This function will calculate that order (of course, several orders are possible)
         * Algorithm:
         *
         * A: make a graph of all tasks, a task is the combination of a component with a stage.
         *
         * B: compute sets of nodes that have a longest predecessor path of fixed length n
         *
         * 1. determine all tasks without predecessors, this is S0                                                (max length of predecessor chain = 0)
         * 2. determine all tasks with all predecessors in S0, this is S1                                             (max length of predecessor chain = 1)
         * 3. determine all tasks with: all predecessors in S0 or S1, at least one predecessor in S1, this is S2  (max length of predecessor chain = 2)
         * ...
         * n+1. determine all tasks with: all predecessors in S0, S1, ..., Sn, at least ione predecessor in Sn
         *
         * C: 
         * Prove theorem 1: Sn = {all nodes with longest chain of predecessors has length n}.
         * Prove theorem 2: all nodes outside union of all Sn: they are part of a cycle.
         *
         * D: 
         * The required order is: first the nodes of S0 (in any order), then those of S1, then those of S2, and so on.
         */
        const timing_nodes = [];
        const timing_edges = new Map();   // keys are nodes that must come before other nodes
        const timing_edges_inv = new Map; // keys are nodes that must come after other nodes
        // A: collect the nodes: pairs of component name and stage
        for (const name of this.components.keys()) {
            for (const stage of this.stages.keys()) {
                timing_nodes.push(`${name}-${stage}`);
            }
        }
        // collect the edges (we need to store every edge both ways)
        function addEdge(prev_node, next_node) {
            if (!timing_edges.has(prev_node)) {
                timing_edges.set(prev_node, new Set());
            }
            if (!timing_edges_inv.has(next_node)) {
                timing_edges_inv.set(next_node, new Set());
            }
            timing_edges.get(prev_node).add(next_node);
            timing_edges_inv.get(next_node).add(prev_node);
        }
        // 1. per component, the stages are ordered
        for (const [next_stage, prev_stage] of this.stages_prev) {
            for (const name of this.components.keys()) {
                addEdge(`${name}-${prev_stage}`, `${name}-${next_stage}`);
            }
        }
        // 2. add the specific time constraints
        for (const [stage, nexts] of this._before) {
            for (const [next_name, prevs] of nexts) {
                if (this._ignore.has(next_name)) {continue}
                for (const prev_name of prevs.keys()) {
                    if (this._ignore.has(prev_name)) {continue}
                    addEdge(`${prev_name}-${stage}`, `${next_name}-${stage}`);
                }
            }
        }
        // B: compute the Sn (in subset)
        let n = 0;
        const subset = [];
        const visited = new Set(); // collect all nodes that end up in an Sn
        while (n <= timing_nodes.length) {
            subset.push(new Set());
            if (n == 0) {                                                // first round
                for (const node of timing_nodes) {                         // select all nodes without prev_nodes
                    if (!timing_edges_inv.has(node)) {
                        subset[n].add(node);                             // and store them in subset[0]              
                    }
                }
            }
            else {
                for (const prev_node of visited) {                          // start with prev_nodes in visited
                    if (timing_edges.has(prev_node)) {                    // and consider their next_nodes
                        for (const next_node of timing_edges.get(prev_node)) {
                            if (!visited.has(next_node)) {                // but only if the next_node is not yet visited
                                let good = true;
                                for (const other_prev_node of timing_edges_inv.get(next_node)) {// consider the other prev nodes of the next nodes
                                    if (!visited.has(other_prev_node)) {  // and require that they have been visited already
                                        good = false;
                                        break;
                                    }
                                } 
                                if (good) {
                                    subset[n].add(next_node);             // if all is well, we add next_node to subset[n]
                                }
                            }
                        }
                    }
                }
            }
            if (subset[n].size == 0) {                      // if there are no new nodes, the next rounds will also not yield new nodes,
                break;                                                    //  so we are done
            }
            for (const node of subset[n]) {                                 // after each round we add the saved next_nodes to the visited nodes
                visited.add(node);
            }
            n++;
        }
        this._tasks = [];
        this._timing = new Map();
        if (visited.size != timing_nodes.length) {
            const cycle = [];
            for (const node of timing_nodes) {
                if (!visited.has(node)) {
                    cycle.push(node);
                }
            }
            console.log('Circular timing constraints detected', cycle);
        }
        else {
            for (const nodes of subset) {
                for (const node of nodes) {
                    this._tasks.push(node);
                }
            }
            this._timing = timing_edges_inv;
            console.log('Timing resolved', this._tasks);
        }
    },
    getComponent: function(name) {
        return this.components.get(name);
    },
    getContainer: function(name, variants) {
        if (this.components.has(name)) {
            return this.components.get(name).container;
        }
        else {
            const container = new Map();
            const addto = (name == 'body')?$('body'):$(`#${name}`);
            for (const vr of variants) {
                container.set(vr, addto);
            }
            return container;
        }
    },
    getBefore: function(name, stage) {
        const prev_nodes = [];
        const next_node = `${name}-${stage}`;
        for (const prev_node of (this._timing.get(next_node) || new Set())) {
            prev_nodes.push(prev_node.split('-'));
        }
        return prev_nodes;
    },
    work: function() { 
        for (const task of this._tasks) {
            const [name, stage] = task.split('-');
            const component = this.getComponent(name);
            for (const vr of component.variants) {
                component[stage](vr);
            }
        }
    },
};

module.exports = Page;
