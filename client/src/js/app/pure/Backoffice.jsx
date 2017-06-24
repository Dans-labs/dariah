import React from 'react'

import { withParams } from 'utils'

import NavLink from 'NavLink'

const Backoffice = ({ children }) => (
  <div className={'backoffice'} >
    <div className={'nav bar'} >
      <p><NavLink to={`/backoffice/overview`} >{'Overview'}</NavLink></p>
      <p><NavLink to={`/backoffice/user/list`} >{'Users (list)'}</NavLink></p>
      <p><NavLink to={`/backoffice/user/grid`} >{'Users (grid)'}</NavLink></p>
      <p><NavLink to={`/backoffice/country/list`} >{'Countries (list)'}</NavLink></p>
      <p><NavLink to={`/backoffice/country/grid`} >{'Countries (grid)'}</NavLink></p>
      <p><NavLink to={`/backoffice/package/list`} >{'Packages (list)'}</NavLink></p>
      <p><NavLink to={`/backoffice/package/grid`} >{'Packages (grid)'}</NavLink></p>
      <p><NavLink to={`/backoffice/typeContribution/list`} >{'Types (list)'}</NavLink></p>
      <p><NavLink to={`/backoffice/typeContribution/grid`} >{'Types (grid)'}</NavLink></p>
      <p><NavLink to={`/backoffice/criteria/list`} >{'Criteria (list)'}</NavLink></p>
      <p><NavLink to={`/backoffice/criteria/grid`} >{'Criteria (grid)'}</NavLink></p>
      <p><NavLink to={`/backoffice/score/list`} >{'Scores (list)'}</NavLink></p>
      <p><NavLink to={`/backoffice/score/grid`} >{'Scores (grid)'}</NavLink></p>
    </div>
    <div className={'details'} >
      { children }
    </div>
  </div>
)

export default withParams(Backoffice)
