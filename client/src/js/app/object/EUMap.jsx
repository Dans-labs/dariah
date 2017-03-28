import React, { Component } from 'react'
import { connect } from 'react-redux'
import ByValue from 'ByValue.jsx'
import L from 'leaflet'
import {countryBorders} from 'europe.geo.js'
import { withContext } from 'hoc.js'

const mapOptions = {
  HEIGHT: 250,
  MAX_RADIUS: 25,
  LEVEL_OFF: 10,
  ZOOM_INIT: 3,
  MAP_CENTER: [52, 12],
  MAP_BOUNDS: [[30, -20], [70, 40]],
  MARKER_COLOR: {
    [true]: {
      color: '#008800',
      fillColor: '#00cc00',
    },
    [false]: {
      color: '#888844',
      fillColor: '#bbbb66',
    },
  },
  MARKER_SHAPE: {
    weight: 1,
    fill: true,
    fillOpacity: 0.8,
  },
  COUNTRY_STYLE: {
    [true]: {
      color: '#884422',
      weight: 2,
      fill: true,
      fillColor: '#aa7766',
      fillOpacity: 1,
    },
    [false]: {
      color: '#777777',
      weight: 1,
      fill: true,
      fillColor: '#bbbbbb',
      fillOpacity: 1,
    },
  },
}

const computeRadius = (i, filteredAmountOthers, amounts) => {
  const amount = amounts ? amounts.has(i) ? amounts.get(i) : 0 : 0
  if (amount == 0) {return 0}
  const { MAX_RADIUS, LEVEL_OFF } = mapOptions
  const proportional = MAX_RADIUS * amount / filteredAmountOthers
  if (filteredAmountOthers < LEVEL_OFF) {return proportional}
  return LEVEL_OFF * Math.sqrt(proportional)
}

class EUMap extends Component {
  constructor(props) {
    super(props)
    this.features = new Map()
  }
  setMap = dom => {if (dom) {this.dom = dom}}
  render() {
    const { props: { country, ...byValueProps }, setMap } = this
    return (
      <div>
        <div
          ref={setMap}
        />
        <ByValue {...byValueProps} />
      </div>
    )
  }

  componentDidMount() {
    const {
      props: { filterSettings, filteredAmountOthers, amounts, country },
      dom,
    } = this
    const { HEIGHT, MAP_CENTER, ZOOM_INIT, MAP_BOUNDS, MARKER_COLOR, MARKER_SHAPE, COUNTRY_STYLE } = mapOptions
    dom.style.height = HEIGHT
    this.map = L.map(dom, {
      attributionControl: false,
      center: MAP_CENTER,
      zoom: ZOOM_INIT,
      maxBounds: MAP_BOUNDS,
    })
    this.idFromIso = new Map([...country].map(({ iso, _id }) => [iso, _id]))
    L.geoJSON(countryBorders, {
      style: feature => COUNTRY_STYLE[this.inDariah(feature)],
      onEachFeature: feature => {
        if (this.inDariah(feature)) {
          const { properties: { iso2, lat, lng } } = feature
          const i = this.idFromIso.get(iso2)
          const isOn = filterSettings.get(i)
          const marker = L.circleMarker([lat, lng], {
            ...MARKER_COLOR[isOn],
            radius: computeRadius(i, filteredAmountOthers, amounts),
            ...MARKER_SHAPE,
            pane: 'markerPane',
          }).addTo(this.map)
          this.features.set(iso2, marker)
        }
      },
    }).addTo(this.map)
  }

  inDariah = feature => this.idFromIso.has(feature.properties.iso2)

  componentDidUpdate() {
    const { props: { filterSettings, filteredAmountOthers, amounts } } = this
    const { MARKER_COLOR } = mapOptions
    for (const [iso2, marker] of this.features) {
      const i = this.idFromIso.get(iso2)
      const isOn = filterSettings.get(i)
      marker.setRadius(computeRadius(i, filteredAmountOthers, amounts))
      marker.setStyle(MARKER_COLOR[isOn])
    }
  }
}

EUMap.displayName = 'EUMap'

const mapStateToProps = ({ tables: { country } }) => {
  return { country }
}

export default connect(mapStateToProps)(
    withContext(EUMap)
)
