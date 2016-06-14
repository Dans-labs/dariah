/* INDIVIDUAL COMPONENT: EUmap
 * This manages a clickable map of the EU countries
 * See http://jvectormap.com/documentation/javascript-api/jvm-map/
 */

var g = require('./generic.js');
var Relative = require('./relative.js');

function EUmap(component) {
    Relative.call(this, component, `country`);
    this._map_object = {};
    this._map_container = {};
    this._marker = {};
    this._setvalues = {};
    this._not_mapped = {
        '-': true,
        CY: true,
        KS: true,
        TR: true,
        MC: true,
        GE: true,
    };
};

EUmap.prototype = Object.create(Relative.prototype);
EUmap.prototype.constructor = EUmap;
EUmap.prototype._preHtml = function(vr) {
    return `<div id="map-europe_${vr}" class="position"><p class="zoom"><a class="fa fa-arrows" href="#" title="zoom to fit all countries"/></p></div>`;
};
EUmap.prototype._myDressup = function(vr) {
    var that = this;
    var cc = this.component.container[vr];
    this._map_container[vr] = cc.find(`#map-europe_${vr}`);
    var height = this._map_container[vr].width()*0.6;
    this._map_container[vr].width(`100%`);
    this._map_container[vr].height(height);
    this._map_container[vr].vectorMap({
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
        markers: this._marker[vr],
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
                        'outdariah': `#ffffff`,
                        'indariah': `#ffddbb`,
                    },
                    attribute: `fill`,
                    values: this._setvalues[vr],
            }],
        },
        onRegionTipShow: function(e, el, related_value) {
            el.html(`${related_value}: ${(related_value in this._statistics[vr])?this._statistics[vr][related_value]:'not in DARIAH'}`);
        }.bind(this),
        onMarkerTipShow: function(e, el, related_value) {
            el.html(`${related_value}: ${(related_value in this._statistics[vr])?this._statistics[vr][related_value]:'not in DARIAH'}`);
        }.bind(this),
        onRegionClick: function(e, related_value) {
            if (!(related_value in this._related_values_index[vr])) {
                e.preventDefault();
            }
        }.bind(this),
        onMarkerClick: function(e, related_value) {
            if (!(related_value in this._related_values_index[vr])) {
                e.preventDefault();
            }
        }.bind(this),
        onRegionSelected: function(e, related_value, i, selected) {
            if (this.change_state) {
                this.component.state.setState(`rel_${this._type}_${vr}`, g.a_to_str(selected)+this._unmapped_selected(vr));
            }
        }.bind(this),
        onMarkerSelected: function(e, related_value, i, selected) {
            if (this.change_state) {
                this.component.state.setState(`rel_${this._type}_${vr}`, g.a_to_str(selected)+this._unmapped_selected(vr));
            }
        }.bind(this),
    });
    var zoom_p = cc.find(`p.zoom`);
    zoom_p.css(`top`, `${height-20}px`);
    zoom_p.css(`left`, `10px`);
    var zoom_control = cc.find(`p.zoom a`);
    zoom_control.click(function(e) {e.preventDefault();
        that._map_object[vr].setFocus({regions: [`GB`, `GR`]});
    });
    this._map_object[vr] = this._map_container[vr].vectorMap('get', 'mapObject');
    this._map_object[vr].setFocus({regions: [`GB`, `GR`]});
};
EUmap.prototype._unmapped_selected = function(vr) {
    var result = [];
    var this_state = this._from_str(vr, this.component.state.getState(`rel_${this._type}_${vr}`));
    var empty = true;
    for (var related_value in this._not_mapped) {
        if (related_value in this_state && this_state[related_value]) {
            result.push(related_value);
            empty = false;
        }
    }
    return empty?``:(`,`+result.join(','));
};
EUmap.prototype._mySetFacet = function(vr, related_values) {
    this.change_state = false;
    /* some countries are not on the map, we do show those countries in the list but not on the map.
     * Same for -, the key that denotes ALL countries
     */
    var map_regions = {};
    for (var related_value in related_values) {
        if (!(related_value in this._not_mapped) && related_value != this._no_values.value) {
            map_regions[related_value] = related_values[related_value];
        }
    }
    this._map_object[vr].setSelectedRegions(map_regions);
    this._map_object[vr].setSelectedMarkers(map_regions);
    this.change_state = true;
};
EUmap.prototype._myStats = function(vr) {
    var total = this.distilled[vr].length;
    if (total == 0) {total = 1}
    var weighted_statistics = {};
    for (var related_value in this._statistics[vr]) {
        if (related_value != this._no_values.value) {
            var pr = 100 * this._statistics[vr][related_value] / total;
            weighted_statistics[related_value] = (total < 10)?pr:(10*Math.sqrt(pr));
        }
    }
    this._map_object[vr].series.markers[0].setValues(weighted_statistics);
};
EUmap.prototype._plainWeld = function(vr) {};
EUmap.prototype._myWeld = function(vr) {
    this._marker[vr] = {};
    this._setvalues[vr] = {};
    var related_values = this.component.related_values[vr];
    for (var i in related_values) {
        var related_value = related_values[i];
        if (related_value[1]) {
            this._related_values_off[vr][i] = false;
            this._related_values_on[vr][i] = true;
            this._related_values_list[vr].push(i);
            this._related_values_index[vr][i] = related_value[0];
            if (related_value.length > 3) {
                this._marker[vr][i] = {latLng: [related_value[2], related_value[3]], name: related_value[0]};
            }
            this._setvalues[vr][i] = 'indariah';
        }
        else {
            this._setvalues[vr][i] = 'outdariah';
        }
    }
    this._related_values_list[vr].sort(function(a,b) {
        return (related_values[a] < related_values[b])?-1:(related_values[a][0] > related_values[b][0])?1:0; 
    });
};

module.exports = EUmap;
