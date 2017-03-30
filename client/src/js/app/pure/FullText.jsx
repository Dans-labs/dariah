import React from 'react'
import { connect } from 'react-redux'
import Stat from 'Stat.jsx'
import { changeFulltext, getFilterSetting } from 'filter.js'


const FullText = ({
  filterId, filterField, filterLabel,
  filterSetting,
  filteredAmount, filteredAmountOthers,
  handle,
}) => (
  <div>
    <p title={`Search in ${filterField}`} >
      <input
        type="text"
        className="search"
        placeholder={`search in ${filterLabel}`}
        value={filterSetting}
        onChange={event => handle(filterId, event.target.value)}
      />{' '}
      <Stat subTotal={filteredAmount} total={filteredAmountOthers} />
    </p>
  </div>
)

export default connect(getFilterSetting, { handle: changeFulltext })(FullText)
