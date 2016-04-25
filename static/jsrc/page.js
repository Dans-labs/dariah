/* TOP LEVEL: PAGE
 * This is the page function. 
 * It creates a ViewState function, which contains the current state.
 * The state is created on the basis of request variables, and from then it
 * reflects the user actions.
 * The page specifies all components and initializes them.
 * A component is specfied by the following fields
 * - destination: left => left sidebar; right => right sidebar; middle => middle column
 * - name: a string that can be used to refer to the component later on, via method getcomp
 * - fetch name: part of the url to retrieve this component's data from the server. null if no data from the server is needed.
 * - data: data structure, not coming from the server. This will be the component's data.
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
        ['left', 'lists', null, main_lists, Lists], 
        ['left', 'filters', null, main_lists, Filters], 
    ];
    this._compindex = {};
    this._routing = {
        page: ['lists'],
    };
    for (ml in main_lists) {
        this._components.push(['middle', ml, ml, null, List[ml]]);
        this._routing['page'].push(ml);    // individual lists should be applied on a page apply
        this._routing[ml] = [];
        this._routing[ml].push('filters'); // filters should be applied after the lists have been fetched
    }
    this._init();
};

Page.prototype = {
    _init: function() { // dress up the skeleton, initialize state variables
        this._compindex = {};
        for (var i in this._components) {
            var c = this._components[i];
            var co = new Component(c[0], c[1], c[2], c[3], c[4], this);
            this._compindex[c[1]] = co;
            co.init();
        }
        History.Adapter.bind(window,`statechange`, this.state.adapt(this.state));
    },
    getcomp: function(name) {
        return this._compindex[name];
    },
    apply: function(cname) { // apply the viewstate: hide and show material as prescribed by the viewstate
        var comp = (cname == undefined)?'page':cname;
        if (this._routing[comp] != undefined) {
            for (var i in this._routing[comp]) {
                var oname = this._routing[comp][i];
                this._compindex[oname].apply();
            }
        }
    },
};

