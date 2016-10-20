import React, { Component } from 'react'
import  NavLink  from './NavLink.jsx'

export default class extends Component {
  render() {
    return (
      <div>
        <img style={{float:'right', marginBottom: '-1em', marginTop: '-1em'}} src="/static/images/inkind_logo_small.png"/>
        <p className="nav">
          <NavLink to="/home">DARIAH Contributions App</NavLink>
          <NavLink to="/" onlyActiveOnIndex={true}>Contributions</NavLink>
          <a href="/login">Log in</a>
        </p>
        {this.props.children}
      </div>
    )
  }
}

