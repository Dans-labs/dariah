import React from 'react'

import { withParams } from 'utils.js'

const Backoffice = ({ func }) => {
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
  const heading = headings[func] || 'No such function'
  const body = bodies[func] || 'Nothing to wait for'
  return (
    <div>
      <h1>{heading}</h1>
      <p>{body}</p>
    </div>
  )
}

export default withParams(Backoffice)


