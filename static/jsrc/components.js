/* COMPONENTS 
 * The Page function specifies and builds a list of components
 * Every component on the page corresponds to a function (with a prototype)
 * This function is stored in a generic Component function in a field called specific.
 * The generic functions of a component take care of:
 * - generating an HTML container div under a specified destination element if it does not already exist
 * - showing and hiding the component, and in general, apply the current state data to the component 
 * - fetching the component's data from the server, if needed
 * This *specific* functionality of the components are defined in separate files.
 * Of this specific functionality, the following will be called from the generic component function:
 * - show(): inspect the current state and determine whether the component should be shown or hidden
 * - process(): after the data has been fetched, process the data into the desired HTML content of the component
 * In turn, the specific functions can access their associated generic components by this.comp
 */

/* GENERIC COMPONENT
 * Here is the generic functionality of each component
 */

function Component(dst, name, fetch, source, specific, page) {
    this._dst = $(`#${dst}`);
    this._loaded = false;
    this.name = name;
    this.page = page;
    this.state = page.state;
    if (fetch != null) {
        this._fetch_url = url_tpl.replace(/_c_/, `data`).replace(/_f_/, fetch)+`.json`;
        this.data = null;
    }
    else {
        this._fetch_url = null;
        this.data = source;
    }
    this.specific = new specific(this);
};

Component.prototype = {
    _loaded: null,
    _fetch: function() { // get the material by AJAX if needed, and process the material afterward
        var that = this;
        if (this._fetch_url != null) {
            this.msg.msg(`fetching data ...`);
            $.post(this._fetch_url, {}, function(json) {
                that._loaded = true;
                that.msg.clear();
                json.msgs.forEach(function(m) {
                    that.msg.msg(m);
                });
                if (json.good) {
                    that.data = json.data;
                    that._process();
                }
            }, `json`);
        }
        else {
            this._process();
        }
    },
    _process: function() { // process new material obtained by an AJAX call
        this.specific.process();
        this.specific.apply(); // perform apply actions that are specific to this component
        this.page.apply(this.name); // apply other components, dependent on the routing information of the page
    },
    init: function() { // make the component
        this.container = $(`#${this.name}`);
        if (this.container.length == 0) {
            this._dst.append(`<div id="msg_${this.name}"></div>`);
            this._dst.append(`<div id="${this.name}"></div>`);
            this.container = $(`#${this.name}`);
        }
        this.msg = new Msg(`msg_${this.name}`);
        this._loaded = false;
    },
    apply: function() { // apply (changed) state to current material
        // show/hide depending on the specific condition
        if (this.specific.show()) {
            this.container.show();
            if (!this._loaded) { // and fetch data if needed
                this._fetch();
            }
            else {
                this.specific.apply(); // perform apply actions that are specific to this component
                this.page.apply(this.name); // apply other components, dependent on the routing information of the page
            }
        }
        else {
            this.container.hide();
        }
    },
};

