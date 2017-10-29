import React from 'react'
import { connect } from 'react-redux'
import Markdown from 'react-markdown'

import { editClass } from 'fields'

import { getAltSection, compileAlternatives } from 'alter'

const MarkdownArea = ({
  alter, alterSection, table, eId, meta: { dirty, invalid, error },
  input: { name, value }, input,
  dispatch,
}) => {
  const alterTag = `${table}-${eId}-${name}`
  const { getAlt, nextAlt } = compileAlternatives(alterSection, 2, 1, dispatch)(alterTag)
  const alt = getAlt(alter)
  return (
    <div className={'md-field'}>
      <p className={'stick'} >
        <span
          className={`button-medium field-control fa fa-${alt === 0 ? 'pencil' : 'hand-o-down'}`}
          title={`${alt === 0 ? 'edit text' : 'preview formatted text'}`}
          onClick={nextAlt}
        />
      </p>
      {
        alt === 0
        ? <Markdown
            className={`${editClass(dirty, invalid)} field-content`}
            key={'fmt'}
            source={value}
          />
        : <span key={'src'} className={'field-content'}>
            <textarea
              className={`input ${editClass(dirty, invalid)}`}
              {...input}
              wrap={'soft'}
            />
            {error && <span className={'invalid diag'}>{error}</span>}
          </span>
      }
    </div>
  )
}

export default connect(getAltSection)(MarkdownArea)
