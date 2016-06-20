/* INDIVIDUAL COMPONENT: generic facet based on related values
 * CType, Tadiraho and EUmap inherit from this.
 */

const g = require('./generic.js');

function Relative(component, rtype, cols, cutoff, shortsize) {
    this.component = component;
    this.distilled = new Map();
    this._list = new Map();
    this._list2 = new Map();
    this._related_state = new Map();
    this._all_values_control = new Map();
    this._statistics = new Map();
    this._related_values_list = new Map();
    this._related_values_index = new Map();
    this._related_values_all = new Map();
    this._no_values = {value: '-', name: '-none'};
    this._type = rtype;
    this._cols = cols || 2;
    this._cutoff = cutoff || 14;
    this._shortsize = shortsize || 6;
};

Relative.prototype = {
    _html: function(vr) {
        const type_sg = this.component.state.showState('list', this._type, 'sg');
        const type_pl = this.component.state.showState('list', this._type, 'pl');
        let h = '';
        h += this._preHtml(vr);
        h += `
<div>
    <p class="dctrl"><span fct="${this.component.name}-${vr}"></span> By ${type_sg}</p>
    <p class="all"><span rv="_all" class="stats"></span> <a rv="_all" href="#" class="facet_single_all">all ${type_pl}</a></p>
    <table class="value_list" id="list-${this._type}-vals_${vr}">
        <tr>
`;
        const ar = this._related_values_list.get(vr);
        for (const [i, related_value] of ar.entries()) {
            if ((i % this._cols == 0) && (i > 0) && (i < ar.length)) {
                h += '</tr><tr>';
            }
            const raw_value = this._related_values_index.get(vr).get(related_value);
            h += `
            <td><span rv="${related_value}" class="stats"></span></td>
            <td><a rv="${related_value}" href="#" class="facet_single">${g.escapeHTML(raw_value)}</a></td>
            `;
        }
        h += `
        </tr>
    </table>
    <p class="value_list2" id="list2-${this._type}-vals_${vr}">
`;
        for (const [i, related_value] of ar.entries()) {
            const raw_value = this._related_values_index.get(vr).get(related_value);
            const compact_value = g.escapeHTML(g.compact(this._cutoff, this._shortsize, raw_value));
            h += `<a href="#" rv="${related_value}" class="passive_small" title="${g.escapeHTML(raw_value)}">${compact_value}</a> `;
        }
        h += `
    </p>
</div>`;
        this.component.container.get(vr).html(h);
    },
    _dressup: function(vr) {
        const cc = this.component.container.get(vr);
        this._list.set(vr, cc.find(`#list-${this._type}-vals_${vr}`));
        this._list2.set(vr, cc.find(`#list2-${this._type}-vals_${vr}`));
        const that = this;
        this._list.get(vr).find('.facet_single').click(function(e) {e.preventDefault();
            const related_value = $(this).attr('rv');
            const selected = g.from_str(that.component.state.getState(`rel_${that._type}_${vr}`));
            if (selected.has(related_value)) {
                selected.delete(related_value);
            }
            else {
                selected.add(related_value);
            }
            that.component.state.setState(`rel_${that._type}_${vr}`, g.to_str(selected));
            cc.find('.last_handled').removeClass('last_handled');
            $(this).addClass('last_handled');
        });
        this._list2.get(vr).find('.passive_small').click(function(e) {e.preventDefault();
            const related_value = $(this).attr('rv');
            const selected = g.from_str(that.component.state.getState(`rel_${that._type}_${vr}`));
            if (selected.has(related_value)) {
                selected.delete(related_value);
            }
            else {
                selected.add(related_value);
            }
            that.component.state.setState(`rel_${that._type}_${vr}`, g.to_str(selected));
            $(this).closest('div').find('.morec').click();
            const last_handled = that._list.get(vr).find(`a[rv="${related_value}"]`);
            cc.find('.last_handled').removeClass('last_handled');
            last_handled.addClass('last_handled');
            $('#left')[0].scrollTop = 50;
            last_handled[0].scrollIntoView({
                behavior: 'smooth',
                alignToTop: 'true',
            });
        });
        this._all_values_control.set(vr, this.component.container.get(vr).find('[rv="_all"]'));
        this._all_values_control.get(vr).click(function(e) {e.preventDefault();
            const ison = $(this).hasClass('ison');
            if (ison) {
                that.component.state.setState(`rel_${that._type}_${vr}`, '');
            }
            else {
                that.component.state.setState(`rel_${that._type}_${vr}`, g.to_str(that._related_values_all.get(vr)));
            }
        });
    },
    _setFacet: function(vr) {
        let all_selected = true;
        for (const related_value of this._related_values_index.get(vr).keys()) {
            const facet_cell = this._list.get(vr).find(`[rv="${related_value}"]`);
            const facet_cell2 = this._list2.get(vr).find(`[rv="${related_value}"]`);
            if (this._related_state.get(vr).has(related_value+'')) {
                facet_cell.addClass('ison');
                facet_cell2.addClass('ison');
            }
            else {
                facet_cell.removeClass('ison');
                facet_cell2.removeClass('ison');
                all_selected = false;
            }
        }
        if (all_selected) {
            this._all_values_control.get(vr).addClass('ison');
        }
        else {
            this._all_values_control.get(vr).removeClass('ison');
        }
    },
    stats: function(vr) {
        this._statistics.set(vr, new Map());
        const rvs = this._statistics.get(vr);
        for (const related_value of this._related_values_index.get(vr).keys()) {
            rvs.set(related_value, 0);
        } 
        const related_info = this.component.related_info.get(vr);
        for (const i of this.distilled.get(vr)) {
            let has_related_value = false;
            if (related_info.has(i)) {
                for (const related_value of related_info.get(i)) {
                    rvs.set(related_value, rvs.get(related_value) + 1);
                    has_related_value = true;
                }
            }
            if (!has_related_value) {
                const nv = this._no_values.value;
                rvs.set(nv, rvs.get(nv) + 1);
            }
        }
        for (const [related_value, stat] of rvs) {
            this.component.container.get(vr).find(`span[rv="${related_value}"].stats`).html(stat);
        }
        this.component.container.get(vr).find(`span[rv="_all"].stats`).html(this.distilled.get(vr).length);
        this._myStats(vr);
    },
    v: function(vr, i) {
        const related_info =  this.component.related_info.get(vr);
        const related_state = this._related_state.get(vr);
        if (related_info.has(i)) {
            for (const related_value of related_info.get(i)) {
                if (related_state.has(related_value+'')) {
                    return true;
                }
            }
        }
        else {
            if (related_state.has(this._no_values.value)) {
                return true;
            }
        }
        return false;
    },
    show: function(vr) {
        return (this.component.state.getState('list') == vr);
    },
    weld: function(vr) {
        this._related_values_list.set(vr, []);
        this._related_values_index.set(vr, new Map());
        this._related_values_all.set(vr, new Set());
        this._plainWeld(vr);
        this._myWeld(vr);
        this._related_values_list.get(vr).push(this._no_values.value);
        this._related_values_index.get(vr).set(this._no_values.value, this._no_values.name);
        this._related_values_all.get(vr).add(this._no_values.value);
        this._html(vr);
    },
    wire: function(vr) {
        this._myDressup(vr);
        this._dressup(vr);
    },
    work: function(vr) {
        this._related_state.set(vr, g.from_str(this.component.state.getState(`rel_${this._type}_${vr}`)));
        this._mySetFacet(vr);
        this._setFacet(vr);
    },
    _plainWeld: function(vr) {
        const related_values = this.component.related_values.get(vr);
        for (const [i, related_value] of related_values) {
            this._related_values_list.get(vr).push(i);
            this._related_values_index.get(vr).set(i, related_value);
            this._related_values_all.get(vr).add(i);
        }
        this._related_values_list.get(vr).sort((a,b) => {
            return (related_values.get(a) < related_values.get(b))?-1:(related_values.get(a) > related_values.get(b))?1:0; 
        });
    },
    _myWeld: function(vr) {},
    _preHtml: function(vr) {return ''},
    _myDressup: function(vr) {},
    _mySetFacet: function(vr) {},
    _myStats: function(vr) {},
};

module.exports = Relative;
