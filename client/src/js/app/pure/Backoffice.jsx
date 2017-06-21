import React from 'react'

import { withParams } from 'utils'

import NavLink from 'NavLink'

const Backoffice = ({ children }) => (
  <div className={'backoffice'} >
    <div className={'nav bar'} >
      <p><NavLink to={`/backoffice/overview`} >{'Overview'}</NavLink></p>
      <p><NavLink to={`/backoffice/user/list`} >{'Users'}</NavLink></p>
      <p><NavLink to={`/backoffice/country/grid`} >{'Countries'}</NavLink></p>
      <p><NavLink to={`/backoffice/typeContribution/list`} >{'Types (list)'}</NavLink></p>
      <p><NavLink to={`/backoffice/typeContribution/grid`} >{'Types (grid)'}</NavLink></p>
      <p><NavLink to={`/backoffice/criteria/list`} >{'Criteria (list)'}</NavLink></p>
      <p><NavLink to={`/backoffice/criteria/grid`} >{'Criteria (grid)'}</NavLink></p>
      <p><NavLink to={`/backoffice/package/list`} >{'Packages (list)'}</NavLink></p>
      <p><NavLink to={`/backoffice/package/grid`} >{'Packages (grid)'}</NavLink></p>
    </div>
    <div className={'details'} >
      { children }
    </div>
  </div>
)

export default withParams(Backoffice)
