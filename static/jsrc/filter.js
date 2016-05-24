/* INDIVIDUAL COMPONENT: Filters
 * This is a list of filter controls corresponding to lists of records to be displayed in the middle column
 * Setting a filter control filters the associated list.
 */

function ºFilter(ºcomp) {
    this.ºcomp = ºcomp;
    this.ºtags = {};
    this.ºfilter_control = {};
    this.ºboxf = {};
    this.ºautoc = {};
    this.ºstatsf = {};
    this.ºclearf = {};
    this.º_distilled = {};
    this.ºdistilled = {};
    this.ºwire_mode = {};
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
        this.ºcomp.ºcontainer[ºsc].html(ºh);
    },
    º_set_flt: function(ºsc) {
        var ºtextf = this.ºcomp.ºstate.ºgetstate(`f_${ºsc}`);
        this.ºfilter_control[ºsc].val(ºtextf);
        this.ºfilter_control[ºsc].autocomplete(`search`, ºtextf);
    },
    º_work_ctl: function(ºsc) {
        var ºtextf = this.ºfilter_control[ºsc].val();
        if (ºtextf == ``) {
            this.ºboxf[ºsc].removeClass(`•ison`);
            this.ºclearf[ºsc].hide();
        }
        else {
            this.ºboxf[ºsc].addClass(`•ison`);
            this.ºclearf[ºsc].show();
        }
    },
    º_response: function(ºsc) {
        return function(ºevent, ºui) {
            this.º_distilled[ºsc] = {};
            ºui.content.forEach(function(ºu, ºi) {
                this.º_distilled[ºsc][ºu.value] = 1;
            }, this);
            if (!(this.ºwire_mode[ºsc])) {
                this.ºcomp.ºstate.ºsetstate(`f_${ºsc}`, this.ºfilter_control[ºsc].val());
            }
        }.bind(this);
    },
    º_setclear: function(ºsc) {
        this.ºclearf[ºsc].click(function(ºe) {ºe.preventDefault();
            this.ºfilter_control[ºsc].val(``);
            this.ºfilter_control[ºsc].autocomplete(`search`, ``);
        }.bind(this));
    },
    ºstats: function(ºsc) {
        var ºstat_prefix;
        if (this.ºfilter_control[ºsc].val() == ``) {
            ºstat_prefix = ``;
            this.ºstatsf[ºsc].removeClass(`•ison`);
        }
        else {
            ºstat_prefix = `${this.ºfacet.ºdistilled[ºsc].length} of `;
            this.ºstatsf[ºsc].addClass(`•ison`);
        }
        this.ºstatsf[ºsc].html(`${ºstat_prefix}${this.ºdistilled[ºsc].length}`);
    },
    ºv: function(ºsc, ºi) {
        return (ºi in this.º_distilled[ºsc]);
    },
    ºshow: function(ºsc) {
        return (this.ºcomp.ºstate.ºgetstate(`list`) == ºsc);
    },
    ºweld: function(ºsc) {
        this.º_html(ºsc);
    },
    ºwire: function(ºsc) {
        if (!this.ºfacet) {
            this.ºfacet = this.ºcomp.ºpage.ºget_component(`ºfacet`).ºdelg;
        }
        var ºdata = this.ºcomp.ºpage.ºget_component(`ºlist`).ºdata[ºsc];
        this.ºtags[ºsc] = [];
        ºdata.forEach(function(ºd, ºi) {
            this.ºtags[ºsc].push({label: ºd[1], value: `${ºi}`});
        }, this);
        this.º_distilled[ºsc] = {};
        this.ºdistilled[ºsc] = [];
        var ºcc = this.ºcomp.ºcontainer[ºsc];
        var ºcf = ºcc.find(`#fltw_${ºsc}`);
        this.ºfilter_control[ºsc] = ºcf.find(`#flt_${ºsc}`);
        this.ºboxf[ºsc] = ºcf.find(`#•fbox_${ºsc}`);
        this.ºautoc[ºsc] = ºcf.find(`#autoc_${ºsc}`);
        this.ºstatsf[ºsc] = ºcf.find(`#stats_${ºsc}`);
        this.ºclearf[ºsc] = ºcf.find(`#clearf_${ºsc}`);
        this.ºfilter_control[ºsc].autocomplete({
            appendTo: this.ºautoc[ºsc],
            source: this.ºtags[ºsc],
            response: this.º_response(ºsc),
            minLength: 0,
        });
        this.º_setclear(ºsc);
        this.ºwire_mode[ºsc] = true;
        this.º_set_flt(ºsc);
        this.ºwire_mode[ºsc] = false;
    },
    ºwork: function(ºsc) {
        this.º_work_ctl(ºsc);
    },
};

