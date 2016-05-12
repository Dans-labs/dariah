/* COMPONENTS 
 * The Page function specifies and builds a list of components
 * Every component on the page corresponds to a function (with a prototype)
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

/* GENERIC COMPONENT
 * Here is the generic functionality of each component
 */

function Component(dst, name, scomps, fetch, specific, page) {
    this.dst = dst;
    this.name = name;
    this.scomps = scomps;
    this.fetch = fetch;
    this.page = page;
    this.specific = specific;
};

Component.prototype = {
    _fetch: function(sc) { // get the material by AJAX if needed, and wire the material afterward
        var that = this;
        if (this.fetch) {
            this.msg[sc].msg(`fetching data ...`);
            $.post(this._fetch_url[sc], {}, function(json) {
                that.msg[sc].clear();
                json.msgs.forEach(function(m) {
                    that.msg[sc].msg(m);
                });
                if (json.good) {
                    that.data[sc] = json.data;
                    that.relvals[sc] = json.relvals;
                    that.wire(sc);
                }
            }, `json`);
        }
        else {
            this.wire(sc);
        }
    },
    _work: function(sc) {
        this.delg.work(sc); // perform work actions that are specific to this component
        this.page.work(this.name, sc); // work other components, dependent on the routing information of the page
    },
    weld: function() { // make the component
        this._dst = {};
        this._loaded = {};
        this.msg = {};
        this.container = {};
        this.state = this.page.state;
        this.data = {};
        this.relvals = {};
        this._fetch_url = {};
        for (var sc in this.scomps) {
            this._loaded[sc] = false;
            if (this.fetch) {
                this._fetch_url[sc] = url_tpl.replace(/_c_/, `data`).replace(/_f_/, `${this.name}_${sc}`)+`.json`;
            }
        }
        this.delg = new this.specific(this);
        if (this.dst in this.page.compindex) {
            var dstcontainer = this.page.compindex[this.dst].container;
            for (var sc in this.scomps) {
                this._dst[sc] = dstcontainer[sc];
            }
        }
        else {
            var dst = $(`#${this.dst}`);
            for (var sc in this.scomps) {
                this._dst[sc] = dst;
            }
        }
        for (var sc in this.scomps) {
            this.container[sc] = $(`#${this.name}_${sc}`);
            if (this.container[sc].length == 0) {
                var dst = this._dst[sc];
                dst.append(`<div id="msg_${this.name}_${sc}"></div>`);
                dst.append(`<div id="${this.name}_${sc}"></div>`);
                this.container[sc] = $(`#${this.name}_${sc}`);
            }
            this.msg[sc] = new Msg(`msg_${this.name}_${sc}`);
            this._loaded[sc] = false;
            this.delg.weld(sc);
        }
    },
    wire: function(sc) { // wire new material obtained by an AJAX call
        if (!this._loaded[sc]) {
            this._loaded[sc] = true;
            this.delg.wire(sc); // perform wire actions that are specific to this component
        }
        this._work(sc);
    },
    work: function(sc) { // work (changed) state to current material
        var scomps = {}; 
        if (sc == undefined) {
            scomps = this.scomps;
        }
        else {
            scomps[sc] = 1;
        }
        for (var s in scomps) {
            if (this.delg.show(s)) { // show/hide depending on the specific condition
                this.container[s].show();
                if (!this._loaded[s]) { // and fetch data if needed
                    this._fetch(s);
                }
                else {
                    this._work(s);
                }
            }
            else {
                this.container[s].hide();
                this._work(s);
            }
        }
    },
};
