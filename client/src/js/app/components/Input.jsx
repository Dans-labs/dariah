import React from 'react'

import { emptyO } from 'utils'
import { editClass } from 'edit'
import { makeSubmit, makeSubmitTime, makeReset } from 'fields'

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
  const className = type == 'checkbox'
  ? emptyO
  : { className: 'wideInput' }
  return (
    <div
      {...rh}
      {...className}
    >
      <input
        type={type}
        className={editClass(dirty, invalid)}
        {...input}
        {...onAction}
        {...onCancel}
      />
      {error && <span className={'invalid diag'}>{error}</span>}
    </div>
  )
}

export default withEditHelp(Input, TooltipContainer, EditHelp, 'text', 'bottom')
