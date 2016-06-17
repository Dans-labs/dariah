/* INDIVIDUAL COMPONENT: EUmap
 * This manages a clickable map of the EU countries
 * See http://jvectormap.com/documentation/javascript-api/jvm-map/
 */

let g = require('./generic.js');
let Relative = require('./relative.js');

function EUmap(component) {
    Relative.call(this, component, 'country');
    this._map_object = new Map();
    this._map_container = new Map();
    this._marker = new Map();
    this._setvalues = new Map();
    this._not_mapped = new Set([
        '-',
        'CY',
        'KS',
        'TR',
        'MC',
        'GE',
    ]);
};

EUmap.prototype = Object.create(Relative.prototype);
EUmap.prototype.constructor = EUmap;
EUmap.prototype._preHtml = function(vr) {
    return `<div id="map-europe_${vr}" class="position"><p class="zoom"><a class="fa fa-arrows" href="#" title="zoom to fit all countries"/></p></div>`;
};
EUmap.prototype._myDressup = function(vr) {
    let that = this;
    let cc = this.component.container.get(vr);
    this._map_container.set(vr, cc.find(`#map-europe_${vr}`));
    let mapc = this._map_container.get(vr);
    let height = mapc.width()*0.6;
    mapc.width('100%');
    mapc.height(height);
    mapc.vectorMap({
        'map': 'europe_mill',
        backgroundColor: '#ccccff',
        regionsSelectable: true,
        markersSelectable: true,
        regionsSelectableOne: false,
        markersSelectableOne: false,
        markerStyle: {
            initial: {
                fill: '#008800',
                'fill-opacity': 0.2,
                stroke: 'none',
                'stroke-width': 0,
                'stroke-opacity': 0.2,
                'r': 1,
            },
            hover: {
                cursor: 'pointer',
                stroke: '#ffff44',
                'stroke-width': 1,
                'stroke-opacity': 1,
            },
            selected: {
                fill: '#008800',
                'fill-opacity': 1,
            },
            selectedHover: {
            },
        },
        regionStyle: {
            initial: {
                fill: '#bbbbbb',
                'fill-opacity': 1,
                stroke: 'none',
                'stroke-width': 0,
                'stroke-opacity': 1,
            },
            hover: {
                cursor: 'pointer',
                stroke: '#ffff44',
                'stroke-width': 3,
                'stroke-opacity': 1,
            },
            selected: {
                fill: '#dd8844',
                'fill-opacity': 1,
            },
            selectedHover: {
            },
        },
        markers: this._marker.get(vr),
        series: {
            markers: [{
                values: {},
                    scale: [0,20],
                    normalizeFunction: 'linear',
                    attribute: 'r',
                    min: 0,
                    max: 100,
            }],
            regions: [{
                    scale: {
                        'outdariah': '#ffffff',
                        'indariah': '#ffddbb',
                    },
                    attribute: 'fill',
                    values: this._setvalues.get(vr),
            }],
        },
        onRegionTipShow: function(e, el, related_value) {
            let rvs = this._statistics.get(vr);
            el.html(`${related_value}: ${rvs.has(related_value)?rvs.get(related_value):'not in DARIAH'}`);
        }.bind(this),
        onMarkerTipShow: function(e, el, related_value) {
            let rvs = this._statistics.get(vr);
            el.html(`${related_value}: ${rvs.has(related_value)?rvs.get(related_value):'not in DARIAH'}`);
        }.bind(this),
        onRegionClick: function(e, related_value) {
            if (!this._related_values_index.get(vr).has(related_value)) {
                e.preventDefault();
            }
        }.bind(this),
        onMarkerClick: function(e, related_value) {
            if (!this._related_values_index.get(vr).has(related_value)) {
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
    let zoom_p = cc.find('p.zoom');
    zoom_p.css('top', `${height-20}px`);
    zoom_p.css('left', '10px');
    let zoom_control = cc.find('p.zoom a');
    zoom_control.click(e => {e.preventDefault();
        this._map_object.get(vr).setFocus({regions: ['GB', 'GR']});
    });
    this._map_object.set(vr, mapc.vectorMap('get', 'mapObject'));
    this._map_object.get(vr).setFocus({regions: ['GB', 'GR']});
};
EUmap.prototype._unmapped_selected = function(vr) {
    let result = [];
    let this_state = g.from_str(vr, this.component.state.getState(`rel_${this._type}_${vr}`));
    let empty = true;
    for (let related_value of this._not_mapped) {
        if (this_state.has(related_value)) {
            result.push(related_value);
            empty = false;
        }
    }
    return empty?'':(','+result.join(','));
};
EUmap.prototype._mySetFacet = function(vr) {
    this.change_state = false;
    /* some countries are not on the map, we do show those countries in the list but not on the map.
     * Same for -, the key that denotes ALL countries
     */
    let map_regions = {};
    let map_markers = {};
    let related_values = this._related_state.get(vr);
    for (let [i, related_value] of this.component.related_values.get(vr)) {
        if (!(this._not_mapped.has(i)) && i != this._no_values.value) {
            map_regions[i] = related_values.has(i);
            if (related_value[1]) {
                map_markers[i] = related_values.has(i);
            }
        }
    }
    let mapo = this._map_object.get(vr);
    mapo.setSelectedRegions(map_regions);
    mapo.setSelectedMarkers(map_markers);
    this.change_state = true;
};
EUmap.prototype._myStats = function(vr) {
    let total = this.distilled.get(vr).length;
    if (total == 0) {total = 1}
    let weighted_statistics = {};
    let rvs = this._statistics.get(vr);
    for (let [related_value, stat] of rvs) {
        if (related_value != this._no_values.value) {
            let pr = 100 * stat / total;
            weighted_statistics[related_value] = (total < 10)?pr:(10*Math.sqrt(pr));
        }
    }
    this._map_object.get(vr).series.markers[0].setValues(weighted_statistics);
};
EUmap.prototype._plainWeld = function(vr) {};
EUmap.prototype._myWeld = function(vr) {
    this._marker.set(vr, {});
    this._setvalues.set(vr, {});
    let related_values = this.component.related_values.get(vr);
    let marker = this._marker.get(vr);
    let setv = this._setvalues.get(vr);
    for (let [i, related_value] of related_values) {
        if (related_value[1]) {
            this._related_values_all.get(vr).add(i);
            this._related_values_list.get(vr).push(i);
            this._related_values_index.get(vr).set(i, related_value[0]);
            marker[i] = {latLng: [related_value[2], related_value[3]], name: related_value[0]};
            setv[i] = 'indariah';
        }
        else {
            setv[i] = 'outdariah';
        }
    }
    this._related_values_list.get(vr).sort((a,b) => {
        return (related_values.get(a) < related_values.get(b))?-1:(related_values.get(a)[0] > related_values.get(b)[0])?1:0; 
    });
};

module.exports = EUmap;
