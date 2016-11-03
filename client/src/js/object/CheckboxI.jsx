import React, { Component, PropTypes } from 'react'

const indeterminate = states => !states.allTrue && !states.allFalse

/**
 * @class
 * @classdesc
 * **stateless, DOM-modifying** {@link external:Component|Component}
 */
export default class CheckboxI extends Component {
  componentDidMount() {
    const { states } = this.props;
    this.refs.ci.indeterminate = indeterminate(states);
  }
  componentDidUpdate() {
    const { states } = this.props;
    this.refs.ci.indeterminate = indeterminate(states);
  }
  render () {
    const { states, filterId, updFilter } = this.props;
    return (
      <input
          ref="ci"
          type="checkbox"
          onChange={event => updFilter(filterId, this.refs.ci.indeterminate || !states.allTrue)}
          checked={states.allTrue}
      />
    )
  }
}

CheckboxI.propTypes = {
  filterId: PropTypes.number.isRequired,
  states: PropTypes.shape({
    allFalse: PropTypes.bool,
    allTrue: PropTypes.bool,
  }).isRequired,
  updFilter: PropTypes.func,
}
