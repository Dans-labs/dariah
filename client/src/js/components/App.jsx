import React, { Component } from 'react'
import  NavLink  from './NavLink.jsx'

export default class extends Component {
  render() {
    return (
      <div>
        <p className="nav">
          <NavLink to="/home/about">
            <img style={{
              marginBottom: '-1em',
              marginTop: '-1em',
              height: "3em",
              }} src="/static/images/inkind_logo_small.png"/>
            </NavLink>
          <NavLink to="/contrib">Contributions</NavLink>
          <a href="/login">Log in</a>
        </p>
        {this.props.children}
      </div>
    )
  }
}

