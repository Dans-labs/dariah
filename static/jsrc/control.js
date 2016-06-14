/* INDIVIDUAL COMPONENT: Control
 * This manages the controls that correspond to lists of records to be displayed in the middle column
 * Clicking on a control shows the corresponding list and hides all others.
 */

function Control(component) {
    this.component = component;
    this.widget = {};
    this.ctl = {};
};

Control.prototype = {
    _html: function(vr) {
        this.component.container[vr].html(`<a class="control_title" href="#">${this.component.state.showState('list', vr, 'sg')}</a> `);
    },
    _dressup: function(vr) {
        this.ctl[vr].click(function(e) {e.preventDefault();
            this.component.state.setState(`list`, vr);
        }.bind(this))
    },
    _isActive: function(vr) {
        return this.component.state.getState(`list`) == vr;
    },
    show: function(vr) {
        return true;
    },
    weld: function(vr) {
        this._html(vr);
        this.widget[vr] =  this.component.container[vr];
        this.widget[vr].addClass(`control_big`);
        this.ctl[vr] =  this.component.container[vr].find(`a`);
    },
    wire: function(vr) {
        this._dressup(vr);
    },
    work: function(vr) {
        if (this._isActive(vr)) {
            this.ctl[vr].addClass(`ison`);
            this.widget[vr].addClass(`ison`);
        }
        else {
            this.ctl[vr].removeClass(`ison`);
            this.widget[vr].removeClass(`ison`);
        }
    }
};

module.exports = Control;
