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
  const mdcode = 'mdcode'
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
            />
            {error && <span className={'invalid diag'}>{error}</span>}
            <div className="mddoc">
              <div className="mditem"><span className={mdcode}>{'['}</span>{'link text'}<span className={mdcode}>{']('}</span>{'url'}<span className={mdcode}>{')'}</span></div>
              <div className="mditem"><span className={mdcode}>{'*'}</span><i>{'italic'}</i><span className={mdcode}>{'*'}</span></div>
              <div className="mditem"><span className={mdcode}>{'**'}</span><b>{'bold'}</b><span className={mdcode}>{'**'}</span></div>
              <div><span className={mdcode}>{'`'}</span><code>{'code'}</code><span className={mdcode}>{'`'}</span></div>
              <div className="mditem"><span className={mdcode}>{'# '}</span><span className={'mdh1'}>{'Heading1'}</span></div>
              <div className="mditem"><span className={mdcode}>{'## '}</span><span className={'mdh2'}>{'Heading2'}</span></div>
              <div className="mditem"><span className={mdcode}>{'* '}</span><span className={'mduli'}>{'bullet item'}</span></div>
              <div className="mditem"><span className={mdcode}>{'1. '}</span><span className={'mdoli'}>{'numbered item'}</span></div>
              <div className="mditem"><span className={mdcode}>{'> '}</span><span className={'mdbq'}>{'block quote'}</span></div>
            </div>
          </div>
      }
    </div>
  )
}

export default connect(getAltSection)(MarkdownArea)
