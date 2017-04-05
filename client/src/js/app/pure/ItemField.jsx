import React from 'react'
import { connect } from 'react-redux'
import { combineSelectors } from 'helpers.js'
import { getTables, repUser, repCountry } from 'tables.js'

const trimDate = text => ((text == null) ? '' : text.replace(/\.[0-9]+/, ''))

const valueAsString = (value, valType, tables) => {
  if (value == null) {return ''}
  if (typeof valType == 'string') {
    switch (valType) {
      case 'datetime': return trimDate(value)
      default: return value
    }
  }
  else {
    const { values: rel } = valType
    if (rel == 'values') {
      return value
    }
    else {
      switch (rel) {
        case 'user': return repUser(value, tables)
        case 'country': return repCountry(value, tables)
        default: return value
      }
    }
  }
}

const ItemField = ({ label, values, name, valType, multiple, tables }) => {
  const theValues = multiple ? values : [values]
  return (
    <p>
      <label><b>{`${label}:`}</b></label>{' '}
      {
        theValues.map((value, i) => (
          <span key={i}>{(i != 0) ? ' | ' : ''}<span>{valueAsString(value, valType, tables)}</span></span>
        ))
      }
    </p>
  )
}

export default connect(getTables)(ItemField)
