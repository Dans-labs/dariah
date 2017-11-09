import React from 'react'
import { connect } from 'react-redux'

import ReactHintFactory from 'react-hint'
const ReactHint = ReactHintFactory(React)

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
      <ReactHint events={true} delay={100} />
      <ErrorBoundary>
        <Notification />
      </ErrorBoundary>
      <p className={'nav small top'} >
        <img
          src={'/static/images/inkind_logo_small.png'}
          data-rh={'information about this site'}
          data-rh-at={'right'}
        />
        <ErrorBoundary>
          <Static />
        </ErrorBoundary>
        <span
          className={'resize'}
          data-rh={`current window size: ${text} pixels`}
          data-rh-at={'bottom'}
        >{text}</span>
        <ErrorBoundary>
          <Login />
        </ErrorBoundary>
      </p>
      <ErrorBoundary>{children}</ErrorBoundary>
    </div>
  )
}

export default connect(getWinDim)(App)
