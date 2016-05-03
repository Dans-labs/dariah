/* VIEW STATE
 * Contains the current state, based on request variables and local storage.
 * Request variables have precedence over local storage.
 * Request variables are checked and validated and translated, translated values go to local storage.
 * There is a list of recognized request variables, with their types and allowable values.
 */

function ViewState(page) {
    this._data = {};
    this.init();
    this.page = page;
    this.msg = page.msg;
};

ViewState.prototype = {
    _specs: {
        list: {type: `string`, values: {contrib: 1, country: 1}, def: `contrib`},
        f_contrib: {type: `string`, values: null, def: ``},
        f_country: {type: `string`, values: null, def: ``},
        id: {type: `integer`, values: {min: -1, max: 1000000}, def: 0},
        sort: {type: `boolean`, values: {v: true, x: false}, def: true}, 
    },
    _showas: {
        list: {
            contrib: {sg: `contribution`, pl: `contributions`},
            country: {sg: `country`, pl: `countries`},
        },
    },
    _validate: function(name, val) {
        var newval, message;
        if (name in this._specs) {
            var s = this._specs[name];
            if (s.type == `string`) {
                if (s.values) {
                    if (val in s.values) {
                        newval = val;
                    }
                    else {
                        newval = s.def;
                        this.msg.msg(`illegal string value for ${name}: "${val}" is replaced by "${s.def}"`, `warning`);
                    }
                }
                else {
                    newval = val;
                }
            }
            else if (s.type == `integer`) {
                if (/^(\-|\+)?[0-9]+$/.test(val)) {
                    newval = Number(val);
                }
                else {
                    newval = s.def;
                    this.msg.msg(`not a number value for ${name}: "${val}" is replaced by "${s.def}"`, `warning`);
                }
            }
            else if (s.type == `boolean`) {
                if (val in s.values) {
                    newval = s.values[val];
                }
                else {
                    newval = s.def;
                    this.msg.msg(`illegal boolean value for ${name}: "${val}" is replaced by "${s.def}"`, `warning`);
                }
            }
        }
        else {
            newval = null;
            this.msg.msg(`unknown parameter: ${name}=${val}`, `warning`);
        }
        return newval;
    },
    _getvars: function() {
        vars = [];
        for (var name in this._data) {
            var val = this._data[name];
            var spec = this._specs[name];
            if (spec.type == `string` || spec.type == `integer`) {vars.push(`${name}=${val}`)}
            else if (spec.type == `boolean`) {
                for (z in spec.values) {
                    if (spec.values[z] == val) {vars.push(`${name}=${z}`)}
                }
            }
        }
        return vars.join(`&`)
    },
    _getinitstate: function() {
        for (var name in rvars) {
            if (!(name in this._specs)) {
                this.msg.msg(`unknown parameter: ${name}=${val}`, `warning`);
            }
        }
        for (var name in this._specs) {
            var val = null;
            if (name in rvars) {
                var raw_val = rvars[name];
                val = this._validate(name, raw_val);
                lvars.set(name, val);
            }
            else if (lvars.isSet(name)) {
                val = lvars.get(name);
            }
            else {
                val = this._specs[name].def;
                lvars.set(name, val);
            }
            this._data[name] = val;
        }
    },
    _addHist: function(title, view_url) {
        var tit = `DARIAH contribution tool`;
        var this_url = `${app_url}?${this._getvars()}`;
        History.pushState(this._data, tit, this_url);
    },
    setstate: function(name, val) {
        this._data[name] = val;
        lvars.set(name, val);
        this._addHist();
    },
    getstate: function(name) {
        return this._data[name];
    },
    getvalues: function(name) {
        return this._specs[name].values;
    },
    showstate: function(name, val, mode) {
        var result = val;
        var md = (mode == undefined)?`sg`:mode;
        if (this._showas[name] != undefined && this._showas[name][val] != undefined) {
            result = this._showas[name][val][mode];
        }
        return result;
    },
    init: function() {
        this._getinitstate();
        this._addHist();
    },
    apply: function() {
        var that = this;
        return function () {
            var state = History.getState();
            if (state && state.data) {
                that._data = state.data;
                that.page.apply(`page`);
            }
        }
    },
};

