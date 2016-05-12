/* COMPONENTS 
 * The Page function specifies and builds a list of components
 * Every component on the µpage corresponds to a function (with a prototype)
 * This function is stored in a generic Component function in a field called specific.
 * Every component has a list of subcomponents. For example, the 'list' component has a subcomponent 'contrib'
 * for the list of contributions, and a subcomponent 'country' for the list of countries.
 * The generic functions of a component take care of:
 * - generating HTML container divs for the subcomponents under specified destination elements if they does not already exist
 * - showing and hiding the subcomponents, and in general, work the current state data to the subcomponents 
 * - fetching the subcomponent's data from the server, if needed
 * This *specific* functionality of the components are defined in separate files.
 * Of this specific functionality, the following will be called from the generic component function:
 * - show(sc): inspect the current state and determine whether the subcomponent should be shown or hidden
 * - wire(sc): after the data has been fetched, wrap the data into the desired HTML content of the subcomponent
 *   and add the wiring (click events, change events)
 * In turn, the specific functions can access their associated generic components by this.comp
 */

function _as_prom(x) {
    if ((typeof(x) == `object`) && (typeof(x.then) == `function`)) {
        return x;
    }
    return $.Deferred().resolve(x).promise();
};
function now(fun) { // make a promise by applying function fun, and yield the result as promise
    return _as_prom(fun());
};

/* GENERIC COMPONENT
 * Here is the generic functionality of each component
 */

function Component(dst, name, scomps, must_fetch, work_first, specific, µpage) {
    this.dst = dst;
    this.name = name;
    this.scomps = scomps;
    this.must_fetch = must_fetch;
    this.work_first = work_first;
    this.specific = specific;
    this._stage = {};
    this._stages = {fetch: true, wire: true, work: false}; // true means: once only, work means: my be repeated
    this.µpage = µpage;
    /* after creation, the creator is responsible to add parent and children fields
     * that specify the parent-child relations based on the routing table.
     */
    this._dst = {};
    this.µmsg = {};
    this.container = {};
    this.state = this.µpage.state;
    this.data = {};
    this.relvals = {};
    this._fetch_url = {};
};

Component.prototype = {
    /* need, deed, ensure, now are wrappers around the promise mechanism.
     * The act is a stage in processing the component, such as fetch, wire, work.
     * There should be a method with the same name, prefixed with _ which is expected to return a promise.
     * If it does not, we detect it, and yield a promise that is resolved with the original return value.
     * ensure takes care that the function of an action is promised to be execute once, by registering it
     * as a promise for that stage.
     * If there is already a fulfilled or pending promise for that action at that stage, no new promise will be made.
     * Ensure returns a function with no arguments. If it is called, the promise will be made.
     * So the result of ensure can be put inside the .then() of an other promise.
     * Now is a function that calls a function and returns the result as promise.
     * So the first ensure in a chain can be put in now(). 
     */
    need: function(sc, act) { // check whether there is a promise and whether it has been fulfilled
        return !(sc in this._stage) || !(act in this._stage[sc]) || (typeof(this._stage[sc][act]) == `function`) || (this._stage[sc][act].state() == `rejected`);
    },
    _deed: function(sc, act) { // register a promise to do perform the method associated with act by entering it in the book keeping of stages
        if (!(sc in this._stage)) {
            this._stage[sc] = {};
        }
        var prm = _as_prom(this[`_${act}`](sc));
        this._stage[sc][act] = prm;
        return prm;
    },
    ensure: function(sc, act) { // function to promise that method fun will be executed once and once only
        var that = this;
        if (act in this._stages) {
            if (this._stages[act]) { 
                return function() {
                    return that.need(sc, act)?that._deed(sc, act):_as_prom(true);
                };
            }
            return function() {that._deed(sc, act)};
        }
        return function() {_as_prom(true)};
    },
    /* here are the implementations of the functions that are to be wrapped as promises
     * They can focus on the work, may or may not yield a promise
     */    
    _fetch: function(sc) { // get the material by AJAX if needed
        var that = this;
        if (this.must_fetch) {
            this.µmsg[sc].µmsg(`fetching data ...`);
            return $.ajax({
                µtype: `POST`,
                url: this._fetch_url[sc],
                contentType: `application/json; charset=utf-8`,
                dataType: `json`,
            }).then(function(json) {
                that._post_fetch(sc, json);
            });
        }
    },
    _post_fetch: function(sc, json) { // receive material after AJAX call
        this.µmsg[sc].clear();
        json.msgs.forEach(function(m) {
            this.µmsg[sc].µmsg(m);
        });
        if (json.good) {
            this.data[sc] = json.data;
            this.relvals[sc] = json.relvals;
        }
    },
    _wire: function(sc) {
        console.log(`>---${this.name}-${sc}`);
        this.delg.wire(sc); // perform wire actions that are specific to this component
        console.log(`<---${this.name}-${sc}`);
        if (!this.work_first) {
            for (var cn in this.children) {
                this.children[cn].wire(sc);
            }
        }
    },
    _work: function(sc) {
        console.log(`>===${this.name}-${sc}`);
        this.delg.work(sc); // perform work actions that are specific to this component
        console.log(`<===${this.name}-${sc}`);
        for (var cn in this.children) {
            this.children[cn].work(sc);
        }
    },
    show: function(sc) {
        if (this.delg.show(sc)) { // show/hide depending on the specific condition
            console.log(`SHOW ${this.name}-${sc}`);
            this.container[sc].show();
        }
        else {
            console.log(`HIDE ${this.name}-${sc}`);
            if (this.container[sc] != undefined) {
                this.container[sc].hide();
            }
        }
        for (var cn in this.children) {
            this.children[cn].show(sc);
        }
    },
    weld: function() {
        this.delg = new this.specific(this);
        var disabled = this.delg.disabled;
        if (this.dst in this.µpage.compindex) {
            var dstcontainer = this.µpage.compindex[this.dst].container;
            this._dst = dstcontainer;
        }
        else {
            for (var sc in this.scomps) {
                this._dst[sc] = $(`#${this.dst}`);
            }
        }
        for (var sc in this.scomps) {
            if (!((disabled != undefined) && (sc in disabled) && disabled[sc])) { 
                console.log(`>...${this.name}-${sc}`);
                if (this.must_fetch) {
                    this._fetch_url[sc] = url_tpl.replace(/_c_/, `data`).replace(/_f_/, `${this.name}_${sc}`)+`.json`;
                }
                this.container[sc] = $(`#${this.name}_${sc}`);
                if (this.container[sc].length == 0) {
                    var d = this._dst[sc];
                    d.append(`<div id="msg_${this.name}_${sc}"></div>`);
                    d.append(`<div id="${this.name}_${sc}"></div>`);
                    this.container[sc] = $(`#${this.name}_${sc}`);
                }
                this.µmsg[sc] = new Msg(`msg_${this.name}_${sc}`);
                this.delg.weld(sc);
                console.log(`<...${this.name}-${sc}`);
            }
        }
    },
    wire: function(sc) { // wire after fetching
        if (this.delg.show(sc)) { // show/hide depending on the specific condition
            now(
                this.ensure(sc, `fetch`)
            ).then(
                this.ensure(sc, `wire`)
            );
        }
    },
    work: function(sc) { // work (changed) state to current material
        var that = this;
        if (this.delg.show(sc)) { // show/hide depending on the specific condition
            now(
                this.ensure(sc, `fetch`)
            ).then(
                this.ensure(sc, `wire`)
            ).then(
                this.ensure(sc, `work`)
            );
        }
    },
};
