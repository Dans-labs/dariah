import React from 'react'
import Markdown from 'react-markdown'

import { editClass } from 'utils'

import Alternative from 'Alternative'

const controlPlacement = control => <p className="stick" >{control}</p>
const controls = [
  handler => <span className="button-medium fa fa-pencil field-control" onClick={handler} />,
  handler => <span className="button-medium fa fa-hand-o-down" onClick={handler} />,
]

const MarkdownArea = ({ table, eId, meta: { dirty, invalid, error }, input: { name, value }, input }) => (
  <Alternative
    tag={`md_${table}_${eId}_${name}`}
    controlPlacement={controlPlacement}
    controls={controls}
    className="md-field"
    alternatives={[
      <Markdown
        className={`${editClass(dirty, invalid)} field-content`}
        key="fmt"
        source={value}
      />,
      <span key="src" className="field-content">
        <textarea
          className={`input ${editClass(dirty, invalid)}`}
          {...input}
          wrap="soft"
        />
        {error && <span className="invalid diag">{error}</span>}
      </span>,
    ]}
    initial={1}
  />
)

export default MarkdownArea
