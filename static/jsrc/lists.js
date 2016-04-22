/* INDIVIDUAL COMPONENT: Lists
 * This is a list of controls corresponding to lists of records to be displayed in the middle column
 * Clicking on a control shows the corresponding list and hides all others.
 */

function Lists(comp) {this.comp = comp};

Lists.prototype = {
    show: function() {
        return true;
    },
    genhtml: function() {
        var showas = this.comp.page.state.showas;
        var h = ``;
        for (var itm in this.comp.data) {
            var show_itm = (itm in showas)? showas[itm].pl : itm;
            h += `<a class="ctrl radio" href="#" itm="${itm}">${show_itm}</a> `;
        }
        this.comp.container.html(h);
    },
    dressup: function() {
        var that = this;
        this.comp.container.find(`.radio`).each(function() {
            $(this).click(function(e) {e.preventDefault();
                that.comp.page.state.setstate(`list`, $(this).attr(`itm`));
            })
        })
    },
    process: function() {
        this.genhtml();
        this.dressup();
    },
    apply: function() {
        this.comp.container.find(`.radio`).removeClass(`ison`);
        this.comp.container.find(`a[itm="${this.comp.page.state.data.list}"]`).addClass(`ison`);
    }
};

