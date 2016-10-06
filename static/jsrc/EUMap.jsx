import React, { Component, PropTypes } from 'react';
import Bymeta from './Bymeta.jsx';
import L from 'leaflet';
import geodata from './europe.geo.js';

const MAXRADIUS = 25;

export default class EUMap extends Bymeta {
  constructor(props) {
    super(props);
    this.state = {
      countries: new Map(),
      server_ok: true,
      msgs: [{info: 'loading'}],
    };
    this.features = new Map();
  }
  inDariah(feature) {
    const ind = feature.properties.iso2;
    return this.state.countries.has(ind) && this.state.countries.get(ind);
  }
  computeRadius(iso2) {
    const amount = this.amounts ? this.amounts.has(iso2) ? this.amounts.get(iso2) : 0 : 0;
    if (!amount) {return 0}
    const total = this.props.otherFilteredData.length;
    const proportional = MAXRADIUS * amount / total;
    if (total < 10) {return proportional}
    return 10 * Math.sqrt(proportional);
  }
  componentDidMount() {
    fetch('/dariah/data/member_country.json')
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        countries: new Map(responseData.data.map(({_id: cid, inDARIAH: member}) => [cid, member])),
        msgs: responseData.msgs,
        server_ok: responseData.good,
      });
      L.geoJSON(geodata, {
        style: feature => this.inDariah(feature)?{
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
          if (this.inDariah(feature)) {
            const fprops = feature.properties;
            const marker = L.circleMarker([fprops.lat, fprops.lng], {
              radius: this.computeRadius(fprops.iso2),
              color: '#007700',
              weight: 1,
              fill: true,
              fillColor: '#00aa00',
              fillOpacity: 0.6,
              pane: 'markerPane',
            }).addTo(this.map);
            this.features.set(fprops.iso2, marker);
          }
        },
      }).addTo(this.map);
    })
    .catch((error) => {
      this.setState({
        data: null,
        msgs: [{kind: 'error', text: `${error}`}],
        server_ok: false,
      });
      console.log('Error fetching data', error);
    });
    this.map = L.map(this.refs.eumap, {
      attributionControl: false,
      center: [52,12],
      zoom: 3,
      maxBounds: [[30, -20], [70,40]],
    });
  }
  componentDidUpdate() {
    for (const [iso2, marker] of this.features) {
      marker.setRadius(this.computeRadius(iso2));
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

