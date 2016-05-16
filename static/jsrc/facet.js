/* INDIVIDUAL COMPONENT: Facets
 * This sets up a list of facets for the lists of records to be displayed in the middle column
 * It will host individual facets
 */

function ºFacet(ºcomp) {
    this.ºcomp = ºcomp;
    this.º_stats = {};
    this.ºdata = {};
    this.ºtable = {};
    this.ºfltd = {};
    this.ºenabled_facets = {};
};

ºFacet.prototype = {
    º_html: function(ºsc) {
        var ºh = ``;
        ºh += `<p>Filtering <span id="fstats_${ºsc}"></span></p>`;
        this.ºcomp.ºcontainer[ºsc].html(ºh);
    },
    º_wire_flt: function(ºsc) {
        var ºcc = this.ºcomp.ºcontainer[ºsc];
        var ºlc = this.ºcomp.ºpage.ºgetcomp(`list`).ºcontainer[ºsc];
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
    º_work_flt: function(ºsc) {
        console.log(this.ºtable[ºsc].find(`tr[id]`));
        this.ºtable[ºsc].find(`tr[id]`).hide();
        var ºdata = this.ºcomp.ºpage.ºgetcomp(`list`).ºdata[ºsc];
        var ºfcts = this.ºenabled_facets[ºsc];
        this.ºfltd[ºsc] = [];
        for (var ºfn in ºfcts) {
            var ºfct = ºfcts[ºfn].ºdelg;
            ºfct.ºfltd[ºsc] = [];
        }
        for (var ºi in ºdata) {
            var ºv = true; // will hold whether this row passes all facets
/* We collect in the ºfltd member of this facet object the collective results of all individual facets,
 * Moreover, for each facet, we collect in its ºfltd member the results when all facets are applied except the facet in question
 * so: 
 * 1. rows with a failure for 2 or more facets are discarded
 * 2. rows with a failure for exactly one facet are added to the data for ºthat facet
 * 3. rows which pass all facets are added to all facets, and also to the final filtered set
 */
            var ºthe_false = null; // which facet has yielded false (if there are more than one we'll ºdiscard the row
            var ºdiscard = false; // becomes true when we have encounterd 2 facets ºthat yield false
            for (var ºfn in ºfcts) {
                if (!ºdiscard) {
                    var ºfct = ºfcts[ºfn].ºdelg;
                    var ºtv = ºfct.ºv(ºsc, ºi); // ºtv: whether the row passes this facet
                    if (!ºtv) {
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
                    this.ºfltd[ºsc].push(ºi);
                    this.ºtable[ºsc].find(`tr[id="r${ºdata[ºi][0]}"]`).show();
                }
                if (ºthe_false != null) {
                    ºthe_false.ºfltd[ºsc].push(ºi);
                }
                else {
                    for (var ºfn in ºfcts) {
                        var ºfct = ºfcts[ºfn].ºdelg;
                        ºfct.ºfltd[ºsc].push(ºi);
                    }
                }
            }
        }
        for (var ºfn in ºfcts) {
            var ºfct = ºfcts[ºfn].ºdelg;
            ºfct.ºstats(ºsc);
        }
        this.º_stats[ºsc].html(`${this.ºfltd[ºsc].length} of ${ºdata.length}`);
    },
    ºshow: function(ºsc) {
        return this.ºcomp.ºstate.ºgetstate(`list`) == ºsc;
    },
    ºweld: function(ºsc) {
        this.ºchildren = this.ºcomp.ºchildren;
        this.ºenabled_facets[ºsc] = {};
        for (var ºfn in this.ºchildren) {
            var ºfct = this.ºchildren[ºfn];
            if (ºfct.ºhas_scomp(ºsc)) {
                this.ºenabled_facets[ºsc][ºfn] = ºfct;
            }
        }
        this.º_html(ºsc);
    },
    ºwire: function(ºsc) {
        console.log(`IN WIRE FACET DELG SHOW = ${this.ºshow(ºsc)}`)
        if (this.ºshow(ºsc)) {
            var ºfcts = this.ºenabled_facets[ºsc];
            for (var ºfn in ºfcts) {
                ºfcts[ºfn].ºdelg.ºwire_flt(ºsc);
            }
            this.º_wire_flt(ºsc);
        }
    },
    ºwork: function(ºsc) {
        if (this.ºshow(ºsc)) {
            var ºfcts = this.ºenabled_facets[ºsc];
            for (var ºfn in ºfcts) {
                ºfcts[ºfn].ºdelg.ºwork_flt(ºsc);
            }
            this.º_work_flt(ºsc);
        }
    },
};

