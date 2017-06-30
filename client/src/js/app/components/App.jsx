import React from 'react'
import { connect } from 'react-redux'

import { getWinDim } from 'win'

import Login from 'Login'
import Static from 'Static'
import Notification from 'Notification'

const App = ({ children, win }) => {
  const { height, width } = win
  const text = `${width} x ${height}`
  return (
    <div>
      <Notification />
      <p className={'nav small top'} >
        <img
          src={'/static/images/inkind_logo_small.png'}
          title={'information about this site'}
        />
        <Static />
        <span className={'resize'} title={text}>{text}</span>
        <Login />
      </p>
      <div>{children}</div>
    </div>
  )
}

export default connect(getWinDim)(App)
