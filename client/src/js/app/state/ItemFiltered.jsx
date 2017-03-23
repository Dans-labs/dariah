import React, { Component } from 'react'

import FilterCompute from 'FilterCompute.jsx'
import { compileFiltering } from 'filtering.js'
import { getData } from 'data.js'
import { withContext, saveState } from 'hoc.js'

/**
 * @class
 * @classdesc
 *
 * **stateful** {@link external:Component|Component}
 *
 * ## The list of items ... filtered
 *
 * Displays the list of items in the right column, but
 * only those that have passed all the filters, which are displayed in the
 * left column.
 *
 * <img src="/api/file/tech/docs/design/design.002.jpeg" width="800" />
 *
 * This is a complex system of components, where data is fetched from the server,
 * and user events are registered at the filter widgets.
 * On top of that, there is a visualization in the form of a map of European countries
 * with markers having a radius indicative of the number of filtered items
 * by that country.
 *
 * See also:
 * * {@link FilterCompute} The parent of all the filter widgets in the left column
 * * {@link module:Filter|Filter} The parent of all the filter widgets in the left column
 * * {@link ByValue|ByValue} A faceted filter widget
 * * {@link FullText|FullText} A full-text search widget
 * * {@link module:filtering|Filter} Helper module for filter computations
 * * {@link module:EUMap|EUMap} The map of European countries
 * * {@link ItemList} The list of filtered items in the right column
 */
class ItemFiltered extends Component {
/**
 * Calls {@link module:filtering.compileFiltering|compileFiltering} before the actual rendering.
 *
 * @method
 * @param {Item[]} listData (from *state*) The list of records as it comes form mongo db,
 * plus a list of fields that is provided for each row (dependent on user permissions)
 * @param {Map} countryData (from *state*) The country information as fetched from the database on the server.
 * Organized as a {Map} keyed by Two-letter country codes.
 * @returns {Fragment}
*/
  render() {
    const {
      props: { params: { tag }, userMap, countryMap },
      state: { listData, countryData, userData },
    } = this
    if (listData == null || countryData == null || userData == null) {
      return <div />
    }
    const { records, fields, title, filterList } = listData
    const { fieldValues, filterInit } = compileFiltering(records, fields, filterList)
    for (const x of userData) {userMap.set(x._id, x)}
    for (const x of countryData) {countryMap.set(x._id, x)}
    return (
      <FilterCompute
        tag={tag}
        table={tag}
        records={records}
        fields={fields}
        title={title}
        fieldValues={fieldValues}
        filterList={filterList}
        filterInit={filterInit}
      />
    )
  }
/**
 * @method
 * @param {Item[]} listData (from *state*) The list of records as it comes form mongo db
 * @param {Map} countryData (from *state*) The country information as fetched from the database on the server.
 * Organized as a {Map} keyed by Two-letter country codes.
 * @returns {Object} The data fetched from the server.
*/
  componentDidMount() {
    const {
      props: { params: { tag }, notification },
      state: { listData, countryData, userData },
    } = this
    if (listData == null || countryData == null || userData == null) {
      getData(
        [
          {
            type: 'db',
            path: `/list?table=${tag}`,
            branch: 'listData',
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
        notification.component
      )
    }
  }
}

export default withContext(saveState(ItemFiltered, 'ItemFiltered', {listData: null, countryData: null, userData: null}))
