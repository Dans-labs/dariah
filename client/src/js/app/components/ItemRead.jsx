import React from 'react'

import { applyTemplate } from 'templates'
import { toFieldInfo } from 'fields'

import FieldRead from 'FieldRead'

const ItemRead = ({ settings, tables, table, eId, fieldFragments }) => (
  applyTemplate(settings, tables, table, toFieldInfo(eId, fieldFragments))
  || <div>
      <div className={'grid fragments'}>{
        fieldFragments.map(({
          field, label,
          fragment: { table: detailTable, myValues },
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
                  table={detailTable}
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

export default ItemRead
