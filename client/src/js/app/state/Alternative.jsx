import React from 'react'
import { connect } from 'react-redux'

import { getAlt, nextAlt } from 'alter'

const handleNext = (tag, alternatives, initial, next) => event => {
  event.preventDefault()
  next(tag, alternatives.length, initial)
}

const Alternative = ({ controlPlacement, controls, alt, alternatives, className, tag, initial, next }) => (
  <div className={className}>
    {controlPlacement(controls[alt](handleNext(tag, alternatives, initial, next)))}
    {alternatives[alt]}
  </div>
)

export default connect(getAlt, { next: nextAlt })(Alternative)
