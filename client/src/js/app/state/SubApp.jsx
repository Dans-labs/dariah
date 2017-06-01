import React from 'react'
import { connect } from 'react-redux'

import { withParams } from 'utils'
import { getMe } from 'me'

import NavLink from 'NavLink'
import Pane from 'Pane'

const SubApp = ({ table, me, children }) => (
  <div>
    <Pane format="nav sized" position="left">
      <div>
        <p><NavLink to={`/data/${table}/list`} >{'All items'}</NavLink></p>
        {
          me.eppn ?
            <p><NavLink to={`/data/${table}/mylist`} >{'My work'}</NavLink></p> :
            null
        }
      </div>
    </Pane>
    <Pane format="sized" position="right">
      { children }
    </Pane>
  </div>
)

export default connect(getMe)(withParams(SubApp))
