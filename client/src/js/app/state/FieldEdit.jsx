import React from 'react'
import { connect } from 'react-redux'
import { Field, FieldArray } from 'redux-form'

import { validation, normalization, getValType } from 'fields'
import { getTables } from 'tables'

import InputMulti from 'InputMulti'
import RelSelect from 'RelSelect'

const FieldEdit = ({ field, tables, table, eId, ...props }) => {
  const { [table]: { fieldSpecs } } = tables
  const { [field]: { valType, valid, multiple } } = fieldSpecs
  if (typeof valType == 'string') {
    const typing = getValType(valType)
    const { component, type } = typing
    const { [valid || valType]: validate } = validation
    const { [valid || valType]: normalize } = normalization
    if (multiple) {
      return (
        <FieldArray
          name={field}
          component={InputMulti}
          componentSingle={component}
          validateSingle={validate}
          normalizeSingle={normalize}
          table={table}
          eId={eId}
          type={type}
          {...props}
        />
      )
    }
    else {
      return (
        <Field
          name={field}
          component={component}
          validate={validate}
          normalize={normalize}
          table={table}
          eId={eId}
          type={type}
          {...props}
        />
      )
    }
  }
  else {
    const { allowNew } = valType
    const tag = `${table}-${eId}-${field}`
    return (
      <span>
        <Field
          name={field}
          component={RelSelect}
          tag={tag}
          field={field}
          multiple={multiple}
          allowNew={allowNew}
          table={table}
          eId={eId}
          {...props}
        />
      </span>
    )
  }
}

export default connect(getTables)(FieldEdit)
