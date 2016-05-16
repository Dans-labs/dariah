/* INDIVIDUAL COMPONENT: ctype
 * This manages the facet "contribution type"
 */

function ºCType(ºcomp) {
    this.ºcomp = ºcomp;
    this.ºname = `ctype`;
    this.ºfacet = this.ºcomp.ºpage.ºgetcomp(`facet`).ºdelg;
    this.ºfltd = {};
    this.º_data = {};
    this.º_relvals = {};
    this.º_list = {};
    this.º_allc = {};
    this.º_sts = {};
    this.ºrstate = {};
    this.ºrvalues = {};
    this.ºrvalue = {};
    this.ºrvalues_on = {};
    this.ºrvalues_off = {};
};

ºCType.prototype = {
    º_html: function(ºsc) {
        var ºcols = 2;
        var ºh = `<div><p class="•dctrl">By type</p>`;
        ºh += `<p class="•all"><span rv="_all" class="•stats"></span> <a rv="_all" href="#" class="•control_med">all types</a></p>
<table class="•value_list" id="list-ctype_${ºsc}"><tr>`;
        for (var ºi in this.ºrvalues[ºsc]) {
            if ((ºi % ºcols == 0) && (ºi > 0) && (ºi < this.ºrvalues[ºsc].length)) {
                ºh += `</tr><tr>`;
            }
            var ºrv = this.ºrvalues[ºsc][ºi];
            var ºvv = this.ºrvalue[ºsc][ºrv];
            ºh += `<td><span rv="${ºrv}" class="•stats"></span></td><td><a rv="${ºrv}" href="#" class="•control_small">${ºvv}</a></td>`;
        }
        ºh += `</tr></table></div>`;
        this.ºcomp.ºcontainer[ºsc].html(ºh);
    },
    º_dressup: function(ºsc) {
        var ºthat = this;
        this.º_list[ºsc] = $(`#list-ctype_${ºsc}`);
        this.º_list[ºsc].find(`.•control_small`).click(function(ºe) {ºe.preventDefault();
            var ºrv = $(this).attr(`rv`);
            var ºsel = ºthat.º_from_str(ºthat.ºcomp.ºstate.ºgetstate(`t_${ºsc}`));
            ºsel[ºrv] = (ºrv in ºsel)?!ºsel[ºrv]:true;
            ºthat.ºcomp.ºstate.ºsetstate(`t_${ºsc}`, ºthat.º_to_str(ºsel));
        });
        this.º_allc[ºsc] = this.ºcomp.ºcontainer[ºsc].find(`[rv="_all"]`);
        this.º_allc[ºsc].click(function(ºe) {ºe.preventDefault();
            var ºison = $(this).hasClass(`•ison`);
            if (ºison) {
                ºthat.ºcomp.ºstate.ºsetstate(`t_${ºsc}`, ºthat.º_to_str(ºthat.ºrvalues_off[ºsc]));
            }
            else {
                ºthat.ºcomp.ºstate.ºsetstate(`t_${ºsc}`, ºthat.º_to_str(ºthat.ºrvalues_on[ºsc]));
            }
        });
    },
    º_set_flt: function(ºsc, ºrgs) {
        var ºthat = this;
        if (ºrgs == null || ºrgs == undefined || ºrgs == '') {ºrgs = this.º_from_str(``)}
        var ºall_sel = true;
        for (var ºrv in this.ºrvalue[ºsc]) {
            var ºccell = this.º_list[ºsc].find(`[rv="${ºrv}"]`);
            if (ºrv in ºrgs && ºrgs[ºrv]) {
                ºccell.addClass(`•ison`);
            }
            else {
                ºccell.removeClass(`•ison`, ºccell);
                ºall_sel = false;
            }
        }
        if (ºall_sel) {
            this.º_allc[ºsc].addClass(`•ison`);
        }
        else {
            this.º_allc[ºsc].removeClass(`•ison`);
        }
    },
    º_to_str: function(ºob) {
        var ºar = [];
        for (var ºx in ºob) {
            if (ºob[ºx]) {
                ºar.push(ºx);
            }
        }
        return ºar.join(',');
    },
    º_from_str: function(ºst) {
        var ºob = {};
        if (ºst !== null && ºst != undefined && ºst != '') {
            var ºar = ºst.split(',');
            for (var ºi in ºar) {
                ºob[ºar[ºi]] = true;
            }
        }
        return ºob;
    },
    ºstats: function(ºsc) {
        var ºthat = this;
        this.º_sts[ºsc] = {};
        for (var ºrv in this.ºrvalue[ºsc]) {
            this.º_sts[ºsc][ºrv] = 0;
        } 
        for (var ºx in this.ºfltd[ºsc]) {
            var ºi = this.ºfltd[ºsc][ºx];
            var ºrvs = this.º_data[ºsc][ºi][3];
            for (var ºrv in ºrvs) {
                this.º_sts[ºsc][ºrv] += 1;
            }
        }
        for (var ºrv in this.º_sts[ºsc]) {
            this.ºcomp.ºcontainer[ºsc].find(`span[rv="${ºrv}"].•stats`).html(this.º_sts[ºsc][ºrv]);
        }
        this.ºcomp.ºcontainer[ºsc].find(`span[rv="_all"].•stats`).html(this.ºfltd[ºsc].length);
    },
    ºv: function(ºsc, ºi) {
        var ºrvs =  this.º_data[ºsc][ºi][3];
        var ºrstate = this.º_from_str(this.ºrstate[ºsc]);
        if (Object.keys(ºrvs).length != 0) {
            for (var ºrv in ºrvs) {
                if ((ºrv in ºrstate) && ºrstate[ºrv]) {
                    return true;
                }
            }
        }
        else {
            if (this.ºrstate[ºsc] == '-') {
                return true;
            }
        }
        return false;
    },
    ºshow: function(ºsc) {
        return (this.ºcomp.ºstate.ºgetstate(`list`) == ºsc);
    },
    ºweld: function(ºsc) {},
    ºwire: function(ºsc) {},
    ºwire_flt: function(ºsc) {
        this.º_listc = this.ºcomp.ºpage.ºgetcomp(`list`);
        this.º_data[ºsc] = this.º_listc.ºdata[ºsc];
        this.º_relvals[ºsc] = this.º_listc.ºrelvals[ºsc];
        this.ºrvalues[ºsc] = [];
        this.ºrvalue[ºsc] = {};
        this.ºrvalues_off[ºsc] = {};
        this.ºrvalues_on[ºsc] = {};
        for (var ºrv in this.º_relvals[ºsc].type) {
            var ºvv = this.º_relvals[ºsc].type[ºrv];
            this.ºrvalues_off[ºsc][ºrv] = false;
            this.ºrvalues_on[ºsc][ºrv] = true;
            this.ºrvalues[ºsc].push(ºrv);
            this.ºrvalue[ºsc][ºrv] = ºvv;
        }
        this.ºrvalues[ºsc].sort();
        this.º_html(ºsc);
        this.º_dressup(ºsc);
    },
    ºwork: function(ºsc) {},
    ºwork_flt: function(ºsc) {
        this.ºrstate[ºsc] = this.ºcomp.ºstate.ºgetstate(`t_${ºsc}`);
        this.º_set_flt(ºsc, this.º_from_str(this.ºrstate[ºsc]));
    },
};
