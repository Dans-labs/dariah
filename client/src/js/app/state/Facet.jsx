import React from 'react'
import { connect } from 'react-redux'

import { handlE, emptyO } from 'utils'
import { changeFacet, getFilterSetting } from 'filters'

const Facet = ({ table, filterTag, filterId, valueId, valueRep, filterSetting, dispatch }) => {
  const { [valueId]: isOn = false } = filterSetting || emptyO
  return (
    <span>
      <input
        type="checkbox"
        checked={isOn}
        className="facet"
        onChange={handlE(dispatch, changeFacet, table, filterTag, filterId, valueId, !isOn)}
      />
      {` ${valueRep}`}
    </span>
  )
}

export default connect(getFilterSetting)(Facet)
