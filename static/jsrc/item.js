/* INDIVIDUAL COMPONENT: Item
 * This manages the actual records to be displayed inside the list in the middle column.
 * The subcomponents corresponds to the individual lists, such as country, countribution
 * There is an extra argument that specifies the ids of the items that should be displayed.
 * All functionality (except show) is delegated to specific functions
 */

export default class {
    constructor(component) {
        this.component = component;
    }
    _html(vr, it) {
        const destination = this.component.dst.get(vr);
        const dest_row = destination.find(`tr[rid="${it[0]}"]`);
        let h = `<tr iid="${it[0]}">`;

        if (vr == 'contrib') {
            const types = [];
            for (const tp of it[5]) {
                types.push(`<a href="#" tid="${tp[0]}">${tp[1]}</a>`);
            }
            h += `
<td colspan="2">
<b>Contact person:</b> ${it[2]}<br/>
<b>Country:</b> ${it[3]} = ${it[4]}<br/>
<b>Types:</b> ${types.join(', ')}</br>
</td>
`;
        }
        else if (vr == 'country') {
            for (const r of this.component.data.get(vr)) {
                in_dariah = (r[3] == 1)?'dariah':'';
                h += `<td class="country_code">${r[1]}<td><td class="country_name">${r[2]}<td><td class="in_dariah">${in_dariah}</td><td class="latlng">${r[4]}</td><td class="latlng">${r[5]}</td>`;
            }
        }
        else if (vr == 'type' || vr == 'tadiraha' || vr == 'tadiraho' || vr == 'tadiraht') {
            for (const r of this.component.data.get(vr)) {
                h += `<td class="value">${r[1]}<td>`;
            }
        }
        h += '</tr>';
        dest_row.after(h);
    }
    show(vr) {
        return this.component.state.getState('list') == vr;
    }
    weld(vr) {
        for (const it of this.component.data.get(vr)) {
            this._html(vr, it);
        }
    }
    wire(vr) {}
    work(vr) {}
}
