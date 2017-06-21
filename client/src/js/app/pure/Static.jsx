import React from 'react'

import NavLink from 'NavLink'

const Static = () => (
  <span className={'small'} >
    <NavLink to={'/docs/about.md'} >{'About'}</NavLink>
    <NavLink to={'/tech/docs/design.pdf'} >{'diagrams'}</NavLink>
    <a href={'https://dans-labs.github.io/dariah/'} target={'_blank'} rel={'noopener noreferrer'} >{'tech doc'}</a>
  </span>
)

export default Static

