/* Skeleton
 */

export default class { // the one and only page object
    constructor() {
        this.stages = new Map([
            ['weld', true],
            ['wire', true],
            ['work', false],
        ]); // true means: once only, false means: my be repeated
        this.stages_prev = new Map([
            ['wire', 'weld'],
            ['work', 'wire'],
        ]);
        this.before = new Map([
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
    }
    resolveTiming() {
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
        for (const [stage, nexts] of this.before) {
            for (const [next_name, prevs] of nexts) {
                if (this.ignore.has(next_name)) {continue}
                for (const prev_name of prevs.keys()) {
                    if (this.ignore.has(prev_name)) {continue}
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
    }
}
