/* INDIVIDUAL COMPONENT: generic facet based on related values
 * CType, Tadiraho and EUmap inherit from this.
 */

import * as g from './generic.js';

/* private attributes as symbols */
const _list = Symbol();
const _list2 = Symbol();
const _all_values_control = Symbol();
const _cols = Symbol();
const _cutoff = Symbol();
const _shortsize = Symbol();

export default class {
    constructor(component, rtype, cols, cutoff, shortsize) {
        this.component = component;
        this.distilled = new Map();
        this[_list] = new Map();
        this[_list2] = new Map();
        this.related_state = new Map();
        this.changed = new Map();
        /*
         * The content of the corresponding state variable is stored in this.related_state.
         * this.changed indicates whether the corresponding state variable has changed recently.
         * Both this.related_state and this.changed are parametrized with the variant vr.
        */
        this[_all_values_control] = new Map();
        this.statistics = new Map();
        this.related_values_list = new Map();
        this.related_values_index = new Map();
        this.related_values_all = new Map();
        this.no_values = {value: '-', name: '-none'};
        this.typ = rtype;
        this.state_var_pref = `${this.component.specs.varpfx}_${this.typ}_`;
        this[_cols] = cols || 2;
        this[_cutoff] = cutoff || 14;
        this[_shortsize] = shortsize || 6;
    }
    _html(vr) {
        const type_sg = this.component.state.showState('list', this.typ, 'sg');
        const type_pl = this.component.state.showState('list', this.typ, 'pl');
        let h = '';
        h += this._preHtml(vr);
        h += `
<div>
    <p class="dctrl"><span fct="${this.component.name}-${vr}"></span> By ${type_sg}</p>
    <p class="all"><span rv="_all" class="stats"></span> <a rv="_all" href="#" class="facet_single_all">all ${type_pl}</a></p>
    <table class="value_list" id="list-${this.typ}-vals_${vr}">
        <tr>
`;
        const ar = this.related_values_list.get(vr);
        const ai = this.related_values_index.get(vr);
        for (const [i, related_value] of ar.entries()) {
            if ((i % this[_cols] == 0) && (i > 0) && (i < ar.length)) {
                h += '</tr><tr>';
            }
            const raw_value = ai.get(related_value);
            h += `
            <td><span rv="${related_value}" class="stats"></span></td>
            <td><a rv="${related_value}" href="#" class="facet_single">${g.escapeHTML(raw_value)}</a></td>
            `;
        }
        h += `
        </tr>
    </table>
    <p class="value_list2" id="list2-${this.typ}-vals_${vr}">
`;
        for (const [i, related_value] of ar.entries()) {
            const raw_value = this.related_values_index.get(vr).get(related_value);
            const compact_value = g.escapeHTML(g.compact(this[_cutoff], this[_shortsize], raw_value));
            h += `<a href="#" rv="${related_value}" class="passive_small" title="${g.escapeHTML(raw_value)}">${compact_value}</a> `;
        }
        h += `
    </p>
</div>`;
        this.component.container.get(vr).html(h);
    }
    _dressup(vr) {
        const cc = this.component.container.get(vr);
        this[_list].set(vr, cc.find(`#list-${this.typ}-vals_${vr}`));
        this[_list2].set(vr, cc.find(`#list2-${this.typ}-vals_${vr}`));
        const that = this;
        this[_list].get(vr).find('.facet_single').click(function(e) {e.preventDefault();
            const related_value = $(this).attr('rv');
            const selected = g.from_str(that.component.state.getState(that.state_var_pref+vr));
            if (selected.has(related_value)) {
                selected.delete(related_value);
            }
            else {
                selected.add(related_value);
            }
            that.component.state.setState(that.state_var_pref+vr, g.to_str(selected));
            cc.find('.last_handled').removeClass('last_handled');
            $(this).addClass('last_handled');
        });
        this[_list2].get(vr).find('.passive_small').click(function(e) {e.preventDefault();
            const related_value = $(this).attr('rv');
            const selected = g.from_str(that.component.state.getState(that.state_var_pref+vr));
            if (selected.has(related_value)) {
                selected.delete(related_value);
            }
            else {
                selected.add(related_value);
            }
            that.component.state.setState(that.state_var_pref+vr, g.to_str(selected));
            $(this).closest('div').find('.morec').click();
            const last_handled = that[_list].get(vr).find(`a[rv="${related_value}"]`);
            cc.find('.last_handled').removeClass('last_handled');
            last_handled.addClass('last_handled');
            $('#left')[0].scrollTop = 50;
            last_handled[0].scrollIntoView({
                behavior: 'smooth',
                alignToTop: 'true',
            });
        });
        this[_all_values_control].set(vr, this.component.container.get(vr).find('[rv="_all"]'));
        this[_all_values_control].get(vr).click(function(e) {e.preventDefault();
            const ison = $(this).hasClass('ison');
            if (ison) {
                that.component.state.setState(that.state_var_pref+vr, '');
            }
            else {
                that.component.state.setState(that.state_var_pref+vr, g.to_str(that.related_values_all.get(vr)));
            }
        });
    }
    _setFacet(vr) {
        let all_selected = true;
        for (const related_value of this.related_values_index.get(vr).keys()) {
            const facet_cell = this[_list].get(vr).find(`[rv="${related_value}"]`);
            const facet_cell2 = this[_list2].get(vr).find(`[rv="${related_value}"]`);
            if (this.related_state.get(vr).has(related_value)) {
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
            this[_all_values_control].get(vr).addClass('ison');
        }
        else {
            this[_all_values_control].get(vr).removeClass('ison');
        }
    }
    stats(vr) {
        this.statistics.set(vr, new Map());
        const rvs = this.statistics.get(vr);
        for (const related_value of this.related_values_index.get(vr).keys()) {
            rvs.set(related_value, 0);
        } 
        const related_info = this.component.related_info.get(vr);
        for (const i of this.distilled.get(vr)) {
            const related_values = related_info.has(i)?related_info.get(i):new Set();
            if (related_values.size) {
                for (const related_value of related_values) {
                    rvs.set(related_value, rvs.get(related_value) + 1);
                }
            }
            else {
                const nv = this.no_values.value;
                rvs.set(nv, rvs.get(nv) + 1);
            }
        }
        for (const [related_value, stat] of rvs) {
            this.component.container.get(vr).find(`span[rv="${related_value}"].stats`).html(stat);
        }
        this.component.container.get(vr).find(`span[rv="_all"].stats`).html(this.distilled.get(vr).size);
        this._myStats(vr);
    }
    v(vr, i) {
        const related_info =  this.component.related_info.get(vr);
        const related_state = this.related_state.get(vr);
        const related_values = related_info.has(i)?related_info.get(i):new Set();
        if (related_values.size) {
            for (const related_value of related_values) {
                if (related_state.has(related_value)) {
                    return true;
                }
            }
        }
        else {
            if (related_state.has(this.no_values.value)) {
                return true;
            }
        }
        return false;
    }
    show(vr) {
        return (this.component.state.getState('list') == vr);
    }
    weld(vr) {
        this.related_values_list.set(vr, []);
        this.related_values_index.set(vr, new Map());
        this.related_values_all.set(vr, new Set());
        this._plainWeld(vr);
        this._myWeld(vr);
        this.related_values_list.get(vr).push(this.no_values.value);
        this.related_values_index.get(vr).set(this.no_values.value, this.no_values.name);
        this.related_values_all.get(vr).add(this.no_values.value);
        this.related_state.set(vr, new Set());
        this.changed.set(vr, true);
        this._html(vr);
    }
    wire(vr) {
        this._myDressup(vr);
        this._dressup(vr);
    }
    work(vr) {
        const old_state = this.related_state.get(vr);
        const new_state = g.from_str(this.component.state.getState(this.state_var_pref+vr));
        this.changed.set(vr, !g.set_equal(old_state, new_state));
        if (this.changed.get(vr)) {
            this.related_state.set(vr, new_state);
            this._mySetFacet(vr);
            this._setFacet(vr);
        }
    }
    _plainWeld(vr) {
        const related_values = this.component.related_values.get(vr);
        for (const d of related_values) {
            const i = d['_id'];
            const related_value = d['value'];
            this.related_values_list.get(vr).push(i);
            this.related_values_index.get(vr).set(i, related_value);
            this.related_values_all.get(vr).add(i);
        }
        this.related_values_list.get(vr).sort((a,b) => {
            return (this.related_values_index.get(a) < this.related_values_index.get(b))?-1:(this.related_values_index.get(a) > this.related_values_index.get(b))?1:0; 
        });
    }
    _myWeld(vr) {}
    _preHtml(vr) {return ''}
    _myDressup(vr) {}
    _mySetFacet(vr) {}
    _myStats(vr) {}
}
