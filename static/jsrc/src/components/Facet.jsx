import React, { PropTypes } from 'react';

const Facet = ({ updFilter, filterId, valueId, valueRep, checked }) => (
  <span>
    <input
      type="checkbox"
      onChange={event => updFilter(filterId, [valueId, event.target.checked])}
      checked={checked}
    />
    {` ${valueRep}`}
  </span>
)

Facet.propTypes = {
  filterId: PropTypes.number.isRequired,
  valueId: PropTypes.string.isRequired,
  valueRep: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  updFilter: PropTypes.func.isRequired,
}

export default Facet
