/* INDIVIDUAL COMPONENT: Filters
 * This is a list of filter controls corresponding to lists of records to be displayed in the middle column
 * Setting a filter control filters the associated list.
 */

function Filter(comp) {
    this.comp = comp;
    this._loaded = {};
    this.tags = {};
    this.fltc = {};
    this.boxf = {};
    this.autoc = {};
    this.statsf = {};
    this.clearf = {};
    this.table = {};
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
        var tln = this.tags[sc].length;
        var textf = this.fltc[sc].val();
        if (textf == '') {
            this.boxf[sc].removeClass('ison');
            this.clearf[sc].hide();
            this.statsf[sc].html(`${tln}`);
        }
        else {
            var ln = ui.content.length;
            this.boxf[sc].addClass('ison');
            this.clearf[sc].show();
            this.statsf[sc].html(`${ln} of ${tln}`);
        }
    },
    _response: function(sc) {
        var that = this;
        var tln = that.tags[sc].length;
        return function(event, ui) {
            that.table[sc].find(`tr[id]`).hide();
            for (var i in ui.content) {
                that.table[sc].find(`tr[id="r${ui.content[i].value}"]`).show();
            }
            that._adapt_flt(sc, ui);
        };
    },
    _setclear: function(sc) {
        var that = this;
        this.clearf[sc].click(function(e) {e.preventDefault();
            that._set_flt(sc, ``);
        });
    },
    show: function(sc) {
        return this.comp.state.getstate('list') == sc;
    },
    init: function(sc) {
        this._html(sc);
        this._loaded[sc] = false;
        this.comp.container[sc] = $(`#fltw_${sc}`);
        this.fltc[sc] = $(`#flt_${sc}`);
        this.boxf[sc] = $(`#fbox_${sc}`);
        this.autoc[sc] = $(`#autoc_${sc}`);
        this.statsf[sc] = $(`#stats_${sc}`);
        this.clearf[sc] = $(`#clearf_${sc}`);
    },
    process: function(sc) {
    },
    apply: function(sc) {
        var that = this;
        this.table[sc] =  $(`#table_${sc}`);
        if (this.show(sc)) {
            if (!this._loaded[sc]) {
                var data = this.comp.page.getcomp('list').data[sc];
                this.tags[sc] = [];
                for (var i in data) {
                    var term = data[i][1];
                    if (term != null && term != '') {
                        var line = data[i];
                        this.tags[sc].push({label: line[1], value: line[0]});
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
                this._loaded[sc] = true;
            }
            this.comp.container[sc].show();
        }
        else {
            this.comp.container[sc].hide();
        }
    },
};

