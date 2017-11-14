import React from 'react'

import { editClass, makeSubmit, makeSubmitTime } from 'fields'

export default ({ meta: { dirty, invalid, submitting, error }, input, type, submitValues }) => {
  const submit = type === 'checkbox'
  ? makeSubmitTime(submitValues)
  : makeSubmit(dirty, invalid, submitting, submitValues)
  const onAction = type === 'checkbox'
  ? { onClick: submit }
  : { onBlur: submit }
  return (
    <span>
      <input
        type={type}
        className={editClass(dirty, invalid)}
        {...input}
        {...onAction}
      />
      {error && <span className={'invalid diag'}>{error}</span>}
    </span>
  )
}
