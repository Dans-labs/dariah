/* INDIVIDUAL COMPONENT: ctype
 * This manages the facet "contribution type"
 */

function ºCType(ºcomp) {
    this.ºcomp = ºcomp;
    this.ºfacet = this.ºcomp.ºpage.ºget_component(`ºfacet`).ºdelg;
    this.ºdistilled = {};
    this.ºrelated_state = {};
    this.º_list = {};
    this.º_allc = {};
    this.º_sts = {};
    this.ºrstate = {};
    this.ºrvalues = {};
    this.ºrvalue = {};
    this.ºrvalues_on = {};
    this.ºrvalues_off = {};
    this.ºall_category = {ºvalue: `-`, ºname: `-none`};
};

ºCType.prototype = {
    º_html: function(ºsc) {
        var ºcols = 2;
        var ºh = `<div><p class="•dctrl">By type</p>`;
        ºh += `<p class="•all"><span rv="_all" class="•stats"></span> <a rv="_all" href="#" class="•control_med">all types</a></p>
<table class="•value_list" id="list-ctype_${ºsc}"><tr>`;
        this.ºrvalues[ºsc].forEach(function(ºrel_val, ºi, ºar) {
            if ((ºi % ºcols == 0) && (ºi > 0) && (ºi < ºar.length)) {
                ºh += `</tr><tr>`;
            }
            ºh += `<td><span rv="${ºrel_val}" class="•stats"></span></td><td><a rv="${ºrel_val}" href="#" class="•control_small">${this.ºrvalue[ºsc][ºrel_val]}</a></td>`;
        }, this);
        ºh += `</tr></table></div>`;
        this.ºcomp.ºcontainer[ºsc].html(ºh);
    },
    º_dressup: function(ºsc) {
        var ºthat = this;
        this.º_list[ºsc] = $(`#list-ctype_${ºsc}`);
        this.º_list[ºsc].find(`.•control_small`).click(function(ºe) {ºe.preventDefault();
            var ºrel_val = $(this).attr(`rv`);
            var ºsel = ºthat.º_from_str(ºsc, ºthat.ºcomp.ºstate.ºgetstate(`t_${ºsc}`));
            ºsel[ºrel_val] = (ºrel_val in ºsel)?!ºsel[ºrel_val]:true;
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
    º_set_flt: function(ºsc, ºrel_vals) {
        var ºall_sel = true;
        for (var ºrel_val in this.ºrvalue[ºsc]) {
            var ºccell = this.º_list[ºsc].find(`[rv="${ºrel_val}"]`);
            if (ºrel_val in ºrel_vals && ºrel_vals[ºrel_val]) {
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
    º_from_str: function(ºsc, ºst) {
        var ºob = {};
        if (ºst !== null && ºst != undefined && ºst != '') {
            var ºar = ºst.split(',');
            ºar.forEach(function(ºv) {
                ºob[ºv] = true;
            });
        }
        for (var ºrel_val in this.ºrvalue[ºsc]) {
            if (!(ºrel_val in ºob)) {
                ºob[ºrel_val] = false;
            }
        }
        return ºob;
    },
    ºstats: function(ºsc) {
        this.º_sts[ºsc] = {};
        for (var ºrel_val in this.ºrvalue[ºsc]) {
            this.º_sts[ºsc][ºrel_val] = 0;
        } 
        var ºrelated_data = this.ºcomp.ºdata[ºsc];
        for (var ºx in this.ºdistilled[ºsc]) {
            var ºi = this.ºdistilled[ºsc][ºx];
            var ºhas_rv = false;
            for (var ºrel_val in ºrelated_data[ºi]) {
                this.º_sts[ºsc][ºrel_val] += 1;
                ºhas_rv = true;
            }
            if (!ºhas_rv) {
                this.º_sts[ºsc][this.ºall_category.ºvalue] += 1;
            }
        }
        for (var ºrel_val in this.º_sts[ºsc]) {
            this.ºcomp.ºcontainer[ºsc].find(`span[rv="${ºrel_val}"].•stats`).html(this.º_sts[ºsc][ºrel_val]);
        }
        this.ºcomp.ºcontainer[ºsc].find(`span[rv="_all"].•stats`).html(this.ºdistilled[ºsc].length);
    },
    ºv: function(ºsc, ºi) {
        var ºrelated_data =  this.ºcomp.ºdata[ºsc];
        var ºrelated_state = this.º_from_str(ºsc, this.ºrelated_state[ºsc]);
        if ((ºi in ºrelated_data) && (Object.keys(ºrelated_data[ºi]).length != 0)) {
            for (var ºrel_val in ºrelated_data[ºi]) {
                if ((ºrel_val in ºrelated_state) && ºrelated_state[ºrel_val]) {
                    return true;
                }
            }
        }
        else {
            if ((this.ºall_category.ºvalue in ºrelated_state) && (ºrelated_state[this.ºall_category.ºvalue])) {
                return true;
            }
        }
        return false;
    },
    ºshow: function(ºsc) {
        return (this.ºcomp.ºstate.ºgetstate(`list`) == ºsc);
    },
    ºweld: function(ºsc) {
        this.ºrvalues[ºsc] = [];
        this.ºrvalue[ºsc] = {};
        this.ºrvalues_off[ºsc] = {};
        this.ºrvalues_on[ºsc] = {};
        var ºrelvals = this.ºcomp.ºrelvals[ºsc];
        for (var ºi in ºrelvals) {
            var ºrel_val = ºrelvals[ºi];
            this.ºrvalues_off[ºsc][ºi] = false;
            this.ºrvalues_on[ºsc][ºi] = true;
            this.ºrvalues[ºsc].push(ºi);
            this.ºrvalue[ºsc][ºi] = ºrel_val;
        }
        this.ºrvalues[ºsc].push(this.ºall_category.ºvalue);
        this.ºrvalue[ºsc][this.ºall_category.ºvalue] = this.ºall_category.ºname;
        this.ºrvalues_off[ºsc][this.ºall_category.ºvalue] = false;
        this.ºrvalues_on[ºsc][this.ºall_category.ºvalue] = true;
        this.ºrvalues[ºsc].sort();
        this.º_html(ºsc);
    },
    ºwire: function(ºsc) {
        if (!this.ºfacet) {
            this.ºfacet = this.ºcomp.ºpage.ºget_component(`ºfacet`).ºdelg;
        }
        this.º_dressup(ºsc);
    },
    ºwork: function(ºsc) {
        this.ºrelated_state[ºsc] = this.ºcomp.ºstate.ºgetstate(`t_${ºsc}`);
        this.º_set_flt(ºsc, this.º_from_str(ºsc, this.ºrelated_state[ºsc]));
    },
};
