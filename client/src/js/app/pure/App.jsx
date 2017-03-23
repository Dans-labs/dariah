import React from 'react'
import Login from 'Login.jsx'
import NavLink from 'NavLink.jsx'
import Static from 'Static.jsx'
import Notification from 'Notification.jsx'

import { withContext } from 'hoc.js'
/**
 * **purely functional** {@link external:Component|Component}
 *
 * ## Top level interface component
 *
 * As far as the web page is concerned, this is the top level component.
 * Technically, there are only
 * some {@link external:Routing|router} components
 * and ultimately the {@link Provider}
 * {@link external:Component|component} above it.
 *
 * ## Permanent navigation widget
 *
 * `App` is always in view and consists of the
 *  * top navigation bar (with logo, {@link Login}, and {@link Notification})
 *  * right navigation bar (with navigation links to the components of the app
 *    and documentation).
 *
 * @class
 * @param {Component[]} children The children of this component as specified in the
 * {@link external:Routing|route} where App is called
 * @returns {Fragment}
*/
const App = ({ children, ui: { width, height } }) => {
  const text = `${width} x ${height}`
  return (
    <div>
      <Notification />
      <p className="nav small top" >
        <img
          src="/static/images/inkind_logo_small.png"
          title="information about this site"
        />
        <NavLink to="/contrib" >{'Contributions'}</NavLink>
        <NavLink to="/backoffice" >{'Backoffice'}</NavLink>
        <Static />
        <span className="resize" title={text}>{text}</span>
        <Login />
      </p>
      <div>{children}</div>
    </div>
  )
}

export default withContext(App)
