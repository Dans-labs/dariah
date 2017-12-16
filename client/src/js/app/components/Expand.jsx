import React from 'react'
import { connect } from 'react-redux'

import { emptyS } from 'utils'

import { getAltSection, compileAlternatives } from 'alter'

import Tooltip from 'Tooltip'

const nbsp = ' '

const cleanPut = text => text || null

const cleanWrap = (text, next, className) =>
  text ? (
    <span className={className}>{`${nbsp}${text}${next ? nbsp : emptyS}`}</span>
  ) : null

const Expand = ({
  alter,
  alterSection,
  alterTag,
  initAlt,
  headActive,
  headLine,
  full,
  className,
  iconOpen,
  iconClose,
  titleOpen,
  titleClose,
  dispatch,
}) => {
  const init = initAlt || 0
  const { getAlt, nextAlt } = compileAlternatives(
    alterSection,
    2,
    init,
    dispatch,
  )(alterTag)
  const alt = getAlt(alter)
  const iOpen = iconOpen || 'angle-down'
  const iClose = iconClose || 'angle-up'
  const tOpen = titleOpen || 'expand'
  const tClose = titleClose || 'collapse'
  return (
    <div className={className}>
      <span className={'vtop'}>
        {nbsp}
        <Tooltip tip={alt === 0 ? tOpen : tClose} at={'top'}>
          <span
            className={`link vtop fa fa-${alt === 0 ? iOpen : iClose}`}
            onClick={nextAlt}
          >
            {cleanWrap(headActive, headLine, 'body')}
          </span>
        </Tooltip>
        {cleanPut(headLine)}
      </span>
      {alt == 0 ? null : full}
    </div>
  )
}

const ExpandHeadPure = ({
  alter,
  alterSection,
  alterTag,
  initAlt,
  headActive,
  headLine,
  className,
  iconOpen,
  iconClose,
  titleOpen,
  titleClose,
  dispatch,
}) => {
  const init = initAlt || 0
  const { getAlt, nextAlt } = compileAlternatives(
    alterSection,
    2,
    init,
    dispatch,
  )(alterTag)
  const alt = getAlt(alter)
  const iOpen = iconOpen || 'angle-down'
  const iClose = iconClose || 'angle-up'
  const tOpen = titleOpen || 'expand'
  const tClose = titleClose || 'collapse'
  return (
    <div className={`vtop ${className}`}>
      <Tooltip tip={alt === 0 ? tOpen : tClose} at={'top'}>
        <span
          className={`link vtop fa fa-${alt === 0 ? iOpen : iClose}`}
          onClick={nextAlt}
        >
          {cleanWrap(headActive, headLine, 'body')}
        </span>
      </Tooltip>
      {cleanPut(headLine)}
    </div>
  )
}

const ExpandBodyPure = ({
  alter,
  alterSection,
  alterTag,
  initAlt,
  full,
  className,
  dispatch,
}) => {
  const init = initAlt || 0
  const { getAlt } = compileAlternatives(alterSection, 2, init, dispatch)(
    alterTag,
  )
  const alt = getAlt(alter)
  return alt == 0 ? null : <div className={className}>{full}</div>
}

export const ExpandHead = connect(getAltSection)(ExpandHeadPure)
export const ExpandBody = connect(getAltSection)(ExpandBodyPure)

export default connect(getAltSection)(Expand)
