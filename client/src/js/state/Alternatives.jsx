import React, { PropTypes, Component } from 'react'
import { withContext, saveState } from '../helpers/hoc.js'

/**
 * @class
 * @classdesc
 * **stateful** {@link external:Component|Component}
 *
 * Displays one of a list of alternatives
 * let the user cycle through the alternatives.
 *
 * Handy for:
 * * show/hide a component: pass as alternatives the component plus an empty <div>
 * * view alternative representations of a resource
 */
class Alternatives extends Component {
  next(event) {
    event.preventDefault();
    const { alternatives, tag, initial } = this.props;
    const newAlt = ((this.state[tag] || initial || 0) + 1) % alternatives.length; 
    this.setState({...this.state, [tag]: newAlt});
  }
/**
 * @method
 * @param {string} tag An extra identification, to distinguish this instance of the class from others
 * @param {Component[]} alternatives A list of components to choose from
 * @param {Fragment[]} controls A list of DOM fragments that act as controllers.
 * `control[i]` corresponds to `alternative[i]` and is displayed with it.
 * A click on the control should cause the interface to replace `alternative[i]`
 * by `alternative[i+1 % n]` where `n` is the number of alternatives. 
 * @param {number} initial The number of the initial alternative to be displayed
 * @param {function} controlPlacement A function to put the control in place for each alternative.
 * In this way the caller can fine tune how exactly the control appears in relation to
 * the alternative component.
 * @returns {DOM} The chosen alternative with its control. The choice is remembered in the state, 
 * keyed by `tag`.
 */
  render() {
    const { controlPlacement, controls, alternatives, tag, initial } = this.props;
    const alt = this.state[tag] || initial || 0;
    return (
      <div>
        {controlPlacement(controls[alt](this.next.bind(this)))}
        {alternatives[alt]}
      </div>
    )
  }
}

Alternatives.propTypes = {
  initial: PropTypes.number,
  controlPlacement: PropTypes.func.isRequired,
  controls: PropTypes.array.isRequired,
  alternatives: PropTypes.array.isRequired,
}

export default withContext(saveState(Alternatives, 'Alternatives', {}))
