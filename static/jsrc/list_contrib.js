/* INDIVIDUAL COMPONENT: List_contrib
 * This is the big list of contributions
 */

function List_contrib(comp) {this.comp = comp};

List_contrib.prototype = {
    _html: function() {
        var h = ``;
        h += `<table id="table_${this.comp.name}">`;
        for (var i in this.comp.data) {
            r = this.comp.data[i];
            h += `<tr><td class="cc">${r[2]}<td><td class="cn">${r[3]}<td><td><a href="#" cid="${r[0]}">${r[1]}</a></td></tr>`;
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

