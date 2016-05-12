/* VIEW STATE
 * Contains the current state, based on request variables and local storage.
 * Request variables have precedence over local storage.
 * Request variables are checked and validated and translated, translated values go to local storage.
 * There is a list of recognized request variables, with their types and allowable values.
 */

function µViewState(µpage) {
    this._µdata = {};
    this.µpage = µpage;
    this.µmsg = µpage.µmsg;
    this._µgetinitstate();
    this._µaddHist();
};

µViewState.prototype = {
    _µspecs: {
        list: {µtype: `string`, values: {contrib: 1, country: 1}, def: `contrib`},
        f_contrib: {µtype: `string`, values: null, def: ``},
        f_country: {µtype: `string`, values: null, def: ``},
        m_contrib: {µtype: `string`, values: null, def: ``},
        m_country: {µtype: `string`, values: null, def: ``},
        t_contrib: {µtype: `string`, values: null, def: ``},
        t_country: {µtype: `string`, values: null, def: ``},
        id: {µtype: `integer`, values: {min: -1, max: 1000000}, def: 0},
        sort: {µtype: `boolean`, values: {v: true, x: false}, def: true}, 
    },
    _showas: {
        list: {
            contrib: {sg: `contribution`, pl: `contributions`},
            country: {sg: `country`, pl: `countries`},
        },
    },
    _validate: function(name, val) {
        var newval, message;
        if (name in this._µspecs) {
            var s = this._µspecs[name];
            if (s.µtype == `string`) {
                if (s.values) {
                    if (val in s.values) {
                        newval = val;
                    }
                    else {
                        newval = s.def;
                        this.µmsg.µmsg(`illegal string value for ${name}: "${val}" is replaced by "${s.def}"`, `warning`);
                    }
                }
                else {
                    newval = val;
                }
            }
            else if (s.µtype == `integer`) {
                if (/^(\-|\+)?[0-9]+$/.test(val)) {
                    newval = Number(val);
                }
                else {
                    newval = s.def;
                    this.µmsg.µmsg(`not a number value for ${name}: "${val}" is replaced by "${s.def}"`, `warning`);
                }
            }
            else if (s.µtype == `boolean`) {
                if (val in s.values) {
                    newval = s.values[val];
                }
                else {
                    newval = s.def;
                    this.µmsg.µmsg(`illegal boolean value for ${name}: "${val}" is replaced by "${s.def}"`, `warning`);
                }
            }
        }
        else {
            newval = null;
            this.µmsg.µmsg(`unknown parameter: ${name}=${val}`, `warning`);
        }
        return newval;
    },
    _getvars: function() {
        vars = [];
        for (var name in this._µdata) {
            var val = this._µdata[name];
            var spec = this._µspecs[name];
            if (spec.µtype == `string` || spec.µtype == `integer`) {vars.push(`${name}=${val}`)}
            else if (spec.µtype == `boolean`) {
                for (z in spec.values) {
                    if (spec.values[z] == val) {vars.push(`${name}=${z}`)}
                }
            }
        }
        return vars.join(`&`)
    },
    _µgetinitstate: function() {
        for (var name in rvars) {
            if (!(name in this._µspecs)) {
                this.µmsg.µmsg(`unknown parameter: ${name}=${val}`, `warning`);
            }
        }
        for (var name in this._µspecs) {
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
                val = this._µspecs[name].def;
                lvars.set(name, val);
            }
            this._µdata[name] = val;
        }
    },
    _µaddHist: function(title, view_url) {
        var tit = `DARIAH contribution tool`;
        var this_url = `${app_url}?${this._getvars()}`;
        History.pushState(this._µdata, tit, this_url);
    },
    setstate: function(name, val) {
        this._µdata[name] = val;
        lvars.set(name, val);
        this._µaddHist();
    },
    getstate: function(name) {
        return this._µdata[name];
    },
    getvalues: function(name) {
        return this._µspecs[name].values;
    },
    showstate: function(name, val, mode) {
        var result = val;
        var md = (mode == undefined)?`sg`:mode;
        if (this._showas[name] != undefined && this._showas[name][val] != undefined) {
            result = this._showas[name][val][mode];
        }
        return result;
    },
    work: function() {
        var that = this;
        return function () {
            var state = History.getState();
            if (state && state.data) {
                that._µdata = state.data;
                that.µpage.work();
            }
        }
    },
};

