import React from 'react'

const Stat = ({subTotal, total}) => (
  <span className="good-o stat" >
    {subTotal == null ? '' : `${subTotal}`}
    {(total == null || subTotal == null) ? '' : ' of '}
    <strong>{total == null ? '' : `${total}`}</strong>
  </span>
)

export default Stat
