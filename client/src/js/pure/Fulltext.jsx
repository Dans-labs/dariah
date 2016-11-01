import React, { PropTypes } from 'react'
import Stats from './Stats.jsx'

const FullText = ({ updFilter, filterId, filterField, filterSettings, filteredAmount, filteredAmountOthers }) => (
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
