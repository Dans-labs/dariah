/* INDIVIDUAL COMPONENT: Facets
 * This sets up a list of facets for the lists of records to be displayed in the middle column
 * It will host individual facets
 */

function Facet(comp) {
    this.comp = comp;
    this._stats = {};
    this.data = {};
    this.table = {};
    this.fltd = {};
};

Facet.prototype = {
    _html: function(sc) {
        var h = ``;
        h += `<p class="facet">Filtering <span id="fstats_${sc}"></span></p>`;
        this.comp.container[sc].html(h);
    },
    _wire_flt: function(sc) {
        var cc = this.comp.container[sc];
        var lc = this.comp.µpage.getcomp(`list`).container[sc];
        this._stats[sc] = cc.find(`#fstats_${sc}`);
        this.table[sc] =  lc.find(`#table_${sc}`);
        var detailcontrols = `<a class="showc fa fa-chevron-right" href="#" title="Show details"></a><a class="hidec fa fa-chevron-down" href="#" title="Hide details"></a>`;
        cc.find(`p.dctrl`).each(function() {
            var orig = $(this).html();
            $(this).html(`${detailcontrols}&nbsp;${orig}`);
        });
        cc.find(`p.dctrl`).closest(`div`).find(`table,.flt`).show();
        cc.find(`.hidec`).show();
        cc.find(`.showc`).hide();
        cc.find(`.hidec`).click(function(e) {e.preventDefault();
            var dt = $(this).closest(`p`);
            var dd = $(this).closest(`div`).find(`table,.flt`);
            dd.hide();
            dt.find(`.hidec`).hide();
            dt.find(`.showc`).show();
        });
        cc.find(`.showc`).click(function(e) {e.preventDefault();
            var dt = $(this).closest(`p`);
            var dd = $(this).closest(`div`).find(`table,.flt`);
            dd.show();
            dt.find(`.hidec`).show();
            dt.find(`.showc`).hide();
        });
    },
    _work_flt: function(sc) {
        console.log(this.table[sc].find(`tr[id]`));
        this.table[sc].find(`tr[id]`).hide();
        var data = this.comp.µpage.getcomp(`list`).data[sc];
        this.fltd[sc] = [];
        for (var fn in this.children) {
            var fct = this.children[fn].delg;
            fct.fltd[sc] = [];
        }
        for (var i in data) {
            var v = true; // will hold whether this row passes all facets
/* We collect in the fltd member of this facet object the collective results of all individual facets,
 * Moreover, for each facet, we collect in its fltd member the results when all facets are applied except the facet in question
 * so: 
 * 1. rows with a failure for 2 or more facets are discarded
 * 2. rows with a failure for exactly one facet are added to the data for that facet
 * 3. rows which pass all facets are added to all facets, and also to the final filtered set
 */
            var the_false = null; // which facet has yielded false (if there are more than one we'll discard the row
            var discard = false; // becomes true when we have encounterd 2 facets that yield false
            for (var fn in this.children) {
                if (!discard) {
                    var fc = this.children[fn];
                    var tv = fc.delg.v(sc, i); // tv: whether the row passes this facet
                    if (!tv) {
                        v = false;
                        if (the_false == null) { // this is the first failure, we store the facet number in the_false
                            the_false = fc;
                        } // else we discard the row altogether
                        else {
                            discard = true;
                        }
                    }
                }
            }
            if (!discard) {
                if (v) {
                    this.fltd[sc].push(i);
                    this.table[sc].find(`tr[id="r${data[i][0]}"]`).show();
                }
                if (the_false != null) {
                    var fct = the_false.delg;
                    fct.fltd[sc].push(i);
                }
                else {
                    for (var fn in this.children) {
                        var fct = this.children[fn].delg;
                        fct.fltd[sc].push(i);
                    }
                }
            }
        }
        for (var fn in this.children) {
            var fct = this.children[fn].delg;
            fct.stats(sc);
        }
        this._stats[sc].html(`${this.fltd[sc].length} of ${data.length}`);
    },
    show: function(sc) {
        return this.comp.state.getstate(`list`) == sc;
    },
    weld: function(sc) {
        this.children = this.comp.children;
        this._html(sc);
    },
    wire: function(sc) {
        console.log(`IN WIRE FACET DELG SHOW = ${this.show(sc)}`)
        if (this.show(sc)) {
            console.log(this.children);
            for (var fn in this.children) {
                var fct = this.children[fn].delg;
                fct.wire_flt(sc);
            }
            this._wire_flt(sc);
        }
    },
    work: function(sc) {
        if (this.show(sc)) {
            for (var fn in this.children) {
                var fct = this.children[fn].delg;
                fct.work_flt(sc);
            }
            this._work_flt(sc);
        }
    },
};

