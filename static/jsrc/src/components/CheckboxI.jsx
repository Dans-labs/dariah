import React, { Component, PropTypes } from 'react';

export default class CheckboxI extends Component {
  handleChange(event) {
    const {
        filterId,
        states,
        updFilter,
    } = this.props;
    if (this.refs.ci.indeterminate) {
      updFilter(filterId, true);
    }
    else {
      updFilter(filterId, !states.allTrue);
    }
  }
  componentDidMount() {
    const {
      states,
    } = this.props;
    this.refs.ci.indeterminate = !states.allTrue && !states.allFalse;
  }
  componentDidUpdate() {
    const {
      states,
    } = this.props;
    this.refs.ci.indeterminate = !states.allTrue && !states.allFalse;
  }
  render () {
    const {
      states,
    } = this.props;
    return (
      <input
          ref="ci"
          type="checkbox"
          onChange={this.handleChange.bind(this)}
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


