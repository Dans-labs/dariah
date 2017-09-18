import React from 'react'

import { emptyS } from 'utils'

import Expand, { ExpandHead, ExpandBody } from 'Expand'
import FieldRead from 'FieldRead'

const templates = {
  criteriaEntry(e, v, f) {
    e('evidence')
    e('score')
    return (
      <div>
        <div className={'criteriaEntry'}>
          <Expand
            alterSection={`criteriaEntry${v('_id')}`}
            alterTag={'remarks'}
            headLine={[
              <span key="seq">{v('seq')}</span>,
              <span key="crit">{f('criteria')}</span>,
            ]}
            full={<div className={'criteriaRemarks'}>{f('criteria', 'remarks')}</div>}
            className={'fat'}
          />
          <div className={'slim'}>{f('score')}</div>
          {
            e('evidence')
            ? <div className={'slim tError'}>{'no evidence'}</div>
            : <ExpandHead
                alterSection={`criteriaEntry${v('_id')}`}
                alterTag={'evidence'}
                headLine={'evidence'}
                className={'slim tGood'}
              />
          }
        </div>
        {
          e('evidence')
          ? null
          : <ExpandBody
              alterSection={`criteriaEntry${v('_id')}`}
              alterTag={'evidence'}
              full={f('evidence')}
              className={'evidence'}
            />
        }
      </div>
    )
  },
}

export const applyTemplate = (settings, tables, table, values) => {
  const { [table]: template } = templates
  if (template == null) {return null}
  const e = field => {
    const { [field]: value } = values
    return value == null || value == emptyS
  }
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
  return template(e, v, f)
}
