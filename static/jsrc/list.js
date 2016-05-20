/* INDIVIDUAL COMPONENT: ºList
 * This manages the actual lists of records to be displayed in the middle column.
 * The subcomponents corresponds to the individual lists, such as country, countribution
 * All functionality (except ºshow) is delegated to ºspecific functions
 */

function ºList(ºcomp) {this.ºcomp = ºcomp};

ºList.prototype = {
    º_html: function(ºsc) {
        var ºh = ``;
        ºh += `<table id="table_${ºsc}">`;
        if (ºsc == `contrib`) {
            for (var ºi in this.ºcomp.ºdata[ºsc]) {
                ºr = this.ºcomp.ºdata[ºsc][ºi];
                ºh += `<tr id="r${ºr[0]}"><td><a href="#" rid="${ºr[0]}">${ºr[1]}</a></td></tr>`;
            }
        }
        else if (ºsc == `country`) {
            for (var ºi in this.ºcomp.ºdata[ºsc]) {
                ºr = this.ºcomp.ºdata[ºsc][ºi];
                ºh += `<tr id="r${ºr[0]}"><td class="•country_code">${ºr[0]}<td><td class="•country_name">${ºr[1]}<td></tr>`;
            }
        }
        ºh += `</table>`;
        this.ºcomp.ºcontainer[ºsc].html(ºh);
    },
    ºshow: function(ºsc) {
        return this.ºcomp.ºstate.ºgetstate(`list`) == ºsc;
    },
    ºweld: function(ºsc) {
        this.º_html(ºsc);
    },
    ºwire: function(ºsc) {
    },
    ºwork: function(ºsc) {},
};

