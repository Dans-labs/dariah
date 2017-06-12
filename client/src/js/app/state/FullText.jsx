import React from 'react'
import { connect } from 'react-redux'

import { handlEV } from 'utils'
import { changeFulltext, getFilterSetting } from 'filters'

import Stat from 'Stat'

const Fulltext = ({
  table, filterTag,
  filterId, filterLabel,
  filterSetting = '',
  filteredAmount, filteredAmountOthers,
  dispatch,
}) => (
  <div className={'fulltext'} title={`Search in ${filterLabel}`} >
    <input
      type="text"
      className="search"
      placeholder={`search in ${filterLabel}`}
      value={filterSetting}
      onChange={handlEV(dispatch, changeFulltext, table, filterTag, filterId)}
    />{' '}
    <Stat subTotal={filteredAmount} total={filteredAmountOthers} />
  </div>
)

export default connect(getFilterSetting)(Fulltext)
