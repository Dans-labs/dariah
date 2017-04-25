import React from 'react'
import { connect } from 'react-redux'
import { Field, FieldArray } from 'redux-form'

import { makeComponent } from 'utils.js'
import { validation, normalization, getValType } from 'fields.js'
import { getTables, repr } from 'tables.js'

import InputMulti from 'InputMulti.jsx'
import SelectR from 'SelectR.jsx'

const handleUpdate = (multi, onChange) => newVal => {
  const cleanVal = multi ?
    newVal.map(x => x.value) :
    newVal.value
  onChange(cleanVal)
}

const FieldEdit = ({ name, tables, table, ...props }) => {
  const { [table]: { fieldSpecs, valueLists } } = tables
  const { [name]: { valType, multiple } } = fieldSpecs
  if (typeof valType == 'string') {
    const typing = getValType(valType)
    const { type } = typing
    let { component } = typing
    if (typeof component != 'string') {
      component = makeComponent(component, { name, type, ...props })
    }
    const { [valType]: validate } = validation
    const { [valType]: normalize } = normalization
    if (multiple) {
      return (
        <FieldArray
          name={name}
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
          name={name}
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
    const options = valueLists[name].map(_id => ({ value: _id, label: repr(tables, table, valType, _id) }))
    const params = {
      name,
      multi: multiple,
      allowNew,
      noResultsText: '--none--',
      handle: handleUpdate,
    }
    return (
      <span>
        <Field
          name={name}
          component={makeComponent(SelectR, { options, ...params })}
        />
      </span>
    )
  }
}

export default connect(getTables)(FieldEdit)
