import React from 'react'
import { connect } from 'react-redux'

import { makeFields, makeDetails, someEditable } from 'fields'

import { getTables } from 'tables'

//import { makeOptionStyles } from 'custom'

import ItemEdit from 'ItemEdit'
import ItemRead from 'ItemRead'
import ItemDetails from 'ItemDetails'
import ItemDetailHeads from 'ItemDetailHeads'

const ItemForm = props => {
  const { table, eId, initialValues, fields, perm } = props
  let { fieldFragments, detailFragments } = props
  if (fieldFragments == null) {fieldFragments = makeFields(props)}
  if (detailFragments == null) {detailFragments = makeDetails(props)}
  const hasEditable = someEditable(fields, perm)
  return (
    <div>
      {
        hasEditable
        ? <ItemEdit
            table={table}
            eId={eId}
            form={`${table}-${eId}`}
            initialValues={initialValues}
            perm={perm}
            fieldFragments={fieldFragments}
          />
        : <ItemRead
            eId={eId}
            fieldFragments={fieldFragments}
          />
      }
      <ItemDetailHeads
        table={table}
        eId={eId}
        detailFragments={detailFragments}
      />
      <ItemDetails
        table={table}
        eId={eId}
      />
    </div>
  )
}

export default connect(getTables)(ItemForm)
