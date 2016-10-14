import React, { Component, PropTypes } from 'react';

export default class CheckboxI extends Component {
  constructor(props) {
    super(props);
  }
  handleChange(event) {
    if (this.refs.ci.indeterminate) {
      this.props.updateFacet(null, true);
    }
    else {
      this.props.updateFacet(null, !this.props.states.allTrue);
    }
  }
  componentDidMount() {
    this.refs.ci.indeterminate = !this.props.states.allTrue && !this.props.states.allFalse;
  }
  componentDidUpdate() {
    this.refs.ci.indeterminate = !this.props.states.allTrue && !this.props.states.allFalse;
  }
  render () {
    return (
      <input
          ref="ci"
          type="checkbox"
          onChange={this.handleChange.bind(this)}
          checked={this.props.states.allTrue}
      />
    )
  }
}

CheckboxI.propTypes = {
  states: PropTypes.shape({
    allFalse: PropTypes.bool,
    allTrue: PropTypes.bool,
  }).isRequired,
}


