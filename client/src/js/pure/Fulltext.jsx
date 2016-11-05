import React, { PropTypes } from 'react'
import Stats from './Stats.jsx'

/**
 * **purely functional** {@link external:Component|Component}
 *
 * Displays a full text search input field.
 * The characters entered in this field are passed upwards by means of a callback.
 * This is incremental search!
 * Not only the full text search, but also all other filters are computed upon each character entered.
 *
 * Note that we use the strategy of {@link external:ControlledComponent|controlled components} here.
 *
 * @constructor
 * @param {number} filterId The index of the filter in {@link module:Filters.filterList|filterList}
 * @param {string} filterField The name of the field in the contribs list whose values are being filtered
 * @param {string} filterSettings  The currently entered search string in the input box
 * @param {number} filteredAmount The number of rows that have passed all filters
 * @param {number} filteredAmountOthers The number of rows that have passed all other filters  
 * @param {FilterCompute#updFilter} updFilter Callback to update the state when user event has occurred 
 * @returns {Fragment}
 */
const FullText = ({
  filterId, filterField, filterSettings,
  filteredAmount, filteredAmountOthers,
  updFilter
}) => (
  <div>
    <p><input
        type="text"
        placeholder={`search in ${filterField}`}
        value={filterSettings}
        onChange={event => updFilter(filterId, event.target.value)}
    />{' '}
      <Stats subTotal={filteredAmount} total={filteredAmountOthers}/>
    </p>
  </div>
)

FullText.propTypes = {
  filterId: PropTypes.number.isRequired,
  filterField: PropTypes.string.isRequired,
  filterSettings: PropTypes.string.isRequired,
  filteredAmount: PropTypes.number.isRequired,
  filteredAmountOthers: PropTypes.number.isRequired,
  updFilter: PropTypes.func.isRequired,
}

export default FullText
