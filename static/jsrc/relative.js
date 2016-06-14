/* INDIVIDUAL COMPONENT: generic facet based on related values
 * CType, Tadiraho and EUmap inherit from this.
 */

var g = require('./generic.js');

function Relative(component, rtype, cols, cutoff, shortsize) {
    this.component = component;
    this.distilled = {};
    this._list = {};
    this._list2 = {};
    this._related_state = {};
    this._all_values_control = {};
    this._statistics = {};
    this._related_values_list = {};
    this._related_values_index = {};
    this._related_values_on = {};
    this._related_values_off = {};
    this._no_values = {value: `-`, name: `-none`};
    this._type = rtype;
    this._cols = cols || 2;
    this._cutoff = cutoff || 14;
    this._shortsize = shortsize || 6;
};

Relative.prototype = {
    _html: function(vr) {
        var type_sg = this.component.state.showState(`list`, this._type, `sg`);
        var type_pl = this.component.state.showState(`list`, this._type, `pl`);
        var h = ``;
        h += this._preHtml(vr);
        h += `
<div>
    <p class="dctrl"><span fct="${this.component.name}-${vr}"></span> By ${type_sg}</p>
    <p class="all"><span rv="_all" class="stats"></span> <a rv="_all" href="#" class="facet_single_all">all ${type_pl}</a></p>
    <table class="value_list" id="list-${this._type}-vals_${vr}">
        <tr>
`;
        this._related_values_list[vr].forEach(function(related_value, i, ar) {
            if ((i % this._cols == 0) && (i > 0) && (i < ar.length)) {
                h += `</tr><tr>`;
            }
            var raw_value = this._related_values_index[vr][related_value];
            h += `
            <td><span rv="${related_value}" class="stats"></span></td>
            <td><a rv="${related_value}" href="#" class="facet_single">${g.escapeHTML(raw_value)}</a></td>
            `;
        }, this);
        h += `
        </tr>
    </table>
    <p class="value_list2" id="list2-${this._type}-vals_${vr}">
`;
        this._related_values_list[vr].forEach(function(related_value, i, ar) {
            var raw_value = this._related_values_index[vr][related_value];
            var compact_value = g.escapeHTML(g.compact(this._cutoff, this._shortsize, raw_value));
            h += `<a href="#" rv="${related_value}" class="passive_small" title="${g.escapeHTML(raw_value)}">${compact_value}</a> `;
        }, this);
        h += `
    </p>
</div>`;
        this.component.container[vr].html(h);
    },
    _dressup: function(vr) {
        var cc = this.component.container[vr];
        this._list[vr] = cc.find(`#list-${this._type}-vals_${vr}`);
        this._list2[vr] = cc.find(`#list2-${this._type}-vals_${vr}`);
        var that = this;
        this._list[vr].find(`.facet_single`).click(function(e) {e.preventDefault();
            var related_value = $(this).attr(`rv`);
            var selected = that._from_str(vr, that.component.state.getState(`rel_${that._type}_${vr}`));
            selected[related_value] = (related_value in selected)?!selected[related_value]:true;
            that.component.state.setState(`rel_${that._type}_${vr}`, g.to_str(selected));
            cc.find(`.last_handled`).removeClass(`last_handled`);
            $(this).addClass(`last_handled`);
        });
        this._list2[vr].find(`.passive_small`).click(function(e) {e.preventDefault();
            var related_value = $(this).attr(`rv`);
            var selected = that._from_str(vr, that.component.state.getState(`rel_${that._type}_${vr}`));
            selected[related_value] = (related_value in selected)?!selected[related_value]:true;
            that.component.state.setState(`rel_${that._type}_${vr}`, g.to_str(selected));
            $(this).closest(`div`).find(`.morec`).click();
            var last_handled = that._list[vr].find(`a[rv="${related_value}"]`);
            cc.find(`.last_handled`).removeClass(`last_handled`);
            last_handled.addClass(`last_handled`);
            $(`#left`)[0].scrollTop = 50;
            last_handled[0].scrollIntoView({
                behavior: `smooth`,
                alignToTop: `true`,
            });
        });
        this._all_values_control[vr] = this.component.container[vr].find(`[rv="_all"]`);
        this._all_values_control[vr].click(function(e) {e.preventDefault();
            var ison = $(this).hasClass(`ison`);
            if (ison) {
                that.component.state.setState(`rel_${that._type}_${vr}`, g.to_str(that._related_values_off[vr]));
            }
            else {
                that.component.state.setState(`rel_${that._type}_${vr}`, g.to_str(that._related_values_on[vr]));
            }
        });
    },
    _setFacet: function(vr, related_values) {
        var all_selected = true;
        for (var related_value in this._related_values_index[vr]) {
            var facet_cell = this._list[vr].find(`[rv="${related_value}"]`);
            var facet_cell2 = this._list2[vr].find(`[rv="${related_value}"]`);
            if (related_value in related_values && related_values[related_value]) {
                facet_cell.addClass(`ison`);
                facet_cell2.addClass(`ison`);
            }
            else {
                facet_cell.removeClass(`ison`);
                facet_cell2.removeClass(`ison`);
                all_selected = false;
            }
        }
        if (all_selected) {
            this._all_values_control[vr].addClass(`ison`);
        }
        else {
            this._all_values_control[vr].removeClass(`ison`);
        }
    },
    _from_str: function(vr, st) {
        var ob = {};
        if (st !== null && st != undefined && st != '') {
            var ar = st.split(',');
            ar.forEach(function(v) {
                ob[v] = true;
            });
        }
        for (var related_value in this._related_values_index[vr]) {
            if (!(related_value in ob)) {
                ob[related_value] = false;
            }
        }
        return ob;
    },
    stats: function(vr) {
        this._statistics[vr] = {};
        for (var related_value in this._related_values_index[vr]) {
            this._statistics[vr][related_value] = 0;
        } 
        var related_data = this.component.data[vr];
        for (var x in this.distilled[vr]) {
            var i = this.distilled[vr][x];
            var has_related_value = false;
            for (var related_value in related_data[i]) {
                this._statistics[vr][related_value] += 1;
                has_related_value = true;
            }
            if (!has_related_value) {
                this._statistics[vr][this._no_values.value] += 1;
            }
        }
        for (var related_value in this._statistics[vr]) {
            this.component.container[vr].find(`span[rv="${related_value}"].stats`).html(this._statistics[vr][related_value]);
        }
        this.component.container[vr].find(`span[rv="_all"].stats`).html(this.distilled[vr].length);
        this._myStats(vr);
    },
    v: function(vr, i) {
        var related_data =  this.component.data[vr];
        var related_state = this._from_str(vr, this._related_state[vr]);
        if ((i in related_data) && (Object.keys(related_data[i]).length != 0)) {
            for (var related_value in related_data[i]) {
                if ((related_value in related_state) && related_state[related_value]) {
                    return true;
                }
            }
        }
        else {
            if ((this._no_values.value in related_state) && (related_state[this._no_values.value])) {
                return true;
            }
        }
        return false;
    },
    show: function(vr) {
        return (this.component.state.getState(`list`) == vr);
    },
    weld: function(vr) {
        this._related_values_list[vr] = [];
        this._related_values_index[vr] = {};
        this._related_values_off[vr] = {};
        this._related_values_on[vr] = {};
        this._plainWeld(vr);
        this._myWeld(vr);
        this._related_values_list[vr].push(this._no_values.value);
        this._related_values_index[vr][this._no_values.value] = this._no_values.name;
        this._related_values_off[vr][this._no_values.value] = false;
        this._related_values_on[vr][this._no_values.value] = true;
        this._html(vr);
    },
    wire: function(vr) {
        this._myDressup(vr);
        this._dressup(vr);
    },
    work: function(vr) {
        this._related_state[vr] = this.component.state.getState(`rel_${this._type}_${vr}`);
        var related_values =  this._from_str(vr, this._related_state[vr]);
        this._mySetFacet(vr, related_values);
        this._setFacet(vr, related_values);
    },
    _plainWeld: function(vr) {
        var related_values = this.component.related_values[vr];
        for (var i in related_values) {
            var related_value = related_values[i];
            this._related_values_off[vr][i] = false;
            this._related_values_on[vr][i] = true;
            this._related_values_list[vr].push(i);
            this._related_values_index[vr][i] = related_value;
        }
        this._related_values_list[vr].sort(function(a,b) {
            return (related_values[a] < related_values[b])?-1:(related_values[a] > related_values[b])?1:0; 
        });
    },
    _myWeld: function(vr) {},
    _preHtml: function(vr) {return ``},
    _myDressup: function(vr) {},
    _mySetFacet: function(vr) {},
    _myStats: function(vr) {},
};

module.exports = Relative;
