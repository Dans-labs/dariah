import React from 'react'

import { editClass, makeSubmit, makeSubmitTime, makeReset } from 'fields'

import { withEditHelp } from 'tooltip'

import TooltipContainer from 'TooltipContainer'
import EditHelp from 'EditHelp'

const Input = ({
  meta: { dirty, invalid, submitting, error },
  input, type,
  rh,
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
    <span
      {...rh}
    >
      <input
        type={type}
        className={editClass(dirty, invalid)}
        {...input}
        {...onAction}
        {...onCancel}
      />
      {error && <span className={'invalid diag'}>{error}</span>}
    </span>
  )
}

export default withEditHelp(Input, TooltipContainer, EditHelp, 'text', 'bottom')
