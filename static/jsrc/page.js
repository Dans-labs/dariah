/* TOP LEVEL: PAGE
 * This is the page function. 
 * It creates a ViewState function, which contains the current state.
 * The state is created on the basis of request variables, and from then it
 * reflects the user actions.
 * The page specifies all components and initializes them.
 * A component is specfied by the following fields
 * - destination: left => left sidebar; right => right sidebar; middle => middle column
 * - ºname: a string that can be used to refer to the component later on, via method ºget_component
 * - subcomponents: a list of names for which a subcomponent will be made. The html will be generated per subcomponent.
 * - fetch: boolean which says whether this component needs data from the server
 * - ºwork first: boolean which says that child components can only be wired after ºwork of the ºparent component.
 * - ºspecific: an object that holds the ºspecific functionality of this component.
 * The control component has ºwork first = true, because only after choosing a list, the list control can fetch the ºspecific list and ºwire itself.
 * All other components have ºwork first = false, because it is desirable that child components start wiring as soon as possible.
 * For example: the facet component is ºparent of the individual facets.
 * When facet starts working, the individual controls should already be wired.
 * Because ºwork first = false, wiring of the individual facets will be triggered after wiring of the generic facet component.
 * N.B. Individual facets can only be wired after the list component (their grandfather) has been wired.
 * This will go OK, because after wiring the list, the facet will be wired and then the individual facets.
 * The º_routing dictionary specifies when the ºwork methods of components should be triggered.
 * Its keys are the labels of components, and for every component a list of other component keys is given.
 * These are the components that will be applied (in that order) after the key component. 
 * 
 *  ºwork from page: if true, this component's ºwork method will be called directly by the page's ºwork method;
 *   if false, the page will skip this component when working. It is assumed that this component will be applied by another component.
 *   This practice must be followed, if the application of state to a component should come after a fetch of another component.
 *   If the page would ºwork the viewstate directly to this component, it would happen before the other's components data had been loaded.
 *   Example: a filter component F, that filters a big list fetched by another component L. L's ºwork should call F's ºwork.
 * After every user action, the state is changed, and a call to the ºPage's ºwork() method is issued.
 * The page will issue the ºwork call forth to all components.
 */

function ºPage() { // the one and only page object
    this.ºname = `page`;
    this.ºmsg = new ºMsg(`msg_${this.ºname}`);
    this.ºstate = new ºViewState(this);
    this.ºstages = {ºweld: true, ºwire: true, ºwork: false}; // true means: once only, false means: my be repeated
    this.ºstages_prev = {ºwire: `ºweld`, ºwork: `ºwire`};
    var ºmain_lists = this.ºstate.ºgetvalues(`list`);
    var ºcontrib_list = {contrib: 1};
    this.º_component_specs = {
        ºcontrol: {ºdest: `left`, ºsubcomps: ºmain_lists, ºfetch_url: null, ºspecific: ºControl}, 
        ºlist: {ºdest: `middle`, ºsubcomps: ºmain_lists, ºfetch_url: `list`, ºspecific: ºList}, 
        ºfacet: {ºdest: `ºcontrol`, ºsubcomps: ºmain_lists, ºfetch_url: null, ºspecific: ºFacet}, 
        ºfilter: {ºdest: `ºfacet`, ºsubcomps: ºmain_lists, ºfetch_url: null, ºspecific: ºFilter}, 
        ºeumap: {ºdest: `ºfacet`, ºsubcomps: ºcontrib_list, ºfetch_url: `country`, ºspecific: ºEUmap}, 
        ºctype: {ºdest: `ºfacet`, ºsubcomps: ºcontrib_list, ºfetch_url: `type`, ºspecific: ºCType}, 
    },
    this.º_before = {
        ºweld: {
            ºfacet: {ºcontrol: 1, ºlist: 1},
            ºfilter: {ºfacet: 1},
            ºeumap: {ºfacet: 1, ºfilter: 1},
            ºctype: {ºfacet: 1, ºeumap: 1},
        },
        ºwire: {
            ºfacet: {ºfilter: 1, ºeumap: 1, ºctype: 1},
            ºfilter: {ºlist: 1},
            ºeumap: {ºlist: 1},
            ºctype: {ºlist: 1},
        },
        ºwork: {
            ºfacet: {ºfilter: 1, ºeumap: 1, ºctype: 1},
        },
    };
    this.ºcomponents = {};
    for (var ºname in this.º_component_specs) {
        var ºcomp = new ºComponent(ºname, this.º_component_specs[ºname], this);
        ºcomp.ºchildren = {};
        this.ºcomponents[ºname] = ºcomp;
    }
    for (var ºname in this.º_component_specs) {
        var ºchild_comp = this.ºcomponents[ºname];
        var ºdest_name = this.º_component_specs[ºname].ºdest;
        if (ºdest_name in this.ºcomponents) {
            var ºparent_comp = this.ºcomponents[ºdest_name];
            ºparent_comp.ºchildren[ºname] = ºchild_comp;
        }
    }
    for (var ºname in this.ºcomponents) {
        var ºcomp = this.ºcomponents[ºname];
        ºcomp.ºbefore = {};
        for (var ºstage in this.º_before) {
            var ºconstraints = this.º_before[ºstage];
            ºcomp.ºbefore[ºstage] = {};
            if (ºname in ºconstraints) {
                for (var ºbefore_name in ºconstraints[ºname]) {
                   ºcomp.ºbefore[ºstage][ºbefore_name] = 1;
                } 
            }
        }
    }
    this.º_resolve_timing();
    this.º_set_height(80);
    History.Adapter.bind(window, `statechange`, this.ºstate.ºwork());
};

