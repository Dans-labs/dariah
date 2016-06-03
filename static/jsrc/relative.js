/* INDIVIDUAL COMPONENT: generic facet based on related values
 * CType, Tadiraho and EUmap inherit from this.
 */

function ºRelative(ºcomponent, ºtype, ºcols, ºcutoff) {
    this.ºcomponent = ºcomponent;
    this.ºdistilled = {};
    this.º_list = {};
    this.º_list2 = {};
    this.º_related_state = {};
    this.º_all_values_control = {};
    this.º_statistics = {};
    this.º_related_values_list = {};
    this.º_related_values_index = {};
    this.º_related_values_on = {};
    this.º_related_values_off = {};
    this.º_no_values = {ºvalue: `-`, ºname: `-none`};
    this.º_type = ºtype;
    this.º_cols = ºcols || 2;
    this.º_cutoff = ºcutoff || 14;
};

ºRelative.prototype = {
    º_html: function(ºvar) {
        var ºtype_sg = this.ºcomponent.ºstate.ºshowState(`list`, this.º_type, `ºsg`);
        var ºtype_pl = this.ºcomponent.ºstate.ºshowState(`list`, this.º_type, `ºpl`);
        var ºh = ``;
        ºh += this.º_preHtml(ºvar);
        ºh += `<div><p class="•dctrl"><span fct="${this.ºcomponent.ºname}-${ºvar}"></span> By ${ºtype_sg}</p>`;
        ºh += `<p class="•all"><span rv="_all" class="•stats"></span> <a rv="_all" href="#" class="•facet_single_all">all ${ºtype_pl}</a></p>
<table class="•value_list" id="list-${this.º_type}-vals_${ºvar}"><tr>`;
        this.º_related_values_list[ºvar].forEach(function(ºrelated_value, ºi, ºar) {
            if ((ºi % this.º_cols == 0) && (ºi > 0) && (ºi < ºar.length)) {
                ºh += `</tr><tr>`;
            }
            var ºraw_value = this.º_related_values_index[ºvar][ºrelated_value];
            ºh += `<td><span rv="${ºrelated_value}" class="•stats"></span></td><td><a rv="${ºrelated_value}" title="${ºescapeHTML(ºraw_value)}" href="#" class="•facet_single">${ºescapeHTML(ºcompact(this.º_cutoff, 6,ºraw_value))}</a></td>`;
        }, this);
        ºh += `</tr></table>`;
        ºh += `<p class="•value_list2" id="list2-${this.º_type}-vals_${ºvar}">`;
        this.º_related_values_list[ºvar].forEach(function(ºrelated_value, ºi, ºar) {
            var ºraw_value = this.º_related_values_index[ºvar][ºrelated_value];
            ºh += `<a href="#" rv="${ºrelated_value}" title="${ºescapeHTML(ºraw_value)}" class="•passive_small">${ºescapeHTML(ºcompact(this.º_cutoff, 5,ºraw_value))}</a> `;
        }, this);
        ºh += `</p>`;
        ºh += `</div>`;
        this.ºcomponent.ºcontainer[ºvar].html(ºh);
    },
    º_dressup: function(ºvar) {
        var ºcc = this.ºcomponent.ºcontainer[ºvar];
        this.º_list[ºvar] = ºcc.find(`#list-${this.º_type}-vals_${ºvar}`);
        this.º_list2[ºvar] = ºcc.find(`#list2-${this.º_type}-vals_${ºvar}`);
        var ºthat = this;
        this.º_list[ºvar].find(`.•facet_single`).click(function(ºe) {ºe.preventDefault();
            var ºrelated_value = $(this).attr(`rv`);
            var ºselected = ºthat.º_from_str(ºvar, ºthat.ºcomponent.ºstate.ºgetState(`rel_${ºthat.º_type}_${ºvar}`));
            ºselected[ºrelated_value] = (ºrelated_value in ºselected)?!ºselected[ºrelated_value]:true;
            ºthat.ºcomponent.ºstate.ºsetState(`rel_${ºthat.º_type}_${ºvar}`, ºthat.º_to_str(ºselected));
        });
        this.º_list2[ºvar].find(`.•passive_small`).click(function(ºe) {ºe.preventDefault();
            var ºrelated_value = $(this).attr(`rv`);
            var ºselected = ºthat.º_from_str(ºvar, ºthat.ºcomponent.ºstate.ºgetState(`rel_${ºthat.º_type}_${ºvar}`));
            ºselected[ºrelated_value] = (ºrelated_value in ºselected)?!ºselected[ºrelated_value]:true;
            ºthat.ºcomponent.ºstate.ºsetState(`rel_${ºthat.º_type}_${ºvar}`, ºthat.º_to_str(ºselected));
            $(this).closest(`div`).find(`.morec`).click();
        });
        this.º_all_values_control[ºvar] = this.ºcomponent.ºcontainer[ºvar].find(`[rv="_all"]`);
        this.º_all_values_control[ºvar].click(function(ºe) {ºe.preventDefault();
            var ºison = $(this).hasClass(`•ison`);
            if (ºison) {
                ºthat.ºcomponent.ºstate.ºsetState(`rel_${ºthat.º_type}_${ºvar}`, ºthat.º_to_str(ºthat.º_related_values_off[ºvar]));
            }
            else {
                ºthat.ºcomponent.ºstate.ºsetState(`rel_${ºthat.º_type}_${ºvar}`, ºthat.º_to_str(ºthat.º_related_values_on[ºvar]));
            }
        });
    },
    º_setFacet: function(ºvar, ºrelated_values) {
        var ºall_selected = true;
        for (var ºrelated_value in this.º_related_values_index[ºvar]) {
            var ºfacet_cell = this.º_list[ºvar].find(`[rv="${ºrelated_value}"]`);
            var ºfacet_cell2 = this.º_list2[ºvar].find(`[rv="${ºrelated_value}"]`);
            if (ºrelated_value in ºrelated_values && ºrelated_values[ºrelated_value]) {
                ºfacet_cell.addClass(`•ison`);
                ºfacet_cell2.addClass(`•ison`);
            }
            else {
                ºfacet_cell.removeClass(`•ison`);
                ºfacet_cell2.removeClass(`•ison`);
                ºall_selected = false;
            }
        }
        if (ºall_selected) {
            this.º_all_values_control[ºvar].addClass(`•ison`);
        }
        else {
            this.º_all_values_control[ºvar].removeClass(`•ison`);
        }
    },
    º_a_to_str: function(ºar) {
        return ºar.join(',');
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
    º_from_str: function(ºvar, ºst) {
        var ºob = {};
        if (ºst !== null && ºst != undefined && ºst != '') {
            var ºar = ºst.split(',');
            ºar.forEach(function(ºv) {
                ºob[ºv] = true;
            });
        }
        for (var ºrelated_value in this.º_related_values_index[ºvar]) {
            if (!(ºrelated_value in ºob)) {
                ºob[ºrelated_value] = false;
            }
        }
        return ºob;
    },
    ºstats: function(ºvar) {
        this.º_statistics[ºvar] = {};
        for (var ºrelated_value in this.º_related_values_index[ºvar]) {
            this.º_statistics[ºvar][ºrelated_value] = 0;
        } 
        var ºrelated_data = this.ºcomponent.ºdata[ºvar];
        for (var ºx in this.ºdistilled[ºvar]) {
            var ºi = this.ºdistilled[ºvar][ºx];
            var ºhas_related_value = false;
            for (var ºrelated_value in ºrelated_data[ºi]) {
                this.º_statistics[ºvar][ºrelated_value] += 1;
                ºhas_related_value = true;
            }
            if (!ºhas_related_value) {
                this.º_statistics[ºvar][this.º_no_values.ºvalue] += 1;
            }
        }
        for (var ºrelated_value in this.º_statistics[ºvar]) {
            this.ºcomponent.ºcontainer[ºvar].find(`span[rv="${ºrelated_value}"].•stats`).html(this.º_statistics[ºvar][ºrelated_value]);
        }
        this.ºcomponent.ºcontainer[ºvar].find(`span[rv="_all"].•stats`).html(this.ºdistilled[ºvar].length);
        this.º_myStats(ºvar);
    },
    ºv: function(ºvar, ºi) {
        var ºrelated_data =  this.ºcomponent.ºdata[ºvar];
        var ºrelated_state = this.º_from_str(ºvar, this.º_related_state[ºvar]);
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
    ºshow: function(ºvar) {
        return (this.ºcomponent.ºstate.ºgetState(`list`) == ºvar);
    },
    ºweld: function(ºvar) {
        this.º_related_values_list[ºvar] = [];
        this.º_related_values_index[ºvar] = {};
        this.º_related_values_off[ºvar] = {};
        this.º_related_values_on[ºvar] = {};
        this.º_plainWeld(ºvar);
        this.º_myWeld(ºvar);
        this.º_related_values_list[ºvar].push(this.º_no_values.ºvalue);
        this.º_related_values_index[ºvar][this.º_no_values.ºvalue] = this.º_no_values.ºname;
        this.º_related_values_off[ºvar][this.º_no_values.ºvalue] = false;
        this.º_related_values_on[ºvar][this.º_no_values.ºvalue] = true;
        this.º_html(ºvar);
    },
    ºwire: function(ºvar) {
        this.º_myDressup(ºvar);
        this.º_dressup(ºvar);
    },
    ºwork: function(ºvar) {
        this.º_related_state[ºvar] = this.ºcomponent.ºstate.ºgetState(`rel_${this.º_type}_${ºvar}`);
        var ºrelated_values =  this.º_from_str(ºvar, this.º_related_state[ºvar]);
        this.º_mySetFacet(ºvar, ºrelated_values);
        this.º_setFacet(ºvar, ºrelated_values);
    },
    º_plainWeld: function(ºvar) {
        var ºrelated_values = this.ºcomponent.ºrelated_values[ºvar];
        for (var ºi in ºrelated_values) {
            var ºrelated_value = ºrelated_values[ºi];
            this.º_related_values_off[ºvar][ºi] = false;
            this.º_related_values_on[ºvar][ºi] = true;
            this.º_related_values_list[ºvar].push(ºi);
            this.º_related_values_index[ºvar][ºi] = ºrelated_value;
        }
        this.º_related_values_list[ºvar].sort(function(ºa,ºb) {
            return (ºrelated_values[ºa] < ºrelated_values[ºb])?-1:(ºrelated_values[ºa] > ºrelated_values[ºb])?1:0; 
        });
    },
    º_myWeld: function(ºvar) {},
    º_preHtml: function(ºvar) {return ``},
    º_myDressup: function(ºvar) {},
    º_mySetFacet: function(ºvar) {},
    º_myStats: function(ºvar) {},
};
