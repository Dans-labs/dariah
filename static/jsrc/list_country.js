/* INDIVIDUAL COMPONENT: List_country
 * This is a small list of countries
 */

function List_country(comp) {this.comp = comp};

List_country.prototype = {
    _html: function() {
        var h = ``;
        h += `<table id="table_${this.comp.name}">`;
        for (var i in this.comp.data) {
            r = this.comp.data[i];
            h += `<tr id="r${r[0]}"><td class="cc">${r[0]}<td><td class="cn">${r[1]}<td></tr>`;
        }
        h += `</table>`;
        this.comp.container.html(h);
    },
    show: function() {
        return this.comp.state.getstate('list') == this.comp.name;
    },
    process: function() {
        this._html();
    },
    apply: function() {},
};

