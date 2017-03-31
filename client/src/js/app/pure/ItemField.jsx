import React, { Component } from 'react'
import { connect } from 'react-redux'
import { combineSelectors } from 'reducers.js'
import { getUser, getCountry } from 'tables.js'

const trimDate = text => ((text == null) ? '' : text.replace(/\.[0-9]+/, ''))

const userAsString = ({ _id: valId }, user) => {
  let valRep
  const { entities: { [valId]: entity } } = user
  if (entity) {
    const { values: { eppn, firstName, lastName, emailPre, authority, mayLogin } } = entity
    const email = emailPre || ''
    let linkText = [firstName || '', lastName || ''].filter(x => x).join(' ')
    if (linkText == '') {linkText = email}
    const namePart = (linkText && email) ? (
      `[${linkText}](mailto:${email})`
    ) : (
      linkText + email
    )
    const eppnPart = eppn ? ` eppn=${eppn} ` : ''
    const authorityPart = authority ? ` authenticated by=${authority} ` : ''
    const mayLoginPart = mayLogin ? ` active=${mayLogin} ` : ''
    valRep = [namePart, eppnPart, authorityPart, mayLoginPart].filter(x => x).join('; ')
  }
  else {valRep = 'UNKNOWN'}
  return valRep
}

const countryAsString = ({ _id: valId }, country) => {
  const { entities: { [valId]: entity } } = country
  if (entity) {
    const { values: { name, iso } } = entity
    return `${iso}: ${name}`
  }
  else {return 'UNKNOWN'}
}

const valueAsString = (value, { valType, convert, initial, user, country }) => {
  if (value == null) {return ''}
  switch (valType) {
    case 'rel': {
      switch (convert) {
        case 'user': return userAsString(value, user)
        case 'country': return countryAsString(value, country)
        default: return value.value
      }
    }
    case 'datetime': return trimDate(value)
    default: return value
  }
}

const ItemField = ({ label, values, valType, convert, initial, user, country }) => {
  const props = { valType, convert, initial, user, country }
  return (
    <p>
      <label><b>{label}:</b></label>{' '}
      {
        values.map((value, i) => (
          <span key={i}>{(i != 0)?' | ' : ''}<span>{valueAsString(value, props)}</span></span>
        ))
      }
    </p>
  )
}

export default connect(combineSelectors(getUser, getCountry))(ItemField)
