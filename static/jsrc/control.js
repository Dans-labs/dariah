/* INDIVIDUAL COMPONENT: ºControl
 * This manages the controls that correspond to lists of records to be displayed in the middle column
 * Clicking on a control shows the corresponding list and hides all others.
 */

function ºControl(ºcomponent) {
    this.ºcomponent = ºcomponent;
    this.ºwidget = {};
    this.ºctl = {};
};

ºControl.prototype = {
    º_html: function(ºsc) {
        this.ºcomponent.ºcontainer[ºsc].html(`<a class="•control_title" href="#">${this.ºcomponent.ºstate.ºshowState('list', ºsc, 'ºsg')}</a> `);
    },
    º_dressup: function(ºsc) {
        this.ºctl[ºsc].click(function(ºe) {ºe.preventDefault();
            this.ºcomponent.ºstate.ºsetState(`list`, ºsc);
        }.bind(this))
    },
    º_isActive: function(ºsc) {
        return this.ºcomponent.ºstate.ºgetState(`list`) == ºsc;
    },
    ºshow: function(ºsc) {
        return true;
    },
    ºweld: function(ºsc) {
        this.º_html(ºsc);
        this.ºwidget[ºsc] =  this.ºcomponent.ºcontainer[ºsc];
        this.ºwidget[ºsc].addClass(`•control_big`);
        this.ºctl[ºsc] =  this.ºcomponent.ºcontainer[ºsc].find(`a`);
    },
    ºwire: function(ºsc) {
        this.º_dressup(ºsc);
    },
    ºwork: function(ºsc) {
        if (this.º_isActive(ºsc)) {
            this.ºctl[ºsc].addClass(`•ison`);
            this.ºwidget[ºsc].addClass(`•ison`);
        }
        else {
            this.ºctl[ºsc].removeClass(`•ison`);
            this.ºwidget[ºsc].removeClass(`•ison`);
        }
    }
};
