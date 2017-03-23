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

/**
 * @class
 * @classdesc
 * **stateful** {@link external:Component|Component}
 *
 * Displays one of a list of alternatives and
 * let the user cycle through the alternatives.
 *
 * Handy for:
 * * show/hide a component: pass as alternatives: `[component, <div>]`
 * * view alternative representations of a resource, e.g.
 * ```
 * [
 *    <div>{MarkDownSource}</div>,
 *    <div>{FormattedDoc}</div>
 * ]
 * ```
 *
 * The state maintains the number of the currently chosen alternative.
 * It resides in `state.alt`.
 */
class Alternative extends Component {
/**
 * @method
 * @param {string} tag An extra identification, to distinguish this instance of the class from others.
 * The tag will be used when the state of this component must be saved or loaded.
 * **NB:** The tag property will be injected into Alternative by the
 * {@link module:hoc.saveState|saveState} component enhancer.
 * @param {Component[]} alternatives A list of components to choose from
 * @param {number} initial The number of the initial alternative to be displayed
 * @returns {void} Updates the state: increases `state.alt`
 * (the number saying which alternative is active).
 * The increase is done cyclically modulo *n* = the number of alternatives.
*/
  next = event => {
    event.preventDefault()
    this.setState(switchAlt)
  }
/**
 * @method
 * @param {Component[]} alternatives A list of components to choose from
 * @param {Fragment[]} controls A list of DOM fragments that act as controllers.
 * `control[i]` corresponds to `alternative[i]` and is displayed with it.
 * Every individual control must be given as a function `handler => fragment`.
 * When the controls are placed, the control functions will be passed the
 * {@link Alternative#next|next} method in this class,
 * so that a click on the control eventually translates to a
 * call of {@link Alternative#next|next}.
 * @param {number} initial The number of the initial alternative to be displayed
 * @param {function} controlPlacement A function to put the control in place for each alternative.
 * In this way the caller can fine tune how exactly the control appears in relation to
 * the alternative component.
 * @returns {Fragment} The chosen alternative with its control.
 */
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
