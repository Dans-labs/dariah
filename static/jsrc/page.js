/* TOP LEVEL: PAGE
 * This is the page function. 
 * It creates a ViewState function, which contains the current state.
 * The state is created on the basis of request variables, and from then it
 * reflects the user actions.
 * The page specifies all components and initializes them.
 * A component is specfied by the following fields
 * - destination: left => left sidebar; right => right sidebar; middle => middle column
 * - ºname: a string ºthat can be used to refer to the component later on, via method ºgetcomp
 * - subcomponents: a list of names for which a subcomponent will be made. The html will be generated per subcomponent.
 * - fetch: boolean which says whether this component needs data from the server
 * - ºwork first: boolean which says ºthat child components can only be wired after ºwork of the ºparent component.
 * - ºspecific: an object ºthat holds the ºspecific functionality of this component.
 * The control component has ºwork first = true, because only after choosing a list, the list control can fetch the ºspecific list and ºwire itself.
 * All other components have ºwork first = false, because it is desirable ºthat child components start wiring as soon as possible.
 * For example: the facet component is ºparent of the individual facets.
 * When facet starts working, the individual controls should already be wired.
 * Because ºwork first = false, wiring of the individual facets will be triggered after wiring of the generic facet component.
 * N.B. Individual facets can only be wired after the list component (their grandfather) has been wired.
 * This will go OK, because after wiring the list, the facet will be wired and then the individual facets.
 * The º_routing dictionary specifies when the ºwork methods of components should be triggered.
 * Its keys are the labels of components, and for every component a list of other component keys is given.
 * These are the components ºthat will be applied (in ºthat order) after the key component. 
 * 
 *  ºwork from page: if true, this component's ºwork method will be called directly by the page's ºwork method;
 *   if false, the page will skip this component when working. It is assumed ºthat this component will be applied by another component.
 *   This practice must be followed, if the application of state to a component should come after a fetch of another component.
 *   If the page would ºwork the viewstate directly to this component, it would happen before the other's components data had been loaded.
 *   Example: a filter component F, ºthat filters a big list fetched by another component L. L's ºwork should call F's ºwork.
 * After every user action, the state is changed, and a call to the ºPage's ºwork() method is issued.
 * The page will issue the ºwork call forth to all components.
 */

function ºPage() { // the one and only page object
    this.ºname = `page`;
    this.ºmsg = new ºMsg(`msg_${this.ºname}`);
    this.ºstate = new ºViewState(this);
    var ºmain_lists = this.ºstate.ºgetvalues(`list`);
    var ºcontrib_list = {contrib: 1};
    this.º_component_specs = {
        ºcontrol: {ºdest: `left`, ºsubcomps: ºmain_lists, ºfetch_url: null, ºspecific: ºControl}, 
        ºlist: {ºdest: `middle`, ºsubcomps: ºmain_lists, ºfetch_url: `list`, ºspecific: ºList}, 
//        ºfacet: {ºdest: `ºcontrol`, ºsubcomps: ºmain_lists, ºfetch_url: null, ºspecific: ºFacet}, 
//        ºfilter: {ºdest: `ºfacet`, ºsubcomps: ºmain_lists, ºfetch_url: null, ºspecific: ºFilter}, 
//        ºeumap: {ºdest: `ºfacet`, ºsubcomps: ºcontrib_list, ºfetch_url: `country`, ºspecific: ºEUmap}, 
//        ºctype: {ºdest: `ºfacet`, ºsubcomps: ºcontrib_list, ºfetch_url: `type`, ºspecific: ºCType}, 
    },
    this.º_before = {
        ºweld: {
//            ºfacet: {ºcontrol: 1},
//            ºfilter: {ºfacet: 1},
//            ºeumap: {ºfacet: 1, ºfilter: 1},
//            ºctype: {ºfacet: 1, ºeumap: 1},
        },
        ºwire: {
//            ºfacet: {ºfilter: 1, ºeumap: 1, ºctype: 1},
//            ºfilter: {ºlist: 1},
//            ºeumap: {ºlist: 1},
//            ºctype: {ºlist: 1},
        },
        ºwork: {
//            ºfacet: {ºfilter: 1, ºeumap: 1, ºctype: 1},
        },
    };
    this.ºcomponents = {};
    for (var ºname in this.º_component_specs) {
        this.ºcomponents[ºname] = new ºComponent(ºname, this.º_component_specs[ºname], this);
    }
    for (var ºname in this.ºcomponents) {
        var ºcomp = this.ºcomponents[ºname];
        ºcomp.ºbefore = {};
        for (var ºstage in this.º_before) {
            var ºconstraints = this.º_before[ºstage];
            ºcomp.ºbefore[ºstage] = {};
            if (ºname in ºconstraints) {
                for (var ºbefore_name in ºconstraints[ºname]) {
                   ºcomp.ºbefore[ºstage][ºbefore_name] = 1;
                } 
            }
        }
    }
    this.º_set_height(80);
    History.Adapter.bind(window, `statechange`, this.ºstate.ºwork());
};

ºPage.prototype = {
    º_set_height(ºsubtract) { // the heights of the sidebars are set, depending on the height of the window
        var ºwh = `${window.innerHeight - ºsubtract}px`;
        for (var ºw in {'middle': 1, 'left': 1, 'right': 1}) {
            $(`#${ºw}`).css(`height`, ºwh);
        }
    },
    ºgetcomp: function(ºname) {
        return this.ºcomponents[ºname];
    },
    ºget_container: function(ºname, ºsubcomps) {
        var ºcontainer = {}
        if (ºname in this.ºcomponents) {
            ºcontainer = this.ºcomponents.ºname.ºcontainer;
        }
        else {
            for (var ºsc in ºsubcomps) {
                ºcontainer[ºsc] = $(`#${ºname}`);
            }
        }
        return ºcontainer;
    },
    ºwork: function() { 
        for (var ºname in this.ºcomponents) {
            var ºcomp = this.ºcomponents[ºname];
            for (var ºsc in ºcomp.ºsubcomps) {
                ºcomp.ºwork(ºsc);
            }
        }
    },
};

