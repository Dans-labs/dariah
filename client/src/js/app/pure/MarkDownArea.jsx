import React from 'react'
import { connect } from 'react-redux'
import Markdown from 'react-markdown'

import { editClass } from 'fields'

import { getAlts, makeAlt } from 'alter'

const MarkdownArea = ({
    table, eId, meta: { dirty, invalid, error },
    input: { name, value }, input,
    ...props
}) => {
  const { alt, nextAlt } = makeAlt(props, {
    alterTag: `md-${table}-${eId}-${name}`,
    nAlts: 2,
    initial: 0,
  })
  return (
    <div className={'md-field'}>
      <p className={'stick'} >
        <span
          className={`button-medium field-control fa fa-${alt == 0 ? 'pencil' : 'hand-o-down'}`}
          onClick={nextAlt}
        />
      </p>
      {
        alt == 0
        ? <Markdown
            className={`${editClass(dirty, invalid)} field-content`}
            key="fmt"
            source={value}
          />
        : <span key="src" className="field-content">
            <textarea
              className={`input ${editClass(dirty, invalid)}`}
              {...input}
              wrap="soft"
            />
            {error && <span className="invalid diag">{error}</span>}
          </span>
      }
    </div>
  )
}

export default connect(getAlts)(MarkdownArea)
