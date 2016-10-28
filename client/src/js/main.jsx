import React, { Component } from 'react'
import { render } from 'react-dom';
import { Router, Route, Redirect, DefaultRoute, IndexRoute, IndexRedirect, browserHistory } from 'react-router';

import App from './state/App.jsx';
import ContribsFiltered from './state/ContribsFiltered.jsx';
import Home from './pure/Home.jsx';
import Doc from './pure/Doc.jsx';
import NotFound from './pure/NotFound.jsx';
import Store from './helpers/Store.js';

const globals = {
  store: new Store(),
  notification: null,
};

function wrapStore(Component, props) {
  /* this handler is called for every route to a component below.
   * It passes the globals as property to the component.
   * All components on such a route can access the globals as this.props.globals
   * Beware: components not mentioned on a router, but constructed during rendering
   * must get the globals in an other way: just by passing them down (React context does not seem to work)
   */

const newProps = {...props, globals};
  return <Component {...newProps} />
}

/* Some things need to be global!
 *
 * [Store]
 *
 * The store is a container of component states.
 * We use it for components with a costly state, that should be preserved when components are swapped in and out from
 * the user interface.
 *
 * We pass a reference to the store as a parameter to all routes that invoke a component with state that should be preserved. 
 * We do not use central state. We only provide for components to store their state when they unmount,
 * and to load it when they mount.
 *
 * A component can assign its state to the store using a self chosen key, preferably different for different instances.
 * So the store consists of saved states keyed by component instances.
 * 
 * The most important use cases for this app:
 * - if the big contrib list is loaded, the user must be able to go back and forth between docs like "about"
 *   and the contrib list without the need to reload the list all the time
 * - if a user has set up filters, the filter state should be preserved after navigating to other parts of the app
 *
 * Note that the DOM may be swapped out, but the state info needed to recreate the dom should be preserved.
 *
 * [Notification]
 *
 * We want one place on the interface for displaying notifications.
 */

render(
  <Router history={browserHistory} createElement={wrapStore}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <IndexRedirect to="/doc/about"/>
      <Route path="/" component={Home}>
        <Route path="/contrib" component={ContribsFiltered}/>
        <Route path="/doc/:docName" component={Doc}/>
      </Route>
      <Redirect from="/login" to="/doc/about"/>
      <Redirect from="/logout" to="/doc/about"/>
      <Redirect from="/slogout" to="/doc/about"/>
    </Route>
    <Route path="*" component={NotFound}/>
  </Router>,
  document.getElementById('body')
);
