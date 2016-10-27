import React, { Component } from 'react'
import  NavLink  from '../pure/NavLink.jsx'
import  Login from '../pure/Login.jsx'
import Notification from './Notification.jsx'
import { getData } from '../helpers/data.js'

const showMe = element => element.style.display = 'block';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    getData({
        user: 'user',
      },
      this,
      this.props.route.globals.notification,
    );
  }
  render() {
    return (
      <div>
        <Notification globals={this.props.route.globals}/>
        <p className="nav" style={{paddingRight: '5em'}}>
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
          {this.state.user != undefined ? (
            <Login
              user={this.state.user}
            />
          ) : ''}
        </p>
        {this.props.children}
      </div>
    )
  }
}

