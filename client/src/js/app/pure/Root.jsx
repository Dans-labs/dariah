import React from 'react'
import { Provider } from 'react-redux'

import Window from 'Window.jsx'

const Root = ({ store, children }) => (
  <Provider store={store}>
    <Window>
      {children}
    </Window>
  </Provider>
)

export default Root
