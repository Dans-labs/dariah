import React from 'react'

import { emptyO } from 'utils'

import { applyTemplate } from 'presentation'
import { toFieldInfo, itemReadField } from 'fields'

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
  const kind = masterTable ? 'detail' : 'main'
  return (
    applyTemplate(settings, tables, table, kind, masterTable, toFieldInfo(eId, fieldFragments))
    || <div>
        <div className={'grid fragments'}>{
          fieldFragments.map(({
            field, label,
            fragment: { table: relTable, myValues },
          }) => (
            itemReadField(
              field,
              label,
              <FieldRead
                field={field}
                tables={tables}
                table={relTable}
                eId={eId}
                myValues={myValues}
              />
            )
          ))
        }
        </div>
      </div>
  )
}

export default ItemRead
