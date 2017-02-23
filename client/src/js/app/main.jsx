import React, { Component } from 'react'
import { render } from 'react-dom';
import { Router, Route, Redirect, DefaultRoute, IndexRoute, IndexRedirect, browserHistory } from 'react-router';

import Provider from 'Provider.jsx';
import App from 'App.jsx';
import ContribFiltered from 'ContribFiltered.jsx';
import ContribMy from 'ContribMy.jsx';
import ContribItemPre from 'ContribItemPre.jsx';
import Doc from 'Doc.jsx';
import NotFound from 'NotFound.jsx';

/**
 * # Entry point
 *
 * The app starts here, in the file `main.jsx`.
 *
 * ## Providing Application wide data
 *
 * The first priority is to create a Provider component, which will be ancestor to all other components.
 * The {@link Provider} component surrounding the router provides global information to its descendants.
 *
 * ## Routing
 * The second priority is to set up the {@link external:Routing|routes} configuration,
 * i.e. the way urls give rise to activating certain components.
 *
 * <img src="/api/file/tech/docs/design/design.007.jpeg" width="800"/>
 *
 * We are talking about *client side* routing.
 * At the server there are other rules that link urls to behaviour.
 *
 * Here are a few rules that capture how routing works in a Single Page App (SPA) like this,
 * and the diagram visualizes the same logic.
 *
 * * The server responds to any url with sending the `index.html` page,
 *   which also causes the `bundle.js` to load:
 *   * The server's rules are very simple: no matter what the url, respond with the whole app.
 *     The response is static, it is always the same.
 *   * The client has to figure out what component(s) of the app to show and where,
 *     based on the details of the url.
 *   * This behaviour is needed to cater for the case that the user hits the browser's *refresh*
 *     button. At that moment, the current url might be a deep path,
 *     and we cannot expect the server to know those paths. The best the server can do is to
 *     send the whole app again.
 *
 * There are a few exceptions, though:
 *
 * * If the url points to a static file, i.e. a file under `/static/`, the server will respond with the
 *   file contents.
 *   Otherwise there was no way to serve the `index.html` and `bundle.js` in the first place.
 * * If the url points to `/api/`, the server will respond in a variety of ways, depending on the rest
 *   of the url.
 *   By means of these `/api/` urls the client can ask for additional data services, from file system or
 *   database.
 *   The server side routing maps these urls to specific controllers that fetch and assemble the 
 *   requested data.
 *
 * @module main
 */

render(
  <Provider>
    <Router history={browserHistory}>
      <Redirect from="/about" to="/docs/about.md"/>
      <Redirect from="/docs/about" to="/docs/about.md"/>
      <Redirect from="/about.md" to="/docs/about.md"/>
      <Redirect from="/login" to="/docs/about.md"/>
      <Redirect from="/logout" to="/docs/about.md"/>
      <Redirect from="/slogout" to="/docs/about.md"/>
      <Route path="/" component={App}>
        <IndexRoute component={App}/>
        <IndexRedirect to="/docs/about.md"/>
        <Route path="contrib" component={ContribFiltered}/>
        <Route path="mycontrib" component={ContribMy}>
          <Route path=":contribId" component={ContribItemPre} ownOnly={true}/>
        </Route>
        <Route path="docs/:docFile" component={Doc}/>
        <Route path="tech/docs/gen/:docFile" component={Doc}/>
        <Route path="tech/docs/:docFile" component={Doc}/>
      </Route>
      <Route path="*" component={NotFound}/>
    </Router>
  </Provider>,
  document.getElementById('body')
);

