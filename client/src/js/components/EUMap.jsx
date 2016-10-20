import React, { Component, PropTypes } from 'react'
import Bymeta from './Bymeta.jsx'
import L from 'leaflet'
import geodata from '../helpers/europe.geo.js'

const MAXRADIUS = 25
const TRUECOLOR = {
  color: '#884422',
  fillColor: '#aa7766',
}
const MARKERCOLOR = {
  [true]: {
    color: '#008800',
    fillColor: '#00cc00',
  },
  [false]: {
    color: '#888844',
    fillColor: '#bbbb66',
  }
}

const computeRadius = (iso2, filteredAmountOthers, amounts) => { 
  const amount = amounts ? amounts.has(iso2) ? amounts.get(iso2) : 0 : 0;
  if (!amount) {return 0}
  const proportional = MAXRADIUS * amount / filteredAmountOthers;
  if (filteredAmountOthers < 10) {return proportional}
  return 10 * Math.sqrt(proportional);
}

const inDariah = (feature, countries) => countries.get(feature.properties.iso2)

export default class EUMap extends Bymeta {
  constructor(props) {
    super(props);
    this.features = new Map();
  }
  componentDidMount() {
    const { filterSettings, filteredAmountOthers, amounts, countries } = this.props;
    this.map = L.map(this.refs.eumap, {
      attributionControl: false,
      center: [52,12],
      zoom: 3,
      maxBounds: [[30, -20], [70,40]],
    });
    L.geoJSON(geodata, {
      style: feature => inDariah(feature, countries)?{
        color: '#884422',
        weight: 2,
        fill: true,
        fillColor: '#aa7766',
        fillOpacity: 1,
      } : {
        color: '#777777',
        weight: 1,
        fill: true,
        fillColor: '#bbbbbb',
        fillOpacity: 1,
      },
      onEachFeature: feature => {
        if (inDariah(feature, countries)) {
          const fprops = feature.properties;
          const iso2 = fprops.iso2;
          const isOn = filterSettings.get(iso2);
          const marker = L.circleMarker([fprops.lat, fprops.lng], {
            ...MARKERCOLOR[isOn],
            radius: computeRadius(iso2, filteredAmountOthers, amounts),
            weight: 1,
            fill: true,
            fillOpacity: 0.8,
            pane: 'markerPane',
          }).addTo(this.map);
          this.features.set(fprops.iso2, marker);
        }
      },
    }).addTo(this.map);
  }
  componentDidUpdate() {
    const { filterSettings, filteredAmountOthers, amounts } = this.props;
    for (const [iso2, marker] of this.features) {
      const isOn = filterSettings.get(iso2);
      marker.setRadius(computeRadius(iso2, filteredAmountOthers, amounts));
      marker.setStyle(MARKERCOLOR[isOn]);
    }
  }
  render() {
    return (
      <div>
        <div ref="eumap" style={{
          height: 300,
          }}></div>
        {super.render()}
      </div>
    )}
}

EUMap.propTypes = {
  ...Bymeta.propTypes,
  countries: PropTypes.object.isRequired,
}
