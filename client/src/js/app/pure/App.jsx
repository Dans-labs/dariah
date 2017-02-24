import React from 'react'
import Login from 'Login.jsx'
import NavLink  from 'NavLink.jsx'
import SubApp  from 'SubApp.jsx'
import Static  from 'Static.jsx'
import Notification from 'Notification.jsx'

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
const App = ({children}) => ( 
  <div>
    <Notification/>
    <p className="nav" style={{paddingRight: '5em'}}>
      <img style={{
          marginBottom: '-1em',
          marginTop: '-1em',
          height: "3em",
        }}
        src="/static/images/inkind_logo_small.png"
        title="information about this site"
      />
      <NavLink to={`/contrib`}>Contributions</NavLink>
      <NavLink to={`/backoffice`}>Backoffice</NavLink>
      <Static/>
      <Login/>
    </p>
    <div>{children}</div>
  </div>
)

export default App
