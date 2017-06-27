import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Redirect, IndexRoute, IndexRedirect, browserHistory } from 'react-router'

import { ALLIDS, MYIDS } from 'tables'

import Root from 'Root'
import App from 'App'
import SubApp from 'SubApp'
import Overview from 'Overview'
import ListContainer from 'ListContainer'
import Doc from 'Doc'
import NotFound from 'NotFound'

render(
  <Root>
    <Router history={browserHistory}>
      <Redirect from={'/about'} to={'/docs/about.md'} />
      <Redirect from={'/docs/about'} to={'/docs/about.md'} />
      <Redirect from={'/about.md'} to={'/docs/about.md'} />
      <Redirect from={'/login'} to={'/docs/about.md'} />
      <Redirect from={'/logout'} to={'/docs/about.md'} />
      <Redirect from={'/slogout'} to={'/docs/about.md'} />
      <Route path={'/'} component={App} >
        <IndexRoute component={App} />
        <IndexRedirect to={'/docs/about.md'} />
        <Route path={'docs/:docFile'} component={Doc} />
        <Route path={'tech/docs/gen/:docFile'} component={Doc} />
        <Route path={'tech/docs/:docFile'} component={Doc} />
        <Route path={'data'} component={SubApp} >
          <Route path={'overview'} component={Overview} />
          <Route path={':table'} >
            <Route path={'mylist(/item/:eId)'} component={ListContainer} select={MYIDS} mode={'list'} />
            <Route path={'list(/item/:eId)'} component={ListContainer} select={ALLIDS} mode={'list'} />
            <Route path={'grid(/item/:eId)'} component={ListContainer} select={ALLIDS} mode={'grid'} />
            <Route path={'filter(/item/:eId)'} component={ListContainer} select={ALLIDS} mode={'list'} filtered={true} />
          </Route>
        </Route>
      </Route>
      <Route path={'*'} component={NotFound} />
    </Router>
  </Root>
  ,
  document.getElementById('body')
)

