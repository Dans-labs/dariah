import React from 'react'
import { connect } from 'react-redux'
import Markdown from 'react-markdown'

import { getTables, repr } from 'tables.js'

const FieldRead = ({ name, tables, table, myValues }) => {
  const { [table]: { fieldSpecs } } = tables
  const { [name]: { valType, multiple } } = fieldSpecs
  if (valType == 'textarea') {
    if (myValues == null || (multiple && myValues.length == 0)) {return ''}
    else {
      const myRepr = multiple ?
        myValues.map(value => repr(tables, table, valType, value)).join('\n\n') :
        repr(tables, table, valType, myValues)
      return <Markdown source={myRepr} />
    }
  }
  else {
    let myRepr
    if (multiple) {
      myRepr = (myValues || []).map(value => repr(tables, table, valType, value)).join(' | ')
    }
    else {
      myRepr = repr(tables, table, valType, myValues)
    }
    return <span>{myRepr}</span>
  }
}

export default connect(getTables)(FieldRead)
