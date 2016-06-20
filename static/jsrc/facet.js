/* INDIVIDUAL COMPONENT: Facets
 * This sets up a list of facets for the lists of records to be displayed in the middle column
 * It will host individual facets
 */

const g = require('./generic.js');

function Facet(component) {
    this.component = component;
    this._stats = new Map();
    this._enabled_facets = new Map();
    this.table = new Map();
    this.distilled = new Map();
};

Facet.prototype = {
    _html: function(vr) {
        const h = `<p><span fct="all"></span>Filtering <span id="fstats_${vr}"></span></p>`;
        this.component.container.get(vr).html(h);
    },
    show: function(vr) {
        return this.component.state.getState('list') == vr;
    },
    weld: function(vr) {
        const children = this.component.children;
        this._enabled_facets.set(vr, new Map());
        for (const [facet_name, facet_component] of children) {
            if (facet_component.hasVariant(vr)) {
                this._enabled_facets.get(vr).set(facet_name, facet_component);
            }
        }
        this._html(vr);
    },
    _display: function(expand_control, mode) {
        const that = this;
        const dt = expand_control.closest('p');
        const hidec = dt.find('.hidec');
        const morec = dt.find('.morec');
        const showc = dt.find('.showc');
        const expanded_material = expand_control.closest('div').find('table,.flt');
        const condensed_material = expand_control.closest('div').find('.value_list2,.flt_compact');
        const not_expanded_material = expand_control.closest('div').find('.flt_not_expanded');
        const key = `fctx_${expand_control.closest('span').attr('fct')}`;
        const mode_undef = mode == undefined;
        if (mode_undef) {
            if (g.localstorage_vars.isSet(key)) {
                mode = g.localstorage_vars.get(key);
            }
            else {
                mode = 1;
            }
        }
        const all_facets = key == 'fctx_all';
        if (all_facets && !mode_undef) {
            expand_control.closest('div').find('div.component span[fct]').each(function() {
                that._display($(this), mode);
            });
        }
        g.localstorage_vars.set(key, mode);
        if (mode == 0) {
            hidec.show();
            morec.hide();
            showc.hide();
            if (!all_facets) {
                not_expanded_material.show();
                expanded_material.hide();
                condensed_material.hide();
            }
        }
        else if (mode == 1) {
            hidec.hide();
            morec.show();
            showc.hide();
            if (!all_facets) {
                not_expanded_material.show();
                expanded_material.hide();
                condensed_material.show();
            }
        }
        else {
            hidec.hide();
            morec.hide();
            showc.show();
            if (!all_facets) {
                not_expanded_material.hide();
                expanded_material.show();
                condensed_material.hide();
            }
        }
    },
    wire: function(vr) {
        const that = this;
        const cc = this.component.container.get(vr);
        const lc = this.component.page.getComponent('list').container.get(vr);
        this._stats.set(vr, cc.find(`#fstats_${vr}`));
        this.table.set(vr,  lc.find(`#table_${vr}`));
        const info = ' details; click to change level of details';
        const detailcontrols = `<a class="showc fa fa-fw fa-list-ul" href="#" title="full${info}"></a><a class="morec fa fa-fw fa-align-left" href="#" title="condensed${info}"></a><a class="hidec fa fa-fw fa-minus" href="#" title="hidden${info}"></a>`;
        cc.addClass('facet');
        cc.find('span[fct]').each(function() {
            $(this).html(`${detailcontrols}&nbsp`);
            that._display($(this));
        });
        cc.find('.hidec').click(function(e) {e.preventDefault();
            that._display($(this), 1);
        });
        cc.find('.morec').click(function(e) {e.preventDefault();
            that._display($(this), 2);
        });
        cc.find('.showc').click(function(e) {e.preventDefault();
            that._display($(this), 0);
        });
    },
    work: function(vr) {
        this.table.get(vr).find('tr[rid],tr[iid]').hide();
        const mother_list = this.component.page.getComponent('list');
        const data = mother_list.data.get(vr);
        const facets = this._enabled_facets.get(vr);
        this.distilled.set(vr, []);
        for (const [facet_name, facet_comp] of facets) {
            const facet = facet_comp.implementation;
            facet.distilled.set(vr, []);
        }
        for (const d of data) {
            let v = true; // will hold whether this row passes all facets
/* We collect in the distilled member of this facet object the collective results of all individual facets,
 * Moreover, for each facet, we collect in its distilled member the results when all facets are applied except the facet in question
 * so: 
 * 1. rows with a failure for 2 or more facets are discarded
 * 2. rows with a failure for exactly one facet are added to the data for that facet
 * 3. rows which pass all facets are added to all facets, and also to the final filtered set
 */
            let the_false = null; // which facet has yielded false (if there are more than one we'll discard the row
            let discard = false; // becomes true when we have encounterd 2 facets that yield false
            for (const [facet_name, facet_comp] of facets) {
                if (!discard) {
                    const facet = facet_comp.implementation;
                    const this_v = facet.v(vr, d[0]); // this_v: whether the row passes this facet
                    if (!this_v) {
                        v = false;
                        if (the_false == null) { // this is the first failure, we store the facet number in the_false
                            the_false = facet;
                        } // else we discard the row altogether
                        else {
                            discard = true;
                        }
                    }
                }
            }
            if (!discard) {
                if (v) {
                    this.distilled.get(vr).push(d[0]);
                    this.table.get(vr).find(`tr[rid="${d[0]}"],tr[iid="${d[0]}"]`).show();
                }
                if (the_false != null) {
                    the_false.distilled.get(vr).push(d[0]);
                }
                else {
                    for (const [facet_name, facet_comp] of facets) {
                        const facet = facet_comp.implementation;
                        facet.distilled.get(vr).push(d[0]);
                    }
                }
            }
        }
        for (const [facet_name, facet_comp] of facets) {
            const facet = facet_comp.implementation;
            facet.stats(vr);
        }
        this._stats.get(vr).html(`${this.distilled.get(vr).length} of ${data.length}`);
    },
};

module.exports = Facet;
