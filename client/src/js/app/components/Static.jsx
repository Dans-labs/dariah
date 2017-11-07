import React from 'react'

import NavLink from 'NavLink'

const Static = () => (
  <span className={'small'} >
    <NavLink to={'/docs/about.md'} >{'Home'}</NavLink>
    <NavLink to={'/data'} >{'Registry'}</NavLink>
    <a href={'https://github.com/Dans-labs/dariah/wiki'} target={'_blank'} rel={'noopener noreferrer'} >{'Help'}</a>
    <a href={'https://github.com/Dans-labs/dariah/wiki/Help'} target={'_blank'} rel={'noopener noreferrer'} >{'About'}</a>
    <a href={'https://dans-labs.github.io/dariah/'} target={'_blank'} rel={'noopener noreferrer'} >{'tech doc'}</a>
  </span>
)

export default Static

