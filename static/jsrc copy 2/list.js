/* INDIVIDUAL COMPONENT: List
 * This manages the actual lists of records to be displayed in the middle column.
 * The subcomponents corresponds to the individual lists, such as country, countribution
 * All functionality (except show) is delegated to specific functions
 */

function List(comp) {this.comp = comp};

List.prototype = {
    _html: function(sc) {
        var h = ``;
        h += `<table id="table_${sc}">`;
        if (sc == `contrib`) {
            for (var i in this.comp.data[sc]) {
                r = this.comp.data[sc][i];
                h += `<tr id="r${r[0]}"><td class="cc">${r[2]}<td><td class="cn">${r[3]}<td><td><a href="#" rid="${r[0]}">${r[1]}</a></td></tr>`;
            }
        }
        else if (sc == `country`) {
            for (var i in this.comp.data[sc]) {
                r = this.comp.data[sc][i];
                h += `<tr id="r${r[0]}"><td class="cc">${r[0]}<td><td class="cn">${r[1]}<td></tr>`;
            }
        }
        h += `</table>`;
        this.comp.container[sc].html(h);
    },
    show: function(sc) {
        return this.comp.state.getstate(`list`) == sc;
    },
    weld: function(sc) {},
    wire: function(sc) {
        this._html(sc);
    },
    work: function(sc) {},
};

