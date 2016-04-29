/* TOP LEVEL: PAGE
 * This is the page function. 
 * It creates a ViewState function, which contains the current state.
 * The state is created on the basis of request variables, and from then it
 * reflects the user actions.
 * The page specifies all components and initializes them.
 * A component is specfied by the following fields
 * - destination: left => left sidebar; right => right sidebar; middle => middle column
 * - name: a string that can be used to refer to the component later on, via method getcomp
 * - subcomponents: a list of names for which a subcomponent will be made. The html will be generated per subcomponent.
 *   If null, there are no subcomponents, and the html will go to one place.
 * - fetch: boolean which says whether this component needs data from the server
 * - specific: an object that holds the specific functionality of this component.
 * The _routing dictionary specifies when the apply methods of components should be triggered.
 * Its keys are the labels of components, and for every component a list of other component keys is given.
 * These are the components that will be applied (in that order) after the key component. 
 * 
 *  apply from page: if true, this component's apply method will be called directly by the page's apply method;
 *   if false, the page will skip this component when applying. It is assumed that this component will be applied by another component.
 *   This practice must be followed, if the application of state to a component should come after a fetch of another component.
 *   If the page would apply the viewstate directly to this component, it would happen before the other's components data had been loaded.
 *   Example: a filter component F, that filters a big list fetched by another component L. L's apply should call F's apply.
 * After every user action, the state is changed, and a call to the Page's apply() method is issued.
 * The page will issue the apply call forth to all components.
 */

function Page() { // the one and only page object
    this.name = 'page';
    this.msg = new Msg(`msg_${this.name}`);
    this.state = new ViewState(this);
    var main_lists = this.state.getvalues('list');
    this._components = [
        ['left', 'control', main_lists, false, Control], 
        ['control', 'filter', main_lists, false, Filter], 
        ['filter', 'eumap', main_lists, false, EUmap],
        ['middle', 'list', main_lists, true, List], 
    ];
    this.compindex = {};
    this._routing = {
        page: ['control'],
        control: ['list'],
        list: ['filter'],
        filter: ['eumap'],
    };
    this.init();
};

Page.prototype = {
    _set_height(subtract) { // the heights of the sidebars are set, depending on the height of the window
        var wh = `${window.innerHeight - subtract}px`;
        for (var w in {middle: 1, left: 1, right: 1}) {
            $(`#${w}`).css(`height`, wh);
        }
    },
    getcomp: function(name) {
        return this.compindex[name];
    },
    init: function() { // dress up the skeleton, initialize state variables
        this.compindex = {};
        for (var i in this._components) {
            var c = this._components[i];
            var co = new Component(c[0], c[1], c[2], c[3], c[4], this);
            this.compindex[c[1]] = co;
            co.init();
        }
        this._set_height(80);
        History.Adapter.bind(window,`statechange`, this.state.apply());
    },
    apply: function(comp, sc) { 
/* apply selected components of the page. comp is looked up in routing, which gives a list of other components
 * and these are the components that will be applied. This will be done recursively, see _apply in Components.
 * But the recursive calls are per subcomponent. 
 * 'page' is also in the routing table.
 */

        if (this._routing[comp] != undefined) {
            for (var i in this._routing[comp]) {
                var oname = this._routing[comp][i];
                this.compindex[oname].apply(sc);
            }
        }
    },
};

