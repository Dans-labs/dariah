/* INDIVIDUAL COMPONENT: Filters
 * This is a list of filter controls corresponding to lists of records to be displayed in the middle column
 * Setting a filter control filters the associated list.
 */

function Filter(comp) {
    this.comp = comp;
    this.name = `filter`;
    this.facet = this.comp.page.getcomp(`facet`).delg;
    this.tags = {};
    this.fltc = {};
    this.boxf = {};
    this.autoc = {};
    this.statsf = {};
    this.clearf = {};
    this._flted = {};
    this._data = {};
    this.fltd = {};
    this.wire_mode = {};
};

Filter.prototype = {
    _html: function(sc) {
        var h = `<div><p class="dctrl">By full text search</p>`;
        h += `<div class="flt" id="fltw_${sc}">`;
        h += `<p id="fbox_${sc}" class="fbox ui-widget">`;
        h += `<input id="flt_${sc}" class="flt"/>`;
        h += `<a href="#" class="ctrl fa fa-close filtc" id="clearf_${sc}"></a>`;
        h += `<span class="stats" id="stats_${sc}"></span>&nbsp;`;
        h += `</p>`;
        h += `<div id="autoc_${sc}" style="display: none;">here ${sc}</div>`;
        h += `</div>`;
        this.comp.container[sc].html(h);
    },
    _set_flt: function(sc) {
        var textf = this.comp.state.getstate(`f_${sc}`);
        this.comp.container[sc].addClass(`flt`);
        this.fltc[sc].val(textf);
        this.fltc[sc].autocomplete(`search`, textf);
    },
    _work_ctl: function(sc) {
        var textf = this.fltc[sc].val();
        if (textf == ``) {
            this.boxf[sc].removeClass(`ison`);
            this.clearf[sc].hide();
        }
        else {
            this.boxf[sc].addClass(`ison`);
            this.clearf[sc].show();
        }
    },
    _response: function(sc) {
        var that = this;
        return function(event, ui) {
            that._flted[sc] = {};
            for (var i in ui.content) {
                that._flted[sc][ui.content[i].value] = 1;
            }
            if (!(that.wire_mode[sc])) {
                that.comp.state.setstate(`f_${sc}`, that.fltc[sc].val());
            }
        };
    },
    _setclear: function(sc) {
        var that = this;
        this.clearf[sc].click(function(e) {e.preventDefault();
            that.fltc[sc].val(``);
            that.fltc[sc].autocomplete(`search`, ``);
        });
    },
    stats: function(sc) {
        var prf = (this.fltc[sc].val() != ``)?`${this.facet.fltd[sc].length} of `:``;
        this.statsf[sc].html(`${prf}${this.fltd[sc].length}`);
    },
    v: function(sc, i) {
        return (i in this._flted[sc]);
    },
    show: function(sc) {
        return this.comp.state.getstate(`list`) == sc;
    },
    weld: function(sc) {
        this.facet.add_facet(sc, this);
        this._html(sc);
        var cc = $(`#fltw_${sc}`);
        this.comp.container[sc] = cc;
        this.fltc[sc] = cc.find(`#flt_${sc}`);
        this.boxf[sc] = cc.find(`#fbox_${sc}`);
        this.autoc[sc] = cc.find(`#autoc_${sc}`);
        this.statsf[sc] = cc.find(`#stats_${sc}`);
        this.clearf[sc] = cc.find(`#clearf_${sc}`);
        this._flted[sc] = {};
        this.fltd[sc] = [];
    },
    wire: function(sc) {
        var that = this;
        if (!this.facet._loaded[sc] && !this.comp._loaded[sc]) {
            this.comp._loaded[sc] = true;
            var data = this.comp.page.getcomp(`list`).data[sc];
            this._data[sc] = data;
            this.tags[sc] = [];
            for (var i in data) {
                this.tags[sc].push({label: data[i][1], value: i});
            }
            this._setclear(sc);
            this.fltc[sc].autocomplete({
                appendTo: this.autoc[sc],
                source: this.tags[sc],
                response: this._response(sc),
                minLength: 0,
            });
            this.wire_mode[sc] = true;
            this._set_flt(sc);
            this.wire_mode[sc] = false;
        }
    },
    work: function(sc) {
        if (this.show(sc)) {
            this.comp.container[sc].show();
        }
        else {
            this.comp.container[sc].hide();
        }
    },
    work_flt: function(sc) {
        this._work_ctl(sc);
    },
};

