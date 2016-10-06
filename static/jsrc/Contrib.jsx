import React, { Component, PropTypes } from 'react';

export default class Contrib extends Component {
  render() {
    return (
        <tr id={this.props.data._id}>
          <td>{this.props.data.title}</td>
        </tr>
    );
  }
}

Contrib.propTypes = {
  data: PropTypes.object.isRequired,
}

