import React, {Component, PropTypes} from 'react'

export default class Login extends Component {
  render() {
    const msg = ' log in';
    return (<a style={{float: 'right'}} href="/login" className="fa fa-user">{msg}</a>)
  }
}


