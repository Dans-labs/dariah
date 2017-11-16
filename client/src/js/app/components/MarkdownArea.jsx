import React from 'react'
import { connect } from 'react-redux'
import Markdown from 'react-markdown'

import { editClass, makeSubmit, makeReset } from 'fields'

import { getAltSection, compileAlternatives } from 'alter'

import EditHelp from 'EditHelp'

const MarkdownArea = ({
  alter, alterSection, table, eId, meta: { dirty, invalid, submitting, error },
  input: { name, value }, input,
  reset, submitValues,
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
          data-rh={`${alt === 0 ? 'edit text' : 'preview formatted text'}`}
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
        : <div key={'src'} className={'field-content'}>
            <textarea
              className={`input ${editClass(dirty, invalid)}`}
              {...input}
              wrap={'soft'}
              onBlur={makeSubmit(dirty, invalid, submitting, submitValues)}
              {...makeReset('text', reset)}
            />
            {error && <span className={'invalid diag'}>{error}</span>}
            <EditHelp type={'markdown'} dirty={dirty} />
          </div>
      }
    </div>
  )
}

export default connect(getAltSection)(MarkdownArea)
