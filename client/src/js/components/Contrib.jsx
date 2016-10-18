import React, { PropTypes } from 'react';

const Contrib = ({ row }) => (
  <tr id={row._id}>
    <td>{row.title}</td>
  </tr>
)

Contrib.propTypes = {
  row: PropTypes.object.isRequired,
}

export default Contrib
