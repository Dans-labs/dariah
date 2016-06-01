/* INDIVIDUAL COMPONENT: Filters
 * This is a list of filter controls corresponding to lists of records to be displayed in the middle column
 * Setting a filter control filters the associated list.
 */

function ºFilter(ºcomponent) {
    this.ºcomponent = ºcomponent;
    this.º_tags = {};
    this.º_filter_control = {};
    this.º_filter_control2 = {};
    this.º_box = {};
    this.º_completions_dst = {};
    this.º_stats_dst = {};
    this.º_clear_filter_control = {};
    this.º_wire_mode = {};
    this.º_distilled = {};
    this.ºdistilled = {};
};

ºFilter.prototype = {
    º_html: function(ºvar) {
        var ºh = `<div><p class="•dctrl">By full text search <span id="flt2_${ºvar}" class="•flt_compact"></span></p>`;
        ºh += `<div id="fltw_${ºvar}">`;
        ºh += `<p id="•fbox_${ºvar}" class="•flt •control_med •fbox ui-widget">`;
        ºh += `<input id="flt_${ºvar}" class="flt"/>`;
        ºh += `<a href="#" class="•control_med fa fa-close •filtc" id="clearf_${ºvar}"></a>`;
        ºh += `<span •fbox class="•stats" id="stats_${ºvar}"></span>&nbsp;`;
        ºh += `</p>`;
        ºh += `<div id="autoc_${ºvar}" style="display: none;">here ${ºvar}</div>`;
        ºh += `</div>`;
        this.ºcomponent.ºcontainer[ºvar].html(ºh);
    },
    º_setFacet: function(ºvar) {
        var ºtextf = this.ºcomponent.ºstate.ºgetState(`flt_${ºvar}`);
        this.º_filter_control2[ºvar].html(ºtextf);
        console.log(this.º_filter_control2[ºvar]);
        this.º_filter_control[ºvar].val(ºtextf);
        this.º_filter_control[ºvar].autocomplete(`search`, ºtextf);
    },
    º_response: function(ºvar) {
        return function(ºevent, ºui) {
            this.º_distilled[ºvar] = {};
            ºui.content.forEach(function(ºu, ºi) {
                this.º_distilled[ºvar][ºu.value] = 1;
            }, this);
            if (!(this.º_wire_mode[ºvar])) {
                this.ºcomponent.ºstate.ºsetState(`flt_${ºvar}`, this.º_filter_control[ºvar].val());
            }
        }.bind(this);
    },
    º_setClear: function(ºvar) {
        this.º_clear_filter_control[ºvar].click(function(ºe) {ºe.preventDefault();
            this.º_filter_control[ºvar].val(``);
            this.º_filter_control[ºvar].autocomplete(`search`, ``);
        }.bind(this));
    },
    ºstats: function(ºvar) {
        var ºstat_prefix;
        if (this.º_filter_control[ºvar].val() == ``) {
            ºstat_prefix = ``;
            this.º_stats_dst[ºvar].removeClass(`•ison`);
        }
        else {
            ºstat_prefix = `${this.ºfacet.ºdistilled[ºvar].length} of `;
            this.º_stats_dst[ºvar].addClass(`•ison`);
        }
        this.º_stats_dst[ºvar].html(`${ºstat_prefix}${this.ºdistilled[ºvar].length}`);
    },
    ºv: function(ºvar, ºi) {
        return (ºi in this.º_distilled[ºvar]);
    },
    ºshow: function(ºvar) {
        return (this.ºcomponent.ºstate.ºgetState(`list`) == ºvar);
    },
    ºweld: function(ºvar) {
        this.º_html(ºvar);
    },
    ºwire: function(ºvar) {
        if (!this.ºfacet) {
            this.ºfacet = this.ºcomponent.ºpage.ºgetComponent(`ºfacet`).ºimplementation;
        }
        var ºdata = this.ºcomponent.ºpage.ºgetComponent(`ºlist`).ºdata[ºvar];
        this.º_tags[ºvar] = [];
        ºdata.forEach(function(ºd, ºi) {
            this.º_tags[ºvar].push({label: ºd[1], value: `${ºd[0]}`});
        }, this);
        this.º_distilled[ºvar] = {};
        this.ºdistilled[ºvar] = [];
        var ºcc = this.ºcomponent.ºcontainer[ºvar];
        var ºcf = ºcc.find(`#fltw_${ºvar}`);
        this.º_filter_control[ºvar] = ºcf.find(`#flt_${ºvar}`);
        this.º_filter_control2[ºvar] = ºcc.find(`#flt2_${ºvar}`);
        this.º_box[ºvar] = ºcf.find(`#•fbox_${ºvar}`);
        this.º_completions_dst[ºvar] = ºcf.find(`#autoc_${ºvar}`);
        this.º_stats_dst[ºvar] = ºcf.find(`#stats_${ºvar}`);
        this.º_clear_filter_control[ºvar] = ºcf.find(`#clearf_${ºvar}`);
        this.º_filter_control[ºvar].autocomplete({
            appendTo: this.º_completions_dst[ºvar],
            source: this.º_tags[ºvar],
            response: this.º_response(ºvar),
            minLength: 0,
        });
        this.º_setClear(ºvar);
        this.º_wire_mode[ºvar] = true;
        this.º_setFacet(ºvar);
        this.º_wire_mode[ºvar] = false;
    },
    ºwork: function(ºvar) {
        var ºtextf = this.º_filter_control[ºvar].val();
        if (ºtextf == ``) {
            this.º_box[ºvar].removeClass(`•ison`);
            this.º_clear_filter_control[ºvar].hide();
        }
        else {
            this.º_box[ºvar].addClass(`•ison`);
            this.º_clear_filter_control[ºvar].show();
        }
    },
};

