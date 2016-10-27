import React, { Component } from 'react'
import  NavLink  from './NavLink.jsx'
import  Login from './Login.jsx'
import Messages from './Messages.jsx'
import { getUser } from '../helpers/data.js'

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {msgs: []};
  }
  componentDidMount() {
    getUser(this.setState.bind(this), (()=>this.state).bind(this));
  }
  render() {
    const { msgs } = this.state;
    return (
      <div>
        <p className="nav">
          <NavLink to="/home/about">
            <img style={{
                marginBottom: '-1em',
                marginTop: '-1em',
                height: "3em",
              }}
              src="/static/images/inkind_logo_small.png"
              title="information about this site"
            />
            </NavLink>
          <NavLink to="/contrib">Contributions</NavLink>
          {this.state.user != undefined ? (
            <Login
              user={this.state.user}
            />
          ) : ''}
        </p>
        {this.state.user == undefined ? <Messages data={msgs}/> : ''}
        {this.props.children}
      </div>
    )
  }
}

