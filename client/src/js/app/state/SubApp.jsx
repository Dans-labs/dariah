import React from 'react'

import { withParams } from 'utils'

import NavLink from 'NavLink'
import Pane from 'Pane'

const SubApp = ({ table, children }) => (
  <div>
    <Pane format="nav sized" position="left">
      <div>
        <p><NavLink to={`/data/${table}/list`} >{'All items'}</NavLink></p>
        <p><NavLink to={`/data/${table}/mylist`} >{'My work'}</NavLink></p>
      </div>
    </Pane>
    <Pane format="sized" position="right">
      { children }
    </Pane>
  </div>
)

export default withParams(SubApp)
