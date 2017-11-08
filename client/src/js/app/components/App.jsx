import React from 'react'
import { connect } from 'react-redux'

import { getWinDim } from 'win'

import ErrorBoundary from 'ErrorBoundary'
import Login from 'Login'
import Static from 'Static'
import Notification from 'Notification'

const App = ({ children, win }) => {
  const { height, width } = win
  const text = `${width} x ${height}`
  return (
    <div>
      <ErrorBoundary>
        <Notification />
      </ErrorBoundary>
      <p className={'nav small top'} >
        <img
          src={'/static/images/inkind_logo_small.png'}
          title={'information about this site'}
        />
        <ErrorBoundary>
          <Static />
        </ErrorBoundary>
        <span className={'resize'} title={text}>{text}</span>
        <ErrorBoundary>
          <Login />
        </ErrorBoundary>
      </p>
      <ErrorBoundary>{children}</ErrorBoundary>
    </div>
  )
}

export default connect(getWinDim)(App)
