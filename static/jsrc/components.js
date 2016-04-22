/* COMPONENTS 
 * The Page function specifies and builds a list of components
 * Every component on the page corresponds to a function (with a prototype)
 * This function is stored in a generic Component function in a field called methods.
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

/* COLLECTION of List COMPONENTS
 * This is an array of all the main list components
 */

var List = {
    contrib: List_contrib,
    country: List_country,
};

/* GENERIC COMPONENT
 * Here is the generic functionality of each component
 */

function Component(dest, name, source, methods, page) {
    this.dest = $(`#${dest}`);
    this.name = name;
    this.page = page;
    if (typeof source == 'string') {
        this.fetch_url = url_tpl.replace(/_c_/, `data`).replace(/_f_/, source)+`.json`;
        this.data = null;
    }
    else {
        this.fetch_url = null;
        this.data = source;
    }
    this.loaded = false;
    this.methods = new methods(this);
};

Component.prototype = {
    loaded: null,
    init: function() { // make the component
        this.container = $(`#${this.name}`);
        if (this.container.length == 0) {
            this.dest.append(`<div id="msg_${this.name}"></div>`);
            this.dest.append(`<div id="${this.name}"></div>`);
            this.container = $(`#${this.name}`);
        }
        this.msg = new Msg(`msg_${this.name}`);
        this.loaded = false;
    },
    apply: function() { // apply (changed) state to current material
        if (this.methods.show()) {
            this.container.show();
            if (!this.loaded) {
                this.fetch();
            }
        }
        else {
            this.container.hide();
        }
        this.methods.apply();
    },
    fetch: function() { // get the material by AJAX if needed, and process the material afterward
        var that = this;
        if (this.fetch_url != null) {
            this.msg.msg(`fetching data ...`);
            $.post(this.fetch_url, {}, function(json) {
                that.loaded = true;
                that.msg.clear();
                json.msgs.forEach(function(m) {
                    that.msg.msg(m);
                });
                if (json.good) {
                    that.data = json.data;
                    that.process();
                }
            }, `json`);
        }
        else {
            this.process();
        }
    },
    process: function() { // process new material obtained by an AJAX call
        this.methods.process();
    },
};

