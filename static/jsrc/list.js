/* INDIVIDUAL COMPONENT: ºList
 * This manages the actual lists of records to be displayed in the middle column.
 * The subcomponents corresponds to the individual lists, such as country, countribution
 * All functionality (except ºshow) is delegated to ºspecific functions
 */

function ºList(ºcomponent) {this.ºcomponent = ºcomponent};

ºList.prototype = {
    º_html: function(ºvar) {
        var ºh = ``;
        ºh += `<table id="table_${ºvar}">`;
        if (ºvar == `contrib`) {
            this.ºcomponent.ºdata[ºvar].forEach(function(ºr) {
                ºh += `<tr id="r${ºr[0]}"><td><a href="#" rid="${ºr[0]}">${ºr[1]}</a></td></tr>`;
            });
        }
        else if (ºvar == `country`) {
            this.ºcomponent.ºdata[ºvar].forEach(function(ºr) {
                ºin_dariah = (ºr[3] == 1)?`dariah`:``;
                ºh += `<tr id="r${ºr[0]}"><td class="•country_code">${ºr[1]}<td><td class="•country_name">${ºr[2]}<td><td class="•in_dariah">${ºin_dariah}</td><td class="•latlng">${ºr[4]}</td><td class="•latlng">${ºr[5]}</td></tr>`;
            });
        }
        else if (ºvar == `type` || ºvar == `tadiraho`) {
            this.ºcomponent.ºdata[ºvar].forEach(function(ºr) {
                ºh += `<tr id="r${ºr[0]}"><td class="•value">${ºr[1]}<td></tr>`;
            });
        }
        ºh += `</table>`;
        this.ºcomponent.ºcontainer[ºvar].html(ºh);
    },
    ºshow: function(ºvar) {
        return this.ºcomponent.ºstate.ºgetState(`list`) == ºvar;
    },
    ºweld: function(ºvar) {
        this.º_html(ºvar);
    },
    ºwire: function(ºvar) {
    },
    ºwork: function(ºvar) {},
};

