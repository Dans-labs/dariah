import React from 'react'
import { connect } from 'react-redux'

import { getAltSection, compileAlternatives } from 'alter'

const Expand = ({
  alter, alterSection, alterTag,
  headLine, full,
  className,
  dispatch,
}) => {
  const { getAlt, nextAlt } = compileAlternatives(alterSection, 2, 0, dispatch)(alterTag)
  const alt = getAlt(alter)
  return (
    <div className={className}>
      <span className={'vtop'}>
        <span
          className={`link vtop fa fa-angle-${alt === 0 ? 'down' : 'up'}`}
          onClick={nextAlt}
        />
        {' '}
        {headLine}
      </span>
      {
        alt == 0
        ? null
        : <div>{full}</div>
      }
    </div>
  )
}

const ExpandHeadPure = ({
  alter, alterSection, alterTag,
  headLine,
  className,
  dispatch,
}) => {
  const { getAlt, nextAlt } = compileAlternatives(alterSection, 2, 0, dispatch)(alterTag)
  const alt = getAlt(alter)
  return (
    <div className={`vtop ${className}`}>
      <span
        className={`link vtop fa fa-angle-${alt === 0 ? 'down' : 'up'}`}
        onClick={nextAlt}
      />
      {' '}
      {headLine}
    </div>
  )
}

const ExpandBodyPure = ({
  alter, alterSection, alterTag,
  full,
  className,
  dispatch,
}) => {
  const { getAlt } = compileAlternatives(alterSection, 2, 0, dispatch)(alterTag)
  const alt = getAlt(alter)
  return (
    <div className={className}>
      {
        alt == 0
        ? null
        : <div>{full}</div>
      }
    </div>
  )
}

export const ExpandHead = connect(getAltSection)(ExpandHeadPure)
export const ExpandBody = connect(getAltSection)(ExpandBodyPure)

export default connect(getAltSection)(Expand)
