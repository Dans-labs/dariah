/* INDIVIDUAL COMPONENT: ºEUmap
 * This manages a clickable map of the EU ºcountries
 * See http://jvectormap.com/documentation/javascript-api/jvm-map/
 */


function ºEUmap(ºcomponent) {
    this.ºcomponent = ºcomponent;
    this.ºdistilled = {};
    this.º_list = {};
    this.º_related_state = {};
    this.º_all_values_control = {};
    this.º_statistics = {};
    this.º_related_values_list = {};
    this.º_related_values_index = {};
    this.º_related_values_on = {};
    this.º_related_values_off = {};
    this.º_no_values = {ºvalue: `-`, ºname: `-none`};
    this.º_type = `country`;

    this.º_map_object = {};
    this.º_map_container = {};
    this.º_marker = {};
    this.º_setvalues = {};
    this.º_not_mapped = {
        CY: true,
    };
};

ºEUmap.prototype = {
    º_html: function(ºsc) {
        var ºcols = 2;
        var ºtype_sg = this.ºcomponent.ºstate.ºshowState(`ºlist`, this.º_type, `ºsg`);
        var ºtype_pl = this.ºcomponent.ºstate.ºshowState(`ºlist`, this.º_type, `ºpl`);
        var ºh = `<div><p class="•dctrl">By ${ºtype_sg}</p>`;
        ºh += `<div id="map-europe_${ºsc}"></div>`;
        ºh += `<p class="•all"><span rv="_all" class="•stats"></span> <a rv="_all" href="#" class="•control_med">all ${ºtype_pl}</a></p>
<table class="•value_list" id="list-europe_${ºsc}"><tr>`;
        this.º_related_values_list[ºsc].forEach(function(ºrelated_value, ºi, ºar) {
            if ((ºi % ºcols == 0) && (ºi > 0) && (ºi < ºar.length)) {
                ºh += `</tr><tr>`;
            }
            var ºcountry_name = this.º_related_values_index[ºsc][ºrelated_value];
            ºh += `<td><span rv="${ºrelated_value}" class="•stats"></span></td><td><a rv="${ºrelated_value}" href="#" class="•control_small">${ºcountry_name}</a></td>`;
        }, this);
        ºh += `</tr></table></div>`;
        this.ºcomponent.ºcontainer[ºsc].html(ºh);
    },
    º_dressup: function(ºsc) {
        var ºcc = this.ºcomponent.ºcontainer[ºsc];
        this.º_list[ºsc] = ºcc.find(`#list-europe_${ºsc}`);
        this.º_map_container[ºsc] = ºcc.find(`#map-europe_${ºsc}`);
        this.º_map_container[ºsc].width(`100%`);
        this.º_map_container[ºsc].height(this.º_map_container[ºsc].width()*0.6);
        this.º_map_container[ºsc].vectorMap({
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
            markers: this.º_marker[ºsc],
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
                        values: this.º_setvalues[ºsc],
                }],
            },
            onRegionTipShow: function(ºe, ºel, ºrelated_value) {
                ºel.html(`${ºrelated_value}: ${(ºrelated_value in this.º_statistics[ºsc])?this.º_statistics[ºsc][ºrelated_value]:'not in DARIAH'}`);
            }.bind(this),
            onMarkerTipShow: function(ºe, ºel, ºrelated_value) {
                ºel.html(`${ºrelated_value}: ${(ºrelated_value in this.º_statistics[ºsc])?this.º_statistics[ºsc][ºrelated_value]:'not in DARIAH'}`);
            }.bind(this),
            onRegionClick: function(ºe, ºrelated_value) {
                if (!(ºrelated_value in this.º_related_values_index[ºsc])) {
                    ºe.preventDefault();
                }
            }.bind(this),
            onMarkerClick: function(ºe, ºrelated_value) {
                if (!(ºrelated_value in this.º_related_values_index[ºsc])) {
                    ºe.preventDefault();
                }
            }.bind(this),
            onRegionSelected: function(ºe, ºrelated_value, ºi, ºselected) {
                if (this.ºchange_state) {
                    this.ºcomponent.ºstate.ºsetState(`map_${ºsc}`, this.º_a_to_str(ºselected));
                }
            }.bind(this),
            onMarkerSelected: function(ºe, ºrelated_value, ºi, ºselected) {
                if (this.ºchange_state) {
                    this.ºcomponent.ºstate.ºsetState(`map_${ºsc}`, this.º_a_to_str(ºselected));
                }
            }.bind(this),
        });
        this.º_map_object[ºsc] = this.º_map_container[ºsc].vectorMap('get', 'mapObject');
        this.º_map_object[ºsc].setFocus({regions: [`GB`, `GR`]});
        var ºthat = this;
        this.º_list[ºsc].find(`.•control_small`).click(function(ºe) {ºe.preventDefault();
            var ºrelated_value = $(this).attr(`rv`);
            var ºselected = ºthat.º_from_str(ºsc, ºthat.ºcomponent.ºstate.ºgetState(`map_${ºsc}`));
            ºselected[ºrelated_value] = (ºrelated_value in ºselected)?!ºselected[ºrelated_value]:true;
            ºthat.ºcomponent.ºstate.ºsetState(`map_${ºsc}`, ºthat.º_to_str(ºselected));
        });
        this.º_all_values_control[ºsc] = this.ºcomponent.ºcontainer[ºsc].find(`[rv="_all"]`);
        this.º_all_values_control[ºsc].click(function(ºe) {ºe.preventDefault();
            var ºison = $(this).hasClass(`•ison`);
            if (ºison) {
                ºthat.ºcomponent.ºstate.ºsetState(`map_${ºsc}`, ºthat.º_to_str(ºthat.º_related_values_off[ºsc]));
            }
            else {
                ºthat.ºcomponent.ºstate.ºsetState(`map_${ºsc}`, ºthat.º_to_str(ºthat.º_related_values_on[ºsc]));
            }
        });
    },
    º_setFacet: function(ºsc, ºregions) {
        this.ºchange_state = false;
        /* Cyprus is not on the map, we do ºshow Cyprus in the list but not on the map.
         * Same for -, the key that denotes ALL countries
         */
        var ºmap_regions = {};
        for (var ºregion in ºregions) {
            if (!(ºregion in this.º_not_mapped) && ºregion != this.º_no_values.ºvalue) {
                ºmap_regions[ºregion] = ºregions[ºregion];
            }
        }
        this.º_map_object[ºsc].setSelectedRegions(ºmap_regions);
        this.º_map_object[ºsc].setSelectedMarkers(ºmap_regions);
        this.ºchange_state = true;
        var ºall_selected = true;
        for (var ºrelated_value in this.º_related_values_index[ºsc]) {
            var ºfacet_cell = this.º_list[ºsc].find(`[rv="${ºrelated_value}"]`);
            if (ºrelated_value in ºregions && ºregions[ºrelated_value]) {
                ºfacet_cell.addClass(`•ison`);
            }
            else {
                ºfacet_cell.removeClass(`•ison`);
                ºall_selected = false;
            }
        }
        if (ºall_selected) {
            this.º_all_values_control[ºsc].addClass(`•ison`);
        }
        else {
            this.º_all_values_control[ºsc].removeClass(`•ison`);
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
        for (var ºrelated_value in this.º_related_values_index[ºsc]) {
            if (!(ºrelated_value in ºob)) {
                ºob[ºrelated_value] = false;
            }
        }
        return ºob;
    },
    ºstats: function(ºsc) {
        this.º_statistics[ºsc] = {};
        for (var ºrelated_value in this.º_related_values_index[ºsc]) {
            this.º_statistics[ºsc][ºrelated_value] = 0;
        } 
        var ºrelated_data = this.ºcomponent.ºdata[ºsc];
        for (var ºx in this.ºdistilled[ºsc]) {
            var ºi = this.ºdistilled[ºsc][ºx];
            var ºhas_related_value = false;
            for (var ºrelated_value in ºrelated_data[ºi]) {
                this.º_statistics[ºsc][ºrelated_value] += 1;
                ºhas_related_value = true;
            }
            if (!ºhas_related_value) {
                this.º_statistics[ºsc][this.º_no_values.ºvalue] += 1;
            }
        }
        for (var ºrelated_value in this.º_statistics[ºsc]) {
            this.ºcomponent.ºcontainer[ºsc].find(`span[rv="${ºrelated_value}"].•stats`).html(this.º_statistics[ºsc][ºrelated_value]);
        }
        var ºtotal = this.ºdistilled[ºsc].length;
        if (ºtotal == 0) {ºtotal = 1}
        var ºweighted_statistics = {};
        for (var ºrelated_value in this.º_statistics[ºsc]) {
            if (ºrelated_value != this.º_no_values.ºvalue) {
                var ºpr = 100 * this.º_statistics[ºsc][ºrelated_value] / ºtotal;
                ºweighted_statistics[ºrelated_value] = (ºtotal < 10)?ºpr:(10*Math.sqrt(ºpr));
            }
        }
        this.º_map_object[ºsc].series.markers[0].setValues(ºweighted_statistics);
        this.ºcomponent.ºcontainer[ºsc].find(`span[rv="_all"].•stats`).html(this.ºdistilled[ºsc].length);
    },
    ºv: function(ºsc, ºi) {
        var ºrelated_data =  this.ºcomponent.ºdata[ºsc];
        var ºrelated_state = this.º_from_str(ºsc, this.º_related_state[ºsc]);
        if ((ºi in ºrelated_data) && (Object.keys(ºrelated_data[ºi]).length != 0)) {
            for (var ºrelated_value in ºrelated_data[ºi]) {
                if ((ºrelated_value in ºrelated_state) && ºrelated_state[ºrelated_value]) {
                    return true;
                }
            }
        }
        else {
            if ((this.º_no_values.ºvalue in ºrelated_state) && (ºrelated_state[this.º_no_values.ºvalue])) {
                return true;
            }
        }
        return false;
    },
    ºshow: function(ºsc) {
        return (this.ºcomponent.ºstate.ºgetState(`list`) == ºsc);
    },
    ºweld: function(ºsc) {
        this.º_related_values_list[ºsc] = [];
        this.º_related_values_index[ºsc] = {};
        this.º_related_values_off[ºsc] = {};
        this.º_related_values_on[ºsc] = {};
        var ºrelated_values = this.ºcomponent.ºrelated_values[ºsc];
        this.º_marker[ºsc] = {};
        this.º_setvalues[ºsc] = {};
        for (var ºi in ºrelated_values) {
            var ºrelated_value = ºrelated_values[ºi];
            if (ºrelated_value[1]) {
                this.º_related_values_off[ºsc][ºi] = false;
                this.º_related_values_on[ºsc][ºi] = true;
                this.º_related_values_list[ºsc].push(ºi);
                this.º_related_values_index[ºsc][ºi] = ºrelated_value[0];
                if (ºrelated_value.length > 3) {
                    this.º_marker[ºsc][ºi] = {latLng: [ºrelated_value[2], ºrelated_value[3]], ºname: ºrelated_value[0]};
                }
                this.º_setvalues[ºsc][ºi] = 'ºindariah';
            }
            else {
                this.º_setvalues[ºsc][ºi] = 'ºoutdariah';
            }
        }
        this.º_related_values_list[ºsc].push(this.º_no_values.ºvalue);
        this.º_related_values_index[ºsc][this.º_no_values.ºvalue] = this.º_no_values.ºname;
        this.º_related_values_off[ºsc][this.º_no_values.ºvalue] = false;
        this.º_related_values_on[ºsc][this.º_no_values.ºvalue] = true;
        this.º_related_values_list[ºsc].sort();
        this.º_html(ºsc);
    },
    ºwire: function(ºsc) {
        this.º_dressup(ºsc);
    },
    ºwork: function(ºsc) {
        this.º_related_state[ºsc] = this.ºcomponent.ºstate.ºgetState(`map_${ºsc}`);
        this.º_setFacet(ºsc, this.º_from_str(ºsc, this.º_related_state[ºsc]));
    },
};
