import React from 'react'
import { connect } from 'react-redux'
import { Field, FieldArray } from 'redux-form'

import { makeComponent } from 'utils.js'
import { validation, normalization, getValType } from 'fields.js'
import { getTables } from 'tables.js'

import InputMulti from 'InputMulti.jsx'
//import SelectR from 'SelectR.jsx'
import RelSelect from 'RelSelect.jsx'

const FieldEdit = ({ field, tables, table, ...props }) => {
  const { [table]: { fieldSpecs } } = tables
  const { [field]: { valType, multiple } } = fieldSpecs
  if (typeof valType == 'string') {
    const typing = getValType(valType)
    const { type } = typing
    let { component } = typing
    if (typeof component != 'string') {
      component = makeComponent(component, { field, type, ...props })
    }
    const { [valType]: validate } = validation
    const { [valType]: normalize } = normalization
    if (multiple) {
      return (
        <FieldArray
          name={field}
          component={
            makeComponent(InputMulti, {
              component,
              type,
              validate,
              normalize,
            })
          }
          {...props}
        />
      )
    }
    else {
      return (
        <Field
          name={field}
          component={component}
          type={type}
          validate={validate}
          normalize={normalize}
          {...props}
        />
      )
    }
  }
  else {
    const { allowNew } = valType
    const { eId } = props
    const tag = `${table}-${eId}-${field}`
    const params = {
      table,
      eId,
      field,
      tag,
      multiple,
      allowNew,
    }
    return (
      <span>
        <Field
          name={field}
          component={makeComponent(RelSelect, { ...params })}
        />
      </span>
    )
  }
}

export default connect(getTables)(FieldEdit)
