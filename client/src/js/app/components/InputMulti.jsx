import React from 'react'
import { Field } from 'redux-form'

import { editClass, makeSubmit, makeSubmitTime } from 'fields'

const fieldRemove = (fields, i, submit) => () => {fields.remove(i); submit()}
const fieldPush = (fields, submit) => () => {fields.push(); submit()}
/* N.B.
 * fieldRemove and fieldPush MUST NOT be memoized.
 * Otherwise they may become bound to the wrong form.
 * This happens if you navigate with react-router between forms.
 */

const InputMulti = ({
  componentSingle, validateSingle, normalizeSingle,
  meta: { dirty, invalid, submitting, error },
  fields, table, eId, valType,
  nameC, submitValues,
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
          <Field
            name={field}
            component={componentSingle}
            validate={validateSingle}
            normalize={normalizeSingle}
            label={i}
            table={table}
            eId={eId}
            submitValues={submit}
            {...props}
          />
          <span
            className={'button-small fa fa-trash'}
            data-rh={'remove'}
            onClick={fieldRemove(fields, i, submitTime)}
          />
        </div>
      )}
      <div
        className={'button-small fa fa-plus multi-control'}
        data-rh={'more entries'}
        onClick={fieldPush(fields, submitTime)}
      />
      {error && <p className={'invalid diag'}>{error}</p>}
    </div>
  )
}

export default InputMulti
