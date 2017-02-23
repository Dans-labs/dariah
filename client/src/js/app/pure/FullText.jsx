import React from 'react'
import Stat from 'Stat.jsx'

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
 * @param {number} filterId The index of the filter in {@link module:Filter.filterList|filterList}
 * @param {string} filterField The name of the field in the contrib list whose values are being filtered
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
        className="search"
        placeholder={`search in ${filterLabel}`}
        value={filterSettings}
        onChange={onType(updFilter, filterId)}
    />{' '}
      <Stat subTotal={filteredAmount} total={filteredAmountOthers}/>
    </p>
  </div>
)

export default FullText
