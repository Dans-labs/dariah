import React from 'react'
import { connect } from 'react-redux'
import { Field, FieldArray } from 'redux-form'

import { makeComponent } from 'utils.js'
import { validation, normalization, getValType } from 'fields.js'
import { getTables, repr } from 'tables.js'

import InputMulti from 'InputMulti.jsx'
//import SelectR from 'SelectR.jsx'
import RelSelect from 'RelSelect.jsx'

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
    const { [name]: valueList } = valueLists
    const options = valueList.map(option => ({ value: option, label: repr(tables, table, valType, option) }))
    const { eId } = props
    const tag = `${table}-${eId}-${name}`
    const params = {
      table,
      eId,
      name,
      tag,
      valueList,
      multiple,
      allowNew,
    }
    return (
      <span>
        <Field
          name={name}
          component={makeComponent(RelSelect, { options, ...params })}
        />
      </span>
    )
  }
}

export default connect(getTables)(FieldEdit)
