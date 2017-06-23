import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import { handle } from 'handle'
import { onSubmitSuccess } from 'fields'

import { delItem, toDb } from 'tables'

import FieldRead from 'FieldRead'
import FieldEdit from 'FieldEdit'
import { EditControl, EditDelete } from 'EditControls'

const ItemEdit = props => {
  const {
    tables, table, eId, perm,
    dirty, invalid, submitting, reset, error,
    fieldFragments,
    handleSubmit,
    dispatch,
  } = props
  const editControlProps = { form: `${table}-${eId}`, dirty, invalid, submitting, reset, error }
  return (
    <div>
      <form onSubmit={handleSubmit(toDb(table, eId, dispatch))} >
        <div>
          <EditDelete
            perm={perm}
            button={'button-large'}
            onClick={handle(dispatch, delItem, table, eId)}
          />
          <EditControl {...editControlProps} />
        </div>
        <div className={'grid fragments'}>{
          fieldFragments.map(({
            field, label,
            fragment: { editable, table, myValues, ...props },
          }) => (
            <div
              key={field}
              className={'grid-row form'}
            >
              <div className={'grid-head-cell label-col'}>{`${label}:`}</div>
              <div className={'grid-cell value-col'} >
                {
                  editable
                  ? <FieldEdit
                      field={field}
                      tables={tables}
                      table={table}
                      eId={eId}
                      {...props}
                    />
                  : <FieldRead
                      field={field}
                      tables={tables}
                      table={table}
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

export default connect()(reduxForm({
  destroyOnUnmount: false,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  onSubmitSuccess,
})(ItemEdit))
