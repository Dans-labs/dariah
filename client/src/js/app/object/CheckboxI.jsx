import React, { Component } from 'react'
import { connect } from 'react-redux'

import { changeFacetAll, getFilterSetting, testAllChecks } from 'filter.js'

const indeterminate = states => !states.allTrue && !states.allFalse

class CheckboxI extends Component {
  componentDidUpdate() {
    const { props: { filterSetting } } = this
    const states = testAllChecks(filterSetting)
    this.dom.indeterminate = indeterminate(states)
  }
  handleCheck = () => {
    const { props: {filterSetting, table, filterId, handle } } = this
    const states = testAllChecks(filterSetting)
    return handle(table, filterId, this.dom.indeterminate || !states.allTrue)
  }
  setIndeterminate = domElem => {
    const { props: { filterSetting } } = this
    const states = testAllChecks(filterSetting)
    if (domElem) {
      this.dom = domElem
      domElem.indeterminate = indeterminate(states)
    }
  }
  render() {
    const { props: { filterSetting } } = this
    const states = testAllChecks(filterSetting)
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

export default connect(getFilterSetting, { handle: changeFacetAll })(CheckboxI)
