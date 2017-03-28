import React, { Component } from 'react'
import { withContext, saveState } from 'hoc.js'
import { lsGet, lsSet } from 'localstorage.js'

const initAlt = ({ tag }) => ({alt: lsGet(tag)})

const switchAlt = (prevState, props) => {
  const { tag, alternatives, initial } = props
  const oldAlt = (prevState.alt == null) ? ((initial == null) ? 0 : initial) : prevState.alt
  const newAlt = (oldAlt + 1) % alternatives.length
  lsSet(tag, newAlt)
  return {alt: newAlt}
}

class Alternative extends Component {
  next = event => {
    event.preventDefault()
    this.setState(switchAlt)
  }
  render() {
    const {
      props: { controlPlacement, controls, alternatives, initial },
      state: { alt },
    } = this
    const altX = (alt == null) ? ((initial == null) ? 0 : initial) : alt
    return (
      <div>
        {controlPlacement(controls[altX](this.next))}
        {alternatives[altX]}
      </div>
    )
  }
}

export default withContext(saveState(Alternative, 'Alternative', initAlt))
