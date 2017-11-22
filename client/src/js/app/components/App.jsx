import React from 'react'
import { connect } from 'react-redux'

import { getWinDim } from 'win'

import ErrorBoundary from 'ErrorBoundary'
import Login from 'Login'
import Static from 'Static'
import Notification from 'Notification'
import Tooltip from 'Tooltip'
import TooltipSwitch from 'TooltipSwitch'

const App = ({ children, win }) => {
  const { height, width } = win
  const text = `${width} x ${height}`
  return (
    <ErrorBoundary>
      <ErrorBoundary>
        <Notification />
      </ErrorBoundary>
      <p className={'nav small top'} >
        <Tooltip
          tip={'information about this site'}
          at={'right'}
        >
          <img src={'/static/images/inkind_logo_small.png'} />
        </Tooltip>
        <ErrorBoundary>
          <Static />
        </ErrorBoundary>
        <Tooltip
          tip={`current window size: ${text} pixels`}
          at={'bottom'}
        >
          <span
            className={'resize'}
          >{text}</span>
        </Tooltip>
        <TooltipSwitch />
        <ErrorBoundary>
          <Login />
        </ErrorBoundary>
      </p>
      <ErrorBoundary>{children}</ErrorBoundary>
    </ErrorBoundary>
  )
}

export default connect(getWinDim)(App)
