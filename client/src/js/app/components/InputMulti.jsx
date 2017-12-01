import React from 'react'
import { Field } from 'redux-form'

import { makeSubmit, makeSubmitTime, editClass } from 'edit'

import Tooltip from 'Tooltip'

const fieldRemove = (fields, i, submit) => () => {fields.remove(i); submit()}
const fieldPush = (fields, submit) => () => {fields.push(); submit()}
/* N.B.
 * fieldRemove and fieldPush MUST NOT be memoized.
 * Otherwise they may become bound to the wrong form.
 * This happens if you navigate with react-router between forms.
 */

export default ({
  componentSingle, validateSingle, normalizeSingle,
  meta: { dirty, invalid, submitting, error },
  fields, table, eId, valType,
  nameC,
  reset, submitValues,
  ...props
}) => {
  const submit = makeSubmit(dirty, invalid, submitting, submitValues)
  const submitTime = makeSubmitTime(submitValues)
  return (
    <div
      className={`${editClass(dirty, invalid)} multi-field ${valType}`}
    >
      {fields.map((field, i) =>
        <div
          key={field}
          className={'multi-content'}
        >
          <Tooltip
            tip={'remove entry'}
            at={'left'}
          >
            <div
              className={'button medium'}
              onClick={fieldRemove(fields, i, submitTime)}
            >{'×'}</div>
          </Tooltip>
          <Field
            name={field}
            component={componentSingle}
            validate={validateSingle}
            normalize={normalizeSingle}
            label={i}
            table={table}
            eId={eId}
            reset={reset}
            submitValues={submit}
            {...props}
          />
        </div>
      )}
      <div
        className={'multi-content'}
      >
        <Tooltip
          tip={'more entries'}
          at={'left'}
        >
          <div
            className={'button medium'}
            onClick={fieldPush(fields, submitTime)}
          >{'+'}</div>
        </Tooltip>
      </div>
      {error && <p className={'invalid diag'}>{error}</p>}
    </div>
  )
}
