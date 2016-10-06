import React, { Component, PropTypes } from 'react';

export default class Facet extends Component {
  constructor(props) {
    super(props);
  }
  handleChange(event) {
    this.props.updateFacet(this.props.mid, !this.props.checked);
  }
  render () {
    return (
      <span>
        <input
          type="checkbox"
          onChange={this.handleChange.bind(this)}
          checked={this.props.checked}
        />
        {` ${this.props.meta}`}
      </span>
    )
  }
}

Facet.propTypes = {
  mid: PropTypes.string.isRequired,
  meta: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
}

