import React from 'react'
import { connect } from 'react-redux'

import { withParams } from 'utils'
import { getMe } from 'me'

import NavLink from 'NavLink'

const SubApp = ({ table, me, children }) => (
  <div className={'subApp'} >
    <div className={'nav bar'} >
      <p><NavLink to={`/data/${table}/list`} >{'All items'}</NavLink></p>
      {
        me.eppn
        ? <p><NavLink to={`/data/${table}/mylist`} >{'My work'}</NavLink></p>
        : null
      }
    </div>
    <div className={'details'} >
      { children }
    </div>
  </div>
)

export default connect(getMe)(withParams(SubApp))
