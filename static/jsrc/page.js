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

var g = require('./generic.js');
var ViewState = require('./viewstate.js');
var Msg = require('./message.js');
var Share = require('./share.js');
var CType = require('./ctype.js');
var TadirahO = require('./tadiraho.js');
var TadirahA = require('./tadiraha.js');
var TadirahT = require('./tadiraht.js');
var EUmap = require('./eumap.js');
var Filter = require('./filter.js');
var Facet = require('./facet.js');
var List = require('./list.js');
var Item = require('./item.js');
var Control = require('./control.js');
var Component = require('./components.js');

function Page() { // the one and only page object
    this.name = `page`;
    this.msg = new Msg(`msg_${this.name}`);
    this.state = new ViewState(this);
    this.stages = {weld: true, wire: true, work: false}; // true means: once only, false means: my be repeated
    this.stages_prev = {wire: `weld`, work: `wire`};
    var main_lists = this.state.getValues(`list`);
    var contrib_list = {contrib: 1};
    var empty_list = {'': 1};
    this._component_specs = {
        share: {dest: `body`, variants: empty_list, fetch_url: null, specific: Share}, 
        control: {dest: `left`, variants: main_lists, fetch_url: null, specific: Control}, 
        list: {dest: `middle`, variants: main_lists, fetch_url: `list`, specific: List}, 
        item: {dest: `list`, variants: main_lists, fetch_url: `item`, specific: Item}, 
        facet: {dest: `control`, variants: main_lists, fetch_url: null, specific: Facet}, 
        filter: {dest: `facet`, variants: main_lists, fetch_url: null, specific: Filter}, 
        eumap: {dest: `facet`, variants: contrib_list, fetch_url: `country`, specific: EUmap}, 
        ctype: {dest: `facet`, variants: contrib_list, fetch_url: `type`, specific: CType}, 
        tadiraha: {dest: `facet`, variants: contrib_list, fetch_url: `tadiraha`, specific: TadirahA}, 
        tadiraho: {dest: `facet`, variants: contrib_list, fetch_url: `tadiraho`, specific: TadirahO}, 
        tadiraht: {dest: `facet`, variants: contrib_list, fetch_url: `tadiraht`, specific: TadirahT}, 
    },
    /* some components are being dealt with on the basis of additional identifiers, such as item
     * Those components are specified below, and the specs of all components will get an extra attribute
     * by_id, which is true if the component needs an id.
     * The actual ids come from a request variable name_xxx, where name is the name of the component and xxx is the name of a list.
     */
    this._by_id = {
        item: true,
    },
    this._before = {
        weld: {
            item: {list: 1},
            facet: {control: 1, list: 1},
            filter: {facet: 1},
            eumap: {facet: 1, filter: 1},
            ctype: {facet: 1, eumap: 1},
            tadiraha: {facet: 1, ctype: 1},
            tadiraho: {facet: 1, tadiraha: 1},
            tadiraht: {facet: 1, tadiraho: 1},
            share: {facet: 1, list: 1},
        },
        wire: {
            item: {list: 1},
            facet: {filter: 1, eumap: 1, ctype: 1, tadiraha: 1, tadiraho: 1, tadiraht: 1},
            filter: {list: 1},
            eumap: {list: 1},
            ctype: {list: 1},
            tadiraha: {list: 1},
            tadiraho: {list: 1},
            tadiraht: {list: 1},
        },
        work: {
            facet: {filter: 1, eumap: 1, ctype: 1, tadiraha: 1, tadiraho: 1, tadiraht: 1},
        },
    };
    this._ignore = {
        //tadiraht: 1,
        //tadiraho: 1,
        //eumap: 1,
        //filter: 1,
    },
    this.components = {};
    for (var name in this._component_specs) {
        if (name in this._ignore) {continue}
        this._component_specs[name].by_id = (name in this._by_id) && this._by_id[name];
        var component = new Component(name, this._component_specs[name], this);
        component.children = {};
        this.components[name] = component;
    }
    for (var name in this.components) {
        var child_component = this.components[name];
        var dest_name = this._component_specs[name].dest;
        if (dest_name in this.components) {
            var parent_component = this.components[dest_name];
            parent_component.children[name] = child_component;
        }
    }
    this._resolveTiming();
    this._setHeight(80);
    History.Adapter.bind(window, `statechange`, this.state.work());
};

