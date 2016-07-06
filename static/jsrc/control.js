/* INDIVIDUAL COMPONENT: Control
 * This manages the controls that correspond to lists of records to be displayed in the middle column
 * Clicking on a control shows the corresponding list and hides all others.
 */

/* private attributes as symbols */
const _widget = Symbol();
const _control = Symbol();

export default class {
    constructor(component) {
        this.component = component;
        this[_widget] = new Map();
        this[_control] = new Map();
    }
    _html(vr) {
        this.component.container.get(vr).html(`<a class="control_title" href="#">${this.component.state.showState('list', vr, 'sg')}</a> `);
    }
    _dressup(vr) {
        this[_control].get(vr).click(e => {e.preventDefault();
            this.component.state.setState('list', vr);
        })
    }
    _isActive(vr) {
        return this.component.state.getState('list') == vr;
    }
    show(vr) {
        return true;
    }
    weld(vr) {
        this._html(vr);
        this[_widget].set(vr,  this.component.container.get(vr));
        this[_widget].get(vr).addClass('control_big');
        this[_control].set(vr,  this.component.container.get(vr).find('a'));
    }
    wire(vr) {
        this._dressup(vr);
    }
    work(vr) {
        if (this._isActive(vr)) {
            this[_control].get(vr).addClass('ison');
            this[_widget].get(vr).addClass('ison');
        }
        else {
            this[_control].get(vr).removeClass('ison');
            this[_widget].get(vr).removeClass('ison');
        }
    }
}
