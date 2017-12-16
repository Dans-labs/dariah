import React from 'react'
import { connect } from 'react-redux'

import { emptyS } from 'utils'

import { handlEV } from 'handle'

import { changeFulltext } from 'filters'

import Stat from 'Stat'
import Tooltip from 'Tooltip'

const Fulltext = ({
  table,
  filterTag,
  filterId,
  filterLabel,
  filterSetting = emptyS,
  filteredAmount,
  filteredAmountOthers,
  compact,
  dispatch,
}) => (
  <div className={'fulltext'}>
    <Tooltip tip={`Search in ${filterLabel}`} at={'top'}>
      <input
        type={'text'}
        className={`search ${compact ? 'compact' : emptyS}`}
        placeholder={`search${compact ? emptyS : ` in ${filterLabel}`}`}
        value={filterSetting}
        onChange={handlEV(dispatch, changeFulltext, table, filterTag, filterId)}
      />
    </Tooltip>{' '}
    {compact ? null : (
      <Stat
        subTotal={filteredAmount}
        total={filteredAmountOthers}
        className={'fulltext-stat'}
      />
    )}
  </div>
)

export default connect()(Fulltext)
