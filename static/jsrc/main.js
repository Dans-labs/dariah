/* START PROCESSING
 * The dynamic construction of the page starts here
 */

/*
import Page from './page';

$(function () {
    new Page().work();
});
*/


import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

ReactDOM.render(
  <App />,
  document.getElementById('middle')
);

