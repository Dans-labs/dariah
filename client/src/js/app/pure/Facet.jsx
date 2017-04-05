import React from 'react'
import { connect } from 'react-redux'
import { changeFacet, getFilterSetting } from 'filter.js'

const handleChange = (handle, table, filterId, valueId, isOn) => () => handle(table, filterId, valueId, !isOn)

const Facet = ({ table, filterId, valueId, valueRep, filterSetting, handle }) => {
  const { [valueId]: isOn } = filterSetting
  return (
    <span>
      <input
        type="checkbox"
        checked={isOn}
        className="facet"
        onChange={handleChange(handle, table, filterId, valueId, isOn)}
      />
      {` ${valueRep}`}
    </span>
  )
}

export default connect(getFilterSetting, { handle: changeFacet })(Facet)
