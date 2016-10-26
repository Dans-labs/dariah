import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Redirect, DefaultRoute, IndexRoute, IndexRedirect, browserHistory } from 'react-router'

import App from './components/App.jsx';
import ContribsContainer from './components/ContribsContainer.jsx';
import Home from './components/Home.jsx';
import Doc from './components/Doc.jsx';

const NotFound = (props) => (<h1>404: <code>{props.params.splat}</code> not found on this site.</h1>)

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <IndexRedirect to="/home/about"/>
      <Route path="/home" component={Home}>
        <Route path="/home/:docName" component={Doc}/>
      </Route>
      <Route path="/contrib" component={ContribsContainer}/>
      <Redirect from="/login" to="/home/about"/>
      <Redirect from="/logout" to="/home/about"/>
      <Redirect from="/slogout" to="/home/about"/>
    </Route>
    <Route path="*" component={NotFound}/>
  </Router>,
  document.getElementById('body')
);
