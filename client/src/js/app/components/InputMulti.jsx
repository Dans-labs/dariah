import React from 'react'
import { Field } from 'redux-form'

import { editClass } from 'fields'

const fieldRemove = (fields, i) => () => {fields.remove(i)}
const fieldPush = fields => () => {fields.push()}
/* N.B.
 * fieldRemove and fieldPush MUST NOT be memoized.
 * Otherwise they may become bound to the wrong form.
 * This happens if you navigate with react-router between forms.
 */

const InputMulti = ({
  componentSingle, validateSingle, normalizeSingle,
  meta: { dirty, invalid, error },
  fields, table, eId, name, valType,
  ...props
}) => (
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
          {...props}
        />
        <span
          className={'button-small fa fa-trash'}
          data-rh={'remove'}
          onClick={fieldRemove(fields, i)}
        />
      </div>
    )}
    <div
      className={'button-small fa fa-plus multi-control'}
      data-rh={'more entries'}
      onClick={fieldPush(fields)}
    />
    {error && <p className={'invalid diag'}>{error}</p>}
  </div>
)

export default InputMulti
