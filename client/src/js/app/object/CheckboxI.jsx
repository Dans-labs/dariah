import React, { Component } from 'react'

const indeterminate = states => !states.allTrue && !states.allFalse

class CheckboxI extends Component {
  componentDidUpdate() {
    const { props: { states } } = this
    this.dom.indeterminate = indeterminate(states)
  }
  handleCheck = () => {
    const { props: {states, filterId, updFilter } } = this
    return updFilter(filterId, this.dom.indeterminate || !states.allTrue)
  }
  setIndeterminate = domElem => {
    const { props: { states } } = this
    if (domElem) {
      this.dom = domElem
      domElem.indeterminate = indeterminate(states)
    }
  }
  render() {
    const { props: { states } } = this
    return (
      <input
          ref={this.setIndeterminate}
          type="checkbox"
          checked={states.allTrue}
          onChange={this.handleCheck}
      />
    )
  }
}

export default CheckboxI
