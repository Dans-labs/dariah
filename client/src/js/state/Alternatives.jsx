import React, { PropTypes, Component } from 'react'
import { withContext } from '../helpers/hoc.js'

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

class Alternatives extends Component {
  constructor(props) {
    super();
    const { tag, store } = props;
    this.store = store;
    this.key = 'Alternatives.'+tag;
    this.store.register(this, this.key, {});
  }
  componentWillUnmount() {
    this.store.save(this.key);
  }
  next(event) {
    event.preventDefault();
    const { alternatives, tag, initial } = this.props;
    const newAlt = ((this.state[tag] || initial || 0) + 1) % alternatives.length; 
    this.setState({...this.state, [tag]: newAlt});
  }
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

export default withContext(Alternatives)
