/* INDIVIDUAL COMPONENT: List
 * This manages the actual lists of records to be displayed in the middle column.
 * The subcomponents corresponds to the individual lists, such as country, countribution
 * All functionality (except show) is delegated to specific functions
 */

const g = require('./generic.js');

function List(component) {this.component = component};

List.prototype = {
    _html: function(vr) {
        let h = '';
        h += `<table id="table_${vr}">`;
        for (const r of this.component.data.get(vr)) {
            const rowstart = `<tr rid="${r[0]}"><td><a class="showc fa fa-fw fa-list-ul" href="#" title="hide fields"></a><a class="hidec fa fa-fw fa-minus" href="#" title="show fields"></a></td>`;
            const rowend = '</tr>';
            if (vr == 'contrib') {
                h += `${rowstart}<td><a href="#" class="fa fa-fw fa-minus"></a>${r[1]}</td>${rowend}`;
            }
            else if (vr == 'country') {
                const in_dariah = (r[3] == 1)?'dariah':'';
                h += `${rowstart}<td class="country_code">${r[1]}<td><td class="country_name">${r[2]}<td><td class="in_dariah">${in_dariah}</td><td class="latlng">${r[4]}</td><td class="latlng">${r[5]}</td>${rowend}`;
            }
            else if (vr == 'type' || vr == 'tadiraha' || vr == 'tadiraho' || vr == 'tadiraht') {
                h += `${rowstart}<td class="value">${r[1]}<td>${rowend}`;
            }
        }
        h += '</table>';
        this.component.container.get(vr).html(h);
    },
    _display: function(row, vr, open_ids) {
        const that = this;
        const hidec = row.find('.hidec');
        const showc = row.find('.showc');
        const rid = row.attr('rid');
        const detail = this.component.container.get(vr).find(`tr[iid="${rid}"]`);
        if (open_ids.has(rid)) {
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
        const open_ids = g.from_str(this.state.getState(key));
        const rid = control.closest('tr').attr('rid');
        if (state) {
            open_ids.add(rid);
        }
        else {
            open_ids.delete(rid);
        }
        this.state.setState(key, g.to_str(open_ids));
    },
    show: function(vr) {
        return this.component.state.getState('list') == vr;
    },
    weld: function(vr) {
        this._html(vr);
    },
    wire: function(vr) {
        const that = this;
        const cc = this.component.container.get(vr);
        const key = `${this.component.name}_${vr}`;
        cc.find('.hidec').click(function(e) {e.preventDefault();
            that._set_it($(this), vr, true);
        });
        cc.find('.showc').click(function(e) {e.preventDefault();
            that._set_it($(this), vr, false);
        });
    },
    work: function(vr) {
        const that = this;
        const key = `${this.component.name}_${vr}`;
        const cc = this.component.container.get(vr);
        const open_ids = g.from_str(this.component.state.getState(`${this.component.name}_${vr}`));
        cc.find('tr[rid]').each(function() {
            that._display($(this), vr, open_ids);
        });
    },
};

module.exports = List;
