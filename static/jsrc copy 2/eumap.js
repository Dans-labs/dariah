/* INDIVIDUAL COMPONENT: EUmap
 * This manages a clickable map of the EU countries
 * See http://jvectormap.com/documentation/javascript-api/jvm-map/
 */

function EUmap(comp) {
    this.comp = comp;
    this.name = `eumap`;
    this.facet = this.comp.µpage.getcomp(`facet`).delg;
    this.disabled = {country: true};
    this._map = {};
    this._mapc = {};
    this._list = {};
    this.fltd = {};
    this.mstate = {};
    this._µdata = {};
    this._allc = {};
    this._sts = {};
    this._all_countries = { // the boolean tells whether the country is in DARIAH
        AT: [`Austria`, true, 47.7, 15.11],
        BE: [`Belgium`, true, 51.3, 3.1],
        HR: [`Croatia`, true, 44.7, 15.6],
        CY: [`Cyprus`, true, 35.0, 32.8],
        CZ: [`Czech Republic`, true, 49.8, 15.2],
        DK: [`Denmark`, true, 55.6, 11.0],
        EE: [`Estonia`, true, 59.0, 25.0],
        FR: [`France`, true, 46.5, 1.9],
        DE: [`Germany`, true, 51.0, 10.4],
        GR: [`Greece`, true, 38.0, 23.8],
        HU: [`Hungary`, true, 46.9, 19.8],
        IE: [`Ireland`, true, 53.1, -8.4],
        IT: [`Italy`, true, 41.6, 13.0],
        LV: [`Latvia`, true, 56.9, 26.8],
        LT: [`Lithuania`, true, 55.2, 24.9],
        LU: [`Luxembourg`, true, 49.6, 6.1],
        MT: [`Malta`, true, 35.9, 14.4],
        NL: [`Netherlands`, true, 52.8, 5.8],
        PL: [`Poland`, true, 52.3, 19.8],
        PT: [`Portugal`, true, 38.7, -9.0],
        RS: [`Serbia`, true, 44.0, 20.8],
        SK: [`Slovakia`, true, 48.8, 19.9],
        SI: [`Slovenia`, true, 46.2, 14.4],
        CH: [`Switzerland`, true, 46.9, 8.3],
        GB: [`United Kingdom`, true, 52.9, -1.8],
        AL: [`Albania`, false],
        AD: [`Andorra`, false],
        BY: [`Belarus`, false],
        BA: [`Bosnia and Herzegovina`, false],
        BG: [`Bulgaria`, false],
        FI: [`Finland`, false],
        GE: [`Georgia`, false],
        IS: [`Iceland`, false],
        SM: [`San Marino`, false],
        KS: [`Kosovo`, false],
        LI: [`Liechtenstein`, false],
        MK: [`Macedonia`, false],
        MD: [`Moldova`, false],
        MC: [`Monaco`, false],
        ME: [`Montenegro`, false],
        NO: [`Norway`, false],
        RO: [`Romania`, false],
        RU: [`Russian Federation`, false],
        ES: [`Spain`, false],
        SE: [`Sweden`, false],
        TR: [`Turkey`, false],
        UA: [`Ukraine`, false],
    };
    this.not_mapped = {
        CY: true,
    };
    this.countries = [];
    this.country = {};
    this.marker = {};
    this.country_off = {};
    this.country_on = {};
    this.setvalues = {};
    for (var cd in this._all_countries) {
        var cprop = this._all_countries[cd];
        if (cprop[1]) {
            this.country_off[cd] = false;
            this.country_on[cd] = true;
            this.countries.push(cd);
            this.country[cd] = cprop[0];
            if (cprop.length > 3) {
                this.marker[cd] = {latLng: [cprop[2], cprop[3]], name: cprop[0]};
            }
            this.setvalues[cd] = `indariah`;
        }
        else {
            this.setvalues[cd] = `outdariah`;
        }
    }
    this.countries.sort();
};

