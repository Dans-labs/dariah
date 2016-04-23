/* INDIVIDUAL COMPONENT: List_country
 * This is a small list of countries
 */

function List_country(comp) {this.comp = comp};

List_country.prototype = {
    show: function() {
        return this.comp.page.state.getstate('list') == this.comp.name;
    },
    genhtml: function() {
        var h = ``;
        h += `<table id="table_${this.comp.name}">`;
        for (var i in this.comp.data) {
            r = this.comp.data[i];
            h += `<tr><td class="cc">${r[0]}<td><td class="cn">${r[1]}<td></tr>`;
        }
        h += `</table>`;
        this.comp.container.html(h);
    },
    process: function() {
        this.genhtml();
    },
    apply: function() {},
};

