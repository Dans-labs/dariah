import React from 'react'

import { NavLink } from 'react-router-dom'

export default () => (
  <span className={'toplinks'}>
    <NavLink activeClassName={'active'} to={'/docs/about.md'}>
      {'Home'}
    </NavLink>
    <NavLink activeClassName={'active'} to={'/data'}>
      {'Registry'}
    </NavLink>
    <a
      href={'https://github.com/Dans-labs/dariah/wiki'}
      target={'_blank'}
      rel={'noopener noreferrer'}
    >
      {'Help'}
    </a>
    <a
      href={'https://github.com/Dans-labs/dariah/wiki/Help'}
      target={'_blank'}
      rel={'noopener noreferrer'}
    >
      {'About'}
    </a>
    <a
      href={'https://dans-labs.github.io/dariah/'}
      target={'_blank'}
      rel={'noopener noreferrer'}
    >
      {'Tech doc'}
    </a>
  </span>
)
