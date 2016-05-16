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
    this.ºrstate = {};
    this.º_data = {};
    this.º_relvals = {};
    this.º_allc = {};
    this.º_sts = {};
    this.ºnot_mapped = {
        CY: true,
    };
};

ºEUmap.prototype = {
    º_html: function(ºsc) {
        var ºcols = 2;
        var ºh = `<div><p class="•dctrl">By country</p>`;
        ºh += `<div id="map-europe_${ºsc}"></div>
<p class="•all"><span rv="_all" class="•stats"></span> <a rv="_all" href="#" class="•control_med">all DARIAH</a></p>
<table class="•value_list" id="list-europe_${ºsc}"><tr>`;
        for (var ºi in this.ºrvalues) {
            if ((ºi % ºcols == 0) && (ºi > 0) && (ºi < this.ºrvalues.length)) {
                ºh += `</tr><tr>`;
            }
            var ºrv = this.ºrvalues[ºi];
            var ºcn = this.ºrvalue[ºrv];
            ºh += `<td><span rv="${ºrv}" class="•stats"></span></td><td><a rv="${ºrv}" href="#" class="•control_small">${ºcn}</a></td>`;
        }
        ºh += `</tr></table></div>`;
        this.ºcomp.ºcontainer[ºsc].html(ºh);
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
            markersSelectable: true,
            regionsSelectableOne: false,
            markersSelectableOne: false,
            markerStyle: {
                initial: {
                    fill: `#008800`,
                    'fill-opacity': 0.2,
                    stroke: `none`,
                    'stroke-width': 0,
                    'stroke-opacity': 0.2,
                    'r': 1,
                },
                hover: {
                    cursor: `pointer`,
                    stroke: `#ffff44`,
                    'stroke-width': 1,
                    'stroke-opacity': 1,
                },
                selected: {
                    fill: `#008800`,
                    'fill-opacity': 1,
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
                    cursor: `pointer`,
                    stroke: `#ffff44`,
                    'stroke-width': 3,
                    'stroke-opacity': 1,
                },
                selected: {
                    fill: `#dd8844`,
                    'fill-opacity': 1,
                },
                selectedHover: {
                },
            },
            markers: this.ºmarker,
            series: {
                markers: [{
                    values: {},
                        scale: [0,20],
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
            onRegionTipShow: function(ºe, ºel, ºrv) {
                ºel.html(`${ºrv}: ${(ºrv in ºthat.º_sts[ºsc])?ºthat.º_sts[ºsc][ºrv]:'not in DARIAH'}`);
            },
            onMarkerTipShow: function(ºe, ºel, ºrv) {
                ºel.html(`${ºrv}: ${(ºrv in ºthat.º_sts[ºsc])?ºthat.º_sts[ºsc][ºrv]:'not in DARIAH'}`);
            },
            onRegionClick: function(ºe, ºc) {
                if (!(ºc in ºthat.ºrvalue)) {
                    ºe.preventDefault();
                }
            },
            onMarkerClick: function(ºe, ºc) {
                if (!(ºc in ºthat.ºrvalue)) {
                    ºe.preventDefault();
                }
            },
            onRegionSelected: function(ºe, ºc, ºi, ºsel) {
                if (ºthat.ºchangeState) {
                    ºthat.ºcomp.ºstate.ºsetstate(`m_${ºsc}`, ºthat.º_a_to_str(ºsel));
                }
            },
            onMarkerSelected: function(ºe, ºc, ºi, ºsel) {
                if (ºthat.ºchangeState) {
                    ºthat.ºcomp.ºstate.ºsetstate(`m_${ºsc}`, ºthat.º_a_to_str(ºsel));
                }
            },
        });
        this.º_map[ºsc] = this.º_mapc[ºsc].vectorMap('get', 'mapObject');
        this.º_map[ºsc].setFocus({regions: [`GB`, `GR`]});
        this.º_list[ºsc].find(`.•control_small`).click(function(ºe) {ºe.preventDefault();
            var ºrv = $(this).attr(`rv`);
            var ºsel = ºthat.º_from_str(ºthat.ºcomp.ºstate.ºgetstate(`m_${ºsc}`));
            ºsel[ºrv] = (ºrv in ºsel)?!ºsel[ºrv]:true;
            ºthat.ºcomp.ºstate.ºsetstate(`m_${ºsc}`, ºthat.º_to_str(ºsel));
        });
        this.º_allc[ºsc] = this.ºcomp.ºcontainer[ºsc].find(`[rv="_all"]`);
        this.º_allc[ºsc].click(function(ºe) {ºe.preventDefault();
            var ºison = $(this).hasClass(`•ison`);
            if (ºison) {
                ºthat.ºcomp.ºstate.ºsetstate(`m_${ºsc}`, ºthat.º_to_str(ºthat.ºrvalues_off));
            }
            else {
                ºthat.ºcomp.ºstate.ºsetstate(`m_${ºsc}`, ºthat.º_to_str(ºthat.ºrvalues_on));
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
        this.º_map[ºsc].setSelectedMarkers(ºrgs);
        for (var ºcnm in ºsv) {
            ºrgs[ºcnm] = ºsv[ºcnm];
        }
        this.ºchangeState = true;
        var ºall_sel = true;
        for (var ºrv in this.ºrvalue) {
            var ºccell = this.º_list[ºsc].find(`[rv="${ºrv}"]`);
            if (ºrv in ºrgs && ºrgs[ºrv]) {
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
        for (var ºrv in this.ºrvalue) {
            if (!(ºrv in ºob)) {
                ºob[ºrv] = false;
            }
        }
        return ºob;
    },
    ºstats: function(ºsc) {
        var ºthat = this;
        this.º_sts[ºsc] = {};
        for (var ºrv in this.ºrvalue) {
            this.º_sts[ºsc][ºrv] = 0;
        } 
        for (var ºx in this.ºfltd[ºsc]) {
            var ºi = this.ºfltd[ºsc][ºx];
            var ºrvs = this.º_data[ºsc][ºi][2];
            for (var ºrv in ºrvs) {
                this.º_sts[ºsc][ºrv] += 1;
            }
        }
        var ºtotal = this.ºfltd[ºsc].length;
        if (ºtotal == 0) {ºtotal = 1}
        for (var ºrv in this.º_sts[ºsc]) {
            this.ºcomp.ºcontainer[ºsc].find(`span[rv="${ºrv}"].•stats`).html(this.º_sts[ºsc][ºrv]);
        }
        var ºwsts = {};
        for (var ºrv in this.º_sts[ºsc]) {
            var ºpr = 100 * this.º_sts[ºsc][ºrv] / ºtotal;
            ºwsts[ºrv] = (ºtotal < 10)?ºpr:(10*Math.sqrt(ºpr));
        }
        this.º_map[ºsc].series.markers[0].setValues(ºwsts);
        this.ºcomp.ºcontainer[ºsc].find(`span[rv="_all"].•stats`).html(this.ºfltd[ºsc].length);
    },
    ºv: function(ºsc, ºi) {
        var ºrvs =  this.º_data[ºsc][ºi][2];
        var ºrstate = this.º_from_str(this.ºrstate[ºsc]);
        if (Object.keys(ºrvs).length != 0) {
            for (var ºrv in ºrvs) {
                if ((ºrv in ºrstate) && ºrstate[ºrv]) {
                    return true;
                }
            }
        }
        return false;
    },
    ºshow: function(ºsc) {
        return (this.ºcomp.ºstate.ºgetstate(`list`) == ºsc);
    },
    ºweld: function(ºsc) {
    },
    ºwire: function(ºsc) {
    },
    ºwire_flt: function(ºsc) {
        this.º_listc = this.ºcomp.ºpage.ºgetcomp(`list`);
        this.º_data[ºsc] = this.º_listc.ºdata[ºsc];
        this.º_relvals[ºsc] = this.º_listc.ºrelvals[ºsc];
        this.ºrvalues = [];
        this.ºrvalue = {};
        this.ºmarker = {};
        this.ºrvalues_off = {};
        this.ºrvalues_on = {};
        this.ºsetvalues = {};
        for (var ºrv in this.º_relvals[ºsc].country) {
            var ºcprop = this.º_relvals[ºsc].country[ºrv];
            if (ºcprop[1]) {
                this.ºrvalues_off[ºrv] = false;
                this.ºrvalues_on[ºrv] = true;
                this.ºrvalues.push(ºrv);
                this.ºrvalue[ºrv] = ºcprop[0];
                if (ºcprop.length > 3) {
                    this.ºmarker[ºrv] = {latLng: [ºcprop[2], ºcprop[3]], ºname: ºcprop[0]};
                }
                this.ºsetvalues[ºrv] = 'ºindariah';
            }
            else {
                this.ºsetvalues[ºrv] = 'ºoutdariah';
            }
        }
        this.ºrvalues.sort();
        this.º_html(ºsc);
        this.º_dressup(ºsc);
    },
    ºwork: function(ºsc) {},
    ºwork_flt: function(ºsc) {
        this.ºrstate[ºsc] = this.ºcomp.ºstate.ºgetstate(`m_${ºsc}`);
        this.º_set_flt(ºsc, this.º_from_str(this.ºrstate[ºsc]));
    },
};
