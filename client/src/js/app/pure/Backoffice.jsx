import React from 'react'

/**
 * **purely functional** {@link external:Component|Component}
 *
 * ## Backoffice functions
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
const Backoffice = ({ params }) => {
  const { func } = params;
  const headings = {
    type: 'Contribution types',
    assess: 'Assessment criteria',
    package: 'Assessment packages',
  }
  const bodies = {
    type: 'Will be implemented',
    assess: 'Will be implemented',
    package: 'Will be implemented',
  }
  const heading = headings[func] || 'No such function';
  const body = bodies[func] || 'Nothing to wait for';
  return (
    <div>
      <h1>{heading}</h1>
      <p>{body}</p>
    </div>
  )
}

export default Backoffice