Page.prototype = {
    _setHeight(subtract) { // the heights of the sidebars are set, depending on the height of the window
        var wh = `${window.innerHeight - subtract}px`;
        for (var w in {'middle': 1, 'left': 1, 'right': 1}) {
            $(`#${w}`).css(`height`, wh);
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
        var timing_nodes = [];
        var timing_edges = {}; // keys are nodes that must come before other nodes
        var timing_edges_inv = {}; // keys are nodes that must come after other nodes
        // A: collect the nodes: pairs of component name and stage
        for (var name in this.components) {
            for (var stage in this.stages) {
                timing_nodes.push(`${name}-${stage}`);
            }
        }
        // collect the edges (we need to store every edge both ways)
        function addEdge(prev_node, next_node) {
            if (!(prev_node in timing_edges)) {
                timing_edges[prev_node] = {};
            }
            if (!(next_node in timing_edges_inv)) {
                timing_edges_inv[next_node] = {};
            }
            timing_edges[prev_node][next_node] = true;
            timing_edges_inv[next_node][prev_node] = true;
        }
        // 1. per component, the stages are ordered
        for (var next_stage in this.stages_prev) {
            var prev_stage = this.stages_prev[next_stage];
            for (var name in this.components) {
                addEdge(`${name}-${prev_stage}`, `${name}-${next_stage}`);
            }
        }
        // 2. add the specific constraints from this._before
        for (var stage in this._before) {
            for (var next_name in this._before[stage]) {
                if (next_name in this._ignore) {continue}
                for (var prev_name in this._before[stage][next_name]) {
                    if (prev_name in this._ignore) {continue}
                    addEdge(`${prev_name}-${stage}`, `${next_name}-${stage}`);
                }
            }
        }
        // B: compute the Sn (in subset)
        var n = 0;
        var subset = [];
        var visited = {}; // collect all nodes that end up in an Sn
        while (n <= timing_nodes.length) {
            subset.push({});
            if (n == 0) {                                                // first round
                timing_nodes.forEach(function(node) {                   // select all nodes without prev_nodes
                    if (!(node in timing_edges_inv)) {
                        subset[n][node] = 1;                          // and store them in subset[0]              
                    }
                });
            }
            else {
                for (var prev_node in visited) {                          // start with prev_nodes in visited
                    if (prev_node in timing_edges) {                      // and consider their next_nodes
                        for (var next_node in timing_edges[prev_node]) {
                            if (!(next_node in visited)) {                // but only if the next_node is not yet visited
                                var good = true;
                                for (var other_prev_node in timing_edges_inv[next_node]) { // consider the other prev nodes of the next nodes
                                    if (!(other_prev_node in visited)) { // and require that they have been visited already
                                        good = false;
                                        break;
                                    }
                                } 
                                if (good) {
                                    subset[n][next_node] = 1;           // if all is well, we add next_node to subset[n]
                                }
                            }
                        }
                    }
                }
            }
            if (!Object.keys(subset[n]).length) {                       // if there are no new nodes, the next rounds will also not yield new nodes,
                break;                                                    //  so we are done
            }
            for (var node in subset[n]) {                              // after each round we add the saved next_nodes to the visited nodes
                visited[node] = 1;
            }
            n++;
        }
        this._tasks = [];
        this._timing = {};
        if (Object.keys(visited).length != timing_nodes.length) {
            var cycle = [];
            timing_nodes.forEach(function(node) {
                if (!(node in visited)) {
                    cycle.push(node);
                }
            });
            console.log(`Circular timing constraints detected`, cycle);
        }
        else {
            subset.forEach(function(nodes, n) {
                for (var node in nodes) {
                    this._tasks.push(node);
                }
            }, this);
            this._timing = timing_edges_inv;
            console.log(`Timing resolved`, this._tasks);
        }
    },
    getComponent: function(name) {
        return this.components[name];
    },
    getContainer: function(name, variants) {
        var container = {};
        if (name in this.components) {
            container = this.components[name].container;
        }
        else {
            var addto = (name == `body`)?$(`body`):$(`#${name}`);
            for (var vr in variants) {
                container[vr] = addto;
            }
        }
        return container;
    },
    getBefore: function(name, stage) {
        var prev_nodes = [];
        var next_node = `${name}-${stage}`;
        for (var prev_node in (this._timing[next_node] || {})) {
            prev_nodes.push(prev_node.split(`-`));
        }
        return prev_nodes;
    },
    work: function() { 
        this._tasks.forEach(function(task) {
            var task_comps = task.split(`-`);
            var name = task_comps[0];
            var stage = task_comps[1];
            var component = this.getComponent(name);
            for (var vr in component.variants) {
                component[stage](vr);
            }
        }, this);
    },
};

module.exports = Page;
