/* INDIVIDUAL COMPONENT: Item
 * This manages the actual records to be displayed inside the list in the middle column.
 * The subcomponents corresponds to the individual lists, such as country, countribution
 * There is an extra argument that specifies the ids of the items that should be displayed.
 * All functionality (except show) is delegated to specific functions
 */

function Item(component) {this.component = component};

Item.prototype = {
    _html: function(vr, it) {
        var destination = this.component._dst[vr];
        var dest_row = destination.find(`tr[id="r${it[0]}"]`);
        console.log(`Finding ${vr} row r${it[0]}:`, dest_row);
        var h = `<tr iid="${it[0]}">`;

        if (vr == `contrib`) {
            var types = [];
            it[5].forEach(function(tp) {
                types.push(`<a href="#" tid="${tp[0]}">${tp[1]}</a>`);
            });
            h += `
<td>
<b>Contact person:</b> ${it[2]}<br/>
<b>Country:</b> ${it[3]} = ${it[4]}<br/>
<b>Types:</b> ${types.join(`, `)}</br>
</td>
`;
        }
        else if (vr == `country`) {
            this.component.data[vr].forEach(function(r) {
                in_dariah = (r[3] == 1)?`dariah`:``;
                h += `<tr id="r${r[0]}"><td class="country_code">${r[1]}<td><td class="country_name">${r[2]}<td><td class="in_dariah">${in_dariah}</td><td class="latlng">${r[4]}</td><td class="latlng">${r[5]}</td></tr>`;
            });
        }
        else if (vr == `type` || vr == `tadiraha` || vr == `tadiraho` || vr == `tadiraht`) {
            this.component.data[vr].forEach(function(r) {
                h += `<tr id="r${r[0]}"><td class="value">${r[1]}<td></tr>`;
            });
        }
        h += `</tr>`;
        console.log(h);
        dest_row.after(h);
    },
    show: function(vr) {
        return this.component.state.getState(`list`) == vr;
    },
    weld: function(vr) {
        this.component.data[vr].forEach(function(it) {
            this._html(vr, it);
        }, this);
    },
    wire: function(vr) {
    },
    work: function(vr) {},
};

module.exports = Item;
