/* INDIVIDUAL COMPONENT: Control
 * This manages the controls that correspond to lists of records to be displayed in the middle column
 * Clicking on a control shows the corresponding list and hides all others.
 */

function Control(comp) {
    this.comp = comp;
    this.widget = {};
    this.ctl = {};
};

Control.prototype = {
    _html: function(sc) {
        this.comp.container[sc].html(`<a class="ctrl radio" href="#">${this.comp.state.showstate('list', sc, 'sg')}</a> `);
    },
    _dressup: function(sc) {
        var that = this;
        this.ctl[sc].click(function(e) {e.preventDefault();
            that.comp.state.setstate(`list`, sc);
        })
    },
    _is_active: function(sc) {
        return this.comp.state.getstate(`list`) == sc;
    },
    show: function(sc) {
        return true;
    },
    weld: function(sc) {
        this._html(sc);
        this.widget[sc] =  this.comp.container[sc];
        this.ctl[sc] =  this.comp.container[sc].find(`a`);
    },
    wire: function(sc) {
        this._dressup(sc);
    },
    work: function(sc) {
        if (this._is_active(sc)) {
            this.ctl[sc].addClass(`ison`);
            this.widget[sc].addClass(`isonn`);
        }
        else {
            this.ctl[sc].removeClass(`ison`);
            this.widget[sc].removeClass(`isonn`);
        }
    }
};
