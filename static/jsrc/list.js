/* INDIVIDUAL COMPONENT: List
 * This manages the actual lists of records to be displayed in the middle column.
 * The subcomponents corresponds to the individual lists, such as country, countribution
 * All functionality (except show) is delegated to specific functions
 */

var g = require('./generic.js');
function List(component) {this.component = component};

List.prototype = {
    _html: function(vr) {
        var h = ``;
        h += `<table id="table_${vr}">`;
        this.component.data[vr].forEach(function(r) {
            var rowstart = `<tr rid="${r[0]}"><td><a class="showc fa fa-fw fa-list-ul" href="#" title="hide fields"></a><a class="hidec fa fa-fw fa-minus" href="#" title="show fields"></a></td>`;
            var rowend = `</tr>`;
            if (vr == `contrib`) {
                h += `${rowstart}<td><a href="#" class="fa fa-fw fa-minus"></a>${r[1]}</td>${rowend}`;
            }
            else if (vr == `country`) {
                in_dariah = (r[3] == 1)?`dariah`:``;
                h += `${rowstart}<td class="country_code">${r[1]}<td><td class="country_name">${r[2]}<td><td class="in_dariah">${in_dariah}</td><td class="latlng">${r[4]}</td><td class="latlng">${r[5]}</td>${rowend}`;
            }
            else if (vr == `type` || vr == `tadiraha` || vr == `tadiraho` || vr == `tadiraht`) {
                h += `${rowstart}<td class="value">${r[1]}<td>${rowend}`;
            }
        });
        h += `</table>`;
        this.component.container[vr].html(h);
    },
    _display: function(row, vr, open_ids) {
        var that = this;
        var hidec = row.find(`.hidec`);
        var showc = row.find(`.showc`);
        var rid = row.attr(`rid`);
        var detail = this.component.container[vr].find(`tr[iid="${rid}"]`);
        var mode = (rid in open_ids) && open_ids[rid];
        if (mode) {
            hidec.show();
            showc.hide();
            if (detail.length) {
                detail.show();
            }
        }
        else {
            hidec.hide();
            showc.hide();
            if (detail.length) {
                detail.hide();
            }
        }
    },
    _set_it: function(control, vr, state) {
        var open_ids = g.from_str(this.state.getState(key));
        var rid = control.closest(`tr`).attr(`rid`);
        open_ids[rid] = state;
        this.state.setState(key, g.to_str(open_ids));
    },
    show: function(vr) {
        return this.component.state.getState(`list`) == vr;
    },
    weld: function(vr) {
        this._html(vr);
    },
    wire: function(vr) {
        var that = this;
        var cc = this.component.container[vr];
        var key = `${this.component.name}_${vr}`;
        cc.find(`.hidec`).click(function(e) {e.preventDefault();
            that._set_it($(this), vr, true);
        });
        cc.find(`.showc`).click(function(e) {e.preventDefault();
            that._set_it($(this), vr, false);
        });
    },
    work: function(vr) {
        var that = this;
        var key = `${this.component.name}_${vr}`;
        var cc = this.component.container[vr];
        var open_ids = g.from_str(this.component.state.getState(`${this.component.name}_${vr}`));
        cc.find(`tr[rid]`).each(function() {
            that._display($(this), vr, open_ids);
        });
    },
};

module.exports = List;
