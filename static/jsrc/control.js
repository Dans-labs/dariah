/* INDIVIDUAL COMPONENT: ºControl
 * This manages the controls ºthat correspond to lists of records to be displayed in the middle column
 * Clicking on a control shows the corresponding list and hides all others.
 */

function ºControl(ºcomp) {
    this.ºcomp = ºcomp;
    this.ºwidget = {};
    this.ºctl = {};
};

ºControl.prototype = {
    º_html: function(ºsc) {
        this.ºcomp.ºcontainer[ºsc].html(`<a class="ctrl radio" href="#">${this.ºcomp.ºstate.ºshowstate('list', ºsc, 'ºsg')}</a> `);
    },
    º_dressup: function(ºsc) {
        var ºthat = this;
        this.ºctl[ºsc].click(function(ºe) {ºe.preventDefault();
            ºthat.ºcomp.ºstate.ºsetstate(`list`, ºsc);
        })
    },
    º_is_active: function(ºsc) {
        return this.ºcomp.ºstate.ºgetstate(`list`) == ºsc;
    },
    ºshow: function(ºsc) {
        return true;
    },
    ºweld: function(ºsc) {
        this.º_html(ºsc);
        this.ºwidget[ºsc] =  this.ºcomp.ºcontainer[ºsc];
        this.ºctl[ºsc] =  this.ºcomp.ºcontainer[ºsc].find(`a`);
    },
    ºwire: function(ºsc) {
        this.º_dressup(ºsc);
    },
    ºwork: function(ºsc) {
        if (this.º_is_active(ºsc)) {
            this.ºctl[ºsc].addClass(`ison`);
            this.ºwidget[ºsc].addClass(`isonn`);
        }
        else {
            this.ºctl[ºsc].removeClass(`ison`);
            this.ºwidget[ºsc].removeClass(`isonn`);
        }
    }
};
