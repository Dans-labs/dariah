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
    this.º_getinitstate();
    this.º_addHist();
};

ºViewState.prototype = {
    º_specs: {
        list: {ºtype: `string`, ºvalues: {contrib: 1, country: 1}, ºdef: `contrib`},
        f_contrib: {ºtype: `string`, ºvalues: null, ºdef: ``},
        f_country: {ºtype: `string`, ºvalues: null, ºdef: ``},
        m_contrib: {ºtype: `string`, ºvalues: null, ºdef: ``},
        m_country: {ºtype: `string`, ºvalues: null, ºdef: ``},
        t_contrib: {ºtype: `string`, ºvalues: null, ºdef: ``},
        t_country: {ºtype: `string`, ºvalues: null, ºdef: ``},
        id: {ºtype: `integer`, ºvalues: {ºmin: -1, ºmax: 1000000}, ºdef: 0},
        sort: {ºtype: `boolean`, ºvalues: {v: true, x: false}, ºdef: true}, 
    },
    º_showas: {
        list: {
            contrib: {ºsg: `contribution`, ºpl: `contributions`},
            country: {ºsg: `country`, ºpl: `countries`},
        },
    },
    º_validate: function(ºname, ºval) {
        var ºnewval, ºmessage;
        if (ºname in this.º_specs) {
            var ºs = this.º_specs[ºname];
            if (ºs.ºtype == `string`) {
                if (ºs.ºvalues) {
                    if (ºval in ºs.ºvalues) {
                        ºnewval = ºval;
                    }
                    else {
                        ºnewval = ºs.ºdef;
                        this.ºmsg.ºmsg(`illegal string value for ${ºname}: "${ºval}" is replaced by "${ºs.ºdef}"`, `warning`);
                    }
                }
                else {
                    ºnewval = ºval;
                }
            }
            else if (ºs.ºtype == `integer`) {
                if (/^(\-|\+)?[0-9]+$/.test(ºval)) {
                    ºnewval = Number(ºval);
                }
                else {
                    ºnewval = ºs.ºdef;
                    this.ºmsg.ºmsg(`not a number value for ${ºname}: "${ºval}" is replaced by "${ºs.ºdef}"`, `warning`);
                }
            }
            else if (ºs.ºtype == `boolean`) {
                if (ºval in ºs.ºvalues) {
                    ºnewval = ºs.ºvalues[ºval];
                }
                else {
                    ºnewval = ºs.ºdef;
                    this.ºmsg.ºmsg(`illegal boolean value for ${ºname}: "${ºval}" is replaced by "${ºs.ºdef}"`, `warning`);
                }
            }
        }
        else {
            ºnewval = null;
            this.ºmsg.ºmsg(`unknown parameter: ${ºname}=${ºval}`, `warning`);
        }
        return ºnewval;
    },
    º_getvars: function() {
        ºvars = [];
        for (var ºname in this.º_data) {
            var ºval = this.º_data[ºname];
            var ºspec = this.º_specs[ºname];
            if (ºspec.ºtype == `string` || ºspec.ºtype == `integer`) {ºvars.push(`${ºname}=${ºval}`)}
            else if (ºspec.ºtype == `boolean`) {
                for (ºz in ºspec.ºvalues) {
                    if (ºspec.ºvalues[ºz] == ºval) {ºvars.push(`${ºname}=${ºz}`)}
                }
            }
        }
        return ºvars.join(`&`)
    },
    º_getinitstate: function() {
        for (var ºname in ºrvars) {
            if (!(ºname in this.º_specs)) {
                this.ºmsg.ºmsg(`unknown parameter: ${ºname}=${ºval}`, `warning`);
            }
        }
        for (var ºname in this.º_specs) {
            var ºval = null;
            if (ºname in ºrvars) {
                var ºraw_val = ºrvars[ºname];
                ºval = this.º_validate(ºname, ºraw_val);
                ºlvars.set(ºname, ºval);
            }
            else if (ºlvars.isSet(ºname)) {
                ºval = ºlvars.get(ºname);
            }
            else {
                ºval = this.º_specs[ºname].ºdef;
                ºlvars.set(ºname, ºval);
            }
            this.º_data[ºname] = ºval;
        }
    },
    º_addHist: function(ºtitle, ºview_url) {
        var ºtit = `DARIAH contribution tool`;
        var ºthis_url = `${app_url}?${this.º_getvars()}`;
        History.pushState(this.º_data, ºtit, ºthis_url);
    },
    ºsetstate: function(ºname, ºval) {
        this.º_data[ºname] = ºval;
        ºlvars.set(ºname, ºval);
        this.º_addHist();
    },
    ºgetstate: function(ºname) {
        return this.º_data[ºname];
    },
    ºgetvalues: function(ºname) {
        return this.º_specs[ºname].ºvalues;
    },
    ºshowstate: function(ºname, ºval, ºmode) {
        var ºresult = ºval;
        var ºmd = (ºmode == undefined)?`ºsg`:ºmode;
        if (this.º_showas[ºname] != undefined && this.º_showas[ºname][ºval] != undefined) {
            ºresult = this.º_showas[ºname][ºval][ºmode];
        }
        return ºresult;
    },
    ºwork: function() {
        var ºthat = this;
        return function () {
            var ºstate = History.getState();
            if (ºstate && ºstate.data) {
                ºthat.º_data = ºstate.data;
                ºthat.ºpage.ºwork();
            }
        }
    },
};

