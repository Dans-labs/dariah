/* TOP LEVEL: PAGE
 * This is the page function. 
 * It creates a ViewState function, which contains the current state.
 * The state is created on the basis of request variables, and from then it
 * reflects the user actions.
 * The page specifies all components and initializes them.
 * A component is specfied by the following fields
 * - destination: left => left sidebar; right => right sidebar; middle => middle column
 * - name: a string that can be used to refer to the component later on, via method getComponent
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
 *  work from page: if true, this component's work method will be called directly by the page's work method;
 *   if false, the page will skip this component when working. It is assumed that this component will be applied by another component.
 *   This practice must be followed, if the application of state to a component should come after a fetch of another component.
 *   If the page would work the viewstate directly to this component, it would happen before the other's components data had been loaded.
 *   Example: a filter component F, that filters a big list fetched by another component L. L's work should call F's work.
 * After every user action, the state is changed, and a call to the Page's work() method is issued.
 * The page will issue the work call forth to all components.
 */

import * as g from './generic.js';
import ViewState from './viewstate';
import Share from './share';
import CType from './ctype';
import TadirahO from './tadiraho';
import TadirahA from './tadiraha';
import TadirahT from './tadiraht';
import EUmap from './eumap';
import Filter from './filter';
import Facet from './facet';
import List from './list';
import Item from './item';
import Control from './control';
import Component from './components';
import Skeleton from './skeleton';

/* private attributes as symbols */
const _by_id = Symbol();

export default class extends Skeleton { // the one and only page object
    constructor() {
        super();
        this.name = 'page';
        this.state = new ViewState(this);
        const main_lists = this.state.getValues('list');
        const contrib_list = new Set(['contrib']);
        const empty_list = new Set(['']);
        this._component_specs = new Map([
            ['share',    {dest: 'body',    variants: empty_list,   fetch_url: null,       varpfx: null,  specific: Share}], 
            ['control',  {dest: 'left',    variants: main_lists,   fetch_url: null,       varpfx: null,  specific: Control}],
            ['list',     {dest: 'middle' , variants: main_lists,   fetch_url: 'list',     varpfx: null,  specific: List}],
            ['item',     {dest: 'list',    variants: main_lists,   fetch_url: 'item',     varpfx: null,  specific: Item}],
            ['facet',    {dest: 'control', variants: main_lists,   fetch_url: null,       varpfx: null,  specific: Facet}],
            ['filter',   {dest: 'facet',   variants: main_lists,   fetch_url: null,       varpfx: 'flt', specific: Filter}],
            ['eumap',    {dest: 'facet',   variants: contrib_list, fetch_url: 'country',  varpfx: 'rel', specific: EUmap}],
            ['ctype',    {dest: 'facet',   variants: contrib_list, fetch_url: 'type',     varpfx: 'rel', specific: CType}],
            ['tadiraha', {dest: 'facet',   variants: contrib_list, fetch_url: 'tadiraha', varpfx: 'rel', specific: TadirahA}],
            ['tadiraho', {dest: 'facet',   variants: contrib_list, fetch_url: 'tadiraho', varpfx: 'rel', specific: TadirahO}],
            ['tadiraht', {dest: 'facet',   variants: contrib_list, fetch_url: 'tadiraht', varpfx: 'rel', specific: TadirahT}],
        ]),
        /* dest: the html of the component will be appended to the dest components html container
         * variants:  components code generic behaviour of lists, items, facets etc. But there are lists of contribs, countries, etc.
         *            These are variants.
         * fetch_url: if not null, the HTML for this component must be generated from data which will be fetched from the server by means
         *            of a url constructed from fetch_url and variant.
         * varpfx:    some components are associated with state variables, especially facets. If we need the names of those
         *            variables, they can be computed from varpfx, fetch_url and the variant.
         * specific:  Every component also has specific behaviour, not shared with the other components. This is implemented in a
         *            special class, given in specific.
         */ 
        /* some components are being dealt with on the basis of additional identifiers, such as item
         * Those components are specified below, and the specs of all components will get an extra attribute
         * by_id, which is true if the component needs an id.
         * The actual ids come from a request variable name_xxx, where name is the name of the component and xxx is the name of a list.
         */
        this[_by_id] = new Set([
            'item',
        ]),
        this.ignore = new Set([
            //'ctype',
            //'tadiraha',
            //'tadiraht',
            //'tadiraho',
            //'eumap',
            //'filter',
        ]),
        this.components = new Map();
        for (const [name, spec] of this._component_specs) {
            if (this.ignore.has(name)) {continue}
            spec.by_id = this[_by_id].has(name);
            const component = new Component(name, spec, this);
            component.up = null;
            component.children = new Map();
            component.item_comp = null;
            this.components.set(name, component);
        }
        for (const [name, child_component] of this.components) {
            const dest_name = this._component_specs.get(name).dest;
            if (this.components.has(dest_name)) {
                const parent_component = this.components.get(dest_name);
                child_component.up = parent_component;
                parent_component.children.set(name, child_component);
                if (this[_by_id].has(name)) {
                    parent_component.item_comp = name;
                }
            }
        }
        this.resolveTiming();
        this._setHeight(80);
        History.Adapter.bind(window, 'statechange', this.state.work());
    }
    _setHeight(subtract) { // the heights of the sidebars are set, depending on the height of the window
        const wh = `${window.innerHeight - subtract}px`;
        for (const w of new Set(['middle', 'left', 'right'])) {
            $(`#${w}`).css('height', wh);
        }
    }
    getComponent(name) {
        return this.components.get(name);
    }
    getContainer(name, variants) {
        if (this.components.has(name)) {
            return this.components.get(name).container;
        }
        else {
            const container = new Map();
            const addto = (name == 'body')?$('body'):$(`#${name}`);
            for (const vr of variants) {
                container.set(vr, addto);
            }
            return container;
        }
    }
    getBefore(name, stage) {
        const prev_nodes = [];
        const next_node = `${name}-${stage}`;
        for (const prev_node of (this._timing.get(next_node) || new Set())) {
            prev_nodes.push(prev_node.split('-'));
        }
        return prev_nodes;
    }
    work() { 
        for (const task of this._tasks) {
            const [name, stage] = task.split('-');
            const component = this.getComponent(name);
            for (const vr of component.variants) {
                component[stage](vr);
            }
        }
    }
}
