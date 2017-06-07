import React from 'react'
import { connect } from 'react-redux'

import { handlE } from 'utils'
import { changeFacet, getFilterSetting } from 'filters'

const Facet = ({ table, filterId, valueId, valueRep, filterSetting, dispatch }) => {
  const { [valueId]: isOn } = filterSetting
  return (
    <span>
      <input
        type="checkbox"
        checked={isOn}
        className="facet"
        onChange={handlE(dispatch, changeFacet, table, filterId, valueId, !isOn)}
      />
      {` ${valueRep}`}
    </span>
  )
}

export default connect(getFilterSetting)(Facet)
