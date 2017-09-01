import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import { onSubmitSuccess } from 'fields'
import { toDb } from 'tables'

import FieldRead from 'FieldRead'
import FieldEdit from 'FieldEdit'
import { EditControl } from 'EditControls'

const ItemEdit = props => {
  const {
    tables, table, eId,
    dirty, invalid, submitting, reset, error,
    fieldFragments,
    handleSubmit,
    nextAlt,
    dispatch,
  } = props
  const editControlProps = {
    form: `${table}-${eId}`,
    dirty, invalid, submitting, reset, error,
    nextAlt, handleSubmit: handleSubmit(toDb(table, eId, dispatch)),
  }
  return (
    <div>
      <form>
        <EditControl {...editControlProps} />
        <div className={'grid fragments'}>{
          fieldFragments.map(({
            field, label, freeze,
            fragment: { editable, table, myValues, ...props },
          }) => (
            <div
              key={field}
              className={'grid-row form'}
            >
              <div className={`grid-head-cell label-col ${editable ? 'edit' : ''}`}>{`${label}:`}</div>
              <div className={'grid-cell value-col edit'} >
                {
                  editable && !freeze
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
