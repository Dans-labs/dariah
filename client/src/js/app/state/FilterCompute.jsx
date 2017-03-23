import React, { Component } from 'react'
import ItemList from 'ItemList.jsx'
import Filter from 'Filter.jsx'

import { newFilterSettings, computeFiltering, setf } from 'filtering.js'
import { columnStyle } from 'ui.js'
import { withContext, saveState } from 'hoc.js'

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
  updFilter = (filterId, data) => {
    const { state: { filterSettings } } = this
    if (typeof data == 'string') {
      setf(filterId, '', data)
    }
    else if (typeof data == 'boolean') {
      for (const fval of filterSettings.get(filterId)) {
        setf(filterId, fval, data)
      }
    }
    else {
      setf(filterId, data[0], data[1])
    }
    this.setState({ filterSettings: newFilterSettings(filterSettings, filterId, data) })
  }
/**
 * Calls {@link module:filtering.computeFiltering|computeFiltering} before the actual rendering.
 *
 * @param {Map} filterSettings (from *state*) The current state of the facets belonging to this filter
 * Organized as a {Map} keyed by Two-letter country codes.
 * @param {Object} fields - Contains the fields that mongo db has supplied for each row. This is
 * dependent on the permissions of the current user.
 * @param {FilterCompute#updFilter} updFilter Callback to update the state when user event has occurred
 * @returns {Fragment}
 */
  render() {
    const {
      props: { table, title, records, fields, fieldValues, filterList, ui },
      state: { filterSettings },
    } = this
    const {
      filteredData, filteredAmountOthers, amounts,
    } = computeFiltering(
      records, fields, filterList, fieldValues, filterSettings,
    )
    return (
      <div>
        <div
          className="sized"
          style={columnStyle('rightLeft', ui)}
        >
          <p>{'Total '}<span className="good-o" >{records.length}</span></p>
          <Filter
            table={table}
            fields={fields}
            fieldValues={fieldValues}
            filteredAmount={filteredData.length}
            filteredAmountOthers={filteredAmountOthers}
            amounts={amounts}
            filterList={filterList}
            filterSettings={filterSettings}
            updFilter={this.updFilter}
          />
        </div>
        <div
          className="sized"
          style={columnStyle('rightRight', ui)}
        >
          <ItemList table={table} title={title} filteredData={filteredData} inplace={true} />
        </div>
      </div>
    )
  }
}

export default withContext(saveState(FilterCompute, 'FilterCompute', ({filterInit}) => ({filterSettings: filterInit})))
