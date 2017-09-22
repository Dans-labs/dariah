//import React from 'react'
import { connect } from 'react-redux'

import { emptyO } from 'utils'
import { compileActive } from 'workflow'
import { wrappedRepr } from 'fields'

import { getSettings } from 'settings'

const FieldRead = ({ settings, tables, table, field, relField, myValues }) => {
  const { [table]: { fieldSpecs } } = tables
  const { [field]: { valType, multiple } } = fieldSpecs
  const { inactive = null } = typeof valType === 'object' ? valType : emptyO
  const activeItems = inactive ? compileActive(tables, field) : null
  const repr = wrappedRepr(tables, table, valType, multiple, relField, activeItems, inactive, myValues, settings)
  return repr
}

export default connect(getSettings)(FieldRead)
