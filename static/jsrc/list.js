/* INDIVIDUAL COMPONENT: ºList
 * This manages the actual lists of records to be displayed in the middle column.
 * The subcomponents corresponds to the individual lists, such as country, countribution
 * All functionality (except ºshow) is delegated to ºspecific functions
 */

function ºList(ºcomponent) {this.ºcomponent = ºcomponent};

ºList.prototype = {
    º_html: function(ºsc) {
        var ºh = ``;
        ºh += `<table id="table_${ºsc}">`;
        if (ºsc == `contrib`) {
            this.ºcomponent.ºdata[ºsc].forEach(function(ºr) {
                ºh += `<tr id="r${ºr[0]}"><td><a href="#" rid="${ºr[0]}">${ºr[1]}</a></td></tr>`;
            });
        }
        else if (ºsc == `country`) {
            this.ºcomponent.ºdata[ºsc].forEach(function(ºr) {
                ºh += `<tr id="r${ºr[0]}"><td class="•country_code">${ºr[0]}<td><td class="•country_name">${ºr[1]}<td></tr>`;
            });
        }
        else if (ºsc == `type`) {
            this.ºcomponent.ºdata[ºsc].forEach(function(ºr) {
                ºh += `<tr id="r${ºr[0]}"><td class="•country_code">${ºr[0]}<td><td class="•country_name">${ºr[1]}<td></tr>`;
            });
        }
        ºh += `</table>`;
        this.ºcomponent.ºcontainer[ºsc].html(ºh);
    },
    ºshow: function(ºsc) {
        return this.ºcomponent.ºstate.ºgetState(`list`) == ºsc;
    },
    ºweld: function(ºsc) {
        this.º_html(ºsc);
    },
    ºwire: function(ºsc) {
    },
    ºwork: function(ºsc) {},
};

