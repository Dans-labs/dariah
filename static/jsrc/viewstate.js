/* VIEW STATE
 * Contains the current state, based on request variables and local storage.
 * Request variables have precedence over local storage.
 * Request variables are checked and validated and translated, translated values go to local storage.
 * There is a list of recognized request variables, with their types and allowable values.
 */

function ViewState(page) {
    this.page = page;
    this.msg = page.msg;
    this.data = {};
    this.init();
};

ViewState.prototype = {
    specs: {
        list: {type: `string`, values: {contrib: 1, country: 1}, def: `contrib`},
        greet: {type: `string`, values: null, def: `hallo`},
        id: {type: `integer`, values: {min: -1, max: 1000000}, def: 0},
        sort: {type: `boolean`, values: {v: true, x: false}, def: true}, 
    },
    showas: {
        contrib: {sg: 'contribution', pl: 'contributions'},
        country: {sg: 'country', pl: 'countries'},
    },
    validate: function(name, val) {
        var newval, message;
        if (name in this.specs) {
            var s = this.specs[name];
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
    getvars: function() {
        vars = [];
        for (var name in this.data) {
            var val = this.data[name];
            var spec = this.specs[name];
            if (spec.type == `string` || spec.type == `integer`) {vars.push(`${name}=${val}`)}
            else if (spec.type == `boolean`) {
                for (z in spec.values) {
                    if (spec.values[z] == val) {vars.push(`${name}=${z}`)}
                }
            }
        }
        return vars.join('&')
    },
    setstate: function(name, val) {
        this.data[name] = val;
        lvars.set(name, val);
        this.addHist();
    },
    getinitstate: function() {
        for (var name in rvars) {
            if (!(name in this.specs)) {
                this.msg.msg(`unknown parameter: ${name}=${val}`, `warning`);
            }
        }
        for (var name in this.specs) {
            var val = null;
            if (name in rvars) {
                var raw_val = rvars[name];
                val = this.validate(name, raw_val);
                lvars.set(name, val);
            }
            else if (lvars.isSet(name)) {
                val = lvars.get(name);
            }
            else {
                val = this.specs[name].def;
                lvars.set(name, val);
            }
            this.data[name] = val;
        }
    },
    goback: function(ob) {
        return function () {
            var state = History.getState();
            if (state && state.data) {
                ob.apply(state);
            }
        }
    },
    addHist: function(title, view_url) {
        var tit = `DARIAH contribution tool`;
        var this_url = `${app_url}?${this.getvars()}`;
        History.pushState(this.data, tit, this_url);
    },
    apply: function(state) {
        if (state.data != undefined) {
            this.data = state.data;
        }
        this.page.apply();
    },
    init: function() {
        this.getinitstate();
        this.addHist();
    },
};

