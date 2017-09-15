import React from 'react'

//import { memoize } from 'memo'
//import { emptyS, emptyA, emptyO } from 'utils'

import Expand from 'Expand'
import FieldRead from 'FieldRead'

const templates = {
  criteriaEntry(v, f) {
    return (
      <div>
        <div className={'criteriaEntry'}>
          <Expand
            alterSection={`criteriaEntry${v('_id')}`}
            alterTag={'remarks'}
            headLine={[v('seq'), f('criteria')]}
            full={<div className={'criteriaRemarks'}>{f('criteria', 'remarks')}</div>}
            className={'fat'}
          />
          <div className={'slim'}>{f('score')}</div>
        </div>
        <Expand
          alterSection={`criteriaEntry${v('_id')}`}
          alterTag={'evidence'}
          headLine={'Evidence'}
          full={f('evidence')}
        />
      </div>
    )
  },
}

export const applyTemplate = (settings, tables, table, values) => {
  const { [table]: template } = templates
  if (template == null) {return null}
  const v = field => values[field]
  const f = (field, detailField) => {
    const { [field]: value } = values
    return (
      <FieldRead
        settings={settings}
        tables={tables}
        table={table}
        field={field}
        detailField={detailField}
        myValues={value}
      />
    )
  }
  return template(v, f)
}
