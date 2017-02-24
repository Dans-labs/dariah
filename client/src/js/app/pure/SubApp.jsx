import React from 'react'
import NavLink  from 'NavLink.jsx'
import { columnStyle } from 'ui.js'

/**
 * **purely functional** {@link external:Component|Component}
 *
 * ## Nearly top level interface component
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
const SubApp = ({params, children}) => {
  const { tag } = params;
  return (
    <div>
      <div className="nav" style={columnStyle('left')}>
        {(tag == 'contrib') ? (
          <div>
            <p><NavLink to={`/${tag}/list`}>All items</NavLink></p>
            <p><NavLink to={`/${tag}/mylist`}>My work</NavLink></p>
          </div>
        ) : (
          <div>
            <p><NavLink to={`/${tag}/type`}>Types</NavLink></p>
            <p><NavLink to={`/${tag}/assess`}>Criteria</NavLink></p>
            <p><NavLink to={`/${tag}/package`}>Packages</NavLink></p>
          </div>
        )}
      </div>
      <div>
        <div style={columnStyle('right')}>
          { children }
        </div>
      </div>
    </div>
  )
}

export default SubApp
