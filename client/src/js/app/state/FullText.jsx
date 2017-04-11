import React from 'react'
import { connect } from 'react-redux'

import { changeFulltext, getFilterSetting } from 'filter.js'

import Stat from 'Stat.jsx'

const handleChange = (handle, table, filterId) => event => handle(table, filterId, event.target.value)

const FullText = ({
  table,
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
        onChange={handleChange(handle, table, filterId)}
      />{' '}
      <Stat subTotal={filteredAmount} total={filteredAmountOthers} />
    </p>
  </div>
)

export default connect(getFilterSetting, { handle: changeFulltext })(FullText)
