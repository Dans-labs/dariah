/* INDIVIDUAL COMPONENT: Item
 * This manages the actual records to be displayed inside the list in the middle column.
 * The subcomponents corresponds to the individual lists, such as country, countribution
 * There is an extra argument that specifies the ids of the items that should be displayed.
 * All functionality (except show) is delegated to specific functions
 */

import * as g from './generic.js';

export default class {
    constructor(component) {
        this.component = component;
        this.open_items = new Map();
    }
    _html(vr, it) {
        const iid = it['_id'];
        this.open_items.get(vr).add(iid);
        const row = this.component.up.implementation.getRow(vr, iid);
        const hidec = row.find('.hidec');
        const showc = row.find('.showc');
        let h = `<tr iid="${iid}"><td>&nbsp</td>`;

        if (vr == 'contrib') {
            const types = [];
            for (const tp of it['type_of_inkind']) {
                types.push(`<a href="#" tid="${tp['_id']}">${tp['value']}</a>`);
            }
            h += `
<td>
<b>Contact person:</b> ${it['contact_person_name']}<br/>
<b>Country:</b> ${it['country'][0]['_id']} = ${it['country'][0]['name']}<br/>
<b>Types:</b> ${types.join(', ')}<br/>
</td>
`;
        }
        else if (vr == 'country') {
            const in_dariah = it['member_dariah']?'yes':'no';
            h += `
<td colspan="3">
<b>Country code:</b> <span class="country_code">${it['_id']}</span><br/>
<b>Country name:</b> <span class="country_name">${it['name']}</span><br/>
<b>Member DARIAH?</b> <span class="in_dariah">${in_dariah}</span><br/>
<b>Latitude, Longitude:</b> <span class="latlng">${it['latitude']}</span>, <span class="latlng">${it['longitude']}</span><br/>
</td>`;
        }
        else if (vr == 'type' || vr == 'tadiraha' || vr == 'tadiraho' || vr == 'tadiraht') {
            h += `
<td>
<b>Value:</b> <span class="value">${it['value']}</span><br/>
<td>`;
        }
        h += '</tr>';
        row.after(h);
        hidec.hide();
        showc.show();
    }
    _set_it(control, vr, state) {
        const key = `${this.component.name}_${vr}`;
        const open_ids = g.from_str(this.component.state.getState(key));
        const rid = control.closest('tr').attr('rid');
        if (state) {
            open_ids.add(rid);
        }
        else {
            open_ids.delete(rid);
        }
        this.component.state.setState(key, g.to_str(open_ids));
    }
    display(vr, iid, with_detail) {
        if (this.open_items.get(vr).has(iid) == with_detail) {return}
        const row = this.component.up.implementation.getRow(vr, iid);
        const hidec = row.find('.hidec');
        const showc = row.find('.showc');
        const detail = this.component.up.container.get(vr).find(`tr[iid="${iid}"]`);
        if (with_detail) {
            hidec.hide();
            showc.show();
            if (detail.length) { /* it is possible that the detail is still being fetched
                                    in that case: no problem, when it arrives it will be inserted,
                                    no need to call show().
                                    If the detail was already here and hidden, this show() will have effect
                                 */ 
                detail.show();
            }
        }
        else {
            hidec.show();
            showc.hide();
            if (detail.length) {
                detail.hide();
            }
        }
        if (with_detail) {
            this.open_items.get(vr).add(iid);
        }
        else {
            this.open_items.get(vr).delete(iid);
        }
    }
    show(vr) {
        return this.component.state.getState('list') == vr;
    }
    weld(vr) {
        if (!this.open_items.has(vr)) {this.open_items.set(vr, new Set())};
        for (const it of this.component.data.get(vr)) {
            this._html(vr, it);
        }
    }
    wire(vr) {
        const that = this;
        const cc = this.component.up.container.get(vr);
        cc.find('.hidec').click(function(e) {e.preventDefault();
            that._set_it($(this), vr, true);
        });
        cc.find('.showc').click(function(e) {e.preventDefault();
            that._set_it($(this), vr, false);
        });
    }
    work(vr) {
        const open_ids = g.from_str(this.component.state.getState(`${this.component.name}_${vr}`));
        for (const [iid, shown] of this.component.up.implementation.row_status.get(vr)) {
            this.display(vr, iid, shown && open_ids.has(iid));
        }
    }
}
