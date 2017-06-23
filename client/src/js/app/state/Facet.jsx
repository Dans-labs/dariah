import React from 'react'
import { connect } from 'react-redux'

import { emptyO } from 'utils'
import { handlE } from 'handle'

import { changeFacet } from 'filters'

const Facet = ({ table, filterTag, filterId, valueId, valueRep, filterSetting, className, dispatch }) => {
  const { [valueId]: isOn = false } = filterSetting || emptyO
  return (
    <span className={className}>
      <input
        type={'checkbox'}
        checked={isOn}
        className={'facet'}
        onChange={handlE(dispatch, changeFacet, table, filterTag, filterId, valueId, !isOn)}
      />
      {` ${valueRep}`}
    </span>
  )
}

export default connect()(Facet)
