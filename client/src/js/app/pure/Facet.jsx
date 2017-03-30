import React from 'react'
import { connect } from 'react-redux'
import { changeFacet, getFilterSetting } from 'filter.js'

const Facet = ({ filterId, valueId, valueRep, filterSetting, handle }) => {
  const { [valueId]: isOn } = filterSetting
  return (
  <span>
    <input
      type="checkbox"
      checked={isOn}
      className="facet"
      onChange={() => handle(filterId, valueId, !isOn)}
    />
    {` ${valueRep}`}
  </span>
)
}

export default connect(getFilterSetting, { handle: changeFacet })(Facet)
