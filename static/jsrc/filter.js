/* INDIVIDUAL COMPONENT: Filters
 * This is a list of filter controls corresponding to lists of records to be displayed in the middle column
 * Setting a filter control filters the associated list.
 */

function ºFilter(ºcomp) {
    this.ºcomp = ºcomp;
    this.ºname = `filter`;
    this.ºfacet = this.ºcomp.ºpage.ºgetcomp(`facet`).ºdelg;
    this.ºtags = {};
    this.ºfltc = {};
    this.ºboxf = {};
    this.ºautoc = {};
    this.ºstatsf = {};
    this.ºclearf = {};
    this.º_flted = {};
    this.º_data = {};
    this.ºfltd = {};
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
        this.ºfltc[ºsc].val(ºtextf);
        this.ºfltc[ºsc].autocomplete(`search`, ºtextf);
    },
    º_work_ctl: function(ºsc) {
        var ºtextf = this.ºfltc[ºsc].val();
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
        var ºthat = this;
        return function(ºevent, ºui) {
            ºthat.º_flted[ºsc] = {};
            for (var ºi in ºui.content) {
                ºthat.º_flted[ºsc][ºui.content[ºi].value] = 1;
            }
            if (!(ºthat.ºwire_mode[ºsc])) {
                ºthat.ºcomp.ºstate.ºsetstate(`f_${ºsc}`, ºthat.ºfltc[ºsc].val());
            }
        };
    },
    º_setclear: function(ºsc) {
        var ºthat = this;
        this.ºclearf[ºsc].click(function(ºe) {ºe.preventDefault();
            ºthat.ºfltc[ºsc].val(``);
            ºthat.ºfltc[ºsc].autocomplete(`search`, ``);
        });
    },
    ºstats: function(ºsc) {
        if (this.ºfltc[ºsc].val() == ``) {
            var ºprf = ``;
            this.ºstatsf[ºsc].removeClass(`•ison`);
        }
        else {
            var ºprf = `${this.ºfacet.ºfltd[ºsc].length} of `;
            this.ºstatsf[ºsc].addClass(`•ison`);
        }
        this.ºstatsf[ºsc].html(`${ºprf}${this.ºfltd[ºsc].length}`);
    },
    ºv: function(ºsc, ºi) {
        return (ºi in this.º_flted[ºsc]);
    },
    ºshow: function(ºsc) {
        return (this.ºcomp.ºstate.ºgetstate(`list`) == ºsc);
    },
    ºweld: function(ºsc) {
        this.º_html(ºsc);
    },
    ºwire: function(ºsc) {
        this.º_setclear(ºsc);
        this.ºfltc[ºsc].autocomplete({
            appendTo: this.ºautoc[ºsc],
            source: this.ºtags[ºsc],
            response: this.º_response(ºsc),
            minLength: 0,
        });
        this.ºwire_mode[ºsc] = true;
        this.º_set_flt(ºsc);
        this.ºwire_mode[ºsc] = false;
    },
    ºwire_flt: function(ºsc) {
        var ºthat = this;
        var ºcc = this.ºcomp.ºcontainer[ºsc];
        var ºcf = ºcc.find(`#fltw_${ºsc}`);
        this.ºfltc[ºsc] = ºcf.find(`#flt_${ºsc}`);
        this.ºboxf[ºsc] = ºcf.find(`#•fbox_${ºsc}`);
        this.ºautoc[ºsc] = ºcf.find(`#autoc_${ºsc}`);
        this.ºstatsf[ºsc] = ºcf.find(`#stats_${ºsc}`);
        this.ºclearf[ºsc] = ºcf.find(`#clearf_${ºsc}`);
        this.º_flted[ºsc] = {};
        this.ºfltd[ºsc] = [];
        var ºdata = this.ºcomp.ºpage.ºgetcomp(`list`).ºdata[ºsc];
        this.º_data[ºsc] = ºdata;
        this.ºtags[ºsc] = [];
        for (var ºi in ºdata) {
            this.ºtags[ºsc].push({label: ºdata[ºi][1], value: ºi});
        }
    },
    ºwork: function(ºsc) {},
    ºwork_flt: function(ºsc) {
        this.º_work_ctl(ºsc);
    },
};

