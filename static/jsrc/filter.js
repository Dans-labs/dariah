/* INDIVIDUAL COMPONENT: Filters
 * This is a list of filter controls corresponding to lists of records to be displayed in the middle column
 * Setting a filter control filters the associated list.
 */

function ºFilter(ºcomponent) {
    this.ºcomponent = ºcomponent;
    this.º_tags = {};
    this.º_filter_control = {};
    this.º_box = {};
    this.º_completions_dst = {};
    this.º_stats_dst = {};
    this.º_clear_filter_control = {};
    this.º_wire_mode = {};
    this.º_distilled = {};
    this.ºdistilled = {};
};

ºFilter.prototype = {
    º_html: function(ºsc) {
        var ºh = `<div><p class="•dctrl">By full text search</p>`;
        ºh += `<div id="fltw_${ºsc}">`;
        ºh += `<p id="•fbox_${ºsc}" class="•flt •control_med •fbox ui-ºwidget">`;
        ºh += `<input id="flt_${ºsc}" class="flt"/>`;
        ºh += `<a href="#" class="•control_med fa fa-close •filtc" id="clearf_${ºsc}"></a>`;
        ºh += `<span •fbox class="•stats" id="stats_${ºsc}"></span>&nbsp;`;
        ºh += `</p>`;
        ºh += `<div id="autoc_${ºsc}" style="display: none;">here ${ºsc}</div>`;
        ºh += `</div>`;
        this.ºcomponent.ºcontainer[ºsc].html(ºh);
    },
    º_setFacet: function(ºsc) {
        var ºtextf = this.ºcomponent.ºstate.ºgetState(`flt_${ºsc}`);
        this.º_filter_control[ºsc].val(ºtextf);
        this.º_filter_control[ºsc].autocomplete(`search`, ºtextf);
    },
    º_response: function(ºsc) {
        return function(ºevent, ºui) {
            this.º_distilled[ºsc] = {};
            ºui.content.forEach(function(ºu, ºi) {
                this.º_distilled[ºsc][ºu.value] = 1;
            }, this);
            if (!(this.º_wire_mode[ºsc])) {
                this.ºcomponent.ºstate.ºsetState(`flt_${ºsc}`, this.º_filter_control[ºsc].val());
            }
        }.bind(this);
    },
    º_setClear: function(ºsc) {
        this.º_clear_filter_control[ºsc].click(function(ºe) {ºe.preventDefault();
            this.º_filter_control[ºsc].val(``);
            this.º_filter_control[ºsc].autocomplete(`search`, ``);
        }.bind(this));
    },
    ºstats: function(ºsc) {
        var ºstat_prefix;
        if (this.º_filter_control[ºsc].val() == ``) {
            ºstat_prefix = ``;
            this.º_stats_dst[ºsc].removeClass(`•ison`);
        }
        else {
            ºstat_prefix = `${this.ºfacet.ºdistilled[ºsc].length} of `;
            this.º_stats_dst[ºsc].addClass(`•ison`);
        }
        this.º_stats_dst[ºsc].html(`${ºstat_prefix}${this.ºdistilled[ºsc].length}`);
    },
    ºv: function(ºsc, ºi) {
        return (ºi in this.º_distilled[ºsc]);
    },
    ºshow: function(ºsc) {
        return (this.ºcomponent.ºstate.ºgetState(`list`) == ºsc);
    },
    ºweld: function(ºsc) {
        this.º_html(ºsc);
    },
    ºwire: function(ºsc) {
        if (!this.ºfacet) {
            this.ºfacet = this.ºcomponent.ºpage.ºgetComponent(`ºfacet`).ºimplementation;
        }
        var ºdata = this.ºcomponent.ºpage.ºgetComponent(`ºlist`).ºdata[ºsc];
        this.º_tags[ºsc] = [];
        ºdata.forEach(function(ºd, ºi) {
            this.º_tags[ºsc].push({label: ºd[1], value: `${ºi}`});
        }, this);
        this.º_distilled[ºsc] = {};
        this.ºdistilled[ºsc] = [];
        var ºcc = this.ºcomponent.ºcontainer[ºsc];
        var ºcf = ºcc.find(`#fltw_${ºsc}`);
        this.º_filter_control[ºsc] = ºcf.find(`#flt_${ºsc}`);
        this.º_box[ºsc] = ºcf.find(`#•fbox_${ºsc}`);
        this.º_completions_dst[ºsc] = ºcf.find(`#autoc_${ºsc}`);
        this.º_stats_dst[ºsc] = ºcf.find(`#stats_${ºsc}`);
        this.º_clear_filter_control[ºsc] = ºcf.find(`#clearf_${ºsc}`);
        this.º_filter_control[ºsc].autocomplete({
            appendTo: this.º_completions_dst[ºsc],
            source: this.º_tags[ºsc],
            response: this.º_response(ºsc),
            minLength: 0,
        });
        this.º_setClear(ºsc);
        this.º_wire_mode[ºsc] = true;
        this.º_setFacet(ºsc);
        this.º_wire_mode[ºsc] = false;
    },
    ºwork: function(ºsc) {
        var ºtextf = this.º_filter_control[ºsc].val();
        if (ºtextf == ``) {
            this.º_box[ºsc].removeClass(`•ison`);
            this.º_clear_filter_control[ºsc].hide();
        }
        else {
            this.º_box[ºsc].addClass(`•ison`);
            this.º_clear_filter_control[ºsc].show();
        }
    },
};

