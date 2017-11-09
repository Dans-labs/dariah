import React from 'react'
import { connect } from 'react-redux'

import { emptyS } from 'utils'

import { handlEV } from 'handle'

import { changeFulltext } from 'filters'

import Stat from 'Stat'

const Fulltext = ({
  table, filterTag,
  filterId, filterLabel,
  filterSetting = emptyS,
  filteredAmount, filteredAmountOthers,
  compact,
  dispatch,
}) => (
  <div className={'fulltext'} data-rh={`Search in ${filterLabel}`} >
    <input
      type={'text'}
      className={`search ${compact ? 'compact' : emptyS}`}
      placeholder={`search${compact ? emptyS : ` in ${filterLabel}`}`}
      value={filterSetting}
      onChange={handlEV(dispatch, changeFulltext, table, filterTag, filterId)}
    />{' '}
    {
      compact
      ? null
      : <Stat subTotal={filteredAmount} total={filteredAmountOthers} className={'fulltext-stat'} />
    }
  </div>
)

export default connect()(Fulltext)
