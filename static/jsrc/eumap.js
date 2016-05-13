/* INDIVIDUAL COMPONENT: ºEUmap
 * This manages a clickable map of the EU ºcountries
 * See http://jvectormap.com/documentation/javascript-api/jvm-map/
 */

function ºEUmap(ºcomp) {
    this.ºcomp = ºcomp;
    this.ºname = `eumap`;
    this.ºfacet = this.ºcomp.ºpage.ºgetcomp(`facet`).ºdelg;
    this.º_map = {};
    this.º_mapc = {};
    this.º_list = {};
    this.ºfltd = {};
    this.ºmstate = {};
    this.º_data = {};
    this.º_allc = {};
    this.º_sts = {};
    this.º_all_countries = { // the boolean tells whether the country is in DARIAH
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
    this.ºnot_mapped = {
        CY: true,
    };
    this.ºcountries = [];
    this.ºcountry = {};
    this.ºmarker = {};
    this.ºcountry_off = {};
    this.ºcountry_on = {};
    this.ºsetvalues = {};
    for (var ºcd in this.º_all_countries) {
        var ºcprop = this.º_all_countries[ºcd];
        if (ºcprop[1]) {
            this.ºcountry_off[ºcd] = false;
            this.ºcountry_on[ºcd] = true;
            this.ºcountries.push(ºcd);
            this.ºcountry[ºcd] = ºcprop[0];
            if (ºcprop.length > 3) {
                this.ºmarker[ºcd] = {latLng: [ºcprop[2], ºcprop[3]], ºname: ºcprop[0]};
            }
            this.ºsetvalues[ºcd] = 'ºindariah';
        }
        else {
            this.ºsetvalues[ºcd] = 'ºoutdariah';
        }
    }
    this.ºcountries.sort();
};

ºEUmap.prototype = {
    º_html: function(ºsc) {
        var ºcols = 2;
        var ºh = `<div><p class="dctrl">By country</p>`;
        ºh += `<div id="map-europe_${ºsc}"></div>
<p class="all"><span cd="_all" class="stats"></span> <a id="m_all_${ºsc}" href="#" class="•control_small">all DARIAH</a></p>
<table class="clist" id="list-europe_${ºsc}"><tr>`;
        for (var ºi in this.ºcountries) {
            if ((ºi % ºcols == 0) && (ºi > 0) && (ºi < this.ºcountries.length)) {
                ºh += `</tr><tr>`;
            }
            var ºcd = this.ºcountries[ºi];
            var ºcn = this.ºcountry[ºcd];
            ºh += `<td><span cd="${ºcd}" class="stats"></span></td><td><a cd="${ºcd}" href="#" class="•control_small">${ºcn}</a></td>`;
        }
        ºh += `</tr></table></div>`;
        this.ºcomp.ºcontainer[ºsc].html(ºh);
        console.log(`HTML eumap ${ºsc}`, this.ºcomp.ºcontainer[ºsc]);
    },
    º_dressup: function(ºsc) {
        var ºthat = this;
        var ºcc = this.ºcomp.ºcontainer[ºsc];
        this.º_mapc[ºsc] = ºcc.find(`#map-europe_${ºsc}`);
        this.º_list[ºsc] = ºcc.find(`#list-europe_${ºsc}`);
        this.º_mapc[ºsc].width(`100%`);
        this.º_mapc[ºsc].height(this.º_mapc[ºsc].width()*0.6);
        this.º_mapc[ºsc].vectorMap({
            'map': `europe_mill`,
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
            markers: this.ºmarker,
            series: {
                markers: [{
                    values: {},
                        scale: [0,25],
                        normalizeFunction: `linear`,
                        attribute: `r`,
                        min: 0,
                        max: 100,
                }],
                regions: [{
                        scale: {
                            'ºoutdariah': `#ffffff`,
                            'ºindariah': `#ffeedd`,
                        },
                        attribute: `fill`,
                        values: ºthat.ºsetvalues,
                }],
            },
            onRegionTipShow: function(ºe, ºel, ºcd) {
                ºel.html(`${ºcd}: ${(ºcd in ºthat.º_sts[ºsc])?ºthat.º_sts[ºsc][ºcd]:'not in DARIAH'}`);
            },
            onRegionClick: function(ºe, ºc) {
                if (!(ºc in ºthat.ºcountry)) {
                    ºe.preventDefault();
                }
            },
            onRegionSelected: function(ºe, ºc, ºi, ºsel) {
                if (ºthat.ºchangeState) {
                    ºthat.ºcomp.ºstate.ºsetstate(`m_${ºsc}`, ºthat.º_a_to_str(ºsel));
                }
            },
        });
        this.º_map[ºsc] = this.º_mapc[ºsc].vectorMap('get', 'mapObject');
        this.º_map[ºsc].setFocus({regions: [`GB`, `GR`]});
        this.º_list[ºsc].find(`.•control_small`).click(function(ºe) {ºe.preventDefault();
            var ºcd = $(this).attr(`cd`);
            var ºison = $(this).hasClass(`•ison`);
            var ºsel = ºthat.º_from_str(ºthat.ºcomp.ºstate.ºgetstate(`m_${ºsc}`));
            ºsel[ºcd] = !ºison;
            ºthat.ºcomp.ºstate.ºsetstate(`m_${ºsc}`, ºthat.º_to_str(ºsel));
        });
        this.º_allc[ºsc] = this.ºcomp.ºcontainer[ºsc].find(`#m_all_${ºsc}`);
        this.º_allc[ºsc].click(function(ºe) {ºe.preventDefault();
            var ºison = $(this).hasClass(`•ison`);
            if (ºison) {
                ºthat.ºcomp.ºstate.ºsetstate(`m_${ºsc}`, ºthat.º_to_str(ºthat.ºcountry_off));
            }
            else {
                ºthat.ºcomp.ºstate.ºsetstate(`m_${ºsc}`, ºthat.º_to_str(ºthat.ºcountry_on));
            }
        });
    },
    º_set_flt: function(ºsc, ºrgs) {
        var ºthat = this;
        if (ºrgs == null || ºrgs == undefined || ºrgs == '') {ºrgs = this.º_from_str(``)}
        this.ºchangeState = false;
        //Cyprus is not on the map, we delete its key if present and reinsert it afterwards
        //We do ºshow Cyprus in the list
        var ºsv = {};
        for (var ºcnm in this.ºnot_mapped) {
            if (ºcnm in ºrgs) {
                ºsv[ºcnm] = ºrgs[ºcnm];
                delete ºrgs[ºcnm];
            }
        }
        this.º_map[ºsc].setSelectedRegions(ºrgs);
        for (var ºcnm in ºsv) {
            ºrgs[ºcnm] = ºsv[ºcnm];
        }
        this.ºchangeState = true;
        var ºall_sel = true;
        for (var ºcd in this.ºcountry) {
            var ºccell = this.º_list[ºsc].find(`a[cd="${ºcd}"]`);
            if (ºcd in ºrgs && ºrgs[ºcd]) {
                ºccell.addClass(`•ison`);
            }
            else {
                ºccell.removeClass(`•ison`);
                ºall_sel = false;
            }
        }
        if (ºall_sel) {
            this.º_allc[ºsc].addClass(`•ison`);
        }
        else {
            this.º_allc[ºsc].removeClass(`•ison`);
        }
    },
    º_a_to_str: function(ºar) {
        return ºar.join(',');
    },
    º_to_str: function(ºob) {
        var ºar = [];
        for (var ºx in ºob) {
            if (ºob[ºx]) {
                ºar.push(ºx);
            }
        }
        return ºar.join(',');
    },
    º_from_str: function(ºst) {
        var ºob = {};
        if (ºst !== null && ºst != undefined && ºst != '') {
            var ºar = ºst.split(',');
            for (var ºi in ºar) {
                ºob[ºar[ºi]] = true;
            }
        }
        for (var ºcd in this.ºcountry) {
            if (!(ºcd in ºob)) {
                ºob[ºcd] = false;
            }
        }
        return ºob;
    },
    ºstats: function(ºsc) {
        var ºthat = this;
        this.º_sts[ºsc] = {};
        for (var ºcd in this.ºcountry) {
            this.º_sts[ºsc][ºcd] = 0;
        } 
        for (var ºx in this.ºfltd[ºsc]) {
            var ºi = this.ºfltd[ºsc][ºx];
            var ºcd = this.º_data[ºsc][ºi][2];
            this.º_sts[ºsc][ºcd] += 1;
        }
        var ºtotal = this.ºfltd[ºsc].length;
        if (ºtotal == 0) {ºtotal = 1}
        for (var ºcd in this.º_sts[ºsc]) {
            this.ºcomp.ºcontainer[ºsc].find(`span[cd="${ºcd}"].stats`).html(this.º_sts[ºsc][ºcd]);
        }
        var ºwsts = {};
        for (var ºcd in this.º_sts[ºsc]) {
            var ºpr = 100 * this.º_sts[ºsc][ºcd] / ºtotal;
            ºwsts[ºcd] = (ºtotal < 10)?ºpr:(10*Math.sqrt(ºpr));
        }
        this.º_map[ºsc].series.markers[0].setValues(ºwsts);
        this.ºcomp.ºcontainer[ºsc].find(`span[cd="_all"].stats`).html(this.ºfltd[ºsc].length);
    },
    ºv: function(ºsc, ºi) {
        var ºcd =  this.º_data[ºsc][ºi][2];
        var ºmstate = this.º_from_str(this.ºmstate[ºsc]);
        return (ºcd in ºmstate) && ºmstate[ºcd];
    },
    ºshow: function(ºsc) {
        return (this.ºcomp.ºstate.ºgetstate(`list`) == ºsc);
    },
    ºweld: function(ºsc) {
        this.º_html(ºsc);
    },
    ºwire: function(ºsc) {
        this.º_dressup(ºsc);
    },
    ºwire_flt: function(ºsc) {
        this.º_data[ºsc] = this.ºcomp.ºpage.ºgetcomp(`list`).ºdata[ºsc];
    },
    ºwork: function(ºsc) {},
    ºwork_flt: function(ºsc) {
        this.ºmstate[ºsc] = this.ºcomp.ºstate.ºgetstate(`m_${ºsc}`);
        this.º_set_flt(ºsc, this.º_from_str(this.ºmstate[ºsc]));
    },
};
