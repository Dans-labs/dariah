import React from 'react'

import { editClass, makeSubmit } from 'fields'

const Input = ({ meta: { dirty, invalid, submitting, error }, input, type, submitValues }) => (
  <span>
    <input
      type={type}
      className={editClass(dirty, invalid)}
      {...input}
      onBlur={makeSubmit(dirty, invalid, submitting, submitValues)}
    />
    {error && <span className={'invalid diag'}>{error}</span>}
  </span>
)

export default Input
