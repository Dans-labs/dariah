import React from 'react'
import NavLink  from 'NavLink.jsx'
import { columnStyle } from 'ui.js'

/**
 * **purely functional** {@link external:Component|Component}
 *
 * ## Navigation links to static resources
 *
 * As far as the web page is concerned, this is the top level component.
 * Technically, there are only 
 * some {@link external:Routing|router} components
 * and ultimately the {@link Provider}
 * {@link external:Component|component} above it. 
 *
 *
 * @class
 * @param {Component[]} children The children of this component as specified in the 
 * {@link external:Routing|route} where App is called
 * @returns {Fragment}
*/
const Static = () => (
  <span className="small">
    <NavLink to="/docs/about.md">About</NavLink>
    <NavLink to="/tech/docs/design.pdf">diagrams</NavLink>
    <NavLink to="/tech/docs/deploy.md">deploy</NavLink>
    <a href="/api/file/tech/docs/gen/index.html" target="_blank">tech doc</a>
  </span>
)

export default Static

