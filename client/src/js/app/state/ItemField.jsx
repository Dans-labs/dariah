import React from 'react'
import { connect } from 'react-redux'

import { getTables, repr } from 'tables.js'

const ItemField = ({ tables, table, label, values, valType, multiple }) => {
  const theValues = multiple ? values : [values]
  return (
    <p>
      <label><b>{`${label}:`}</b></label>{' '}
      {
        theValues.map((value, i) => (
          <span key={i}>{(i != 0) ? ' | ' : ''}<span>{repr(tables, table, valType, value)}</span></span>
        ))
      }
    </p>
  )
}

export default connect(getTables)(ItemField)
