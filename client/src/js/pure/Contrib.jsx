import React, { PropTypes } from 'react'

/**
 * @class
 * @classdesc
 * **purely functional** {@link external:Component|Component}
 */
const Contrib = ({ row }) => (
  <tr id={row._id}>
    <td>{row.title}</td>
  </tr>
)

Contrib.propTypes = {
  row: PropTypes.object.isRequired,
}

export default Contrib
