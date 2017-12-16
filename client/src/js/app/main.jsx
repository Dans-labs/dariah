import React from 'react'
import { render } from 'react-dom'
import {
  Router,
  Route,
  Redirect,
  IndexRoute,
  IndexRedirect,
  browserHistory,
} from 'react-router'

import { ALLIDS, MYIDS } from 'tables'

import Root from 'Root'
import App from 'App'
import SubApp from 'SubApp'
import WorkflowInfo from 'WorkflowInfo'
import ListContainer from 'ListContainer'
import Doc from 'Doc'
import NotFound from 'NotFound'
import ErrorBoundary from 'ErrorBoundary'

render(
  <Root>
    <ErrorBoundary>
      <Router history={browserHistory}>
        <Redirect from={'/about'} to={'/docs/about.md'} />
        <Redirect from={'/docs/about'} to={'/docs/about.md'} />
        <Redirect from={'/about.md'} to={'/docs/about.md'} />
        <Redirect from={'/login'} to={'/docs/about.md'} />
        <Redirect from={'/logout'} to={'/docs/about.md'} />
        <Redirect from={'/slogout'} to={'/docs/about.md'} />
        <Route path={'/'} component={App}>
          <IndexRoute component={App} />
          <IndexRedirect to={'/docs/about.md'} />
          <Route path={'docs/:docFile'} component={Doc} />
          <Route path={'tech/docs/gen/:docFile'} component={Doc} />
          <Route path={'tech/docs/:docFile'} component={Doc} />
          <Route path={'data'} component={SubApp}>
            <Route path={'workflow'} component={WorkflowInfo} />
            <Route path={':table'}>
              <Route
                path={'mylist(/item/:eId)'}
                component={ListContainer}
                select={MYIDS}
                mode={'list'}
              />
              <Route
                path={'myassign(/item/:eId)'}
                component={ListContainer}
                select={MYIDS}
                extra={true}
                mode={'list'}
              />
              <Route
                path={'list(/item/:eId)'}
                component={ListContainer}
                select={ALLIDS}
                mode={'list'}
              />
              <Route
                path={'grid(/item/:eId)'}
                component={ListContainer}
                select={ALLIDS}
                mode={'grid'}
              />
              <Route
                path={'filter(/item/:eId)'}
                component={ListContainer}
                select={ALLIDS}
                mode={'list'}
                filtered={true}
              />
              <Route
                path={'stats'}
                component={ListContainer}
                select={ALLIDS}
                mode={'stats'}
                filtered={false}
              />
            </Route>
          </Route>
        </Route>
        <Route path={'*'} component={NotFound} />
      </Router>
    </ErrorBoundary>
  </Root>,
  document.getElementById('body'),
)
