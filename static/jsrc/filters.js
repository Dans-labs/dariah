/* INDIVIDUAL COMPONENT: Filters
 * This is a list of filter controls corresponding to lists of records to be displayed in the middle column
 * Setting a filter control filters the associated list.
 */

/* COLLECTION of Filter COMPONENTS
 * This is an array of all the main filter components
 */

function Filters(comp) {this.comp = comp};

Filters.prototype = {
    _html: function() {
        var h = ``;
        for (var itm in this.comp.data) {
            h += `<div class="flt" lst="${itm}">`;
            h += `<p>Filters for ${this.comp.state.showstate('list', itm, 'pl')}</p>`;
            h += `<p id="fbox_${itm}" class="fbox ctrl ui-widget">`;
            h += `<input id="flt_${itm}" class="flt"/>`;
            h += `<span class="ctrl fa fa-close filtc" id="clearf_${itm}"></span>`;
            h += `<span class="stats" id="stats_${itm}"></span>&nbsp;`;
            h += `</p>`;
            h += `<div id="autoc_${itm}" style="display: none;">here ${itm}</div>`;
            h += `</div>`;
        }
        this.comp.container.html(h);
    },
    _dressup: function() {
    },
    show: function() {
        return true;
    },
    process: function() {
        this._html();
        this._dressup();
    },
    apply: function() {
        var that = this;
        var tags = {};
        _adapt_flt = function(ui, itm, off) {
            var tln = tags[itm].length;
            var textf = that.fltc.val();
            if (off || textf == '') {
                that.boxf.removeClass('ison');
                that.clearf.hide();
                that.statsf.html(`${tln}`);
            }
            else {
                var ln = ui.content.length;
                that.boxf.addClass('ison');
                that.clearf.show();
                that.statsf.html(`${ln} of ${tln}`);
            }
            if (off) {
                that.fltc.val('');
                $(`tr[id]`).show();
            }
        };
        _resp = function(itm) {
            var tln = tags[itm].length;
            return function(event, ui) {
                var ln = ui.content.length;
                $(`tr[id]`).hide();
                for (var i in ui.content) {
                    $(`tr[id="r${ui.content[i].value}"]`).show();
                }
                _adapt_flt(ui, itm, false);
            };
        };
        _setclear = function(o, itm) {
            o.click(function(e) {e.preventDefault();
                _adapt_flt(null, itm, true);
            });
        };
        for (var itm in this.comp.data) {
            var fdiv = this.comp.container.find(`div[lst="${itm}"]`);
            if (itm == this.comp.state.getstate(`list`)) {
                this.boxf = $(`#fbox_${itm}`);
                this.fltc = $(`#flt_${itm}`);
                this.autoc = $(`#autoc_${itm}`);
                this.statsf = $(`#stats_${itm}`);
                this.clearf = $(`#clearf_${itm}`);
                var data = this.comp.page.getcomp(itm).data;
                tags[itm] = [];
                for (var i in data) {
                    var term = data[i][1];
                    if (term != null && term != '') {
                        var line = data[i];
                        tags[itm].push({label: line[1], value: line[0]});
                    }
                }
                _setclear(this.clearf, itm);
                _adapt_flt(null, itm, true);
                this.comp.container.find(that.fltc).autocomplete({
                    appendTo: this.autoc,
                    source: tags[itm],
                    response: _resp(itm),
                    minLength: 0,
                });
                fdiv.show();
            }
            else {
                fdiv.hide();
            }
        }
    },
};

