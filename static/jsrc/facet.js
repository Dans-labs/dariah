/* INDIVIDUAL COMPONENT: Facets
 * This sets up a list of facets for the lists of records to be displayed in the middle column
 * It will host individual facets
 */

function ºFacet(ºcomp) {
    this.ºcomp = ºcomp;
    this.º_stats = {};
    this.ºdata = {};
    this.ºtable = {};
    this.ºdistilled = {};
    this.ºenabled_facets = {};
};

ºFacet.prototype = {
    º_html: function(ºsc) {
        var ºh = ``;
        ºh += `<p>Filtering <span id="fstats_${ºsc}"></span></p>`;
        this.ºcomp.ºcontainer[ºsc].html(ºh);
    },
    ºshow: function(ºsc) {
        return this.ºcomp.ºstate.ºgetstate(`list`) == ºsc;
    },
    ºweld: function(ºsc) {
        var ºchildren = this.ºcomp.ºchildren;
        this.ºenabled_facets[ºsc] = {};
        for (var ºfacet_name in ºchildren) {
            var ºfacet_comp = ºchildren[ºfacet_name];
            if (ºfacet_comp.ºhas_scomp(ºsc)) {
                this.ºenabled_facets[ºsc][ºfacet_name] = ºchildren[ºfacet_name];
            }
        }
        this.º_html(ºsc);
    },
    ºwire: function(ºsc) {
        var ºcc = this.ºcomp.ºcontainer[ºsc];
        var ºlc = this.ºcomp.ºpage.ºget_component(`ºlist`).ºcontainer[ºsc];
        this.º_stats[ºsc] = ºcc.find(`#fstats_${ºsc}`);
        this.ºtable[ºsc] =  ºlc.find(`#table_${ºsc}`);
        var ºdetailcontrols = `<a class="showc fa fa-chevron-right" href="#" title="Show details"></a><a class="hidec fa fa-chevron-down" href="#" title="Hide details"></a>`;
        ºcc.addClass(`•facet`);
        ºcc.find(`p.•dctrl`).each(function() {
            var ºorig = $(this).html();
            $(this).html(`${ºdetailcontrols}&nbsp;${ºorig}`);
        });
        ºcc.find(`p.•dctrl`).closest(`div`).find(`table,.•flt`).show();
        ºcc.find(`.hidec`).show();
        ºcc.find(`.showc`).hide();
        ºcc.find(`.hidec`).click(function(ºe) {ºe.preventDefault();
            var ºdt = $(this).closest(`p`);
            var ºdd = $(this).closest(`div`).find(`table,.•flt`);
            ºdd.hide();
            ºdt.find(`.hidec`).hide();
            ºdt.find(`.showc`).show();
        });
        ºcc.find(`.showc`).click(function(ºe) {ºe.preventDefault();
            var ºdt = $(this).closest(`p`);
            var ºdd = $(this).closest(`div`).find(`table,.•flt`);
            ºdd.show();
            ºdt.find(`.hidec`).show();
            ºdt.find(`.showc`).hide();
        });
    },
    ºwork: function(ºsc) {
        this.ºtable[ºsc].find(`tr[id]`).hide();
        var ºmother_list = this.ºcomp.ºpage.ºget_component(`ºlist`);
        var ºdata = ºmother_list.ºdata[ºsc];
        var ºfacets = this.ºenabled_facets[ºsc];
        this.ºdistilled[ºsc] = [];
        for (var ºfacet_name in ºfacets) {
            var ºfacet= ºfacets[ºfacet_name].ºdelg;
            ºfacet.ºdistilled[ºsc] = [];
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
                    var ºfct = ºfacets[ºfacet_name].ºdelg;
                    var ºthis_v = ºfct.ºv(ºsc, ºi); // ºthis_v: whether the row passes this facet
                    if (!ºthis_v) {
                        ºv = false;
                        if (ºthe_false == null) { // this is the first failure, we store the facet number in ºthe_false
                            ºthe_false = ºfct;
                        } // else we ºdiscard the row altogether
                        else {
                            ºdiscard = true;
                        }
                    }
                }
            }
            if (!ºdiscard) {
                if (ºv) {
                    this.ºdistilled[ºsc].push(ºi);
                    this.ºtable[ºsc].find(`tr[id="r${ºd[0]}"]`).show();
                }
                if (ºthe_false != null) {
                    ºthe_false.ºdistilled[ºsc].push(ºi);
                }
                else {
                    for (var ºfacet_name in ºfacets) {
                        var ºfct = ºfacets[ºfacet_name].ºdelg;
                        ºfct.ºdistilled[ºsc].push(ºi);
                    }
                }
            }
        }, this);
        for (var ºfacet_name in ºfacets) {
            var ºfct = ºfacets[ºfacet_name].ºdelg;
            ºfct.ºstats(ºsc);
        }
        this.º_stats[ºsc].html(`${this.ºdistilled[ºsc].length} of ${ºdata.length}`);
    },
};

