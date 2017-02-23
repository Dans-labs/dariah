import React, { Component } from 'react'

import FilterCompute from 'FilterCompute.jsx'
import { filterList } from 'Filter.jsx'
import { compileFiltering } from 'filtering.js'
import { getData } from 'data.js'
import { withContext, saveState } from 'hoc.js'

/**
 * @class
 * @classdesc
 *
 * **stateful** {@link external:Component|Component}
 *
 * ## The list of contributiuons ... filtered
 *
 * Displays the list of contributions in the right column, but
 * only those that have passed all the filters, which are displayed in the
 * left column.
 *
 * <img src="/api/file/tech/docs/design/design.002.jpeg" width="800"/>
 *
 * This is a complex system of components, where data is fetched from the server,
 * and user events are registered at the filter widgets.
 * On top of that, there is a visualization in the form of a map of European countries
 * with markers having a radius indicative of the number of filtered contributions
 * by that country.
 *
 * See also:
 * * {@link FilterCompute} The parent of all the filter widgets in the left column
 * * {@link module:Filter|Filter} The parent of all the filter widgets in the left column
 * * {@link ByValue|ByValue} A faceted filter widget
 * * {@link FullText|FullText} A full-text search widget
 * * {@link module:filtering|Filter} Helper module for filter computations
 * * {@link module:EUMap|EUMap} The map of European countries
 * * {@link ContribList} The list of filtered contributions in the right column
 */
class ContribFiltered extends Component {
/**
 * Calls {@link module:filtering.compileFiltering|compileFiltering} before the actual rendering.
 *
 * @method
 * @param {Contrib[]} contribData (from *state*) The list of contribution records as it comes form mongo db,
 * plus a list of fields that is provided for each row (dependent on user permissions)
 * @param {Map} countryData (from *state*) The country information as fetched from the database on the server.
 * Organized as a {Map} keyed by Two-letter country codes.
 * @returns {Fragment}
*/
  render() {
    const { contribData, countryData, userData } = this.state;
    const { userMap, countryMap } = this.props;
    if (contribData == null || countryData == null || userData == null) {
      return <div/>
    }
    const { records, fields } = contribData;
    const { fieldValues, filterInit } = compileFiltering(records, fields, filterList);
    for (const x of userData) {userMap.set(x._id, x)}
    for (const x of countryData) {countryMap.set(x._id, x)}
    return <FilterCompute
      records={records}
      fields={fields}
      fieldValues={fieldValues}
      filterInit={filterInit}
    />
  }
/**
 * @method
 * @param {Contrib[]} contribData (from *state*) The list of contribution records as it comes form mongo db
 * @param {Map} countryData (from *state*) The country information as fetched from the database on the server.
 * Organized as a {Map} keyed by Two-letter country codes.
 * @returns {Object} The data fetched from the server.
*/
  componentDidMount() {
    const { contribData, countryData, userData } = this.state;
    if (contribData == null || countryData == null || userData == null) {
      getData([
          {
            type: 'db',
            path: '/list_contrib',
            branch: 'contribData',
          },
          {
            type: 'db',
            path: '/member_country',
            branch: 'countryData',
          },
          {
            type: 'db',
            path: `/user`,
            branch: 'userData',
          },
        ],
        this,
        this.props.notification.component
      );
    }
  }
}

export default withContext(saveState(ContribFiltered, 'ContribFiltered', {contribData: null, countryData: null, userData: null}))
