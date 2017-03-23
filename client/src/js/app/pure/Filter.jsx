import React from 'react'

import FullText from 'FullText.jsx'
import ByValue from 'ByValue.jsx'
import EUMap from 'EUMap.jsx'

/**
 * @module Filter
 */

/**
 * ## Filter inventory
 *
 * The following types of filters are implemented.
 * * {@link FullText}: Search in a textual field for a pattern.
 *   The pattern is entered by the user,
 *   the search is incremental, after each keystroke the results are updated.
 * * {@link ByValue}: Faceted search for values of a specific field.
 *   * {@link EUMap}: Faceted search on country, together with a map visualization
 *
 * Here we store the list of the available filter types and their characteristics.
 * Every entry contains a few items:
 * * the {@link external:Component|component} class associated with it
 * * its name (as string)
 * * the name of the data field it is filtering
 * * how many columns the grid of facets may have.
 *
 */

const filterClass = {
  FullText,
  EUMap,
  ByValue,
}

/**
 * **purely functional** {@link external:Component|Component}
 *
 * All filter computations have been done by stateful parent components, such as FilterCompute.
 * The filter results are being passed down as properties.
 * The incoming properties can be divided into
 * - fieldValues (which facets are there per filter?)
 * - filterSettings (what has the user typed or clicked?)
 * - filteredAmount, filteredAmountOthers, amounts (what are the statistics of the filtering?)
 * - updFilter (callback coming from a stateful parent, to be passed to children that receive user events)
 * The outgoing properties are mostly the same, except that each individual filter
 * gets only the slice it needs.
 *
 * This function merely selects the right filter
 * {@link external:Component|component}
 * and calls it with the appropriate props.
 * Whereas the incoming props contain information for all filters,
 * each individual child filter is passed the relevant slice only.
 *
 * @class
 * @param {Map} filterSettings The current state of the facets belonging to this filter
 * @param {Map} fieldValues A mapping of the valueIds to valueRepresentations for all values in all filtered fields
 * @param {Object[]} filteredAmount The number of rows that have passed all filters
 * @param {Map} filteredAmountOthers For each filter, the number of rows that have passed all other filters
 * @param {Map} amounts For each filter, the number of rows that have passed all filters per valueId occurring in that field
 * Organized as a {Map} keyed by Two-letter country codes.
 * @param {FilterCompute#updFilter} updFilter Callback to update the state when user event has occurred
 * @returns {Fragment}
 */
const Filter = ({
  table,
  fields, fieldValues,
  filterList, filterSettings,
  filteredAmount, filteredAmountOthers,
  amounts,
  updFilter,
}) => (
  <div>
    {filterList.filter(x => fields[x.field]).map((filter, filterId) => {
      const { type } = filter
      const { [type]: Fclass } = filterClass
      return (
        <Fclass
          key={filterId}
          table={table}
          filterId={filterId}
          filterField={filter.field}
          filterLabel={filter.label}
          maxCols={filter.maxCols}
          filterSettings={filterSettings.get(filterId)}
          fieldValues={fieldValues.get(filter.field)}
          filteredAmount={filteredAmount}
          filteredAmountOthers={filteredAmountOthers.get(filterId)}
          amounts={amounts.get(filterId)}
          updFilter={updFilter}
          expanded={filter.expanded}
        />
      )}
    )}
  </div>
)

export default Filter
