import React, { Component } from 'react'
import { withContext, saveState } from '../helpers/hoc.js'
import { lsHas, lsGet, lsSet } from '../helpers/localstorage.js'

const initAlt = ({ tag }) => ({alt: lsGet(tag)})

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
class Alternatives extends Component {
/**
 * @method
 * @param {string} tag An extra identification, to distinguish this instance of the class from others.
 * The tag will be used when the state of this component must be saved or loaded.
 * **NB:** The tag property will be injected into Alternatives by the 
 * {@link module:hoc.saveState|saveState} component enhancer.
 * @param {Component[]} alternatives A list of components to choose from
 * @param {number} initial The number of the initial alternative to be displayed
 * @returns {void} Updates the state: increases `state.alt`
 * (the number saying which alternative is active).
 * The increase is done cyclically modulo *n* = the number of alternatives.
*/
  next(event) {
    event.preventDefault();
    const { tag, alternatives, initial } = this.props;
    const oldAlt = (this.state.alt == null)?((initial == null)?0:initial):this.state.alt;
    const newAlt = (oldAlt + 1) % alternatives.length; 
    lsSet(tag, newAlt);
    this.setState({alt: newAlt});
  }
/**
 * @method
 * @param {Component[]} alternatives A list of components to choose from
 * @param {Fragment[]} controls A list of DOM fragments that act as controllers.
 * `control[i]` corresponds to `alternative[i]` and is displayed with it.
 * Every individual control must be given as a function `handler => fragment`.
 * When the controls are placed, the control functions will be passed the 
 * {@link Alternatives#next|next} method in this class,
 * so that a click on the control eventually translates to a 
 * call of {@link Alternatives#next|next}.
 * @param {number} initial The number of the initial alternative to be displayed
 * @param {function} controlPlacement A function to put the control in place for each alternative.
 * In this way the caller can fine tune how exactly the control appears in relation to
 * the alternative component.
 * @returns {Fragment} The chosen alternative with its control.
 */
  render() {
    const { controlPlacement, controls, alternatives, initial } = this.props;
    const stateAlt = this.state.alt;
    const alt = (stateAlt == null)?((initial == null)?0:initial):stateAlt;
    return (
      <div>
        {controlPlacement(controls[alt](this.next.bind(this)))}
        {alternatives[alt]}
      </div>
    )
  }
}

export default withContext(saveState(Alternatives, 'Alternatives', initAlt))
