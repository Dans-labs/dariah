/* INDIVIDUAL COMPONENT: Lists
 * This is a list of controls corresponding to lists of records to be displayed in the middle column
 * Clicking on a control shows the corresponding list and hides all others.
 */

/* COLLECTION of List COMPONENTS
 * This is an array of all the main list components
 */

var List = {
    contrib: List_contrib,
    country: List_country,
};

function Lists(comp) {this.comp = comp};

Lists.prototype = {
    _html: function() {
        var h = ``;
        for (var itm in this.comp.data) {
            h += `<a class="ctrl radio" href="#" itm="${itm}">${this.comp.state.showstate('list', itm, 'sg')}</a> `;
        }
        this.comp.container.html(h);
    },
    _dressup: function() {
        var that = this;
        this.comp.container.find(`.radio`).each(function() {
            $(this).click(function(e) {e.preventDefault();
                that.comp.state.setstate(`list`, $(this).attr(`itm`));
            })
        })
    },
    show: function() {
        return true;
    },
    process: function() {
        this._html();
        this._dressup();
    },
    apply: function() {
        this.comp.container.find(`.radio`).removeClass(`ison`);
        this.comp.container.find(`a[itm="${this.comp.state.getstate('list')}"]`).addClass(`ison`);
    }
};

