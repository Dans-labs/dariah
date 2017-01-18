import React, { Component } from 'react'

import FilterCompute from './FilterCompute.jsx'
import { filterList } from '../pure/Filters.jsx'
import { compileFiltering } from '../helpers/filtering.js'
import { getData } from '../helpers/data.js'
import { withContext, saveState } from '../helpers/hoc.js'

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
 * * {@link module:Filters|Filters} The parent of all the filter widgets in the left column
 * * {@link ByValue|ByValue} A faceted filter widget
 * * {@link FullText|FullText} A full-text search widget
 * * {@link module:filtering|Filters} Helper module for filter computations
 * * {@link module:EUMap|EUMap} The map of European countries
 * * {@link Contribs} The list of filtered contributions in the right column
 */
class ContribsFiltered extends Component {
/**
 * Calls {@link module:filtering.compileFiltering|compileFiltering} before the actual rendering.
 *
 * @method
 * @param {Contrib[]} contribdata (from *state*) The list of contribution records as it comes form mongo db,
 * plus a list of fields that is provided for each row (dependent on user permissions)
 * @param {Map} countries (from *state*) The country information as fetched from the database on the server.
 * Organized as a {Map} keyed by Two-letter country codes.
 * @returns {Fragment}
*/
  render() {
    const { contribdata, countries } = this.state;
    if (contribdata == null || countries == null) {
      return <div/>
    }
    const { contribs, fields } = contribdata;
    const { fieldValues, filterInit } = compileFiltering(contribs, fields, filterList);
    const countriesMap = new Map(countries.map(x => [x._id, x]));
    return <FilterCompute
      contribs={contribs}
      fields={fields}
      countries={countriesMap}
      fieldValues={fieldValues}
      filterInit={filterInit}
    />
  }
/**
 * @method
 * @param {Contrib[]} contribs (from *state*) The list of contribution records as it comes form mongo db
 * @param {Map} countries (from *state*) The country information as fetched from the database on the server.
 * Organized as a {Map} keyed by Two-letter country codes.
 * @returns {Object} The data fetched from the server.
*/
  componentDidMount() {
    const { contribdata, countries } = this.state;
    if (contribdata == null || countries == null) {
      getData([
          {
            type: 'db',
            path: '/list_contrib',
            branch: 'contribdata',
          },
          {
            type: 'db',
            path: '/member_country',
            branch: 'countries',
          },
        ],
        this,
        this.props.notification.component
      );
    }
  }
}

export default withContext(saveState(ContribsFiltered, 'ContribsFiltered', {contribs: null, countries: null}))
