/* VIEW STATE
 * Contains the current state, based on request variables and local storage.
 * Request variables have precedence over local storage.
 * Request variables are checked and validated and translated, translated ºvalues go to local storage.
 * There is a list of recognized request variables, with their ºtypes and allowable ºvalues.
 */

function ºViewState(ºpage) {
    this.º_data = {};
    this.ºpage = ºpage;
    this.ºmsg = ºpage.ºmsg;
    this.º_getInitstate();
    this.º_addHistory();
};

ºViewState.prototype = {
    º_specs: {
        list: {ºtype: `string`, ºvalues: {contrib: 1, country: 1, type: 1, tadiraha: 1, tadiraho: 1, tadiraht: 1}, ºdefault_value: `contrib`},
        flt_contrib: {ºtype: `string`, ºvalues: null, ºdefault_value: ``},
        flt_country: {ºtype: `string`, ºvalues: null, ºdefault_value: ``},
        flt_type: {ºtype: `string`, ºvalues: null, ºdefault_value: ``},
        flt_tadiraha: {ºtype: `string`, ºvalues: null, ºdefault_value: ``},
        flt_tadiraho: {ºtype: `string`, ºvalues: null, ºdefault_value: ``},
        flt_tadiraht: {ºtype: `string`, ºvalues: null, ºdefault_value: ``},
        rel_country_contrib: {ºtype: `string`, ºvalues: null, ºdefault_value: ``},
        rel_type_contrib: {ºtype: `string`, ºvalues: null, ºdefault_value: ``},
        rel_tadiraha_contrib: {ºtype: `string`, ºvalues: null, ºdefault_value: ``},
        rel_tadiraho_contrib: {ºtype: `string`, ºvalues: null, ºdefault_value: ``},
        rel_tadiraht_contrib: {ºtype: `string`, ºvalues: null, ºdefault_value: ``},
        id: {ºtype: `integer`, ºlimits: {ºmin: -1, ºmax: 1000000}, ºdefault_value: 0},
        sort: {ºtype: `boolean`, ºvalues: {v: true, x: false}, ºdefault_value: true}, 
    },
    º_showas: {
        list: {
            contrib: {ºsg: `contribution`, ºpl: `contributions`},
            country: {ºsg: `country`, ºpl: `countries`},
            type: {ºsg: `type`, ºpl: `types`},
            tadiraha: {ºsg: `tadirah activity`, ºpl: `tadirah activities`},
            tadiraho: {ºsg: `tadirah object`, ºpl: `tadirah objects`},
            tadiraht: {ºsg: `tadirah technique`, ºpl: `tadirah techniques`},
        },
    },
    º_validate: function(ºname, ºval) {
        var ºnewval, ºmessage;
        if (ºname in this.º_specs) {
            var ºspec = this.º_specs[ºname];
            if (ºspec.ºtype == `string`) {
                if (ºspec.ºvalues) {
                    if (ºval in ºspec.ºvalues) {
                        ºnewval = ºval;
                    }
                    else {
                        ºnewval = ºspec.ºdefault_value;
                        this.ºmsg.ºmsg(`illegal string value for ${ºname}: "${ºval}" is replaced by "${ºspec.ºdefault_value}"`, `warning`);
                    }
                }
                else {
                    ºnewval = ºval;
                }
            }
            else if (ºspec.ºtype == `integer`) {
                if (/^(\-|\+)?[0-9]+$/.test(ºval)) {
                    ºnewval = Number(ºval);
                }
                else {
                    ºnewval = ºspec.ºdefault_value;
                    this.ºmsg.ºmsg(`not a number value for ${ºname}: "${ºval}" is replaced by "${ºspec.ºdefault_value}"`, `warning`);
                }
                if (ºnewval < ºspec.ºlimits.ºmin) {
                    this.ºmsg.ºmsg(`number to small for ${ºname}: "${ºnewval}" is replaced by "${ºspec.ºlimits.ºmin}"`, `warning`);
                }
                if (ºnewval > ºspec.ºlimits.ºmax) {
                    this.ºmsg.ºmsg(`number to big for ${ºname}: "${ºnewval}" is replaced by "${ºspec.ºlimits.ºmax}"`, `warning`);
                }
            }
            else if (ºspec.ºtype == `boolean`) {
                if (ºval in ºspec.ºvalues) {
                    ºnewval = ºspec.ºvalues[ºval];
                }
                else {
                    ºnewval = ºspec.ºdefault_value;
                    this.ºmsg.ºmsg(`illegal boolean value for ${ºname}: "${ºval}" is replaced by "${ºspec.ºdefault_value}"`, `warning`);
                }
            }
        }
        else {
            ºnewval = null;
            this.ºmsg.ºmsg(`unknown parameter: ${ºname}=${ºval}`, `warning`);
        }
        return ºnewval;
    },
    º_getVars: function() {
        ºvars = [];
        for (var ºname in this.º_data) {
            var ºval = this.º_data[ºname];
            var ºspec = this.º_specs[ºname];
            if (ºspec.ºtype == `string` || ºspec.ºtype == `integer`) {ºvars.push(`${ºname}=${ºval}`)}
            else if (ºspec.ºtype == `boolean`) {
                for (var ºvalid_val in ºspec.ºvalues) {
                    if (ºspec.ºvalues[ºvalid_val] == ºval) {ºvars.push(`${ºname}=${ºvalid_val}`)}
                }
            }
        }
        return ºvars.join(`&`)
    },
    º_getInitstate: function() {
        for (var ºname in ºrequest_vars) {
            if (!(ºname in this.º_specs)) {
                this.ºmsg.ºmsg(`unknown parameter: ${ºname}=${ºval}`, `warning`);
            }
        }
        for (var ºname in this.º_specs) {
            var ºval = null;
            if (ºname in ºrequest_vars) {
                var ºraw_val = ºrequest_vars[ºname];
                ºval = this.º_validate(ºname, ºraw_val);
                ºlocalstorage_vars.set(ºname, ºval);
            }
            else if (ºlocalstorage_vars.isSet(ºname)) {
                ºval = ºlocalstorage_vars.get(ºname);
            }
            else {
                ºval = this.º_specs[ºname].ºdefault_value;
                ºlocalstorage_vars.set(ºname, ºval);
            }
            this.º_data[ºname] = ºval;
        }
    },
    º_addHistory: function(ºtitle, ºview_url) {
        var ºtit = `DARIAH contribution tool`;
        var ºthis_url = `${app_url}?${this.º_getVars()}`;
        History.pushState(this.º_data, ºtit, ºthis_url);
    },
    ºsetState: function(ºname, ºval) {
        this.º_data[ºname] = ºval;
        ºlocalstorage_vars.set(ºname, ºval);
        this.º_addHistory();
    },
    ºgetState: function(ºname) {
        return this.º_data[ºname];
    },
    ºgetValues: function(ºname) {
        return this.º_specs[ºname].ºvalues;
    },
    ºshowState: function(ºname, ºval, ºmode) {
        var ºresult = ºval;
        var ºmd = (ºmode == undefined)?`ºsg`:ºmode;
        if (this.º_showas[ºname] != undefined && this.º_showas[ºname][ºval] != undefined) {
            ºresult = this.º_showas[ºname][ºval][ºmode];
        }
        return ºresult;
    },
    ºwork: function() {
        return function () {
            var ºstate = History.getState();
            if (ºstate && ºstate.data) {
                this.º_data = ºstate.data;
                this.ºpage.ºwork();
            }
        }.bind(this)
    },
};

