import React from 'react'
import { Provider } from 'react-redux'

import store from 'roots'
import Window from 'Window'

export default ({ children }) => (
  <Provider store={store}>
    <Window>
      {children}
    </Window>
  </Provider>
)
