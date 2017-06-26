import React from 'react'
import { connect } from 'react-redux'

import Markdown from 'react-markdown'

import { emptyO } from 'utils'
import { compileActive } from 'custom'
import { readonlyValue } from 'fields'

import { getSettings } from 'settings'

const FieldRead = ({ settings, tables, table, field, myValues }) => {
  const { [table]: { fieldSpecs } } = tables
  const { [field]: { valType, multiple } } = fieldSpecs
  const { inactive = null } = typeof valType == 'object' ? valType : emptyO
  const activeItems = inactive ? compileActive(tables, field) : null
  const rep = readonlyValue(tables, table, valType, multiple, activeItems, inactive, myValues, settings)

  return valType == 'textarea'
  ? multiple
    ? <div>{rep.map((r, i) => <Markdown key={i} source={r} />)}</div>
    : <Markdown source={rep} />
  : <span>{rep}</span>
}

export default connect(getSettings)(FieldRead)
