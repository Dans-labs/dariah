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
    this.º_components = [
        [`left`, `control`, ºmain_lists, false, true, ºControl], 
        [`control`, `facet`, ºmain_lists, false, false, ºFacet], 
        [`facet`, `filter`, ºmain_lists, false, false, ºFilter], 
        [`facet`, `eumap`, ºcontrib_list, false, false, ºEUmap],
        [`facet`, `ctype`, ºcontrib_list, false, false, ºCType],
        [`middle`, `list`, ºmain_lists, true, false, ºList], 
    ];
    this.ºcompindex = {};
    this.º_routing = {
        page: [`control`],
        control: [`list`],
        list: [`facet`],
        facet: [
            `filter`,
            `eumap`,
            `ctype`,
        ],
    };
    this.ºcompindex = {};
    for (var ºi in this.º_components) {
        var ºc = this.º_components[ºi];
        var ºco = new ºComponent(ºc[0], ºc[1], ºc[2], ºc[3], ºc[4], ºc[5], this);
        this.ºcompindex[ºc[1]] = ºco;
    }
    for (var ºpn in this.º_routing) {
        var ºpo = (ºpn in this.ºcompindex)?this.ºcompindex[ºpn]:this;
        ºpo.ºchildren = {};
        for (var ºi in this.º_routing[ºpn]) {
            var ºc = this.º_routing[ºpn][ºi];
            var ºco = this.ºcompindex[ºc];
            ºpo.ºchildren[ºc] = ºco;
            ºco.ºparent = ºpo;
        }
    }
    for (var ºi in this.º_components) {
        var ºc = this.º_components[ºi];
        var ºco = this.ºcompindex[ºc[1]];
        ºco.ºweld();
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
    ºshow: function() {
        for (var ºc in this.ºchildren) {
            var ºco = this.ºchildren[ºc];
            for (var ºsc in ºco.ºscomps) {
                ºco.ºshow(ºsc);
            }
        }
    },
    ºgetcomp: function(ºname) {
        return this.ºcompindex[ºname];
    },
    ºwork: function() { 
        this.ºshow();
        for (var ºc in this.ºchildren) {
            var ºco = this.ºchildren[ºc];
            for (var ºsc in ºco.ºscomps) {
                ºco.ºwork(ºsc);
            }
        }
    },
};

