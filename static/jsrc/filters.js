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
            h += `<div class="flt" lst="${itm}"><p>Filters for ${this.comp.state.showstate('list', itm, 'pl')}</p>`;
            h += `<div class="ui-widget"><label for="flt_${itm}">title matches: </label><input id="flt_${itm}"/></div></div>`;
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
        for (var itm in this.comp.data) {
            var fdiv = this.comp.container.find(`div[lst="${itm}"]`);
            if (itm == this.comp.state.getstate(`list`)) {
                var data = this.comp.page.getcomp(itm).data;
                tags[itm] = [];
                for (var i in data) {
                    var term = data[i][1];
                    if (term != null && term != '') {
                        tags[itm].push(data[i][1]);
                    }
                }
                this.comp.container.find(`#flt_${itm}`).autocomplete({source: tags[itm]});
                fdiv.show();
            }
            else {
                fdiv.hide();
            }
        }
    },
};

