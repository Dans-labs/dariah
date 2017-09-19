import React from 'react'
import { connect } from 'react-redux'

import { emptyS } from 'utils'

import { getAltSection, compileAlternatives } from 'alter'

const nbsp = ' '

const cleanPut = text => text || null

const cleanWrap = (text, next, className) =>
  text
  ? <span className={className}>{`${nbsp}${text}${next ? nbsp : emptyS}`}</span>
  : null

const Expand = ({
  alter, alterSection, alterTag,
  headActive, headLine, full,
  className,
  iconOpen, iconClose,
  titleOpen, titleClose,
  dispatch,
}) => {
  const { getAlt, nextAlt } = compileAlternatives(alterSection, 2, 0, dispatch)(alterTag)
  const alt = getAlt(alter)
  const iOpen = iconOpen || 'angle-down'
  const iClose = iconClose || 'angle-up'
  const tOpen = titleOpen || 'expand'
  const tClose = titleClose || 'collapse'
  return (
    <div className={className}>
      <span className={'vtop'}>
        {nbsp}
        <span
          className={`link vtop fa fa-${alt === 0 ? iOpen : iClose}`}
          title={alt === 0 ? tOpen : tClose}
          onClick={nextAlt}
        >
          {cleanWrap(headActive, headLine, 'body')}
        </span>
        {cleanPut(headLine)}
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
  headActive, headLine,
  className,
  iconOpen, iconClose,
  titleOpen, titleClose,
  dispatch,
}) => {
  const { getAlt, nextAlt } = compileAlternatives(alterSection, 2, 0, dispatch)(alterTag)
  const alt = getAlt(alter)
  const iOpen = iconOpen || 'angle-down'
  const iClose = iconClose || 'angle-up'
  const tOpen = titleOpen || 'expand'
  const tClose = titleClose || 'collapse'
  return (
    <div className={`vtop ${className}`}>
      <span
        className={`link vtop fa fa-${alt === 0 ? iOpen : iClose}`}
        title={alt === 0 ? tOpen : tClose}
        onClick={nextAlt}
      >
        {cleanWrap(headActive, headLine, 'body')}
      </span>
      {cleanPut(headLine)}
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
    alt == 0
    ? null
    : <div className={className}>
        {
          <div>{full}</div>
        }
      </div>
  )
}

export const ExpandHead = connect(getAltSection)(ExpandHeadPure)
export const ExpandBody = connect(getAltSection)(ExpandBodyPure)

export default connect(getAltSection)(Expand)
