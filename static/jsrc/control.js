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
    º_html: function(ºvar) {
        this.ºcomponent.ºcontainer[ºvar].html(`<a class="•control_title" href="#">${this.ºcomponent.ºstate.ºshowState('list', ºvar, 'ºsg')}</a> `);
    },
    º_dressup: function(ºvar) {
        this.ºctl[ºvar].click(function(ºe) {ºe.preventDefault();
            this.ºcomponent.ºstate.ºsetState(`list`, ºvar);
        }.bind(this))
    },
    º_isActive: function(ºvar) {
        return this.ºcomponent.ºstate.ºgetState(`list`) == ºvar;
    },
    ºshow: function(ºvar) {
        return true;
    },
    ºweld: function(ºvar) {
        this.º_html(ºvar);
        this.ºwidget[ºvar] =  this.ºcomponent.ºcontainer[ºvar];
        this.ºwidget[ºvar].addClass(`•control_big`);
        this.ºctl[ºvar] =  this.ºcomponent.ºcontainer[ºvar].find(`a`);
    },
    ºwire: function(ºvar) {
        this.º_dressup(ºvar);
    },
    ºwork: function(ºvar) {
        if (this.º_isActive(ºvar)) {
            this.ºctl[ºvar].addClass(`•ison`);
            this.ºwidget[ºvar].addClass(`•ison`);
        }
        else {
            this.ºctl[ºvar].removeClass(`•ison`);
            this.ºwidget[ºvar].removeClass(`•ison`);
        }
    }
};
