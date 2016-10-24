import React, { PropTypes, Component } from 'react'

/*
 * A choice between several alternatives, with controls to click to the next alternative.
 * Pass an array of alternatives and an array of controls of equal length.
 * The alternatives are react objects to choose from.
 * The controls must be inline elements.
 * They will be placed in a context defined by the controlPlacement function, which
 * must also be passed as a prop.
 * Or rather, they are functions that take a handler and return an online element.
 * The state is an integer corresponding to the array index of the alternative that is chosen.
 * A click on a control increases the state by 1 modulo the number of alternatives.
 * Upon constructing, an initial state may be passed. Default: 0.
 *
 * Handy for:
 * 1. show/hide a component: pass as alternatives the component plus an empty <div>
 * 2. view alternative representations of a resource
*/

export default class AlternativesContainer extends Component {
  constructor(props) {
    super();
    this.state = {alt: props.initial || 0};
  }
  next(event) {
    event.preventDefault();
    const n = this.props.alternatives.length
    this.setState({alt: (this.state.alt + 1) % n})
  }
  render() {
    const { controlPlacement, controls, alternatives } = this.props;
    const alt = this.state.alt;
    return (
      <div>
        {controlPlacement(controls[alt](this.next.bind(this)))}
        {alternatives[alt]}
      </div>
    )
  }
}

AlternativesContainer.propTypes = {
  initial: PropTypes.number,
  controlPlacement: PropTypes.func.isRequired,
  controls: PropTypes.array.isRequired,
  alternatives: PropTypes.array.isRequired,
}

