import React from 'react'

import NavLink from 'NavLink'

const Static = () => (
  <span className={'small'} >
    <NavLink to={'/data'} >{'Registry'}</NavLink>
    <NavLink to={'/docs/about.md'} >{'About'}</NavLink>
    <NavLink to={'/tech/docs/design.pdf'} >{'diagrams'}</NavLink>
    <NavLink to={'/tech/docs/criteria.pdf'} >{'criteria specs'}</NavLink>
    <a href={'https://dans-labs.github.io/dariah/'} target={'_blank'} rel={'noopener noreferrer'} >{'tech doc'}</a>
  </span>
)

export default Static

