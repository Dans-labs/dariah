/* INDIVIDUAL COMPONENT: ctype
 * This manages the facet "contribution type"
 */

function CType(comp) {
    this.comp = comp;
    this.name = `ctype`;
    this.facet = this.comp.page.getcomp(`facet`).delg;
    this.enabled = {contrib: 1};
    this.fltd = {};
    this._data = {};
    this._relvals = {};
    this._list = {};
    this._allc = {};
    this._sts = {};
    this.tstate = {};
    this.types = {};
    this.type = {};
    this.type_on = {};
    this.type_off = {};
};

CType.prototype = {
    _html: function(sc) {
        var cols = 2;
        var h = `<div><p class="dctrl">By type</p>`;
        h += `<p class="all"><span ti="_all" class="stats"></span> <a id="t_all_${sc}" href="#" class="ctrls">all types</a></p>
<table class="clist" id="list-ctype_${sc}"><tr>`;
        for (var i in this.types[sc]) {
            if ((i % cols == 0) && (i > 0) && (i < this.types[sc].length)) {
                h += `</tr><tr>`;
            }
            var ti = this.types[sc][i];
            var tv = this.type[sc][ti];
            h += `<td><span ti="${ti}" class="stats"></span></td><td><a ti="${ti}" href="#" class="ctrls">${tv}</a></td>`;
        }
        h += `</tr></table></div>`;
        this.comp.container[sc].html(h);
    },
    _dressup: function(sc) {
        var that = this;
        this._list[sc] = $(`#list-ctype_${sc}`);
        this._list[sc].find(`.ctrls`).click(function(e) {e.preventDefault();
            var ti = $(this).attr(`ti`);
            var ison = $(this).hasClass(`ison`);
            var sel = that._from_str(that.comp.state.getstate(`t_${sc}`));
            sel[ti] = !ison;
            that.comp.state.setstate(`t_${sc}`, that._to_str(sel));
        });
        this._allc[sc] = this.comp.container[sc].find(`#t_all_${sc}`);
        this._allc[sc].click(function(e) {e.preventDefault();
            var ison = $(this).hasClass(`ison`);
            if (ison) {
                that.comp.state.setstate(`t_${sc}`, that._to_str(that.type_off[sc]));
            }
            else {
                that.comp.state.setstate(`t_${sc}`, that._to_str(that.type_on[sc]));
            }
        });
    },
    _set_flt: function(sc, rgs) {
        var that = this;
        if (rgs == null || rgs == undefined || rgs == '') {rgs = this._from_str(``)}
        var all_sel = true;
        for (var ti in this.type[sc]) {
            var ccell = this._list[sc].find(`a[ti="${ti}"]`);
            if (ti in rgs && rgs[ti]) {
                ccell.addClass(`ison`);
            }
            else {
                ccell.removeClass(`ison`, ccell);
                all_sel = false;
            }
        }
        if (all_sel) {
            this._allc[sc].addClass(`ison`);
        }
        else {
            this._allc[sc].removeClass(`ison`);
        }
    },
    _to_str: function(ob) {
        var ar = [];
        for (var x in ob) {
            if (ob[x]) {
                ar.push(x);
            }
        }
        return ar.join(',');
    },
    _from_str: function(st) {
        var ob = {};
        if (st !== null && st != undefined && st != '') {
            var ar = st.split(',');
            for (var i in ar) {
                ob[ar[i]] = true;
            }
        }
        return ob;
    },
    stats: function(sc) {
        var that = this;
        this._sts[sc] = {};
        for (var ti in this.type[sc]) {
            this._sts[sc][ti] = 0;
        } 
        for (var x in this.fltd[sc]) {
            var i = this.fltd[sc][x];
            var tis = this._data[sc][i][3];
            for (var ti in tis) {
                this._sts[sc][ti] += 1;
            }
        }
        for (var ti in this._sts[sc]) {
            this.comp.container[sc].find(`span[ti="${ti}"].stats`).html(this._sts[sc][ti]);
        }
        this.comp.container[sc].find(`span[ti="_all"].stats`).html(this.fltd[sc].length);
    },
    v: function(sc, i) {
        var tis =  this._data[sc][i][3];
        var tstate = this._from_str(this.tstate[sc]);
        for (var ti in tis) {
            if ((ti in tstate) && tstate[ti]) {
                return true;
            }
        }
        return false;
    },
    show: function(sc) {
        return (this.comp.state.getstate(`list`) == sc) && (sc in this.enabled);
    },
    weld: function(sc) {
        if (sc in this.enabled) {
            this.facet.add_facet(sc, this);
        }
    },
    wire: function(sc) {
        if (sc in this.enabled && !this.comp._loaded[sc]) {
            this.comp._loaded[sc] = true;
            this._listc = this.comp.page.getcomp(`list`);
            this._data[sc] = this._listc.data[sc];
            this._relvals[sc] = this._listc.relvals[sc];
            this.types[sc] = [];
            this.type[sc] = {};
            this.type_off[sc] = {};
            this.type_on[sc] = {};
            for (var ti in this._relvals[sc].type) {
                var tv = this._relvals[sc].type[ti];
                this.type_off[sc][ti] = false;
                this.type_on[sc][ti] = true;
                this.types[sc].push(ti);
                this.type[sc][ti] = tv;
            }
            this.types[sc].sort();
            this._html(sc);
            this._dressup(sc);
        }
    },
    work: function(sc) {
        if (sc in this.enabled) {
            if (this.show(sc)) {
                this.comp.container[sc].show();
            }
            else {
                this.comp.container[sc].hide();
            }
        }
    },
    work_flt: function(sc) {
        this.tstate[sc] = this.comp.state.getstate(`t_${sc}`);
        this._set_flt(sc, this._from_str(this.tstate[sc]));
    },
};
