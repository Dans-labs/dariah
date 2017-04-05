import React from 'react'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Window from 'Window.jsx'

const Root = ({ store, children }) => (
  <MuiThemeProvider>
    <Provider store={store}>
      <Window>
        {children}
      </Window>
    </Provider>
  </MuiThemeProvider>
)

export default Root
