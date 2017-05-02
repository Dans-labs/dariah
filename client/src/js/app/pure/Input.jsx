import React from 'react'

import { editClass } from 'utils'

const Input = ({ meta: { dirty, invalid, error }, input, type }) => (
  <span>
    <input type={type} className={editClass(dirty, invalid)} {...input} />
    {error && <span className="invalid diag">{error}</span>}
  </span>
)

export default Input