ºPage.prototype = {
    º_set_height(ºsubtract) { // the heights of the sidebars are set, depending on the height of the window
        var ºwh = `${window.innerHeight - ºsubtract}px`;
        for (var ºw in {'middle': 1, 'left': 1, 'right': 1}) {
            $(`#${ºw}`).css(`height`, ºwh);
        }
    },
    º_resolve_timing() {
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
        var ºtiming_nodes = [];
        var ºtiming_edges = {}; // keys are nodes that must come before other nodes
        var ºtiming_edges_inv = {}; // keys are nodes that must come after other nodes
        // A: collect the nodes: pairs of component name and stage
        for (var ºname in this.º_component_specs) {
            for (var ºstage in this.ºstages) {
                ºtiming_nodes.push(`${ºname}-${ºstage}`);
            }
        }
        // collect the edges (we need to store every edge both ways)
        function ºadd_edge(ºprev_node, ºnext_node) {
            if (!(ºprev_node in ºtiming_edges)) {
                ºtiming_edges[ºprev_node] = {};
            }
            if (!(ºnext_node in ºtiming_edges_inv)) {
                ºtiming_edges_inv[ºnext_node] = {};
            }
            ºtiming_edges[ºprev_node][ºnext_node] = true;
            ºtiming_edges_inv[ºnext_node][ºprev_node] = true;
        }
        // 1. per component, the stages are ordered
        for (var ºnext_stage in this.ºstages_prev) {
            var ºprev_stage = this.ºstages_prev[ºnext_stage];
            for (var ºname in this.º_component_specs) {
                ºadd_edge(`${ºname}-${ºprev_stage}`, `${ºname}-${ºnext_stage}`);
            }
        }
        // 2. add the specific constraints from this.º_before
        for (var ºstage in this.º_before) {
            for (var ºnext_name in this.º_before[ºstage]) {
                for (var ºprev_name in this.º_before[ºstage][ºnext_name]) {
                    ºadd_edge(`${ºprev_name}-${ºstage}`, `${ºnext_name}-${ºstage}`);
                }
            }
        }
        // B: compute the Sn (in ºsubset)
        var ºn = 0;
        var ºsubset = [];
        var ºvisited = {}; // collect all nodes that end up in an Sn
        while (ºn <= ºtiming_nodes.length) {
            ºsubset.push({});
            if (ºn == 0) {                                                // first round
                ºtiming_nodes.forEach(function(ºnode) {                   // select all nodes without prev_nodes
                    if (!(ºnode in ºtiming_edges_inv)) {
                        ºsubset[ºn][ºnode] = 1;                          // and store them in subset[0]              
                    }
                });
            }
            else {
                for (var ºprev_node in ºvisited) {                          // start with prev_nodes in visited
                    if (ºprev_node in ºtiming_edges) {                      // and consider their next_nodes
                        for (var ºnext_node in ºtiming_edges[ºprev_node]) {
                            if (!(ºnext_node in ºvisited)) {                // but only if the next_node is not yet visited
                                var ºgood = true;
                                for (var ºother_prev_node in ºtiming_edges_inv[ºnext_node]) { // consider the other prev nodes of the next nodes
                                    if (!(ºother_prev_node in ºvisited)) { // and require that they have been visited already
                                        ºgood = false;
                                        break;
                                    }
                                } 
                                if (ºgood) {
                                    ºsubset[ºn][ºnext_node] = 1;           // if all is well, we add next_node to subset[ºn]
                                }
                            }
                        }
                    }
                }
            }
            if (!Object.keys(ºsubset[ºn]).length) {                                    // if there are no new nodes, the next rounds will also not yield new nodes,
                break;                                                    //  so we are done
            }
            for (var ºnode in ºsubset[ºn]) {                              // after each round we add the saved next_nodes to the visited nodes
                ºvisited[ºnode] = 1;
            }
            ºn++;
        }
        this.º_tasks = [];
        this.º_timing = {};
        if (Object.keys(ºvisited).length != ºtiming_nodes.length) {
            var ºcycle = [];
            ºtiming_nodes.forEach(function(ºnode) {
                if (!(ºnode in ºvisited)) {
                    ºcycle.push(ºnode);
                }
            });
            console.log(`Circular timing constraints detected`, ºcycle);
        }
        else {
            ºsubset.forEach(function(ºnodes, ºn) {
                for (var ºnode in ºnodes) {
                    this.º_tasks.push(ºnode);
                }
            }, this);
            this.º_timing = ºtiming_edges_inv;
            console.log(`Timing resolved`, this.º_tasks);
        }
    },
    ºget_component: function(ºname) {
        return this.ºcomponents[ºname];
    },
    ºget_container: function(ºname, ºsubcomps) {
        var ºcontainer = {};
        if (ºname in this.ºcomponents) {
            ºcontainer = this.ºcomponents[ºname].ºcontainer;
        }
        else {
            for (var ºsc in ºsubcomps) {
                ºcontainer[ºsc] = $(`#${ºname}`);
            }
        }
        return ºcontainer;
    },
    ºget_before: function(ºname, ºstage) {
        var ºprev_nodes = [];
        var ºnext_node = `${ºname}-${ºstage}`;
        for (var ºprev_node in (this.º_timing[ºnext_node] || {})) {
            ºprev_nodes.push(ºprev_node.split(`-`));
        }
        return ºprev_nodes;
    },
    ºwork: function() { 
        this.º_tasks.forEach(function(ºtask) {
            var ºtask_comps = ºtask.split(`-`);
            var ºname = ºtask_comps[0];
            var ºstage = ºtask_comps[1];
            var ºcomp = this.ºget_component(ºname);
            for (var ºsc in ºcomp.ºsubcomps) {
                ºcomp[ºstage](ºsc);
            }
        }, this);
    },
};

