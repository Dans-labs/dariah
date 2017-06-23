import React from 'react'

import { makeFields, makeDetails, someEditable } from 'fields'

import { DETAILS } from 'tables'

import ItemEdit from 'ItemEdit'
import ItemRead from 'ItemRead'
import ItemDetails from 'ItemDetails'
import ItemDetailHeads from 'ItemDetailHeads'

const ItemForm = props => {
  const { filters, tables, table, eId, initialValues, fields, perm } = props
  let { fieldFragments, detailFragments } = props
  if (fieldFragments == null) {fieldFragments = makeFields(props)}
  if (detailFragments == null) {detailFragments = makeDetails(props)}
  const hasEditable = someEditable(fields, perm)
  return (
    <div>
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
      <ItemDetailHeads
        alterSection={`${DETAILS}-${table}-${eId}`}
        tables={tables}
        table={table}
        eId={eId}
        detailFragments={detailFragments}
      />
      <ItemDetails
        alterSection={`${DETAILS}-${table}-${eId}`}
        filters={filters}
        tables={tables}
        table={table}
        eId={eId}
      />
    </div>
  )
}

export default ItemForm
