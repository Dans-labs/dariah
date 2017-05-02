import React from 'react'
import { connect } from 'react-redux'

import { getWinDim } from 'win'

import Login from 'Login'
import NavLink from 'NavLink'
import Static from 'Static'
import Notification from 'Notification'

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
