import React from 'react'
import { connect } from 'react-redux'
import Markdown from 'react-markdown'

import { getTables, repr } from 'tables'

const FieldRead = ({ field, tables, table, myValues }) => {
  const { [table]: { fieldSpecs } } = tables
  const { [field]: { valType, multiple } } = fieldSpecs
  const isArea = valType == 'textarea'
  const sep = isArea ? '\n\n' : ' | '
  const myRepr = multiple ?
    (myValues || []).map(value => repr(tables, table, valType, value)).join(sep) :
    repr(tables, table, valType, myValues)
  return isArea ?
    <Markdown source={myRepr} /> :
    <span>{myRepr}</span>
}

export default connect(getTables)(FieldRead)
