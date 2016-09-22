/* INDIVIDUAL COMPONENT: List
 * This manages the actual lists of records to be displayed in the middle column.
 * The subcomponents corresponds to the individual lists, such as country, countribution
 * All functionality (except show) is delegated to specific functions
 */

import * as g from './generic.js';

export default class {
    constructor(component) {
        this.component = component;
        this.row_status = new Map();
    }
    _html(vr) {
        this.row_status.set(vr, new Map());
        let h = '';
        h += `<table id="table_${vr}">`;
        for (const r of this.component.data.get(vr)) {
            const rid = r['_id'];
            this.row_status.get(vr).set(rid, true);
            const rowstart = `<tr rid="${rid}"><td><a class="showc fa fa-fw fa-list-ul" href="#" title="hide fields"></a><a class="hidec fa fa-fw fa-minus" href="#" title="show fields"></a></td>`;
            const rowend = '</tr>';
            if (vr == 'contrib') {
                h += `${rowstart}<td>${r['title']}</td>${rowend}`;
            }
            else if (vr == 'country') {
                const in_dariah = r['inDARIAH']?'in dariah':'';
                h += `${rowstart}<td class="country_code">${rid}<td><td class="country_name">${r['name']}<td><td class="in_dariah">${in_dariah}</td>${rowend}`;
            }
            else if (vr == 'type') {
                h += `${rowstart}<td class="value">${r['value']}<td>${rowend}`;
            }
            else if (vr == 'tadiraha' || vr == 'tadiraho' || vr == 'tadiraht') {
                h += `${rowstart}<td class="value">${r['value']}<td>${rowend}`;
            }
        }
        h += '</table>';
        this.component.container.get(vr).html(h);
    }
    getRecordIds(vr) {
        return this.row_status.get(vr).keys();
    }
    getRow(vr, rid) {
        const destination = this.component.container.get(vr);
        return destination.find(`tr[rid="${rid}"]`);
    }
    select(vr) {
        const distilled = this.component.page.getComponent('facet').implementation.distilled.get(vr);
        const row_status = this.row_status.get(vr);
        for (const [rid, shown] of row_status) {
            if (shown == (distilled.has(rid))) {continue}
            const row = this.component.container.get(vr).find(`tr[rid="${rid}"]`);
            if (shown) {
                row.hide();
            }
            else {
                row.show();
            }
            row_status.set(rid, !shown);
        }
    }
    show(vr) {
        return this.component.state.getState('list') == vr;
    }
    weld(vr) {
        this._html(vr);
    }
    wire(vr) {
        const showc = this.component.container.get(vr).find(`.showc`);
        showc.hide();
    }
    work(vr) {
    }
}
