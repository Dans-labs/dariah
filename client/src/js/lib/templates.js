import React from 'react'

import { emptyS, emptyO } from 'utils'

import Expand, { ExpandHead, ExpandBody } from 'Expand'
import FieldRead from 'FieldRead'

const templates = {
  criteriaEntry(e, v, f) {
    return (
      <div>
        <div className={'criteriaEntry'}>
          <Expand
            alterSection={`criteriaEntry${v('_id')}`}
            alterTag={'remarks'}
            iconOpen={'info-circle'}
            iconClose={'minus-circle'}
            titleOpen={'Show criteria details'}
            titleClose={'Hide criteria details'}
            headActive={v('seq')}
            headLine={f('criteria')}
            full={<div className={'criteriaRemarks'}>{f('criteria', 'remarks')}</div>}
            className={'fat'}
          />
          <div className={'slim'}>{f('score')}</div>
          {
            e('evidence')
            ? <div className={'xSlim'}>
                <span
                  title={'No evidence yet'}
                  className={'slim fa fa-file-o tError'}
                />
              </div>
            : <ExpandHead
                alterSection={`criteriaEntry${v('_id')}`}
                alterTag={'evidence'}
                iconOpen={'file-text'}
                iconClose={'minus-square'}
                titleOpen={'Show evidence'}
                titleClose={'Hide evidence'}
                headActive={''}
                headLine={''}
                className={'xSlim tGood'}
              />
          }
        </div>
        {
          e('evidence')
          ? null
          : <ExpandBody
              alterSection={`criteriaEntry${v('_id')}`}
              alterTag={'evidence'}
              iconOpen={'file-text'}
              iconClose={'minus-square'}
              titleOpen={'Show evidence'}
              titleClose={'Hide evidence'}
              full={f('evidence')}
              className={'evidence'}
            />
        }
      </div>
    )
  },
}

const frozenTemplates = {
  assessment: {
    contrib(v) {
      console.warn('applying frozen template assessment-contrib', v)
      return (
        <div>
          <p>{v.title}</p>
          <p>
            {
              v.vcc
              ? v.vcc.join(', ')
              : null
            }
            {' '}
            {v.year}
          </p>
        </div>
      )
    },
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

export const applyFrozenTemplate = (table, frozen, value) => {
  const { [table]: { [frozen]: template } = emptyO } = frozenTemplates
  if (template == null) {return null}
  return template(value)
}
