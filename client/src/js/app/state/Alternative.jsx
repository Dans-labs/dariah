import React, { Component } from 'react'
import { connect } from 'react-redux'

import { memoize } from 'memo'

import { getAlt, nextAlt, setAlt } from 'alter'

const handleNext = memoize((tag, nAlternatives, initial, nextAlt, extraActions) => event => {
  if (event) {event.preventDefault()}
  nextAlt(tag, nAlternatives, initial)
  if (extraActions) {extraActions(nextAlt)}
})

const handleInit = memoize((tag, initial, setAlt, extraActions) => event => {
  event.preventDefault()
  setAlt(tag, initial)
  if (extraActions) {extraActions(setAlt)}
})

export const altNext = ({ tag, nAlternatives, initial, nextAlt, extraActions, dispatch }) => (
  handleNext(tag, nAlternatives, initial, (...params) => dispatch(nextAlt(...params)), extraActions)()
)

/*
const AltNextPure = ({ className, children, tag, nAlternatives, initial, nextAlt, extraActions }) => {
  //console.warn('ALTNEXT')
  return (
    <span
      className={className}
      onClick={handleNext(tag, nAlternatives, initial, nextAlt, extraActions)}
    >
      { children }
    </span>
  )
}
*/
class AltNextPure extends Component {
  render() {
    const { props: { className, children, tag, nAlternatives, initial, nextAlt, extraActions } } = this
    //console.warn('ALTNEXT')
    return (
      <span
        className={className}
        onClick={handleNext(tag, nAlternatives, initial, nextAlt, extraActions)}
      >
        { children }
      </span>
    )
  }
}
export const AltNext = connect(null, { nextAlt })(AltNextPure)

const altInitPure = ({ tag, initial, setAlt, extraActions }) => (
  handleInit(tag, initial, setAlt, extraActions)()
)
export const altInit = connect(getAlt, { setAlt })(altInitPure)

const AltInitPure = ({ className, children, tag, initial, setAlt, extraActions }) => (
  <span
    className={className}
    onClick={handleInit(tag, initial, setAlt, extraActions)}
  >
    { children }
  </span>
)
export const AltInit = connect(null, { setAlt })(AltInitPure)

const Alternative = ({ controlPlacement, controls, alt, alternatives, className, tag, initial, nextAlt }) => (
  <div className={className}>
    {controlPlacement ?
      controlPlacement(controls[alt](handleNext(tag, alternatives.length, initial, nextAlt))) :
      null
    }
    {alternatives[alt]}
  </div>
)

const AlternativeXPure = ({ alt, alternatives, className, tag, initial, nextAlt }) => (
  <div className={className}>
    {alternatives(alt)}
  </div>
)
export const AlternativeX = connect(getAlt, { nextAlt })(AlternativeXPure)

export default connect(getAlt, { nextAlt })(Alternative)
