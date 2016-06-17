/* INDIVIDUAL COMPONENT: Control
 * This manages the controls that correspond to lists of records to be displayed in the middle column
 * Clicking on a control shows the corresponding list and hides all others.
 */

function Control(component) {
    this.component = component;
    this._widget = new Map();
    this._control = new Map();
};

Control.prototype = {
    _html: function(vr) {
        this.component.container.get(vr).html(`<a class="control_title" href="#">${this.component.state.showState('list', vr, 'sg')}</a> `);
    },
    _dressup: function(vr) {
        this._control.get(vr).click(e => {e.preventDefault();
            this.component.state.setState('list', vr);
        })
    },
    _isActive: function(vr) {
        return this.component.state.getState('list') == vr;
    },
    show: function(vr) {
        return true;
    },
    weld: function(vr) {
        this._html(vr);
        this._widget.set(vr,  this.component.container.get(vr));
        this._widget.get(vr).addClass('control_big');
        this._control.set(vr,  this.component.container.get(vr).find('a'));
    },
    wire: function(vr) {
        this._dressup(vr);
    },
    work: function(vr) {
        if (this._isActive(vr)) {
            this._control.get(vr).addClass('ison');
            this._widget.get(vr).addClass('ison');
        }
        else {
            this._control.get(vr).removeClass('ison');
            this._widget.get(vr).removeClass('ison');
        }
    }
};

module.exports = Control;
