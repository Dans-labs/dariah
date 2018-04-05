import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'

import Root from 'Root'
import App from 'App'
import ErrorBoundary from 'ErrorBoundary'

/*


*/
render(
  <Root>
    <ErrorBoundary>
      <BrowserRouter>
        <Route component={App} />
      </BrowserRouter>
    </ErrorBoundary>
  </Root>,
  document.getElementById('body'),
)
