/* INDIVIDUAL COMPONENT: Facets
 * This sets up a list of facets for the lists of records to be displayed in the middle column
 * It will host individual facets
 */

function ºFacet(ºcomponent) {
    this.ºcomponent = ºcomponent;
    this.º_stats = {};
    this.ºdata = {};
    this.ºtable = {};
    this.ºdistilled = {};
    this.ºenabled_facets = {};
};

ºFacet.prototype = {
    º_html: function(ºvar) {
        var ºh = ``;
        ºh += `<p><span fct="all"></span>Filtering <span id="fstats_${ºvar}"></span></p>`;
        this.ºcomponent.ºcontainer[ºvar].html(ºh);
    },
    ºshow: function(ºvar) {
        return this.ºcomponent.ºstate.ºgetState(`list`) == ºvar;
    },
    ºweld: function(ºvar) {
        var ºchildren = this.ºcomponent.ºchildren;
        this.ºenabled_facets[ºvar] = {};
        for (var ºfacet_name in ºchildren) {
            var ºfacet_component = ºchildren[ºfacet_name];
            if (ºfacet_component.ºhasVariant(ºvar)) {
                this.ºenabled_facets[ºvar][ºfacet_name] = ºchildren[ºfacet_name];
            }
        }
        this.º_html(ºvar);
    },
    º_display: function(ºfacet_expand_control, ºmode) {
        var ºthat = this;
        var ºdt = ºfacet_expand_control.closest(`p`);
        var ºhidec = ºdt.find(`.hidec`);
        var ºmorec = ºdt.find(`.morec`);
        var ºshowc = ºdt.find(`.showc`);
        var ºexpanded_material = ºfacet_expand_control.closest(`div`).find(`table,.•flt`);
        var ºcondensed_material = ºfacet_expand_control.closest(`div`).find(`.•value_list2,.•flt_compact`);
        var ºkey = `fctx_${ºfacet_expand_control.closest('span').attr('fct')}`;
        var ºmode_undef = ºmode == undefined;
        if (ºmode_undef) {
            if (ºlocalstorage_vars.isSet(ºkey)) {
                ºmode = ºlocalstorage_vars.get(ºkey);
            }
            else {
                ºmode = 1;
            }
        }
        var ºall_facets = ºkey == `fctx_all`;
        if (ºall_facets && !ºmode_undef) {
            ºfacet_expand_control.closest(`div`).find(`div.•component span[fct]`).each(function() {
                ºthat.º_display($(this), ºmode);
            });
        }
        ºlocalstorage_vars.set(ºkey, ºmode);
        if (ºmode == 0) {
            ºhidec.show();
            ºmorec.hide();
            ºshowc.hide();
            if (!ºall_facets) {
                ºexpanded_material.hide();
                ºcondensed_material.hide();
            }
        }
        else if (ºmode == 1) {
            ºhidec.hide();
            ºmorec.show();
            ºshowc.hide();
            if (!ºall_facets) {
                ºexpanded_material.hide();
                ºcondensed_material.show();
            }
        }
        else {
            ºhidec.hide();
            ºmorec.hide();
            ºshowc.show();
            if (!ºall_facets) {
                ºexpanded_material.show();
                ºcondensed_material.hide();
            }
        }
    },
    ºwire: function(ºvar) {
        var ºthat = this;
        var ºcc = this.ºcomponent.ºcontainer[ºvar];
        var ºlc = this.ºcomponent.ºpage.ºgetComponent(`ºlist`).ºcontainer[ºvar];
        this.º_stats[ºvar] = ºcc.find(`#fstats_${ºvar}`);
        this.ºtable[ºvar] =  ºlc.find(`#table_${ºvar}`);
        var ºinfo = ` details; click to change level of details`;
        var ºdetailcontrols = `<a class="showc fa fa-list-ul" href="#" title="full${ºinfo}"></a><a class="morec fa fa-align-left" href="#" title="condensed${ºinfo}"></a><a class="hidec fa fa-minus" href="#" title="hidden${ºinfo}"></a>`;
        ºcc.addClass(`•facet`);
        ºcc.find(`span[fct]`).each(function() {
            $(this).html(`${ºdetailcontrols}&nbsp`);
            ºthat.º_display($(this));
        });
        ºcc.find(`.hidec`).click(function(ºe) {ºe.preventDefault();
            ºthat.º_display($(this), 1);
        });
        ºcc.find(`.morec`).click(function(ºe) {ºe.preventDefault();
            ºthat.º_display($(this), 2);
        });
        ºcc.find(`.showc`).click(function(ºe) {ºe.preventDefault();
            ºthat.º_display($(this), 0);
        });
    },
    ºwork: function(ºvar) {
        this.ºtable[ºvar].find(`tr[id]`).hide();
        var ºmother_list = this.ºcomponent.ºpage.ºgetComponent(`ºlist`);
        var ºdata = ºmother_list.ºdata[ºvar];
        var ºfacets = this.ºenabled_facets[ºvar];
        this.ºdistilled[ºvar] = [];
        for (var ºfacet_name in ºfacets) {
            var ºfacet= ºfacets[ºfacet_name].ºimplementation;
            ºfacet.ºdistilled[ºvar] = [];
        }
        ºdata.forEach(function(ºd, ºi) {
            var ºv = true; // will hold whether this row passes all facets
/* We collect in the ºdistilled member of this facet object the collective results of all individual facets,
 * Moreover, for each facet, we collect in its ºdistilled member the results when all facets are applied except the facet in question
 * so: 
 * 1. rows with a failure for 2 or more facets are discarded
 * 2. rows with a failure for exactly one facet are added to the data for that facet
 * 3. rows which pass all facets are added to all facets, and also to the final filtered set
 */
            var ºthe_false = null; // which facet has yielded false (if there are more than one we'll ºdiscard the row
            var ºdiscard = false; // becomes true when we have encounterd 2 facets that yield false
            for (var ºfacet_name in ºfacets) {
                if (!ºdiscard) {
                    var ºfacet = ºfacets[ºfacet_name].ºimplementation;
                    var ºthis_v = ºfacet.ºv(ºvar, ºd[0]); // ºthis_v: whether the row passes this facet
                    if (!ºthis_v) {
                        ºv = false;
                        if (ºthe_false == null) { // this is the first failure, we store the facet number in ºthe_false
                            ºthe_false = ºfacet;
                        } // else we ºdiscard the row altogether
                        else {
                            ºdiscard = true;
                        }
                    }
                }
            }
            if (!ºdiscard) {
                if (ºv) {
                    this.ºdistilled[ºvar].push(ºd[0]);
                    this.ºtable[ºvar].find(`tr[id="r${ºd[0]}"]`).show();
                }
                if (ºthe_false != null) {
                    ºthe_false.ºdistilled[ºvar].push(ºd[0]);
                }
                else {
                    for (var ºfacet_name in ºfacets) {
                        var ºfacet = ºfacets[ºfacet_name].ºimplementation;
                        ºfacet.ºdistilled[ºvar].push(ºd[0]);
                    }
                }
            }
        }, this);
        for (var ºfacet_name in ºfacets) {
            var ºfacet = ºfacets[ºfacet_name].ºimplementation;
            ºfacet.ºstats(ºvar);
        }
        this.º_stats[ºvar].html(`${this.ºdistilled[ºvar].length} of ${ºdata.length}`);
    },
};

