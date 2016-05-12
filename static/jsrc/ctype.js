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
    this.ºtstate = {};
    this.ºtypes = {};
    this.ºtype = {};
    this.ºtype_on = {};
    this.ºtype_off = {};
};

ºCType.prototype = {
    º_html: function(ºsc) {
        var ºcols = 2;
        var ºh = `<div><p class="dctrl">By type</p>`;
        ºh += `<p class="all"><span ti="_all" class="stats"></span> <a id="t_all_${ºsc}" href="#" class="ctrls">all types</a></p>
<table class="clist" id="list-ctype_${ºsc}"><tr>`;
        for (var ºi in this.ºtypes[ºsc]) {
            if ((ºi % ºcols == 0) && (ºi > 0) && (ºi < this.ºtypes[ºsc].length)) {
                ºh += `</tr><tr>`;
            }
            var ºti = this.ºtypes[ºsc][ºi];
            var ºtv = this.ºtype[ºsc][ºti];
            ºh += `<td><span ti="${ºti}" class="stats"></span></td><td><a ti="${ºti}" href="#" class="ctrls">${ºtv}</a></td>`;
        }
        ºh += `</tr></table></div>`;
        this.ºcomp.ºcontainer[ºsc].html(ºh);
    },
    º_dressup: function(ºsc) {
        var ºthat = this;
        this.º_list[ºsc] = $(`#list-ctype_${ºsc}`);
        this.º_list[ºsc].find(`.ctrls`).click(function(ºe) {ºe.preventDefault();
            var ºti = $(this).attr(`ti`);
            var ºison = $(this).hasClass(`ison`);
            var ºsel = ºthat.º_from_str(ºthat.ºcomp.ºstate.ºgetstate(`t_${ºsc}`));
            ºsel[ºti] = !ºison;
            ºthat.ºcomp.ºstate.ºsetstate(`t_${ºsc}`, ºthat.º_to_str(ºsel));
        });
        this.º_allc[ºsc] = this.ºcomp.ºcontainer[ºsc].find(`#t_all_${ºsc}`);
        this.º_allc[ºsc].click(function(ºe) {ºe.preventDefault();
            var ºison = $(this).hasClass(`ison`);
            if (ºison) {
                ºthat.ºcomp.ºstate.ºsetstate(`t_${ºsc}`, ºthat.º_to_str(ºthat.ºtype_off[ºsc]));
            }
            else {
                ºthat.ºcomp.ºstate.ºsetstate(`t_${ºsc}`, ºthat.º_to_str(ºthat.ºtype_on[ºsc]));
            }
        });
    },
    º_set_flt: function(ºsc, ºrgs) {
        var ºthat = this;
        if (ºrgs == null || ºrgs == undefined || ºrgs == '') {ºrgs = this.º_from_str(``)}
        var ºall_sel = true;
        for (var ºti in this.ºtype[ºsc]) {
            var ºccell = this.º_list[ºsc].find(`a[ti="${ºti}"]`);
            if (ºti in ºrgs && ºrgs[ºti]) {
                ºccell.addClass(`ison`);
            }
            else {
                ºccell.removeClass(`ison`, ºccell);
                ºall_sel = false;
            }
        }
        if (ºall_sel) {
            this.º_allc[ºsc].addClass(`ison`);
        }
        else {
            this.º_allc[ºsc].removeClass(`ison`);
        }
    },
    º_to_str: function(ºob) {
        var ºar = [];
        for (var x in ºob) {
            if (ºob[x]) {
                ºar.push(x);
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
        for (var ºti in this.ºtype[ºsc]) {
            this.º_sts[ºsc][ºti] = 0;
        } 
        for (var x in this.ºfltd[ºsc]) {
            var ºi = this.ºfltd[ºsc][x];
            var ºtis = this.º_data[ºsc][ºi][3];
            for (var ºti in ºtis) {
                this.º_sts[ºsc][ºti] += 1;
            }
        }
        for (var ºti in this.º_sts[ºsc]) {
            this.ºcomp.ºcontainer[ºsc].find(`span[ti="${ºti}"].stats`).html(this.º_sts[ºsc][ºti]);
        }
        this.ºcomp.ºcontainer[ºsc].find(`span[ti="_all"].stats`).html(this.ºfltd[ºsc].length);
    },
    ºv: function(ºsc, ºi) {
        var ºtis =  this.º_data[ºsc][ºi][3];
        var ºtstate = this.º_from_str(this.ºtstate[ºsc]);
        for (var ºti in ºtis) {
            if ((ºti in ºtstate) && ºtstate[ºti]) {
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
        this.ºtypes[ºsc] = [];
        this.ºtype[ºsc] = {};
        this.ºtype_off[ºsc] = {};
        this.ºtype_on[ºsc] = {};
        for (var ºti in this.º_relvals[ºsc].type) {
            var ºtv = this.º_relvals[ºsc].type[ºti];
            this.ºtype_off[ºsc][ºti] = false;
            this.ºtype_on[ºsc][ºti] = true;
            this.ºtypes[ºsc].push(ºti);
            this.ºtype[ºsc][ºti] = ºtv;
        }
        this.ºtypes[ºsc].sort();
        this.º_html(ºsc);
        this.º_dressup(ºsc);
    },
    ºwork: function(ºsc) {},
    ºwork_flt: function(ºsc) {
        this.ºtstate[ºsc] = this.ºcomp.ºstate.ºgetstate(`t_${ºsc}`);
        this.º_set_flt(ºsc, this.º_from_str(this.ºtstate[ºsc]));
    },
};
