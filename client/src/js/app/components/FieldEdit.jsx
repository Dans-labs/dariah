import React from 'react'
import { connect } from 'react-redux'
import { Field, FieldArray } from 'redux-form'

import { compileActive } from 'workflow'
import { validation, normalization, getValType } from 'fields'

import InputMulti from 'InputMulti'
import RelSelect from 'RelSelect'

const FieldEdit = ({
  alter, field,
  tables, table, eId,
  dispatch, allowed,
  submitValues,
  ...props
}) => {
  const { [table]: { fieldSpecs } } = tables
  const { [field]: { valType, valid, multiple } } = fieldSpecs
  if (typeof valType === 'string') {
    const typing = getValType(valType)
    const { component, type, props: componentProps } = typing
    const { [valid || valType]: validate } = validation
    const { [valid || valType]: normalize } = normalization
    if (multiple) {
      return (
        <FieldArray
          name={field}
          component={InputMulti}
          componentSingle={component}
          {...componentProps}
          validateSingle={validate}
          normalizeSingle={normalize}
          tables={tables}
          table={table}
          eId={eId}
          type={type}
          valType={valType}
          rerenderOnEveryChange={true}
          submitValues={submitValues}
          {...props}
        />
      )
    }
    else {
      return (
        <Field
          name={field}
          component={component}
          {...componentProps}
          validate={validate}
          normalize={normalize}
          tables={tables}
          table={table}
          eId={eId}
          type={type}
          submitValues={submitValues}
          {...props}
        />
      )
    }
  }
  else {
    const { allowNew, popUpIfEmpty, inactive } = valType
    const activeItems = inactive ? compileActive(tables, field) : null
    const selectTag = `${table}-${eId}-${field}`
    return (
      <Field
        name={field}
        component={RelSelect}
        selectTag={selectTag}
        field={field}
        multiple={multiple}
        allowNew={allowNew}
        popUpIfEmpty={popUpIfEmpty}
        tables={tables}
        table={table}
        eId={eId}
        allowed={allowed}
        activeItems={activeItems}
        inactive={inactive}
        submitValues={submitValues}
        {...props}
      />
    )
  }
}

export default connect()(FieldEdit)
