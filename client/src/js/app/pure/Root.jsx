import React from 'react'
import { Provider } from 'react-redux'

import store from 'roots'
import Window from 'Window'

const Root = ({ children }) => (
  <Provider store={store}>
    <Window>
      {children}
    </Window>
  </Provider>
)

export default Root
