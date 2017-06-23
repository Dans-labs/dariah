import React from 'react'
import { connect } from 'react-redux'

import { combineSelectors } from 'utils'

import { getMe } from 'me'
import { getWinDim } from 'win'

import Login from 'Login'
import NavLink from 'NavLink'
import Static from 'Static'
import Notification from 'Notification'

const App = ({ children, win, me }) => {
  const { height, width } = win
  const text = `${width} x ${height}`
  return (
    <div>
      <Notification />
      <p className={'nav small top'} >
        <img
          src={'/static/images/inkind_logo_small.png'}
          title={'information about this site'}
        />
        <NavLink to={'/data/contrib'} >{'Contributions'}</NavLink>
        {
          me.eppn
          ? <NavLink to={'/backoffice'} >{'Backoffice'}</NavLink>
          : null
        }
        <Static />
        <span className={'resize'} title={text}>{text}</span>
        <Login />
      </p>
      <div>{children}</div>
    </div>
  )
}

const getInfo = combineSelectors(getWinDim, getMe)

export default connect(getInfo)(App)
