import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import { getTables, delItem, toDb } from 'tables'
import { makeFields, makeDetails, someEditable, onSubmitSuccess, editStatus, editDelete } from 'fields'
import { handle } from 'utils'
import { makeOptionStyles } from 'custom'

import FieldRead from 'FieldRead'
import FieldEdit from 'FieldEdit'
import ItemDetails from 'ItemDetails'
import ItemDetailHeads from 'ItemDetailHeads'

const WrapForm = ({ children, submitFunction }) => (
  submitFunction ?
    <form onSubmit={submitFunction} >{children}</form> :
    <div>{children}</div>
)

const ItemForm = props => {
  const {
    table, eId, perm,
    dirty, invalid, submitting, reset, error,
    handleSubmit,
    dispatch,
  } = props
  let { fieldFragments, detailFragments } = props
  if (fieldFragments == null) {fieldFragments = makeFields(props)}
  if (detailFragments == null) {detailFragments = makeDetails(props)}
  const hasEditable = someEditable(props)
  return (
    <div>
      <WrapForm submitFunction={hasEditable ? handleSubmit(toDb(table, eId, dispatch)) : null} >
        <div>
          {editDelete(perm, 'button-large', handle(dispatch, delItem, table, eId))}
          {hasEditable ? editStatus({
            form: `${table}-${eId}`,
            showNeutral: false,
            dirty, invalid, submitting, reset, error,
          }) : null}
        </div>
        <div className={'grid fragments'}>{
          fieldFragments.map(({
            field, label,
            fragment: { editable, table: detailTable, myValues, ...props },
          }) => (
            <div
              key={field}
              className={'grid-row form'}
            >
              <div className={'grid-head-cell labelCol'}>{`${label}:`}</div>
              <div className={'grid-cell valueCol'} >{editable ?
                <FieldEdit
                  field={field}
                  table={detailTable}
                  {...props}
                /> :
                <FieldRead
                  field={field}
                  table={detailTable}
                  myValues={myValues}
                />
              }
              </div>
            </div>
          ))
        }
        </div>
      </WrapForm>
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

export default connect(getTables)(reduxForm({
  destroyOnUnmount: false,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  onSubmitSuccess,
})(ItemForm))
