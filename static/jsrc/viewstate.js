/* VIEW STATE
 * Contains the current state, based on request variables and local storage.
 * Request variables have precedence over local storage.
 * Request variables are checked and validated and translated, translated values go to local storage.
 * There is a list of recognized request variables, with their types and allowable values.
 */

var g = require('./generic.js');

function ViewState(page) {
    this._data = {};
    this.page = page;
    this.msg = page.msg;
    this._getInitstate();
    this._addHistory();
};

ViewState.prototype = {
    _specs: {
        list: {url: true, type: `string`, values: {contrib: 1, country: 1, type: 1, tadiraha: 1, tadiraho: 1, tadiraht: 1}, default_value: `contrib`},
        flt_contrib: {url: false, type: `string`, values: null, default_value: ``},
        flt_country: {url: false, type: `string`, values: null, default_value: ``},
        flt_type: {url: false, type: `string`, values: null, default_value: ``},
        flt_tadiraha: {url: false, type: `string`, values: null, default_value: ``},
        flt_tadiraho: {url: false, type: `string`, values: null, default_value: ``},
        flt_tadiraht: {url: false, type: `string`, values: null, default_value: ``},
        rel_country_contrib: {url: false, type: `string`, values: null, default_value: ``},
        rel_type_contrib: {url: false, type: `string`, values: null, default_value: ``},
        rel_tadiraha_contrib: {url: false, type: `string`, values: null, default_value: ``},
        rel_tadiraho_contrib: {url: false, type: `string`, values: null, default_value: ``},
        rel_tadiraht_contrib: {url: false, type: `string`, values: null, default_value: ``},
        item_contrib: {url: true, type: `string`, values: null, default_value: ``},
        item_country: {url: true, type: `string`, values: null, default_value: ``},
        sort: {url: false, type: `boolean`, values: {v: true, x: false}, default_value: true}, 
    },
    _showas: {
        list: {
            contrib: {sg: `contribution`, pl: `contributions`},
            country: {sg: `country`, pl: `countries`},
            type: {sg: `type`, pl: `types`},
            tadiraha: {sg: `tadirah activity`, pl: `tadirah activities`},
            tadiraho: {sg: `tadirah object`, pl: `tadirah objects`},
            tadiraht: {sg: `tadirah technique`, pl: `tadirah techniques`},
        },
    },
    _validate: function(name, val) {
        var newval, message;
        if (name in this._specs) {
            var spec = this._specs[name];
            if (spec.type == `string`) {
                if (spec.values) {
                    if (val in spec.values) {
                        newval = val;
                    }
                    else {
                        newval = spec.default_value;
                        this.msg.msg(`illegal string value for ${name}: "${val}" is replaced by "${spec.default_value}"`, `warning`);
                    }
                }
                else {
                    newval = val;
                }
            }
            else if (spec.type == `integer`) {
                if (/^(\-|\+)?[0-9]+$/.test(val)) {
                    newval = Number(val);
                }
                else {
                    newval = spec.default_value;
                    this.msg.msg(`not a number value for ${name}: "${val}" is replaced by "${spec.default_value}"`, `warning`);
                }
                if (newval < spec.limits.min) {
                    this.msg.msg(`number to small for ${name}: "${newval}" is replaced by "${spec.limits.min}"`, `warning`);
                }
                if (newval > spec.limits.max) {
                    this.msg.msg(`number to big for ${name}: "${newval}" is replaced by "${spec.limits.max}"`, `warning`);
                }
            }
            else if (spec.type == `boolean`) {
                if (val in spec.values) {
                    newval = spec.values[val];
                }
                else {
                    newval = spec.default_value;
                    this.msg.msg(`illegal boolean value for ${name}: "${val}" is replaced by "${spec.default_value}"`, `warning`);
                }
            }
        }
        else {
            newval = null;
            this.msg.msg(`unknown parameter: ${name}=${val}`, `warning`);
        }
        return newval;
    },
    getVars: function(comprehensive) {
        var vars = [];
        for (var name in this._data) {
            var val = this._data[name];
            var spec = this._specs[name];
            if (comprehensive || spec.url) {
                if (spec.type == `string` || spec.type == `integer`) {vars.push(`${name}=${val}`)}
                else if (spec.type == `boolean`) {
                    for (var valid_val in spec.values) {
                        if (spec.values[valid_val] == val) {vars.push(`${name}=${valid_val}`)}
                    }
                }
            }
        }
        return vars.join(`&`)
    },
    _getInitstate: function() {
        for (var name in g.request_vars) {
            if (!(name in this._specs)) {
                this.msg.msg(`unknown parameter: ${name}=${val}`, `warning`);
            }
        }
        for (var name in this._specs) {
            var val = null;
            if (name in g.request_vars) {
                var raw_val = g.request_vars[name];
                val = this._validate(name, raw_val);
                g.localstorage_vars.set(name, val);
            }
            else if (g.localstorage_vars.isSet(name)) {
                val = g.localstorage_vars.get(name);
            }
            else {
                val = this._specs[name].default_value;
                g.localstorage_vars.set(name, val);
            }
            this._data[name] = val;
        }
    },
    _addHistory: function(title, view_url) {
        var tit = `DARIAH contribution tool`;
        var this_url = `${app_url}?${this.getVars(false)}`;
        History.pushState(this._data, tit, this_url);
    },
    setState: function(name, val) {
        this._data[name] = val;
        g.localstorage_vars.set(name, val);
        this._addHistory();
    },
    getState: function(name) {
        return this._data[name];
    },
    getValues: function(name) {
        return this._specs[name].values;
    },
    showState: function(name, val, mode) {
        var result = val;
        var md = (mode == undefined)?`sg`:mode;
        if (this._showas[name] != undefined && this._showas[name][val] != undefined) {
            result = this._showas[name][val][mode];
        }
        return result;
    },
    work: function() {
        return function () {
            var state = History.getState();
            if (state && state.data) {
                this._data = state.data;
                this.page.work();
            }
        }.bind(this)
    },
};

module.exports = ViewState;
