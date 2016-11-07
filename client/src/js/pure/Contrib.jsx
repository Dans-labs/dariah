import React from 'react'

/**
 * **purely functional** {@link external:Component|Component}
 *
 * Displays a contribution record in a table row.
 * Just the title.
 *
 * @constructor
 * @param {Object} row A record of data from the contributions table
 * @returns {Fragment}
 */
const Contrib = ({ row }) => (
  <tr id={row._id}>
    <td>{row.title}</td>
  </tr>
)

export default Contrib
