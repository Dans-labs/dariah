/* INDIVIDUAL COMPONENT: ºEUmap
 * This manages a clickable map of the EU ºcountries
 * See http://jvectormap.com/documentation/javascript-api/jvm-map/
 */


function ºEUmap(ºcomp) {
    this.ºcomp = ºcomp;
    this.º_map = {};
    this.º_mapc = {};
    this.º_list = {};
    this.ºdistilled = {};
    this.ºrelated_state = {};
    this.º_allc = {};
    this.º_sts = {};
    this.ºrvalues = {};
    this.ºrvalue = {};
    this.ºrvalues_on = {};
    this.ºrvalues_off = {};
    this.ºmarker = {};
    this.ºsetvalues = {};
    this.ºnot_mapped = {
        CY: true,
    };
    this.ºall_category = {ºvalue: `-`, ºname: `-none`};
};

ºEUmap.prototype = {
    º_html: function(ºsc) {
        var ºcols = 2;
        var ºh = `<div><p class="•dctrl">By country</p>`;
        ºh += `<div id="map-europe_${ºsc}"></div>
<p class="•all"><span rv="_all" class="•stats"></span> <a rv="_all" href="#" class="•control_med">all DARIAH</a></p>
<table class="•value_list" id="list-europe_${ºsc}"><tr>`;
        this.ºrvalues[ºsc].forEach(function(ºrel_val, ºi, ºar) {
            if ((ºi % ºcols == 0) && (ºi > 0) && (ºi < ºar.length)) {
                ºh += `</tr><tr>`;
            }
            var ºcountry_name = this.ºrvalue[ºsc][ºrel_val];
            ºh += `<td><span rv="${ºrel_val}" class="•stats"></span></td><td><a rv="${ºrel_val}" href="#" class="•control_small">${ºcountry_name}</a></td>`;
        }, this);
        ºh += `</tr></table></div>`;
        this.ºcomp.ºcontainer[ºsc].html(ºh);
    },
    º_dressup: function(ºsc) {
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
            markers: this.ºmarker[ºsc],
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
                        values: this.ºsetvalues[ºsc],
                }],
            },
            onRegionTipShow: function(ºe, ºel, ºrel_val) {
                ºel.html(`${ºrel_val}: ${(ºrel_val in this.º_sts[ºsc])?this.º_sts[ºsc][ºrel_val]:'not in DARIAH'}`);
            }.bind(this),
            onMarkerTipShow: function(ºe, ºel, ºrel_val) {
                ºel.html(`${ºrel_val}: ${(ºrel_val in this.º_sts[ºsc])?this.º_sts[ºsc][ºrel_val]:'not in DARIAH'}`);
            }.bind(this),
            onRegionClick: function(ºe, ºc) {
                if (!(ºc in this.ºrvalue[ºsc])) {
                    ºe.preventDefault();
                }
            }.bind(this),
            onMarkerClick: function(ºe, ºc) {
                if (!(ºc in this.ºrvalue[ºsc])) {
                    ºe.preventDefault();
                }
            }.bind(this),
            onRegionSelected: function(ºe, ºc, ºi, ºsel) {
                if (this.ºchangeState) {
                    this.ºcomp.ºstate.ºsetstate(`m_${ºsc}`, this.º_a_to_str(ºsel));
                }
            }.bind(this),
            onMarkerSelected: function(ºe, ºc, ºi, ºsel) {
                if (this.ºchangeState) {
                    this.ºcomp.ºstate.ºsetstate(`m_${ºsc}`, this.º_a_to_str(ºsel));
                }
            }.bind(this),
        });
        this.º_map[ºsc] = this.º_mapc[ºsc].vectorMap('get', 'mapObject');
        this.º_map[ºsc].setFocus({regions: [`GB`, `GR`]});
        var ºthat = this;
        this.º_list[ºsc].find(`.•control_small`).click(function(ºe) {ºe.preventDefault();
            var ºrel_val = $(this).attr(`rv`);
            var ºsel = ºthat.º_from_str(ºsc, ºthat.ºcomp.ºstate.ºgetstate(`m_${ºsc}`));
            ºsel[ºrel_val] = (ºrel_val in ºsel)?!ºsel[ºrel_val]:true;
            ºthat.ºcomp.ºstate.ºsetstate(`m_${ºsc}`, ºthat.º_to_str(ºsel));
        });
        this.º_allc[ºsc] = this.ºcomp.ºcontainer[ºsc].find(`[rv="_all"]`);
        var ºthat = this;
        this.º_allc[ºsc].click(function(ºe) {ºe.preventDefault();
            var ºison = $(this).hasClass(`•ison`);
            if (ºison) {
                ºthat.ºcomp.ºstate.ºsetstate(`m_${ºsc}`, ºthat.º_to_str(ºthat.ºrvalues_off[ºsc]));
            }
            else {
                ºthat.ºcomp.ºstate.ºsetstate(`m_${ºsc}`, ºthat.º_to_str(ºthat.ºrvalues_on[ºsc]));
            }
        });
    },
    º_set_flt: function(ºsc, ºregions) {
        this.ºchangeState = false;
        /* Cyprus is not on the map, we do ºshow Cyprus in the list but not on the map.
         * Same for -, the key that denotes ALL countries
         */
        var ºmap_regions = {};
        for (var ºregion in ºregions) {
            if (!(ºregion in this.ºnot_mapped) && ºregion != this.ºall_category.ºvalue) {
                ºmap_regions[ºregion] = ºregions[ºregion];
            }
        }
        this.º_map[ºsc].setSelectedRegions(ºmap_regions);
        this.º_map[ºsc].setSelectedMarkers(ºmap_regions);
        this.ºchangeState = true;
        var ºall_sel = true;
        for (var ºrel_val in this.ºrvalue[ºsc]) {
            var ºccell = this.º_list[ºsc].find(`[rv="${ºrel_val}"]`);
            if (ºrel_val in ºregions && ºregions[ºrel_val]) {
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
    º_from_str: function(ºsc, ºst) {
        var ºob = {};
        if (ºst !== null && ºst != undefined && ºst != '') {
            var ºar = ºst.split(',');
            ºar.forEach(function(ºv) {
                ºob[ºv] = true;
            });
        }
        for (var ºrel_val in this.ºrvalue[ºsc]) {
            if (!(ºrel_val in ºob)) {
                ºob[ºrel_val] = false;
            }
        }
        return ºob;
    },
    ºstats: function(ºsc) {
        this.º_sts[ºsc] = {};
        for (var ºrel_val in this.ºrvalue[ºsc]) {
            this.º_sts[ºsc][ºrel_val] = 0;
        } 
        var ºrelated_data = this.ºcomp.ºdata[ºsc];
        for (var ºx in this.ºdistilled[ºsc]) {
            var ºi = this.ºdistilled[ºsc][ºx];
            var ºhas_rv = false;
            for (var ºrel_val in ºrelated_data[ºi]) {
                this.º_sts[ºsc][ºrel_val] += 1;
                ºhas_rv = true;
            }
            if (!ºhas_rv) {
                this.º_sts[ºsc][this.ºall_category.ºvalue] += 1;
            }
        }
        for (var ºrel_val in this.º_sts[ºsc]) {
            this.ºcomp.ºcontainer[ºsc].find(`span[rv="${ºrel_val}"].•stats`).html(this.º_sts[ºsc][ºrel_val]);
        }
        var ºtotal = this.ºdistilled[ºsc].length;
        if (ºtotal == 0) {ºtotal = 1}
        var ºwsts = {};
        for (var ºrel_val in this.º_sts[ºsc]) {
            if (ºrel_val != this.ºall_category.ºvalue) {
                var ºpr = 100 * this.º_sts[ºsc][ºrel_val] / ºtotal;
                ºwsts[ºrel_val] = (ºtotal < 10)?ºpr:(10*Math.sqrt(ºpr));
            }
        }
        this.º_map[ºsc].series.markers[0].setValues(ºwsts);
        this.ºcomp.ºcontainer[ºsc].find(`span[rv="_all"].•stats`).html(this.ºdistilled[ºsc].length);
    },
    ºv: function(ºsc, ºi) {
        var ºrelated_data =  this.ºcomp.ºdata[ºsc];
        var ºrelated_state = this.º_from_str(ºsc, this.ºrelated_state[ºsc]);
        if ((ºi in ºrelated_data) && (Object.keys(ºrelated_data[ºi]).length != 0)) {
            for (var ºrel_val in ºrelated_data[ºi]) {
                if ((ºrel_val in ºrelated_state) && ºrelated_state[ºrel_val]) {
                    return true;
                }
            }
        }
        else {
            if ((this.ºall_category.ºvalue in ºrelated_state) && (ºrelated_state[this.ºall_category.ºvalue])) {
                return true;
            }
        }
        return false;
    },
    ºshow: function(ºsc) {
        return (this.ºcomp.ºstate.ºgetstate(`list`) == ºsc);
    },
    ºweld: function(ºsc) {
        this.ºrvalues[ºsc] = [];
        this.ºrvalue[ºsc] = {};
        this.ºrvalues_off[ºsc] = {};
        this.ºrvalues_on[ºsc] = {};
        var ºrelvals = this.ºcomp.ºrelvals[ºsc];
        this.ºmarker[ºsc] = {};
        this.ºsetvalues[ºsc] = {};
        for (var ºi in ºrelvals) {
            var ºrel_val = ºrelvals[ºi];
            if (ºrel_val[1]) {
                this.ºrvalues_off[ºsc][ºi] = false;
                this.ºrvalues_on[ºsc][ºi] = true;
                this.ºrvalues[ºsc].push(ºi);
                this.ºrvalue[ºsc][ºi] = ºrel_val[0];
                if (ºrel_val.length > 3) {
                    this.ºmarker[ºsc][ºi] = {latLng: [ºrel_val[2], ºrel_val[3]], ºname: ºrel_val[0]};
                }
                this.ºsetvalues[ºsc][ºi] = 'ºindariah';
            }
            else {
                this.ºsetvalues[ºsc][ºi] = 'ºoutdariah';
            }
        }
        this.ºrvalues[ºsc].push(this.ºall_category.ºvalue);
        this.ºrvalue[ºsc][this.ºall_category.ºvalue] = this.ºall_category.ºname;
        this.ºrvalues_off[ºsc][this.ºall_category.ºvalue] = false;
        this.ºrvalues_on[ºsc][this.ºall_category.ºvalue] = true;
        this.ºrvalues[ºsc].sort();
        this.º_html(ºsc);
    },
    ºwire: function(ºsc) {
        if (!this.ºfacet) {
            this.ºfacet = this.ºcomp.ºpage.ºget_component(`ºfacet`).ºdelg;
        }
        this.º_dressup(ºsc);
    },
    ºwork: function(ºsc) {
        this.ºrelated_state[ºsc] = this.ºcomp.ºstate.ºgetstate(`m_${ºsc}`);
        this.º_set_flt(ºsc, this.º_from_str(ºsc, this.ºrelated_state[ºsc]));
    },
};
