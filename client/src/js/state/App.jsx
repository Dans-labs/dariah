import React, { Component, PropTypes } from 'react'
import  Login from '../pure/Login.jsx'
import  NavLink  from '../pure/NavLink.jsx'
import Notification from './Notification.jsx'
import { withContext, saveState } from '../helpers/hoc.js'
import { getData } from '../helpers/data.js'
import { columnStyle } from '../helpers/ui.js'

const showMe = element => element.style.display = 'block';

class App extends Component {
  render() {
    return (
      <div>
        <Notification/>
        <p className="nav" style={{paddingRight: '5em'}}>
          <img style={{
              marginBottom: '-1em',
              marginTop: '-1em',
              height: "3em",
            }}
            src="/static/images/inkind_logo_small.png"
            title="information about this site"
          />
          <Login
            user={this.state.user}
          />
        </p>
        <div className="nav" style={columnStyle('left')}>
          <ul className="nav">
            <li><NavLink to="/contrib">Contributions</NavLink></li>
            <li><NavLink to="/doc/about">About</NavLink></li>
            <li><NavLink to="/doc/design">Design</NavLink></li>
            <li><NavLink to="/doc/deploy">Deploy</NavLink></li>
          </ul>
        </div>
        <div style={columnStyle('right')}>
          {this.props.children}
        </div>
      </div>
    )
  }
  componentDidMount() {
    getData({
        user: 'user',
      },
      this,
      this.props.notification.component,
    );
  }
}

export default withContext(saveState(App, 'App', {user: {}}))
