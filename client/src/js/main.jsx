import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute, IndexRedirect } from 'react-router'

import App from './components/App.jsx';
import ContribsContainer from './components/ContribsContainer.jsx';
import Home from './components/Home.jsx';
import MDText from './components/MDText.jsx';
import Login from './components/Login.jsx';

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <IndexRedirect to="/home/about"/>
      <Route path="/home" component={Home}>
        <Route path="/home/:text" component={MDText}/>
      </Route>
      <Route path="/contrib" component={ContribsContainer}/>
      <Route path="/login" component={Login}/>
    </Route>
  </Router>,
  document.getElementById('body')
);
