import React from 'react'
import { Provider } from 'react-redux'

import store from 'root.js'
import Window from 'Window.jsx'

const Root = ({ children }) => (
  <Provider store={store}>
    <Window>
      {children}
    </Window>
  </Provider>
)

export default Root
