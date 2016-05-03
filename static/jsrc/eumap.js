/* INDIVIDUAL COMPONENT: EUmap
 * This manages a clickable map of the EU countries
 */

function EUmap(comp) {
    this.comp = comp;
    this.name = `eumap`;
    this.facet = this.comp.page.getcomp(`facet`).delg;
    this.enabled = {contrib: 1};
    this._map = {};
    this._mapc = {};
    this._list = {};
    this.data = {};
    this._all_countries = { // the boolean tells whether the country is in DARIAH
        AT: [`Austria`, true],
        BE: [`Belgium`, true],
        HR: [`Croatia`, true],
        CY: [`Cyprus`, true],
        CZ: [`Czech Republic`, true],
        DK: [`Denmark`, true],
        EE: [`Estonia`, true],
        FR: [`France`, true],
        DE: [`Germany`, true],
        GR: [`Greece`, true],
        HU: [`Hungary`, true],
        IE: [`Ireland`, true],
        IT: [`Italy`, true],
        LV: [`Latvia`, true],
        LT: [`Lithuania`, true],
        LU: [`Luxembourg`, true],
        MT: [`Malta`, true],
        NL: [`Netherlands`, true],
        PL: [`Poland`, true],
        PT: [`Portugal`, true],
        RS: [`Serbia`, true],
        SK: [`Slovakia`, true],
        SI: [`Slovenia`, true],
        CH: [`Switzerland`, true],
        GB: [`United Kingdom`, true],
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
    this.countries = [];
    this.country = {};
    this.colorvalues = {};
    for (var cd in this._all_countries) {
        var cprop = this._all_countries[cd];
        if (cprop[1]) {
            this.countries.push(cd);
            this.country[cd] = cprop[0];
            this.colorvalues[cd] = `indariah`;
        }
        else {
            this.colorvalues[cd] = `outdariah`;
        }
    }
    this.countries.sort();
};

EUmap.prototype = {
    _html: function(sc) {
        var cols = 3;
        var h = ``;
        h += `<div id="map-europe_${sc}"></div><table class="clist" id="list-europe_${sc}"><tr>`;
        for (var i in this.countries) {
            if ((i % cols == 0) && (i > 0) && (i < this.countries.length)) {
                h += `</tr><tr>`;
            }
            var cd = this.countries[i];
            var cn = this.country[cd];
            h += `<td cd="${cd}"><a href="#" class="ctrls">${cn}</a> <span class="stats"></span></td>`;
        }
        h += `</tr></table>`;
        this.comp.container[sc].html(h);
    },
    _dressup: function(sc) {
        var that = this;
        this._mapc[sc] = $(`#map-europe_${sc}`);
        this._list[sc] = $(`#list-europe_${sc}`);
        this._mapc[sc].width(`100%`);
        this._mapc[sc].height(this._mapc[sc].width()*0.6);
        this._mapc[sc].vectorMap({
            map: `europe_mill`,
            backgroundColor: `#ccccff`,
            regionsSelectable: true,
            regionsSelectableOne: false,
            regionStyle: {
                initial: {
                    fill: `#bbbbbb`,
                    'fill-opacity': 1,
                    stroke: `none`,
                    'stroke-width': 0,
                    'stroke-opacity': 1
                },
                hover: {
                    'fill-opacity': 0.8,
                    cursor: `pointer`
                },
                selected: {
                    fill: `#dd8844`,
                },
                    selectedHover: {
                },
            },
            series: {
                regions: [{
                    scale: {
                        indariah: `#ffddaa`,
                        outdariah: `#ffffff`,
                    },
                    attributes: `fill`,
                    values: that.colorvalues,
                }],
            },
            onRegionClick: function(e, c) {
                if (!(c in that.country)) {
                    e.preventDefault();
                }
            },
            onRegionSelected: function(e, c, i, sel) {
                //console.log(`OnRegionSelected 1`, sel);
                if (that.changeState) {
                    that.comp.state.setstate(`m_${sc}`, that._a_to_str(sel));
                }
                //console.log(`OnRegionSelected 2`, sel);
            },
        });
        this._map[sc] = this._mapc[sc].vectorMap('get', 'mapObject');
        this._map[sc].setFocus({regions: this.countries});
        this._map[sc].setFocus({regions: [`GB`, `GR`]});
        this._list[sc].find(`.ctrls`).click(function(e) {e.preventDefault();
            var cd = $(this).closest(`td`).attr(`cd`);
            var ison = $(this).hasClass(`ison`);
            var sel = that._from_str(that.comp.state.getstate(`m_${sc}`));
            sel[cd] = !ison;
            //console.log(that._to_str(sel));
            that.comp.state.setstate(`m_${sc}`, that._to_str(sel));
        });
    },
    _set_flt: function(sc, rgs) {
        if (rgs == null || rgs == undefined || rgs == '') {rgs = this._from_str(``)}
        //console.log(`set filt 1`);
        this.changeState = false;
        //Cyprus is not on the map, we delete its key if present and reinsert it afterwards
        //We do show Cyprus in the list
        var sv;
        if ('CY' in rgs) {
            sv = rgs.CY;
            delete rgs.CY;
        }
        this._map[sc].setSelectedRegions(rgs);
        if (sv != undefined) {
            rgs.CY = sv;
        }
        this.changeState = true;
        //console.log(`set filt 2`);
        //console.log(`SETFLT ${sc}`, rgs);
        for (var cd in this.country) {
            var ccell = this._list[sc].find(`td[cd="${cd}"] .ctrls`);
            //console.log(cd, ccell);
            if (cd in rgs && rgs[cd]) {
                ccell.addClass(`ison`);
            }
            else {
                ccell.removeClass(`ison`);
            }
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
    v: function(sc, i) {
        return true;
    },
    stats: function(sc) {
    },
    show: function(sc) {
        return this.comp.state.getstate(`list`) == sc && sc in this.enabled;
    },
    weld: function(sc) {
        if (sc in this.enabled) {
            this.facet.add_facet(sc, this);
            this._html(sc);
            this._dressup(sc);
        }
    },
    wire: function(sc) {
    },
    work: function(sc) {
        if (sc in this.enabled) {
            //console.log(`APPLY eumap ${sc}`);
            if (this.show(sc)) {
                this.comp.container[sc].show();
                //console.log(`eumap work 1`);
                this._set_flt(sc, this._from_str(this.comp.state.getstate(`m_${sc}`)));
                //console.log(`eumap work 2`);
            }
            else {
                this.comp.container[sc].hide();
            }
        }
    }
};
