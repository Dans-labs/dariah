import React from 'react'
import { connect } from 'react-redux'
import { getTables, repr } from 'tables.js'

const trimDate = text => ((text == null) ? '' : text.replace(/\.[0-9]+/, ''))

const valueAsString = (tables, table, valType, value) => {
  if (value == null) {return ''}
  if (typeof valType == 'string') {
    switch (valType) {
      case 'datetime': return trimDate(value)
      default: return value
    }
  }
  else {
    const { values: rel } = valType
    return repr(tables, rel, value)
  }
}

const ItemField = ({ tables, table, label, values, valType, multiple }) => {
  const theValues = multiple ? values : [values]
  return (
    <p>
      <label><b>{`${label}:`}</b></label>{' '}
      {
        theValues.map((value, i) => (
          <span key={i}>{(i != 0) ? ' | ' : ''}<span>{valueAsString(tables, table, valType, value)}</span></span>
        ))
      }
    </p>
  )
}

export default connect(getTables)(ItemField)
