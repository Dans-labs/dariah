import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import { handle } from 'handle'
import { onSubmitSuccess, editStatus, editDelete } from 'fields'

import { getTables, delItem, toDb } from 'tables'

import FieldRead from 'FieldRead'
import FieldEdit from 'FieldEdit'

const ItemEdit = props => {
  const {
    table, eId, perm,
    dirty, invalid, submitting, reset, error,
    fieldFragments,
    handleSubmit,
    dispatch,
  } = props
  return (
    <div>
      <form onSubmit={handleSubmit(toDb(table, eId, dispatch))} >
        <div>
          {editDelete(perm, 'button-large', handle(dispatch, delItem, table, eId))}
          {
            editStatus({
              form: `${table}-${eId}`,
              showNeutral: false,
              dirty, invalid, submitting, reset, error,
            })
          }
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
              <div className={'grid-cell valueCol'} >
                {
                  editable
                  ? <FieldEdit
                      field={field}
                      table={detailTable}
                      eId={eId}
                      {...props}
                    />
                  : <FieldRead
                      field={field}
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
      </form>
    </div>
  )
}

export default connect(getTables)(reduxForm({
  destroyOnUnmount: false,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  onSubmitSuccess,
})(ItemEdit))
