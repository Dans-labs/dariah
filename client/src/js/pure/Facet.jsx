import React, { PropTypes } from 'react'

const styles = {
  rep: { fontSize: 'small' },
  box: { fontSize: 'large' },
}

/**
 * @class
 * @classdesc
 * **purely functional** {@link external:Component|Component}
 */
const Facet = ({ updFilter, filterId, valueId, valueRep, checked }) => (
  <span>
    <input
      type="checkbox"
      onChange={event => updFilter(filterId, [valueId, event.target.checked])}
      checked={checked}
      style={styles.box}
    />
    <span style={styles.rep}>{` ${valueRep}`}</span>
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
