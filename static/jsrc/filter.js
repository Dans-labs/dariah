/* INDIVIDUAL COMPONENT: Filters
 * This is a list of filter controls corresponding to lists of records to be displayed in the middle column
 * Setting a filter control filters the associated list.
 */

function Filter(component) {
    this.component = component;
    this._tags = {};
    this._filter_control = {};
    this._filter_control2 = {};
    this._box = {};
    this._completions_dst = {};
    this._stats_dst = {};
    this._clear_filter_control = {};
    this._wire_mode = {};
    this._distilled = {};
    this.distilled = {};
};

Filter.prototype = {
    _html: function(vr) {
        var h = `
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
        this.component.container[vr].html(h);
    },
    _setFilter: function(vr) {
        var textf = this.component.state.getState(`flt_${vr}`);
        this._filter_control2[vr].html(textf);
        this._filter_control[vr].val(textf);
        this._filter_control[vr].autocomplete(`search`, textf);
    },
    _response: function(vr) {
        return function(event, ui) {
            this._distilled[vr] = {};
            ui.content.forEach(function(u, i) {
                this._distilled[vr][u.value] = 1;
            }, this);
            if (!(this._wire_mode[vr])) {
                var textf = this._filter_control[vr].val();
                this.component.state.setState(`flt_${vr}`, textf);
            }
        }.bind(this);
    },
    _setClear: function(vr) {
        this._clear_filter_control[vr].click(function(e) {e.preventDefault();
            this._filter_control[vr].val(``);
            this._filter_control[vr].autocomplete(`search`, ``);
        }.bind(this));
    },
    stats: function(vr) {
        var stat_prefix;
        if (this._filter_control[vr].val() == ``) {
            stat_prefix = ``;
            this._stats_dst[vr].removeClass(`ison`);
        }
        else {
            stat_prefix = `${this.facet.distilled[vr].length} of `;
            this._stats_dst[vr].addClass(`ison`);
        }
        this._stats_dst[vr].html(`${stat_prefix}${this.distilled[vr].length}`);
    },
    v: function(vr, i) {
        return (i in this._distilled[vr]);
    },
    show: function(vr) {
        return (this.component.state.getState(`list`) == vr);
    },
    weld: function(vr) {
        this._html(vr);
    },
    wire: function(vr) {
        if (!this.facet) {
            this.facet = this.component.page.getComponent(`facet`).implementation;
        }
        var data = this.component.page.getComponent(`list`).data[vr];
        this._tags[vr] = [];
        data.forEach(function(d, i) {
            this._tags[vr].push({label: d[1], value: `${d[0]}`});
        }, this);
        this._distilled[vr] = {};
        this.distilled[vr] = [];
        var cc = this.component.container[vr];
        var cf = cc.find(`#fltw_${vr}`);
        var flt = $(`#flt_${vr}`);
        this._filter_control[vr] = flt;
        var flt2 = $(`#flt2_${vr}`);
        this._filter_control2[vr] = flt2;
        this._box[vr] = cf.find(`#fbox_${vr}`);
        this._completions_dst[vr] = cf.find(`#autoc_${vr}`);
        this._stats_dst[vr] = cf.find(`#stats_${vr}`);
        this._clear_filter_control[vr] = cc.find(`#clearf_${vr}`);
        this._filter_control[vr].autocomplete({
            appendTo: this._completions_dst[vr],
            source: this._tags[vr],
            response: this._response(vr),
            minLength: 0,
        });
        flt2.click(function(e) {e.preventDefault();
            $(this).closest(`div`).find(`.morec`).click();
            flt[0].focus();
        });
        this._wire_mode[vr] = true;
        this._setClear(vr);
        this._setFilter(vr);
        this._wire_mode[vr] = false;
    },
    work: function(vr) {
        var textf = this.component.state.getState(`flt_${vr}`);
        if (textf == ``) {
            this._box[vr].removeClass(`ison`);
            this._clear_filter_control[vr].hide();
        }
        else {
            this._box[vr].addClass(`ison`);
            this._clear_filter_control[vr].show();
        }
        this._filter_control2[vr].html(textf);
    },
};

module.exports = Filter;
