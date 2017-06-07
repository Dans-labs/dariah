import React from 'react'
import { connect } from 'react-redux'

import { handlEV } from 'utils'
import { changeFulltext, getFilterSetting } from 'filters'

import Stat from 'Stat'

const Fulltext = ({
  table,
  filterId, filterLabel,
  filterSetting,
  filteredAmount, filteredAmountOthers,
  dispatch,
}) => (
  <div>
    <p title={`Search in ${filterLabel}`} >
      <input
        type="text"
        className="search"
        placeholder={`search in ${filterLabel}`}
        value={filterSetting}
        onChange={handlEV(dispatch, changeFulltext, table, filterId)}
      />{' '}
      <Stat subTotal={filteredAmount} total={filteredAmountOthers} />
    </p>
  </div>
)

export default connect(getFilterSetting)(Fulltext)
