/* INDIVIDUAL COMPONENT: Facets
 * This sets up a list of facets for the lists of records to be displayed in the middle column
 * It will host individual facets
 */

var g = require('./generic.js');

function Facet(component) {
    this.component = component;
    this._stats = {};
    this.data = {};
    this.table = {};
    this.distilled = {};
    this.enabled_facets = {};
};

Facet.prototype = {
    _html: function(vr) {
        var h = ``;
        h += `<p><span fct="all"></span>Filtering <span id="fstats_${vr}"></span></p>`;
        this.component.container[vr].html(h);
    },
    show: function(vr) {
        return this.component.state.getState(`list`) == vr;
    },
    weld: function(vr) {
        var children = this.component.children;
        this.enabled_facets[vr] = {};
        for (var facet_name in children) {
            var facet_component = children[facet_name];
            if (facet_component.hasVariant(vr)) {
                this.enabled_facets[vr][facet_name] = children[facet_name];
            }
        }
        this._html(vr);
    },
    _display: function(expand_control, mode) {
        var that = this;
        var dt = expand_control.closest(`p`);
        var hidec = dt.find(`.hidec`);
        var morec = dt.find(`.morec`);
        var showc = dt.find(`.showc`);
        var expanded_material = expand_control.closest(`div`).find(`table,.flt`);
        var condensed_material = expand_control.closest(`div`).find(`.value_list2,.flt_compact`);
        var not_expanded_material = expand_control.closest(`div`).find(`.flt_not_expanded`);
        var key = `fctx_${expand_control.closest('span').attr('fct')}`;
        var mode_undef = mode == undefined;
        if (mode_undef) {
            if (g.localstorage_vars.isSet(key)) {
                mode = g.localstorage_vars.get(key);
            }
            else {
                mode = 1;
            }
        }
        var all_facets = key == `fctx_all`;
        if (all_facets && !mode_undef) {
            expand_control.closest(`div`).find(`div.component span[fct]`).each(function() {
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
        var that = this;
        var cc = this.component.container[vr];
        var lc = this.component.page.getComponent(`list`).container[vr];
        this._stats[vr] = cc.find(`#fstats_${vr}`);
        this.table[vr] =  lc.find(`#table_${vr}`);
        var info = ` details; click to change level of details`;
        var detailcontrols = `<a class="showc fa fa-fw fa-list-ul" href="#" title="full${info}"></a><a class="morec fa fa-fw fa-align-left" href="#" title="condensed${info}"></a><a class="hidec fa fa-fw fa-minus" href="#" title="hidden${info}"></a>`;
        cc.addClass(`facet`);
        cc.find(`span[fct]`).each(function() {
            $(this).html(`${detailcontrols}&nbsp`);
            that._display($(this));
        });
        cc.find(`.hidec`).click(function(e) {e.preventDefault();
            that._display($(this), 1);
        });
        cc.find(`.morec`).click(function(e) {e.preventDefault();
            that._display($(this), 2);
        });
        cc.find(`.showc`).click(function(e) {e.preventDefault();
            that._display($(this), 0);
        });
    },
    work: function(vr) {
        this.table[vr].find(`tr[id]`).hide();
        var mother_list = this.component.page.getComponent(`list`);
        var data = mother_list.data[vr];
        var facets = this.enabled_facets[vr];
        this.distilled[vr] = [];
        for (var facet_name in facets) {
            var facet= facets[facet_name].implementation;
            facet.distilled[vr] = [];
        }
        data.forEach(function(d, i) {
            var v = true; // will hold whether this row passes all facets
/* We collect in the distilled member of this facet object the collective results of all individual facets,
 * Moreover, for each facet, we collect in its distilled member the results when all facets are applied except the facet in question
 * so: 
 * 1. rows with a failure for 2 or more facets are discarded
 * 2. rows with a failure for exactly one facet are added to the data for that facet
 * 3. rows which pass all facets are added to all facets, and also to the final filtered set
 */
            var the_false = null; // which facet has yielded false (if there are more than one we'll discard the row
            var discard = false; // becomes true when we have encounterd 2 facets that yield false
            for (var facet_name in facets) {
                if (!discard) {
                    var facet = facets[facet_name].implementation;
                    var this_v = facet.v(vr, d[0]); // this_v: whether the row passes this facet
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
                    this.distilled[vr].push(d[0]);
                    this.table[vr].find(`tr[id="r${d[0]}"]`).show();
                }
                if (the_false != null) {
                    the_false.distilled[vr].push(d[0]);
                }
                else {
                    for (var facet_name in facets) {
                        var facet = facets[facet_name].implementation;
                        facet.distilled[vr].push(d[0]);
                    }
                }
            }
        }, this);
        for (var facet_name in facets) {
            var facet = facets[facet_name].implementation;
            facet.stats(vr);
        }
        this._stats[vr].html(`${this.distilled[vr].length} of ${data.length}`);
    },
};

module.exports = Facet;
