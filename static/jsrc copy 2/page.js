/* TOP LEVEL: PAGE
 * This is the µpage function. 
 * It creates a ViewState function, which contains the current state.
 * The state is created on the basis of request variables, and from then it
 * reflects the user actions.
 * The µpage specifies all components and initializes them.
 * A component is specfied by the following fields
 * - destination: left => left sidebar; right => right sidebar; middle => middle column
 * - name: a string that can be used to refer to the component later on, via method getcomp
 * - subcomponents: a list of names for which a subcomponent will be made. The html will be generated per subcomponent.
 * - fetch: boolean which says whether this component needs data from the server
 * - work first: boolean which says that child components can only be wired after work of the parent component.
 * - specific: an object that holds the specific functionality of this component.
 * The control component has work first = true, because only after choosing a list, the list control can fetch the specific list and wire itself.
 * All other components have work first = false, because it is desirable that child components start wiring as soon as possible.
 * For example: the facet component is parent of the individual facets.
 * When facet starts working, the individual controls should already be wired.
 * Because work first = false, wiring of the individual facets will be triggered after wiring of the generic facet component.
 * N.B. Individual facets can only be wired after the list component (their grandfather) has been wired.
 * This will go OK, because after wiring the list, the facet will be wired and then the individual facets.
 * The _routing dictionary specifies when the work methods of components should be triggered.
 * Its keys are the labels of components, and for every component a list of other component keys is given.
 * These are the components that will be applied (in that order) after the key component. 
 * 
 *  work from µpage: if true, this component's work method will be called directly by the µpage's work method;
 *   if false, the µpage will skip this component when working. It is assumed that this component will be applied by another component.
 *   This practice must be followed, if the application of state to a component should come after a fetch of another component.
 *   If the µpage would work the viewstate directly to this component, it would happen before the other's components data had been loaded.
 *   Example: a filter component F, that filters a big list fetched by another component L. L's work should call F's work.
 * After every user action, the state is changed, and a call to the Page's work() method is issued.
 * The µpage will issue the work call forth to all components.
 */

function Page() { // the one and only µpage object
    this.name = `µpage`;
    this.µmsg = new Msg(`msg_${this.name}`);
    this.state = new µViewState(this);
    var main_lists = this.state.getvalues(`list`);
    this._components = [
        [`left`, `control`, main_lists, false, true, Control], 
        [`control`, `facet`, main_lists, false, false, Facet], 
        [`facet`, `filter`, main_lists, false, false, Filter], 
        [`facet`, `eumap`, main_lists, false, false, EUmap],
        [`facet`, `ctype`, main_lists, false, false, CType],
        [`middle`, `list`, main_lists, true, false, List], 
    ];
    this.compindex = {};
    this._routing = {
        µpage: [`control`],
        control: [`list`],
        list: [`facet`],
        facet: [
            `filter`,
            `eumap`,
            `ctype`,
        ],
    };
    this.compindex = {};
    for (var i in this._components) {
        var c = this._components[i];
        var co = new Component(c[0], c[1], c[2], c[3], c[4], c[5], this);
        this.compindex[c[1]] = co;
    }
    for (var pn in this._routing) {
        var po = (pn in this.compindex)?this.compindex[pn]:this;
        po.children = {};
        for (var i in this._routing[pn]) {
            var cn = this._routing[pn][i];
            var co = this.compindex[cn];
            po.children[cn] = co;
            co.parent = po;
        }
    }
    for (var i in this._components) {
        var c = this._components[i];
        var co = this.compindex[c[1]];
        co.weld();
    }
    this._set_height(80);
    History.Adapter.bind(window, `statechange`, this.state.work());
};

Page.prototype = {
    _set_height(subtract) { // the heights of the sidebars are set, depending on the height of the window
        var wh = `${window.innerHeight - subtract}px`;
        for (var w in {middle: 1, left: 1, right: 1}) {
            $(`#${w}`).css(`height`, wh);
        }
    },
    show: function() {
        for (var cn in this.children) {
            var co = this.children[cn];
            for (var sc in co.scomps) {
                co.show(sc);
            }
        }
    },
    getcomp: function(name) {
        return this.compindex[name];
    },
    work: function() { 
        this.show();
        for (var cn in this.children) {
            var co = this.children[cn];
            for (var sc in co.scomps) {
                co.work(sc);
            }
        }
    },
};

