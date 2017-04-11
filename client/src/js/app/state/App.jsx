import React from 'react'
import { connect } from 'react-redux'

import { getWinDim } from 'win.js'

import Login from 'Login.jsx'
import NavLink from 'NavLink.jsx'
import Static from 'Static.jsx'
import Notification from 'Notification.jsx'

const App = ({ children, height, width }) => {
  const text = `${width} x ${height}`
  return (
    <div>
      <Notification />
      <p className="nav small top" >
        <img
          src="/static/images/inkind_logo_small.png"
          title="information about this site"
        />
        <NavLink to="/contrib" >{'Contributions'}</NavLink>
        <span>{'yw'}</span>
        <NavLink to="/backoffice" >{'Backoffice'}</NavLink>
        <Static />
        <span className="resize" title={text}>{text}</span>
        <Login />
      </p>
      <div>{children}</div>
    </div>
  )
}

export default connect(getWinDim)(App)
