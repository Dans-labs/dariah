import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Redirect, IndexRoute, IndexRedirect, browserHistory } from 'react-router'

import Root from 'Root'
import App from 'App'
import SubApp from 'SubApp'
import Backoffice from 'Backoffice'
import ListContainer from 'ListContainer'
import Doc from 'Doc'
import NotFound from 'NotFound'

render(
  <Root>
    <Router history={browserHistory}>
      <Redirect from="/about" to="/docs/about.md" />
      <Redirect from="/docs/about" to="/docs/about.md" />
      <Redirect from="/about.md" to="/docs/about.md" />
      <Redirect from="/login" to="/docs/about.md" />
      <Redirect from="/logout" to="/docs/about.md" />
      <Redirect from="/slogout" to="/docs/about.md" />
      <Route path="/" component={App} >
        <IndexRoute component={App} />
        <IndexRedirect to="/docs/about.md" />
        <Route path="docs/:docFile" component={Doc} />
        <Route path="tech/docs/gen/:docFile" component={Doc} />
        <Route path="tech/docs/:docFile" component={Doc} />
        <Route path="data" >
          <Route path=":table" component={SubApp} >
            <Route path="list" component={ListContainer} select={'allIds'} mode={'list'} filtered={true} />
            <Route path="mylist" component={ListContainer} select={'myIds'} mode={'list'} />
          </Route>
        </Route>
        <Route path="backoffice" component={Backoffice} >
          <Route path=":table" >
            <Route path="grid" component={ListContainer} select={'allIds'} mode={'grid'} />
            <Route path="list" component={ListContainer} select={'allIds'} mode={'list'} />
          </Route>
        </Route>
      </Route>
      <Route path="*" component={NotFound} />
    </Router>
  </Root>
  ,
  document.getElementById('body')
)

