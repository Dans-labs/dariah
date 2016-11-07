import React, { Component } from 'react'
import Contribs from '../pure/Contribs.jsx'
import Filters, { filterList } from '../pure/Filters.jsx'

import { newFilterSettings, computeFiltering } from '../helpers/filtering.js'
import { columnStyle } from '../helpers/ui.js'
import { withContext, saveState } from '../helpers/hoc.js'

/**
 * @class
 * @classdesc
 * **stateful** {@link external:Component|Component}
 *
 * Parent component of all filters.
 * The filter state (`filterSettings`) are maintained here.
 */
class FilterCompute extends Component {
/**
 * User events received by children should use this callback to
 * trigger state updates here. 
 * The callback collects a few pieces of information, which
 * it passes to {@link module:filtering.newFilterSettings|newFilterSettings} to
 * update the state.
 *
 * @callback
 * @param {string} filterId The id of the filter where a user event happened
 * @param {Object} data Data describing what user event has happened.
 */
  updFilter(filterId, data) {
    const { filterSettings } = this.state;
    this.setState({...this.state,
      filterSettings: newFilterSettings(filterSettings, filterId, data)
    });
  }
/**
 * Calls {@link module:filtering.computeFiltering|computeFiltering} before the actual rendering.
 *
 * @param {Map} filterSettings (from *state*) The current state of the facets belonging to this filter
 * @param {Map} countries The country information as fetched from the database on the server.
 * Organized as a {Map} keyed by Two-letter country codes.
 * @param {FilterCompute#updFilter} updFilter Callback to update the state when user event has occurred 
 * @returns {Fragment}
 */
  render() {
    const { filterSettings } = this.state;
    const { countries, contribs, fieldValues } = this.props;
    const {
      filteredData, filteredAmountOthers, amounts
    } = computeFiltering(
      contribs, filterList, fieldValues, filterSettings
    );
    return (
      <div>
        <div style={columnStyle('rightLeft')}>
          <p
            style={{fontWeight: 'bold', backgroundColor: '#eeeeff'}}
          >Showing {filteredData.length} of {contribs.length}</p>
          <Filters
            countries={countries}
            fieldValues={fieldValues}
            filteredAmount={filteredData.length}
            filteredAmountOthers={filteredAmountOthers}
            amounts={amounts}
            filterSettings={filterSettings}
            updFilter={this.updFilter.bind(this)}
          />
        </div>
        <div style={columnStyle('rightRight')}>
          <Contribs filteredData={filteredData}/>
        </div>
      </div>
    )
  }
}

export default withContext(saveState(FilterCompute, 'FilterCompute', ({filterInit}) => ({filterSettings: filterInit})))
