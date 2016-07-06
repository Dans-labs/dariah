/* INDIVIDUAL COMPONENT: Filters
 * This is a list of filter controls corresponding to lists of records to be displayed in the middle column
 * Setting a filter control filters the associated list.
 */

/* private attributes as symbols */
const _tags = Symbol();
const _filter_control = Symbol();
const _filter_control2 = Symbol();
const _clear_filter_control = Symbol();
const _box = Symbol();
const _completions_dst = Symbol();
const _wire_mode = Symbol();
const _distilled = Symbol();

export default class {
    constructor(component) {
        this.component = component;
        this[_tags] = new Map();
        this[_filter_control] = new Map();
        this[_filter_control2] = new Map();
        this[_box] = new Map();
        this[_completions_dst] = new Map();
        this._stats_dst = new Map();
        this[_clear_filter_control] = new Map();
        this[_wire_mode] = new Map();
        this[_distilled] = new Map();
        this.distilled = new Map();
    }
    _html(vr) {
        const h = `
<div>
    <p class="dctrl"><span fct="${this.component.name}-${vr}"></span> By full text search
        <a href="#" title="modify full text filter" id="flt2_${vr}" class="flt_not_expanded facet_single ison flt_pat"></a>
        <a href="#" class="control_med fa fa-close filtc" id="clearf_${vr}"></a>
    </p>
    <div id="fltw_${vr}">
        <p id="fbox_${vr}" class="flt control_med fbox ui-widget">
            <input id="flt_${vr}" class="flt flt_pat"/>
            <span fbox class="stats" id="stats_${vr}"></span>
        </p>
        <div id="autoc_${vr}" style="display: none;">here ${vr}</div>
    </div>
</div>`;
        this.component.container.get(vr).html(h);
    }
    _setFilter(vr) {
        const textf = this.component.state.getState(`flt_${vr}`);
        const filterc = this[_filter_control].get(vr);
        this[_filter_control2].get(vr).html(textf);
        filterc.val(textf);
        filterc.autocomplete('search', textf);
    }
    _response(vr) {
        return function(event, ui) {
            this[_distilled].set(vr, {});
            const dstl = this[_distilled].get(vr);
            for (const u of ui.content) {
                dstl[u.value] = 1;
            }
            if (!(this[_wire_mode].get(vr))) {
                const textf = this[_filter_control].get(vr).val();
                this.component.state.setState(`flt_${vr}`, textf);
            }
        }.bind(this);
    }
    _setClear(vr) {
        this[_clear_filter_control].get(vr).click(e => {e.preventDefault();
            const filterc = this[_filter_control].get(vr);
            filterc.val('');
            filterc.autocomplete('search', '');
        });
    }
    stats(vr) {
        let stat_prefix;
        const statd = this._stats_dst.get(vr);
        if (this[_filter_control].get(vr).val() == '') {
            stat_prefix = '';
            statd.removeClass('ison');
        }
        else {
            stat_prefix = `${this.facet.distilled.get(vr).length} of `;
            statd.addClass('ison');
        }
        statd.html(`${stat_prefix}${this.distilled.get(vr).length}`);
    }
    v(vr, i) {
        return (i in this[_distilled].get(vr));
    }
    show(vr) {
        return (this.component.state.getState('list') == vr);
    }
    weld(vr) {
        this._html(vr);
    }
    wire(vr) {
        if (!this.facet) {
            this.facet = this.component.page.getComponent('facet').implementation;
        }
        const data = this.component.page.getComponent('list').data.get(vr);
        this[_tags].set(vr, []);
        const tgs = this[_tags].get(vr);
        for (const d of data) {
            tgs.push({label: d[1], value: `${d[0]}`});
        }
        this[_distilled].set(vr, {});
        this.distilled.set(vr, []);
        const cc = this.component.container.get(vr);
        const cf = cc.find(`#fltw_${vr}`);
        const flt = $(`#flt_${vr}`);
        this[_filter_control].set(vr, flt);
        const flt2 = $(`#flt2_${vr}`);
        this[_filter_control2].set(vr, flt2);
        this[_box].set(vr, cf.find(`#fbox_${vr}`));
        this[_completions_dst].set(vr, cf.find(`#autoc_${vr}`));
        this._stats_dst.set(vr, cf.find(`#stats_${vr}`));
        this[_clear_filter_control].set(vr, cc.find(`#clearf_${vr}`));
        this[_filter_control].get(vr).autocomplete({
            appendTo: this[_completions_dst].get(vr),
            source: this[_tags].get(vr),
            response: this._response(vr),
            minLength: 0,
        });
        flt2.click(function(e) {e.preventDefault();
            $(this).closest('div').find('.morec').click();
            flt[0].focus();
        });
        this[_wire_mode].set(vr, true);
        this._setClear(vr);
        this._setFilter(vr);
        this[_wire_mode].set(vr, false);
    }
    work(vr) {
        const textf = this.component.state.getState(`flt_${vr}`);
        const clearfc = this[_clear_filter_control].get(vr);
        if (textf == '') {
            this[_box].get(vr).removeClass('ison');
            clearfc.hide();
        }
        else {
            this[_box].get(vr).addClass('ison');
            clearfc.show();
        }
        this[_filter_control2].get(vr).html(textf);
    }
}
