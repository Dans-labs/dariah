import React from 'react'
import memoBind from 'memoBind.js'

class callBacks {
  onChange = (filterId, valueId, updFilter) => event => updFilter(filterId, [valueId, event.target.checked])
}
const memo = new callBacks()

const Facet = ({ filterId, valueId, valueRep, checked, updFilter }) => (
  <span>
    <input
      type="checkbox"
      checked={checked}
      className="facet"
      onChange={memoBind(memo, 'onChange', [filterId, valueId], [updFilter])}
    />
    {` ${valueRep}`}
  </span>
)

export default Facet
