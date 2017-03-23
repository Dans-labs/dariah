import React, { Component } from 'react'
import ByValue from 'ByValue.jsx'
import L from 'leaflet'
import {countryBorders} from 'europe.geo.js'
import { withContext } from 'hoc.js'

/**
 * A complex component!
 * It is a facet filter for the field country,
 * and it contains a map of Europe, visualizing by means of markers,
 * how the filter result is distributed over the DARIAH countries.
 *
 * Both ingredients of this component are brought together not by
 * class extension but by functional composition.
 *
 * The country facet filter is a true react {@link external:Component|component}.
 *
 * The map is a [Leaflet](http://leafletjs.com) module on a blank pane,
 * with a {@link module:europe_geo_js|geojson} file of country boundaries laid out on it.
 * The map is not react aware, it will be rendered in its own div.
 *
 * Remember that the results of filter computation descend from a stateful
 * parent into the present component.
 * So, whenever we receive new props, we manipulate the leaflet map and adjust
 * the markers on it.
 * More precisely, since we do not have to manipulate state, we put the marker updates
 * in the {@link external:componentDidMount|componentDidMount()}
 * and {@link external:componentDidUpdate|componentDidUpdate()}
 * {@link external:LifeCycle|life cycle methods} of React.
 * At those moments we know that the DOM elements that must be rendered have mounted,
 * so the map exists, and we can put the markers there.
 *
 * @module EUMap
 */

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

/**
 * ## Compute Marker Radius
 *
 * When we know the filter results per country, we can put markers on them
 * with a radius in proportion to their scores.
 * However, if the scores are very far apart, either the small markers get invisible,
 * or the big markers get too big.
 * We mitigate this effect, by using proportional radii only for values below a certain
 * threshold (LEVEL_OFF). For higher values we essentiall take the square root.
 *
 * @function
 * @param {string} iso2 Two-letter country code, see [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)
 * @param {number} filteredAmountOthers - how many rows pass all other filters
 * @param {Map} amounts - `filteredAmountOthers`, but more specific: the amounts per faceted value
 * @returns {number} the desired radius for this country
*/
const computeRadius = (i, filteredAmountOthers, amounts) => {
  const amount = amounts ? amounts.has(i) ? amounts.get(i) : 0 : 0
  if (amount == 0) {return 0}
  const { MAX_RADIUS, LEVEL_OFF } = mapOptions
  const proportional = MAX_RADIUS * amount / filteredAmountOthers
  if (filteredAmountOthers < LEVEL_OFF) {return proportional}
  return LEVEL_OFF * Math.sqrt(proportional)
}

/**
 * @class
 * @classdesc
 * **stateless, DOM-modifying** {@link external:Component|Component}
 *
 * An ordinary faceted filter on the country field plus a container for the map,
 * with
 * {@link external:LifeCycle|life cycle methods}
 * to place and update markers when the filter results have changed.
 */
class EUMap extends Component {
  constructor(props) {
    super(props)
    this.features = new Map()
  }
  setMap = dom => {if (dom) {this.dom = dom}}
/**
 * render() just invokes the ByValue component with the right parameters
 * to get the country facets.
 * And it puts a div in place that will receive the map.
 * @method
 * @param {Map} countryMap This parameter is not used, but mentioned to select all the other parameters to
 * pass on
 * @param {Object[]} byValueProps The remaining properties, to be passes to the {ByValue} component.
 * @returns {Fragment}
 */
  render() {
    const { props: { countryMap, ...byValueProps }, setMap } = this
    return (
      <div>
        <div
          ref={setMap}
        />
        <ByValue {...byValueProps} />
      </div>
    )
  }

/**
 * After the initial mount we get the country data and perform
 * initializations that depend on that information:
 *
 * * we put the map in place
 * * we put the country boundaries on the pane
 * * we add markers, style them, and maintain references to them
 *
 * These do not have to be repeated after subsequent updates.
 * @method
 * @param {Map} filterSettings - the current settings of the country facets
 * @param {number} filteredAmountOthers - how many rows pass all other filters
 * @param {Map} amounts` - `filteredAmountOthers`, but more specific: the amounts per faceted value
 * @param {Map} countryMap The country information as fetched from the database on the server.
 * Organized as a {Map} keyed by Two-letter country codes.
 * @returns {DOM}
 */

  componentDidMount() {
    const {
      props: { filterSettings, filteredAmountOthers, amounts, countryMap },
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
    this.idFromIso = new Map([...countryMap.values()].map(({ iso, _id }) => [iso, _id]))
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

/**
 * After getting new filter results, the only thing we have to do is to
 *
 * * update the marker radii
 * * update the marker colors
 *
 * @param {Map} filterSettings - the current settings of the country facets
 * @param {number} filteredAmountOthers - how many rows pass all other filters
 * @param {Map} amounts` - `filteredAmountOthers`, but more specific: the amounts per faceted value
 * @returns {DOM}
 */
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
export default withContext(EUMap)
