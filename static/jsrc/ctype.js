/* INDIVIDUAL COMPONENT: ctype
 * This manages the facet "contribution type"
 */

function ºCType(ºcomponent) {
    this.ºcomponent = ºcomponent;
    this.ºdistilled = {};
    this.º_list = {};
    this.º_related_state = {};
    this.º_all_values_control = {};
    this.º_statistics = {};
    this.º_related_values_list = {};
    this.º_related_values_index = {};
    this.º_related_values_on = {};
    this.º_related_values_off = {};
    this.º_no_values = {ºvalue: `-`, ºname: `-none`};
    this.º_type = `type`;
};

ºCType.prototype = {
    º_html: function(ºsc) {
        var ºcols = 2;
        var ºtype_sg = this.ºcomponent.ºstate.ºshowState(`list`, this.º_type, `ºsg`);
        var ºtype_pl = this.ºcomponent.ºstate.ºshowState(`list`, this.º_type, `ºpl`);
        var ºh = `<div><p class="•dctrl">By ${ºtype_sg}</p>`;
        ºh += `<p class="•all"><span rv="_all" class="•stats"></span> <a rv="_all" href="#" class="•control_med">all ${ºtype_pl}</a></p>
<table class="•value_list" id="list-${this.º_type}-vals_${ºsc}"><tr>`;
        this.º_related_values_list[ºsc].forEach(function(ºrelated_value, ºi, ºar) {
            if ((ºi % ºcols == 0) && (ºi > 0) && (ºi < ºar.length)) {
                ºh += `</tr><tr>`;
            }
            ºh += `<td><span rv="${ºrelated_value}" class="•stats"></span></td><td><a rv="${ºrelated_value}" href="#" class="•control_small">${this.º_related_values_index[ºsc][ºrelated_value]}</a></td>`;
        }, this);
        ºh += `</tr></table></div>`;
        this.ºcomponent.ºcontainer[ºsc].html(ºh);
    },
    º_dressup: function(ºsc) {
        var ºcc = this.ºcomponent.ºcontainer[ºsc];
        this.º_list[ºsc] = ºcc.find(`#list-${this.º_type}-vals_${ºsc}`);
        var ºthat = this;
        this.º_list[ºsc].find(`.•control_small`).click(function(ºe) {ºe.preventDefault();
            var ºrelated_value = $(this).attr(`rv`);
            var ºselected = ºthat.º_from_str(ºsc, ºthat.ºcomponent.ºstate.ºgetState(`rel_${ºthat.º_type}_${ºsc}`));
            ºselected[ºrelated_value] = (ºrelated_value in ºselected)?!ºselected[ºrelated_value]:true;
            ºthat.ºcomponent.ºstate.ºsetState(`rel_${ºthat.º_type}_${ºsc}`, ºthat.º_to_str(ºselected));
        });
        this.º_all_values_control[ºsc] = this.ºcomponent.ºcontainer[ºsc].find(`[rv="_all"]`);
        this.º_all_values_control[ºsc].click(function(ºe) {ºe.preventDefault();
            var ºison = $(this).hasClass(`•ison`);
            if (ºison) {
                ºthat.ºcomponent.ºstate.ºsetState(`rel_${ºthat.º_type}_${ºsc}`, ºthat.º_to_str(ºthat.º_related_values_off[ºsc]));
            }
            else {
                ºthat.ºcomponent.ºstate.ºsetState(`rel_${ºthat.º_type}_${ºsc}`, ºthat.º_to_str(ºthat.º_related_values_on[ºsc]));
            }
        });
    },
    º_setFacet: function(ºsc, ºrelated_values) {
        var ºall_selected = true;
        for (var ºrelated_value in this.º_related_values_index[ºsc]) {
            var ºfacet_cell = this.º_list[ºsc].find(`[rv="${ºrelated_value}"]`);
            if (ºrelated_value in ºrelated_values && ºrelated_values[ºrelated_value]) {
                ºfacet_cell.addClass(`•ison`);
            }
            else {
                ºfacet_cell.removeClass(`•ison`, ºfacet_cell);
                ºall_selected = false;
            }
        }
        if (ºall_selected) {
            this.º_all_values_control[ºsc].addClass(`•ison`);
        }
        else {
            this.º_all_values_control[ºsc].removeClass(`•ison`);
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
        for (var ºrelated_value in this.º_related_values_index[ºsc]) {
            if (!(ºrelated_value in ºob)) {
                ºob[ºrelated_value] = false;
            }
        }
        return ºob;
    },
    ºstats: function(ºsc) {
        this.º_statistics[ºsc] = {};
        for (var ºrelated_value in this.º_related_values_index[ºsc]) {
            this.º_statistics[ºsc][ºrelated_value] = 0;
        } 
        var ºrelated_data = this.ºcomponent.ºdata[ºsc];
        for (var ºx in this.ºdistilled[ºsc]) {
            var ºi = this.ºdistilled[ºsc][ºx];
            var ºhas_related_value = false;
            for (var ºrelated_value in ºrelated_data[ºi]) {
                this.º_statistics[ºsc][ºrelated_value] += 1;
                ºhas_related_value = true;
            }
            if (!ºhas_related_value) {
                this.º_statistics[ºsc][this.º_no_values.ºvalue] += 1;
            }
        }
        for (var ºrelated_value in this.º_statistics[ºsc]) {
            this.ºcomponent.ºcontainer[ºsc].find(`span[rv="${ºrelated_value}"].•stats`).html(this.º_statistics[ºsc][ºrelated_value]);
        }
        this.ºcomponent.ºcontainer[ºsc].find(`span[rv="_all"].•stats`).html(this.ºdistilled[ºsc].length);
    },
    ºv: function(ºsc, ºi) {
        var ºrelated_data =  this.ºcomponent.ºdata[ºsc];
        var ºrelated_state = this.º_from_str(ºsc, this.º_related_state[ºsc]);
        if ((ºi in ºrelated_data) && (Object.keys(ºrelated_data[ºi]).length != 0)) {
            for (var ºrelated_value in ºrelated_data[ºi]) {
                if ((ºrelated_value in ºrelated_state) && ºrelated_state[ºrelated_value]) {
                    return true;
                }
            }
        }
        else {
            if ((this.º_no_values.ºvalue in ºrelated_state) && (ºrelated_state[this.º_no_values.ºvalue])) {
                return true;
            }
        }
        return false;
    },
    ºshow: function(ºsc) {
        return (this.ºcomponent.ºstate.ºgetState(`list`) == ºsc);
    },
    ºweld: function(ºsc) {
        this.º_related_values_list[ºsc] = [];
        this.º_related_values_index[ºsc] = {};
        this.º_related_values_off[ºsc] = {};
        this.º_related_values_on[ºsc] = {};
        var ºrelated_values = this.ºcomponent.ºrelated_values[ºsc];
        for (var ºi in ºrelated_values) {
            var ºrelated_value = ºrelated_values[ºi];
            this.º_related_values_off[ºsc][ºi] = false;
            this.º_related_values_on[ºsc][ºi] = true;
            this.º_related_values_list[ºsc].push(ºi);
            this.º_related_values_index[ºsc][ºi] = ºrelated_value;
        }
        this.º_related_values_list[ºsc].push(this.º_no_values.ºvalue);
        this.º_related_values_index[ºsc][this.º_no_values.ºvalue] = this.º_no_values.ºname;
        this.º_related_values_off[ºsc][this.º_no_values.ºvalue] = false;
        this.º_related_values_on[ºsc][this.º_no_values.ºvalue] = true;
        this.º_related_values_list[ºsc].sort();
        this.º_html(ºsc);
    },
    ºwire: function(ºsc) {
        this.º_dressup(ºsc);
    },
    ºwork: function(ºsc) {
        this.º_related_state[ºsc] = this.ºcomponent.ºstate.ºgetState(`rel_${this.º_type}_${ºsc}`);
        this.º_setFacet(ºsc, this.º_from_str(ºsc, this.º_related_state[ºsc]));
    },
};
