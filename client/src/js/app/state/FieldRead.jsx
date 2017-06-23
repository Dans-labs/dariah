import React from 'react'
import Markdown from 'react-markdown'

import { emptyO } from 'utils'
import { compileActive } from 'custom'
import { readonlyValue } from 'fields'

const FieldRead = ({ field, tables, table, myValues }) => {
  const { [table]: { fieldSpecs } } = tables
  const { [field]: { valType, multiple } } = fieldSpecs
  const { inactive = null } = typeof valType == 'object' ? valType : emptyO
  const activeItems = inactive ? compileActive(tables, field) : null
  const rep = readonlyValue(tables, table, valType, multiple, activeItems, inactive, myValues)

  return valType == 'textarea'
  ? <Markdown source={rep} />
  : <span>{rep}</span>
}

export default FieldRead