EUmap.prototype = {
    _html: function(sc) {
        var cols = 2;
        var h = `<div><p class="dctrl">By country</p>`;
        h += `<div id="map-europe_${sc}"></div>
<p class="all"><span cd="_all" class="stats"></span> <a id="m_all_${sc}" href="#" class="ctrls">all DARIAH</a></p>
<table class="clist" id="list-europe_${sc}"><tr>`;
        for (var i in this.countries) {
            if ((i % cols == 0) && (i > 0) && (i < this.countries.length)) {
                h += `</tr><tr>`;
            }
            var cd = this.countries[i];
            var cn = this.country[cd];
            h += `<td><span cd="${cd}" class="stats"></span></td><td><a cd="${cd}" href="#" class="ctrls">${cn}</a></td>`;
        }
        h += `</tr></table></div>`;
        console.log(`HTML eumap ${sc}`, this.comp.container);
        this.comp.container[sc].html(h);
    },
    _dressup: function(sc) {
        var that = this;
        var cc = this.comp.container[sc];
        this._mapc[sc] = cc.find(`#map-europe_${sc}`);
        this._list[sc] = cc.find(`#list-europe_${sc}`);
        this._mapc[sc].width(`100%`);
        this._mapc[sc].height(this._mapc[sc].width()*0.6);
        this._mapc[sc].vectorMap({
            map: `europe_mill`,
            backgroundColor: `#ccccff`,
            regionsSelectable: true,
            regionsSelectableOne: false,
            markerStyle: {
                initial: {
                    fill: `#448844`,
                    'fill-opacity': 1,
                    stroke: `none`,
                    'stroke-width': 0,
                    'stroke-opacity': 1,
                    'r': 1,
                },
                hover: {
                    'fill-opacity': 0.8,
                    cursor: `pointer`,
                    stroke: `#000000`,
                    'stroke-width': 0,
                    'stroke-opacity': 1,
                },
                selected: {
                },
                selectedHover: {
                },
            },
            regionStyle: {
                initial: {
                    fill: `#bbbbbb`,
                    'fill-opacity': 1,
                    stroke: `none`,
                    'stroke-width': 0,
                    'stroke-opacity': 1,
                },
                hover: {
                    'fill-opacity': 0.8,
                    cursor: `pointer`,
                    stroke: `#ffff44`,
                    'stroke-width': 3,
                    'stroke-opacity': 1,
                },
                selected: {
                    'fill-opacity': 1,
                    fill: `#dd8844`,
                },
                selectedHover: {
                },
            },
            markers: this.marker,
            series: {
                markers: [{
                    values: {},
                        scale: [0,15],
                        normalizeFunction: `linear`,
                        attribute: `r`,
                        min: 0,
                        max: 100,
                }],
                regions: [{
                        scale: {
                            outdariah: `#ffffff`,
                            indariah: `#ffeedd`,
                        },
                        attribute: `fill`,
                        values: that.setvalues,
                }],
            },
            onRegionTipShow: function(e, el, cd) {
                el.html(`${cd}: ${(cd in that._sts[sc])?that._sts[sc][cd]:'not in DARIAH'}`);
            },
            onRegionClick: function(e, c) {
                if (!(c in that.country)) {
                    e.preventDefault();
                }
            },
            onRegionSelected: function(e, c, i, sel) {
                if (that.changeState) {
                    that.comp.state.setstate(`m_${sc}`, that._a_to_str(sel));
                }
            },
        });
        this._map[sc] = this._mapc[sc].vectorMap('get', 'mapObject');
        this._map[sc].setFocus({regions: this.countries});
        this._map[sc].setFocus({regions: [`GB`, `GR`]});
        this._list[sc].find(`.ctrls`).click(function(e) {e.preventDefault();
            var cd = $(this).attr(`cd`);
            var ison = $(this).hasClass(`ison`);
            var sel = that._from_str(that.comp.state.getstate(`m_${sc}`));
            sel[cd] = !ison;
            that.comp.state.setstate(`m_${sc}`, that._to_str(sel));
        });
        this._allc[sc] = this.comp.container[sc].find(`#m_all_${sc}`);
        this._allc[sc].click(function(e) {e.preventDefault();
            var ison = $(this).hasClass(`ison`);
            if (ison) {
                that.comp.state.setstate(`m_${sc}`, that._to_str(that.country_off));
            }
            else {
                that.comp.state.setstate(`m_${sc}`, that._to_str(that.country_on));
            }
        });
    },
    _set_flt: function(sc, rgs) {
        var that = this;
        if (rgs == null || rgs == undefined || rgs == '') {rgs = this._from_str(``)}
        this.changeState = false;
        //Cyprus is not on the map, we delete its key if present and reinsert it afterwards
        //We do show Cyprus in the list
        var sv = {};
        for (var cnm in this.not_mapped) {
            if (cnm in rgs) {
                sv[cnm] = rgs[cnm];
                delete rgs[cnm];
            }
        }
        this._map[sc].setSelectedRegions(rgs);
        for (var cnm in sv) {
            rgs[cnm] = sv[cnm];
        }
        this.changeState = true;
        var all_sel = true;
        for (var cd in this.country) {
            var ccell = this._list[sc].find(`a[cd="${cd}"]`);
            if (cd in rgs && rgs[cd]) {
                ccell.addClass(`ison`);
            }
            else {
                ccell.removeClass(`ison`);
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
    _a_to_str: function(ar) {
        return ar.join(',');
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
        for (var cd in this.country) {
            if (!(cd in ob)) {
                ob[cd] = false;
            }
        }
        return ob;
    },
    stats: function(sc) {
        var that = this;
        this._sts[sc] = {};
        for (var cd in this.country) {
            this._sts[sc][cd] = 0;
        } 
        for (var x in this.fltd[sc]) {
            var i = this.fltd[sc][x];
            var cd = this._µdata[sc][i][2];
            this._sts[sc][cd] += 1;
        }
        var total = this.fltd[sc].length;
        if (total == 0) {total = 1}
        for (var cd in this._sts[sc]) {
            this.comp.container[sc].find(`span[cd="${cd}"].stats`).html(this._sts[sc][cd]);
        }
        var wsts = {};
        for (var cd in this._sts[sc]) {
            var pr = 100 * this._sts[sc][cd] / total;
            wsts[cd] = (total < 10)?pr:(10*Math.sqrt(pr));
        }
        this._map[sc].series.markers[0].setValues(wsts);
        this.comp.container[sc].find(`span[cd="_all"].stats`).html(this.fltd[sc].length);
    },
    v: function(sc, i) {
        var cd =  this._µdata[sc][i][2];
        var mstate = this._from_str(this.mstate[sc]);
        return (cd in mstate) && mstate[cd];
    },
    show: function(sc) {
        return (this.comp.state.getstate(`list`) == sc) && (!((sc in this.disabled) && this.disabled[sc]));
    },
    weld: function(sc) {
        this._html(sc);
    },
    wire: function(sc) {
        this._dressup(sc);
    },
    wire_flt: function(sc) {
        this._µdata[sc] = this.comp.µpage.getcomp(`list`).data[sc];
    },
    work: function(sc) {},
    work_flt: function(sc) {
        this.mstate[sc] = this.comp.state.getstate(`m_${sc}`);
        this._set_flt(sc, this._from_str(this.mstate[sc]));
    },
};
