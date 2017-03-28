import React from 'react'
import NavLink from 'NavLink.jsx'

const Static = () => (
  <span className="small" >
    <NavLink to="/docs/about.md" >{'About'}</NavLink>
    <NavLink to="/tech/docs/design.pdf" >{'diagrams'}</NavLink>
    <NavLink to="/tech/docs/deploy.md" >{'deploy'}</NavLink>
    <a href="/api/file/tech/docs/gen/index.html" target="_blank" rel="noopener noreferrer" >{'tech doc'}</a>
  </span>
)

export default Static

