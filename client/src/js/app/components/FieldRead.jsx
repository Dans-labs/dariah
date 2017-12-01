//import React from 'react'
import { connect } from 'react-redux'

import { combineSelectors, emptyO } from 'utils'
import { compileActive } from 'workflow'
import { wrappedRepr } from 'values'

import { getSettings } from 'settings'
import { getMe } from 'me'

const FieldRead = ({
  settings, me,
  tables, table, eId,
  field, relField,
  myValues,
}) => {
  const { [table]: { fieldSpecs } } = tables
  const { [field]: { valType, multiple } } = fieldSpecs
  const { inactive = null } = typeof valType === 'object' ? valType : emptyO
  const activeItems = inactive ? compileActive(tables, field) : null
  return wrappedRepr({
    settings, me,
    tables, table, eId,
    field, valType, multiple,
    relField,
    activeItems, inactive,
    values: myValues,
  })
}

const getInfo = combineSelectors(getMe, getSettings)

export default connect(getInfo)(FieldRead)
