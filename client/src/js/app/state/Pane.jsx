import React from 'react'
import { connect } from 'react-redux'

import { getWinDim, columnStyle } from 'win.js'

const Pane = ({ format, position, children, height, width }) => (
  <div
    className={format}
    style={columnStyle(position, { height, width })}
  >
    {children}
  </div>
)

export default connect(getWinDim)(Pane)
