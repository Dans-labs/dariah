/* INDIVIDUAL COMPONENT: EUmap
 * This manages a clickable map of the EU countries
 * See http://jvectormap.com/documentation/javascript-api/jvm-map/
 */

import * as g from './generic.js';
import Relative from './relative';

/* private attributes as symbols */
const _map_object = Symbol();
const _map_container = Symbol();
const _marker = Symbol();
const _setvalues = Symbol();
const _not_mapped = Symbol();

export default class extends Relative {
    constructor(component) {
        super(component, 'country');
        this[_map_object] = new Map();
        this[_map_container] = new Map();
        this[_marker] = new Map();
        this[_setvalues] = new Map();
        this[_not_mapped] = new Set([
            '-',
            'CY',
            'KS',
            'TR',
            'MC',
            'GE',
        ]);
    }
    _preHtml(vr) {
        return `<div id="map-europe_${vr}" class="position">
    <p class="zoom"><a class="fa fa-arrows" href="#" title="zoom to fit all countries"/></p>
</div>`;
    }
    _myDressup(vr) {
        const that = this;
        const cc = this.component.container.get(vr);
        this[_map_container].set(vr, cc.find(`#map-europe_${vr}`));
        const mapc = this[_map_container].get(vr);
        const height = mapc.width()*0.6;
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
            markers: this[_marker].get(vr),
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
                        values: this[_setvalues].get(vr),
                }],
            },
            onRegionTipShow: function(e, el, related_value) {
                const rvs = this.statistics.get(vr);
                el.html(`${related_value}: ${rvs.has(related_value)?rvs.get(related_value):'not in DARIAH'}`);
            }.bind(this),
            onMarkerTipShow: function(e, el, related_value) {
                const rvs = this.statistics.get(vr);
                el.html(`${related_value}: ${rvs.has(related_value)?rvs.get(related_value):'not in DARIAH'}`);
            }.bind(this),
            onRegionClick: function(e, related_value) {
                if (!this.related_values_index.get(vr).has(related_value)) {
                    e.preventDefault();
                }
            }.bind(this),
            onMarkerClick: function(e, related_value) {
                if (!this.related_values_index.get(vr).has(related_value)) {
                    e.preventDefault();
                }
            }.bind(this),
            onRegionSelected: function(e, related_value, i, selected) {
                if (this.change_state) {
                    this.component.state.setState(this.state_var_pref+vr, g.a_to_str(selected)+this._unmapped_selected(vr));
                }
            }.bind(this),
            onMarkerSelected: function(e, related_value, i, selected) {
                if (this.change_state) {
                    this.component.state.setState(this.state_var_pref+vr, g.a_to_str(selected)+this._unmapped_selected(vr));
                }
            }.bind(this),
        });
        const zoom_p = cc.find('p.zoom');
        zoom_p.css('top', `${height-20}px`);
        zoom_p.css('left', '10px');
        const zoom_control = cc.find('p.zoom a');
        zoom_control.click(e => {e.preventDefault();
            this[_map_object].get(vr).setFocus({regions: ['GB', 'GR']});
        });
        this[_map_object].set(vr, mapc.vectorMap('get', 'mapObject'));
        this[_map_object].get(vr).setFocus({regions: ['GB', 'GR']});
    }
    _unmapped_selected(vr) {
        const result = [];
        const this_state = g.from_str(vr, this.component.state.getState(this.state_var_pref+vr));
        let empty = true;
        for (const related_value of this[_not_mapped]) {
            if (this_state.has(related_value)) {
                result.push(related_value);
                empty = false;
            }
        }
        return empty?'':(','+result.join(','));
    }
    _mySetFacet(vr) {
        this.change_state = false;
        /* some countries are not on the map, we do show those countries in the list but not on the map.
         * Same for -, the key that denotes ALL countries
         */
        const map_regions = {};
        const map_markers = {};
        const related_values = this.related_state.get(vr);
        for (const d of this.component.related_values.get(vr)) {
            const i = d['_id'];
            const related_value = d['name'];
            const member_dariah = d['member_dariah'];
            if (!(this[_not_mapped].has(i)) && i != this.no_values.value) {
                map_regions[i] = related_values.has(i);
                if (member_dariah) {
                    map_markers[i] = related_values.has(i);
                }
            }
        }
        const mapo = this[_map_object].get(vr);
        mapo.setSelectedRegions(map_regions);
        mapo.setSelectedMarkers(map_markers);
        this.change_state = true;
    }
    _myStats(vr) {
        let total = this.distilled.get(vr).size;
        if (total == 0) {total = 1}
        const weighted_statistics = {};
        const rvs = this.statistics.get(vr);
        for (const [related_value, stat] of rvs) {
            if (related_value != this.no_values.value) {
                const pr = 100 * stat / total;
                weighted_statistics[related_value] = (total < 10)?pr:(10*Math.sqrt(pr));
            }
        }
        this[_map_object].get(vr).series.markers[0].setValues(weighted_statistics);
    }
    _plainWeld(vr) {}
    _myWeld(vr) {
        this[_marker].set(vr, {});
        this[_setvalues].set(vr, {});
        const related_values = this.component.related_values.get(vr);
        const marker = this[_marker].get(vr);
        const setv = this[_setvalues].get(vr);
        for (const d of related_values) {
            const i = d['_id'];
            const related_value = d['name'];
            const member_dariah = d['member_dariah'];
            const latitude = d['latitude'];
            const longitude = d['longitude'];
            if (member_dariah) {
                this.related_values_all.get(vr).add(i);
                this.related_values_list.get(vr).push(i);
                this.related_values_index.get(vr).set(i, related_value);
                marker[i] = {latLng: [latitude, longitude], name: related_value};
                setv[i] = 'indariah';
            }
            else {
                setv[i] = 'outdariah';
            }
        }
        this.related_values_list.get(vr).sort((a,b) => {
            return (this.related_values_index.get(a) < this.related_values_index.get(b))?-1:(this.related_values_index.get(a) > this.related_values_index.get(b))?1:0; 
        });
    }
}
