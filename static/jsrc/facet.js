/* INDIVIDUAL COMPONENT: Facets
 * This sets up a list of facets for the lists of records to be displayed in the middle column
 * It will host individual facets
 */

function Facet(comp) {
    this.comp = comp;
    this._loaded = {};
    this._facets = {};
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
    _do_all: function(mth, sc) {
        for (var i in this._facets[sc]) {
            var fct = this._facets[sc][i];
            //console.log(`FCT ${fct.name} ${sc} ${mth} 1`);
            fct[mth](sc);
            //console.log(`FCT ${fct.name} ${sc} ${mth} 2`);
        }
    },
    _work_flt: function(sc) {
        this.table[sc].find(`tr[id]`).hide();
        var data = this.comp.page.getcomp(`list`).data[sc];
        this.fltd[sc] = [];
        for (var j in this._facets[sc]) {
            var fct = this._facets[sc][j];
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
            for (var j in this._facets[sc]) {
                if (!discard) {
                    var fct = this._facets[sc][j];
                    var tv = fct.v(sc, i); // tv: whether the row passes this facet
                    if (!tv) {
                        v = false;
                        if (the_false == null) { // this is the first failure, we store the facet number in the_false
                            the_false = j;
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
                    var fct = this._facets[sc][the_false];
                    fct.fltd[sc].push(i);
                }
                else {
                    for (var j in this._facets[sc]) {
                        var fct = this._facets[sc][j];
                        fct.fltd[sc].push(i);
                    }
                }
            }
        }
        for (var j in this._facets[sc]) {
            var fct = this._facets[sc][j];
            fct.stats(sc);
            //console.log(`${fct.name}: ${fct.fltd[sc].length}`);
        }
        this._stats[sc].html(`${this.fltd[sc].length} of ${data.length}`);
    },
    add_facet: function(sc, fct) {
        if (this._facets[sc] == undefined) {
            this._facets[sc] = [];
        }
        this._facets[sc].push(fct);
    },
    show: function(sc) {
        return this.comp.state.getstate(`list`) == sc;
    },
    weld: function(sc) {
        this._html(sc);
        this._loaded[sc] = false;
        this._facets[sc] = [];
        this._stats[sc] = $(`#fstats_${sc}`);
    },
    wire: function(sc) {
        this.table[sc] =  $(`#table_${sc}`);
        if (!this._loaded[sc]) {
            this.data[sc] = this.comp.page.getcomp(`list`).data[sc];
            this._do_all(`wire`, sc);
            this._loaded[sc] = true;
        }
    },
    work: function(sc) {
        if (this.show(sc)) {
            this.comp.container[sc].show();
            for (var j in this._facets[sc]) {
                var fct = this._facets[sc][j];
                fct.work_flt(sc);
            }
            //console.log(1, this._facets[sc][0].statsf[sc]);
            this._work_flt(sc);
        }
        else {
            this.comp.container[sc].hide();
        }
    },
};

