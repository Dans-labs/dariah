import React, { Component } from 'react'

const indeterminate = states => !states.allTrue && !states.allFalse

/**
 * @class
 * @classdesc
 * **stateless, DOM-modifying** {@link external:Component|Component}
 * Displays a *collective* checkbox for a filter with many facets.
 *
 *
 * Clicking on this box will collectively check and uncheck all associate
 * checkboxes.
 *
 * This checkbox can have an indeterminate state, if some but not all
 * of the associate checkboxes are checked.
 *
 * We have to resort to a DOM manipulation after rendering to get the
 * indeterminate state across.
 */

class CheckboxI extends Component {
  componentDidUpdate() {
    const { props: { states } } = this
    this.dom.indeterminate = indeterminate(states)
  }
/**
 * @method
 * @param {boolean[]} states Exactly two booleans, indicating whether the associate checkboxes
 * are all checked or all unchecked
 * @param {number} filterId The index of the filter in the filterList
 * @param {FilterCompute#updFilter} updFilter Callback to update the state when user event has occurred
 * @returns {Fragment}
*/
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
