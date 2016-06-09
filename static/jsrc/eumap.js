/* INDIVIDUAL COMPONENT: ºEUmap
 * This manages a clickable map of the EU ºcountries
 * See http://jvectormap.com/documentation/javascript-api/jvm-map/
 */

function ºEUmap(ºcomponent) {
    ºRelative.call(this, ºcomponent, `country`);
    this.º_map_object = {};
    this.º_map_container = {};
    this.º_marker = {};
    this.º_setvalues = {};
    this.º_not_mapped = {
        '-': true,
        CY: true,
        KS: true,
        TR: true,
        MC: true,
        GE: true,
    };
};

ºEUmap.prototype = Object.create(ºRelative.prototype);
ºEUmap.prototype.constructor = ºEUmap;
ºEUmap.prototype.º_preHtml = function(ºvar) {
    return `<div id="map-europe_${ºvar}" class="•position"><p class="•zoom"><a class="fa fa-arrows" href="#" title="zoom to fit all countries"/></p></div>`;
};
ºEUmap.prototype.º_myDressup = function(ºvar) {
    var ºthat = this;
    var ºcc = this.ºcomponent.ºcontainer[ºvar];
    this.º_map_container[ºvar] = ºcc.find(`#map-europe_${ºvar}`);
    var ºheight = this.º_map_container[ºvar].width()*0.6;
    this.º_map_container[ºvar].width(`100%`);
    this.º_map_container[ºvar].height(ºheight);
    this.º_map_container[ºvar].vectorMap({
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
        markers: this.º_marker[ºvar],
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
                        'ºindariah': `#ffddbb`,
                    },
                    attribute: `fill`,
                    values: this.º_setvalues[ºvar],
            }],
        },
        onRegionTipShow: function(ºe, ºel, ºrelated_value) {
            ºel.html(`${ºrelated_value}: ${(ºrelated_value in this.º_statistics[ºvar])?this.º_statistics[ºvar][ºrelated_value]:'not in DARIAH'}`);
        }.bind(this),
        onMarkerTipShow: function(ºe, ºel, ºrelated_value) {
            ºel.html(`${ºrelated_value}: ${(ºrelated_value in this.º_statistics[ºvar])?this.º_statistics[ºvar][ºrelated_value]:'not in DARIAH'}`);
        }.bind(this),
        onRegionClick: function(ºe, ºrelated_value) {
            if (!(ºrelated_value in this.º_related_values_index[ºvar])) {
                ºe.preventDefault();
            }
        }.bind(this),
        onMarkerClick: function(ºe, ºrelated_value) {
            if (!(ºrelated_value in this.º_related_values_index[ºvar])) {
                ºe.preventDefault();
            }
        }.bind(this),
        onRegionSelected: function(ºe, ºrelated_value, ºi, ºselected) {
            if (this.ºchange_state) {
                this.ºcomponent.ºstate.ºsetState(`rel_${this.º_type}_${ºvar}`, º_a_to_str(ºselected)+this.º_unmapped_selected(ºvar));
            }
        }.bind(this),
        onMarkerSelected: function(ºe, ºrelated_value, ºi, ºselected) {
            if (this.ºchange_state) {
                this.ºcomponent.ºstate.ºsetState(`rel_${this.º_type}_${ºvar}`, º_a_to_str(ºselected)+this.º_unmapped_selected(ºvar));
            }
        }.bind(this),
    });
    var ºzoom_p = ºcc.find(`p.•zoom`);
    ºzoom_p.css(`top`, `${ºheight-20}px`);
    ºzoom_p.css(`left`, `10px`);
    var ºzoom_control = ºcc.find(`p.•zoom a`);
    ºzoom_control.click(function(ºe) {ºe.preventDefault();
        ºthat.º_map_object[ºvar].setFocus({regions: [`GB`, `GR`]});
    });
    this.º_map_object[ºvar] = this.º_map_container[ºvar].vectorMap('get', 'mapObject');
    this.º_map_object[ºvar].setFocus({regions: [`GB`, `GR`]});
};
ºEUmap.prototype.º_unmapped_selected = function(ºvar) {
    var ºresult = [];
    var ºthis_state = this.º_from_str(ºvar, this.ºcomponent.ºstate.ºgetState(`rel_${this.º_type}_${ºvar}`));
    var ºempty = true;
    for (var ºrelated_value in this.º_not_mapped) {
        if (ºrelated_value in ºthis_state && ºthis_state[ºrelated_value]) {
            ºresult.push(ºrelated_value);
            ºempty = false;
        }
    }
    return ºempty?``:(`,`+ºresult.join(','));
};
ºEUmap.prototype.º_mySetFacet = function(ºvar, ºrelated_values) {
    this.ºchange_state = false;
    /* some countries are not on the map, we do ºshow those countries in the list but not on the map.
     * Same for -, the key that denotes ALL countries
     */
    var ºmap_regions = {};
    for (var ºrelated_value in ºrelated_values) {
        if (!(ºrelated_value in this.º_not_mapped) && ºrelated_value != this.º_no_values.ºvalue) {
            ºmap_regions[ºrelated_value] = ºrelated_values[ºrelated_value];
        }
    }
    this.º_map_object[ºvar].setSelectedRegions(ºmap_regions);
    this.º_map_object[ºvar].setSelectedMarkers(ºmap_regions);
    this.ºchange_state = true;
};
ºEUmap.prototype.º_myStats = function(ºvar) {
    var ºtotal = this.ºdistilled[ºvar].length;
    if (ºtotal == 0) {ºtotal = 1}
    var ºweighted_statistics = {};
    for (var ºrelated_value in this.º_statistics[ºvar]) {
        if (ºrelated_value != this.º_no_values.ºvalue) {
            var ºpr = 100 * this.º_statistics[ºvar][ºrelated_value] / ºtotal;
            ºweighted_statistics[ºrelated_value] = (ºtotal < 10)?ºpr:(10*Math.sqrt(ºpr));
        }
    }
    this.º_map_object[ºvar].series.markers[0].setValues(ºweighted_statistics);
};
ºEUmap.prototype.º_plainWeld = function(ºvar) {};
ºEUmap.prototype.º_myWeld = function(ºvar) {
    this.º_marker[ºvar] = {};
    this.º_setvalues[ºvar] = {};
    var ºrelated_values = this.ºcomponent.ºrelated_values[ºvar];
    for (var ºi in ºrelated_values) {
        var ºrelated_value = ºrelated_values[ºi];
        if (ºrelated_value[1]) {
            this.º_related_values_off[ºvar][ºi] = false;
            this.º_related_values_on[ºvar][ºi] = true;
            this.º_related_values_list[ºvar].push(ºi);
            this.º_related_values_index[ºvar][ºi] = ºrelated_value[0];
            if (ºrelated_value.length > 3) {
                this.º_marker[ºvar][ºi] = {latLng: [ºrelated_value[2], ºrelated_value[3]], ºname: ºrelated_value[0]};
            }
            this.º_setvalues[ºvar][ºi] = 'ºindariah';
        }
        else {
            this.º_setvalues[ºvar][ºi] = 'ºoutdariah';
        }
    }
    this.º_related_values_list[ºvar].sort(function(ºa,ºb) {
        return (ºrelated_values[ºa] < ºrelated_values[ºb])?-1:(ºrelated_values[ºa][0] > ºrelated_values[ºb][0])?1:0; 
    });
};
