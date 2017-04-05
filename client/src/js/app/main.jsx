import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Redirect, IndexRoute, IndexRedirect, browserHistory } from 'react-router'

import Root from 'Root.jsx'
import App from 'App.jsx'
import SubApp from 'SubApp.jsx'
import Backoffice from 'Backoffice.jsx'
import ItemFiltered from 'ItemFiltered.jsx'
import ItemMy from 'ItemMy.jsx'
import ItemRecordPre from 'ItemRecordPre.jsx'
import Doc from 'Doc.jsx'
import NotFound from 'NotFound.jsx'

import configureStore from 'configureStore.js'
import rootReducer from 'rootReducer.js'

const store = configureStore(rootReducer)

render(
  <Root store={store}>
    <Router history={browserHistory} >
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
            <Route path=":eId" component={ItemRecordPre} ownOnly={true} />
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

