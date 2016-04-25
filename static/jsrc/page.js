/* TOP LEVEL: PAGE
 * This is the page function. 
 * It creates a ViewState function, which contains the current state.
 * The state is created on the basis of request variables, and from then it
 * reflects the user actions.
 * The page specifies all components and initializes them.
 * After every user action, the state is changed, and a call to the Page's apply() method is issued.
 * The page will issue the apply call forth to all components.
 */

function Page() { // the one and only page object
    this.name = 'page';
    this.msg = new Msg(`msg_${this.name}`);
    this.state = new ViewState(this);
    var main_lists = this.state.specs.list.values;
    this.components = [
        ['left', 'lists', main_lists, Lists], 
    ];
    this.compobjects = [];
    this.compindex = {};
    for (ml in main_lists) {
        this.components.push(['middle', ml, ml, List[ml]]);
    }
    this.init();
};

Page.prototype = {
    init: function() { // dress up the skeleton, initialize state variables
        this.compobjects = [];
        this.compindex = {};
        for (var i in this.components) {
            var c = this.components[i];
            var co = new Component(c[0], c[1], c[2], c[3], this);
            this.compobjects.push(co);
            this.compindex[c[1]] = co;
            co.init();
        }
        History.Adapter.bind(window,`statechange`, this.state.adapt(this.state));
    },
    apply: function() { // apply the viewstate: hide and show material as prescribed by the viewstate
        for (var i in this.compobjects) {
            var co = this.compobjects[i];
            co.apply();
        }
    },
};

