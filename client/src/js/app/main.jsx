import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Redirect, IndexRoute, IndexRedirect, browserHistory } from 'react-router'

import Root from 'Root'
import App from 'App'
import SubApp from 'SubApp'
import Backoffice from 'Backoffice'
import ItemFiltered from 'ItemFiltered'
import ItemMy from 'ItemMy'
import ItemRecord from 'ItemRecord'
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
        <Route path=":table" component={SubApp} >
          <Route path="list" component={ItemFiltered} />
          <Route path="mylist" component={ItemMy} >
            <Route path=":eId" component={ItemRecord} />
          </Route>
          <Route path=":func" component={Backoffice} />
        </Route>
      </Route>
      <Route path="*" component={NotFound} />
    </Router>
  </Root>
  ,
  document.getElementById('body')
)

