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

let g = require('./generic.js');
let ViewState = require('./viewstate.js');
let Share = require('./share.js');
let CType = require('./ctype.js');
let TadirahO = require('./tadiraho.js');
let TadirahA = require('./tadiraha.js');
let TadirahT = require('./tadiraht.js');
let EUmap = require('./eumap.js');
let Filter = require('./filter.js');
let Facet = require('./facet.js');
let List = require('./list.js');
let Item = require('./item.js');
let Control = require('./control.js');
let Component = require('./components.js');

function Page() { // the one and only page object
    this.name = 'page';
    this.state = new ViewState(this);
    let main_lists = this.state.getValues('list');
    let contrib_list = new Set(['contrib']);
    let empty_list = new Set(['']);
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
    for (let [name, spec] of this._component_specs) {
        if (this._ignore.has(name)) {continue}
        spec.by_id = this._by_id.has(name);
        let component = new Component(name, spec, this);
        component.children = new Map();
        this.components.set(name, component);
    }
    for (let [name, child_component] of this.components) {
        let dest_name = this._component_specs.get(name).dest;
        if (this.components.has(dest_name)) {
            let parent_component = this.components.get(dest_name);
            parent_component.children.set(name, child_component);
        }
    }
    this._resolveTiming();
    this._setHeight(80);
    History.Adapter.bind(window, 'statechange', this.state.work());
};

Page.prototype = {
    _setHeight(subtract) { // the heights of the sidebars are set, depending on the height of the window
        let wh = `${window.innerHeight - subtract}px`;
        for (let w of new Set(['middle', 'left', 'right'])) {
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
        let timing_nodes = [];
        let timing_edges = new Map();   // keys are nodes that must come before other nodes
        let timing_edges_inv = new Map; // keys are nodes that must come after other nodes
        // A: collect the nodes: pairs of component name and stage
        for (let name of this.components.keys()) {
            for (let stage of this.stages.keys()) {
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
        for (let [next_stage, prev_stage] of this.stages_prev) {
            for (let name of this.components.keys()) {
                addEdge(`${name}-${prev_stage}`, `${name}-${next_stage}`);
            }
        }
        // 2. add the specific time constraints
        for (let [stage, nexts] of this._before) {
            for (let [next_name, prevs] of nexts) {
                if (this._ignore.has(next_name)) {continue}
                for (let prev_name of prevs.keys()) {
                    if (this._ignore.has(prev_name)) {continue}
                    addEdge(`${prev_name}-${stage}`, `${next_name}-${stage}`);
                }
            }
        }
        // B: compute the Sn (in subset)
        let n = 0;
        let subset = [];
        let visited = new Set(); // collect all nodes that end up in an Sn
        while (n <= timing_nodes.length) {
            subset.push(new Set());
            if (n == 0) {                                                // first round
                for (let node of timing_nodes) {                         // select all nodes without prev_nodes
                    if (!timing_edges_inv.has(node)) {
                        subset[n].add(node);                             // and store them in subset[0]              
                    }
                }
            }
            else {
                for (let prev_node of visited) {                          // start with prev_nodes in visited
                    if (timing_edges.has(prev_node)) {                    // and consider their next_nodes
                        for (let next_node of timing_edges.get(prev_node)) {
                            if (!visited.has(next_node)) {                // but only if the next_node is not yet visited
                                let good = true;
                                for (let other_prev_node of timing_edges_inv.get(next_node)) { // consider the other prev nodes of the next nodes
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
            for (let node of subset[n]) {                                 // after each round we add the saved next_nodes to the visited nodes
                visited.add(node);
            }
            n++;
        }
        this._tasks = [];
        this._timing = new Map();
        if (visited.size != timing_nodes.length) {
            let cycle = [];
            for (let node of timing_nodes) {
                if (!visited.has(node)) {
                    cycle.push(node);
                }
            }
            console.log('Circular timing constraints detected', cycle);
        }
        else {
            for (let nodes of subset) {
                for (let node of nodes) {
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
        let container = new Map();
        if (this.components.has(name)) {
            container = this.components.get(name).container;
        }
        else {
            let addto = (name == 'body')?$('body'):$(`#${name}`);
            for (let vr of variants) {
                container.set(vr, addto);
            }
        }
        return container;
    },
    getBefore: function(name, stage) {
        let prev_nodes = [];
        let next_node = `${name}-${stage}`;
        for (let prev_node of (this._timing.get(next_node) || new Set())) {
            prev_nodes.push(prev_node.split('-'));
        }
        return prev_nodes;
    },
    work: function() { 
        for (let task of this._tasks) {
            let task_comps = task.split('-');
            let name = task_comps[0];
            let stage = task_comps[1];
            let component = this.getComponent(name);
            for (let vr of component.variants) {
                component[stage](vr);
            }
        }
    },
};

module.exports = Page;
