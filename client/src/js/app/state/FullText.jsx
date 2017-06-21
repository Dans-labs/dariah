import React from 'react'
import { connect } from 'react-redux'

import { emptyS } from 'utils'

import { handlEV } from 'handle'

import { changeFulltext, getFilterSetting } from 'filters'

import Stat from 'Stat'

const Fulltext = ({
  table, filterTag,
  filterId, filterLabel,
  filterSetting = emptyS,
  filteredAmount, filteredAmountOthers,
  dispatch,
}) => (
  <div className={'fulltext'} title={`Search in ${filterLabel}`} >
    <input
      type={'text'}
      className={'search'}
      placeholder={`search in ${filterLabel}`}
      value={filterSetting}
      onChange={handlEV(dispatch, changeFulltext, table, filterTag, filterId)}
    />{' '}
    <Stat subTotal={filteredAmount} total={filteredAmountOthers} className={'fulltext-stat'} />
  </div>
)

export default connect(getFilterSetting)(Fulltext)
