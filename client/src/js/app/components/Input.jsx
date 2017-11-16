import React from 'react'

import { editClass, makeSubmit, makeSubmitTime, makeReset } from 'fields'

import EditCancel from 'EditCancel'

export default ({
  meta: { dirty, invalid, submitting, error },
  input, type,
  reset, submitValues,
}) => {
  const submit = type === 'checkbox'
  ? makeSubmitTime(submitValues)
  : makeSubmit(dirty, invalid, submitting, submitValues)
  const onCancel = makeReset(type, reset)
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
        {...onCancel}
      />
      {error && <span className={'invalid diag'}>{error}</span>}
      <EditCancel dirty={dirty} />
    </span>
  )
}
