import React from 'react'
import { connect } from 'react-redux'

import ReactHintFactory from 'react-hint'
const ReactHint = ReactHintFactory(React)

import { memoize } from 'memo'

import { tooltip, getWinDim } from 'win'

import ErrorBoundary from 'ErrorBoundary'
import Login from 'Login'
import Static from 'Static'
import Notification from 'Notification'

const getTooltipContainer = memoize(dispatch => ref => {
  dispatch(tooltip(ref))
})

const App = ({ children, win, dispatch }) => {
  const { height, width } = win
  const text = `${width} x ${height}`
  return (
    <ErrorBoundary>
      <ReactHint events={true} delay={100} ref={getTooltipContainer(dispatch)} />
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
    </ErrorBoundary>
  )
}

export default connect(getWinDim)(App)
