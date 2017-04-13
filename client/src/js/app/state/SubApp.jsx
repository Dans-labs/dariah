import React from 'react'

import { withParams } from 'utils.js'

import NavLink from 'NavLink.jsx'
import Pane from 'Pane.jsx'

const SubApp = ({ table, children }) => (
  <div>
    <Pane format="nav sized" position="left">
      {(table == 'contrib') ? (
        <div>
          <p><NavLink to={`/${table}/list`} >{'All items'}</NavLink></p>
          <p><NavLink to={`/${table}/mylist`} >{'My work'}</NavLink></p>
        </div>
      ) : (
        <div>
          <p><NavLink to={`/${table}/type`} >{'Types'}</NavLink></p>
          <p><NavLink to={`/${table}/assess`} >{'Criteria'}</NavLink></p>
          <p><NavLink to={`/${table}/package`} >{'Packages'}</NavLink></p>
        </div>
      )}
    </Pane>
    <Pane format="sized" position="right">
      { children }
    </Pane>
  </div>
)

export default withParams(SubApp)
