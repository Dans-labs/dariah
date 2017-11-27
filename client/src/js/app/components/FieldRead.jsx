//import React from 'react'
import { connect } from 'react-redux'

import { emptyO } from 'utils'
import { compileActive } from 'workflow'
import { wrappedRepr } from 'values'

import { getSettings } from 'settings'

const FieldRead = ({ settings, tables, table, field, relField, myValues }) => {
  const { [table]: { fieldSpecs } } = tables
  const { [field]: { valType, multiple } } = fieldSpecs
  const { inactive = null } = typeof valType === 'object' ? valType : emptyO
  const activeItems = inactive ? compileActive(tables, field) : null
  return wrappedRepr(tables, table, field, valType, multiple, relField, activeItems, inactive, myValues, settings)
}

export default connect(getSettings)(FieldRead)
