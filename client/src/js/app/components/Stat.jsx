import React from 'react'

import { emptyS } from 'utils'

const Stat = ({subTotal, total, className}) => (
  <span className={className} >
    {subTotal == null ? emptyS : `${subTotal}`}
    {(total == null || subTotal == null) ? emptyS : ' of '}
    <strong>{total == null ? emptyS : `${total}`}</strong>
  </span>
)

export default Stat
