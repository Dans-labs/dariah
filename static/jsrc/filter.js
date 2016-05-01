/* INDIVIDUAL COMPONENT: Filters
 * This is a list of filter controls corresponding to lists of records to be displayed in the middle column
 * Setting a filter control filters the associated list.
 */

function Filter(comp) {
    this.comp = comp;
    this.facet = this.comp.page.getcomp(`facet`).delg;
    this.tags = {};
    this.fltc = {};
    this.boxf = {};
    this.autoc = {};
    this.statsf = {};
    this.clearf = {};
    this._flted = {};
    this.data = {};
};

Filter.prototype = {
    _html: function(sc) {
        var h = ``;
        h += `<div class="flt" id="fltw_${sc}">`;
        h += `<p id="fbox_${sc}" class="fbox ui-widget">`;
        h += `filter <input id="flt_${sc}" class="flt"/>`;
        h += `<span class="ctrl fa fa-close filtc" id="clearf_${sc}"></span>`;
        h += `<span class="stats" id="stats_${sc}"></span>&nbsp;`;
        h += `</p>`;
        h += `<div id="autoc_${sc}" style="display: none;">here ${sc}</div>`;
        h += `</div>`;
        this.comp.container[sc].html(h);
    },
    _set_flt: function(sc, textf) {
        this.comp.container[sc].addClass(`flt`);
        this.fltc[sc].val(textf);
        this.fltc[sc].autocomplete(`search`, textf);
        if (this.comp.state.getstate(`f_${sc}`) != textf) {
            this.comp.state.setstate(`f_${sc}`, textf);
        }
    },
    _adapt_flt: function(sc, ui) {
        var textf = this.fltc[sc].val();
        if (textf == ``) {
            this.boxf[sc].removeClass(`ison`);
            this.clearf[sc].hide();
        }
        else {
            var ln = ui.content.length;
            this.boxf[sc].addClass(`ison`);
            this.clearf[sc].show();
        }
    },
    _response: function(sc) {
        var that = this;
        return function(event, ui) {
            that._flted[sc] = [];
            for (var i in ui.content) {
                that._flted[sc][ui.content[i].value] = 1;
            }
            that._adapt_flt(sc, ui);
            that.facet.adapt_flt(sc);
        };
    },
    _setclear: function(sc) {
        var that = this;
        this.clearf[sc].click(function(e) {e.preventDefault();
            that._set_flt(sc, ``);
        });
    },
    v: function(sc, i) {
        return (i in this._flted[sc]);
    },
    stats: function(sc) {
        console.log(`FILTER STATS ${sc} = ${this.data[sc].length}`);
        this.statsf[sc].html(this.data[sc].length);
    },
    show: function(sc) {
        return this.comp.state.getstate(`list`) == sc;
    },
    init: function(sc) {
        this.facet.add_facet(sc, this);
        this._html(sc);
        this.comp.container[sc] = $(`#fltw_${sc}`);
        this.fltc[sc] = $(`#flt_${sc}`);
        this.boxf[sc] = $(`#fbox_${sc}`);
        this.autoc[sc] = $(`#autoc_${sc}`);
        this.statsf[sc] = $(`#stats_${sc}`);
        this.clearf[sc] = $(`#clearf_${sc}`);
        this._flted[sc] = {};
        this.data[sc] = [];
    },
    process: function(sc) {
    },
    apply: function(sc) {
        var that = this;
        if (this.show(sc)) {
            if (!this.facet._loaded[sc]) {
                var data = this.comp.page.getcomp(`list`).data[sc];
                this.tags[sc] = [];
                for (var i in data) {
                    var term = data[i][1];
                    if (true || (term != null && term != ``)) {
                        var line = data[i];
                        this.tags[sc].push({label: line[1], value: i});
                    }
                }
                this._setclear(sc);
                this.fltc[sc].autocomplete({
                    appendTo: this.autoc[sc],
                    source: this.tags[sc],
                    response: this._response(sc),
                    minLength: 0,
                });
                this._set_flt(sc, this.comp.state.getstate(`f_${sc}`));
                this.fltc[sc].change(function() {
                    that.comp.state.setstate(`f_${sc}`, $(this).val());
                });
            }
            this.comp.container[sc].show();
        }
        else {
            this.comp.container[sc].hide();
        }
    },
};

