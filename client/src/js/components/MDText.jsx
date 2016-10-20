import React, {Component, PropTypes} from 'react'

export default class MDText extends Component {
  render() {
    return <div>{this.props.params.text}</div>
  }
}

