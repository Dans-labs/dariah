import React from 'react'
import { connect } from 'react-redux'
import Markdown from 'react-markdown'

import { combineSelectors, emptyO } from 'utils'
import { editClass } from 'edit'
import { makeSubmit, makeReset } from 'fields'

import { withEditHelp } from 'tooltip'

import { getAltSection, compileAlternatives } from 'alter'
import { getTooltip } from 'win'

import TooltipContainer from 'TooltipContainer'
import EditHelp from 'EditHelp'

const MarkdownArea = ({
  alter, alterSection, table, eId, meta: { dirty, invalid, submitting, error },
  input: { name, value }, input,
  rh,
  reset, submitValues,
  tooltip,
  dispatch,
}) => {
  const alterTag = `${table}-${eId}-${name}`
  const { getAlt, nextAlt } = compileAlternatives(alterSection, 2, 1, dispatch)(alterTag)
  const alt = getAlt(alter)
  const click = () => {nextAlt(); tooltip.forceUpdate()}
  return (
    <div
      className={'md-field'}
      {...(alt == 0 ? emptyO : rh)}
    >
      <div
        className={`button-medium field-control fa fa-${alt === 0 ? 'pencil' : 'hand-o-down'}`}
        data-rh={`${alt === 0 ? 'edit text' : 'preview formatted text'}`}
        onClick={click}
      />
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
          </div>
      }
    </div>
  )
}

const getInfo = combineSelectors(getTooltip, getAltSection)

export default withEditHelp(connect(getInfo)(MarkdownArea), TooltipContainer, EditHelp, 'markdown', 'bottom')
