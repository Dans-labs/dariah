import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'

import { getWinDim } from 'win'

import ErrorBoundary from 'ErrorBoundary'
import Login from 'Login'
import Static from 'Static'
import Notification from 'Notification'
import Tooltip from 'Tooltip'
import TooltipSwitch from 'TooltipSwitch'
import SubApp from 'SubApp'
import Doc from 'Doc'
import NotFound from 'NotFound'

const App = ({ win }) => {
  const { height, width } = win
  const text = `${width} x ${height}`
  return (
    <ErrorBoundary>
      <ErrorBoundary>
        <Notification />
      </ErrorBoundary>
      <div className={'topnavbar'}>
        <Tooltip tip={'information about this site'} at={'right'}>
          <span className={'logo-container'}>
            <img src={'/static/images/inkind_logo_small.png'} />
          </span>
        </Tooltip>
        <ErrorBoundary>
          <Static />
        </ErrorBoundary>
        <TooltipSwitch />
        <Tooltip tip={`current window size: ${text} pixels`} at={'bottom'}>
          <span className={'resize'}>{text}</span>
        </Tooltip>
        <ErrorBoundary>
          <Login />
        </ErrorBoundary>
      </div>
      <ErrorBoundary>
        <Switch>
          <Redirect exact={true} from={'/'} to={'/docs/about.md'} />
          <Redirect exact={true} from={'/docs'} to={'/docs/about.md'} />
          <Redirect exact={true} from={'/about'} to={'/docs/about.md'} />
          <Redirect exact={true} from={'/docs/about'} to={'/docs/about.md'} />
          <Route path={'/docs/:docFile'} component={Doc} />
          <Route path={'/tech/docs/gen/:docFile'} component={Doc} />
          <Route path={'/tech/docs/:docFile'} component={Doc} />
          <Route path={'/data'} component={SubApp} />
          <Route path={'*'} component={NotFound} />
        </Switch>
      </ErrorBoundary>
    </ErrorBoundary>
  )
}
  /*
          <Redirect push={true} from={'/login'} to={'/docs/about.md'} />
          <Redirect push={true} from={'/logout'} to={'/docs/about.md'} />
          <Redirect push={true} from={'/slogout'} to={'/docs/about.md'} />
  */
export default connect(getWinDim)(withRouter(App))
