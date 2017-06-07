import React from 'react'

import { withParams } from 'utils'

import NavLink from 'NavLink'
import Pane from 'Pane'

const Backoffice = ({ children }) => (
  <div>
    <Pane format="nav sized" position="left">
      <div>
        <p><NavLink to={`/backoffice/user/list`} >{'Users'}</NavLink></p>
        <p><NavLink to={`/backoffice/country/grid`} >{'Countries'}</NavLink></p>
        <p><NavLink to={`/backoffice/criteria/list`} >{'Criteria (list)'}</NavLink></p>
        <p><NavLink to={`/backoffice/criteria/grid`} >{'Criteria (grid)'}</NavLink></p>
        <p><NavLink to={`/backoffice/package/list`} >{'Packages (list)'}</NavLink></p>
        <p><NavLink to={`/backoffice/package/grid`} >{'Packages (grid)'}</NavLink></p>
      </div>
    </Pane>
    <Pane format="sized" position="right">
      { children }
    </Pane>
  </div>
)

export default withParams(Backoffice)
