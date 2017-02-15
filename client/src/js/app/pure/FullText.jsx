import React from 'react'
import Stats from 'Stats.jsx'

const onType = (updFilter, filterId) => event => updFilter(filterId, event.target.value)

/**
 * **purely functional** {@link external:Component|Component}
 *
 * Displays a full text search input field.
 * The characters entered in this field are passed upwards by means of a callback.
 * This is incremental search.
 * Not only the full text search, but also all other filters are computed upon each character entered.
 *
 * Note that we use the strategy of {@link external:ControlledComponent|controlled components} here.
 *
 * @class
 * @param {number} filterId The index of the filter in {@link module:Filters.filterList|filterList}
 * @param {string} filterField The name of the field in the contribs list whose values are being filtered
 * @param {string} filterSettings  The currently entered search string in the input box
 * @param {number} filteredAmount The number of rows that have passed all filters
 * @param {number} filteredAmountOthers The number of rows that have passed all other filters  
 * @param {FilterCompute#updFilter} updFilter Callback to update the state when user event has occurred 
 * @returns {Fragment}
 */
const FullText = ({
  filterId, filterField, filterLabel,
  filterSettings,
  filteredAmount, filteredAmountOthers,
  updFilter
}) => (
  <div>
    <p><input
        type="text"
        placeholder={`search in ${filterLabel}`}
        value={filterSettings}
        onChange={onType(updFilter, filterId)}
    />{' '}
      <Stats subTotal={filteredAmount} total={filteredAmountOthers}/>
    </p>
  </div>
)

export default FullText
