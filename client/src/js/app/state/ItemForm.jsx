import React from 'react'

import { makeFields, makeDetails, someEditable } from 'fields'

import { DETAILS } from 'tables'

import ItemEdit from 'ItemEdit'
import ItemRead from 'ItemRead'
import ItemDetails from 'ItemDetails'

const ItemForm = props => {
  const { filters, tables, table, eId, isactive, initialValues, fields, perm } = props
  let { fieldFragments, detailFragments } = props
  if (fieldFragments == null) {fieldFragments = makeFields(props)}
  if (detailFragments == null) {detailFragments = makeDetails(props)}
  const hasEditable = someEditable(fields, perm)
  return (
    <div className={`itemRecord ${isactive}`} >
      {
        hasEditable
        ? <ItemEdit
            tables={tables}
            table={table}
            eId={eId}
            form={`${table}-${eId}`}
            initialValues={initialValues}
            perm={perm}
            fieldFragments={fieldFragments}
          />
        : <ItemRead
            tables={tables}
            eId={eId}
            fieldFragments={fieldFragments}
          />
      }
      <ItemDetails
        alterSection={`list-${table}-${DETAILS}`}
        detailFragments={detailFragments}
        filters={filters}
        tables={tables}
        table={table}
        eId={eId}
      />
    </div>
  )
}

export default ItemForm
