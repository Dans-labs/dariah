import React from 'react'
import { connect } from 'react-redux'

import { getAltSection, compileAlternatives } from 'alter'

const Expand = ({
  alter, alterSection, alterTag,
  headLine, full,
  dispatch,
}) => {
  const { getAlt, nextAlt } = compileAlternatives(alterSection, 2, 0, dispatch)(alterTag)
  const alt = getAlt(alter)
  return (
    <div>
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

export default connect(getAltSection)(Expand)
