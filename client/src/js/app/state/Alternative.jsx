import React from 'react'
import { connect } from 'react-redux'

import { getAlt, nextAlt } from 'alter.js'

const handleNext = ({ tag, alternatives, initial, next }) => event => {
  event.preventDefault()
  next(tag, alternatives.length, initial)
}

const Alternative = ({ controlPlacement, controls, alt, alternatives, ...rest }) => (
  <div>
    {controlPlacement(controls[alt](handleNext({ alternatives, ...rest })))}
    {alternatives[alt]}
  </div>
)

export default connect(getAlt, { next: nextAlt })(Alternative)
