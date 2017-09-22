import React from 'react'

import { emptyO } from 'utils'

import { applyTemplate } from 'templates'
import { toFieldInfo } from 'fields'

import FieldRead from 'FieldRead'

const ItemRead = ({
  settings, tables, table, eId, fieldFragments,
  linkField,
}) => {
  const {
    [table]: {
      fieldSpecs: {
        [linkField]: {
          valType: { relTable: masterTable } = emptyO,
        } = emptyO },
    },
  } = tables
  return (
    applyTemplate(settings, tables, table, 'detail', masterTable, toFieldInfo(eId, fieldFragments))
    || <div>
        <div className={'grid fragments'}>{
          fieldFragments.map(({
            field, label,
            fragment: { table: relTable, myValues },
          }) => (
            <div
              key={field}
              className={'grid-row form'}
            >
              <div className={'grid-head-cell label-col'}>{`${label}:`}</div>
              <div className={'grid-cell value-col'} >
                {
                  <FieldRead
                    field={field}
                    tables={tables}
                    table={relTable}
                    eId={eId}
                    myValues={myValues}
                  />
                }
              </div>
            </div>
          ))
        }
        </div>
      </div>
  )
}

export default ItemRead
