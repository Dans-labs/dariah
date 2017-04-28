import React from 'react'
import { Field } from 'redux-form'

import { memoize } from 'memo.js'
import { editClass } from 'utils.js'

const fieldRemove = memoize((fields, i) => () => {fields.remove(i)})
const fieldPush = memoize(fields => () => {fields.push()})

const InputMulti = ({ component, type, validate, normalize, fields, meta: { dirty, invalid, error }, ...props }) => (
  <div className={editClass(dirty, invalid)}>
    {fields.map((name, i) =>
      <p key={i} className="multi">
        <Field
          name={name}
          type={type}
          component={component}
          validate={validate}
          normalize={normalize}
          label={i}
          {...props}
        />
        <span
          className="button-small fa fa-close"
          title="remove"
          onClick={fieldRemove(fields, i)}
        />
      </p>
    )}
    <p>
      <span
        className="button-small fa fa-plus"
        onClick={fieldPush(fields)}
      />
    </p>
    {error && <p className="invalid diag">{error}</p>}
  </div>
)

export default InputMulti
