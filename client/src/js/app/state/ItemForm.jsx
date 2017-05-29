import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import { getTables, modItem, toDb } from 'tables'
import { makeFields } from 'fields'
import { onSubmitSuccess, editStatus } from 'utils'

import FieldRead from 'FieldRead'
import FieldEdit from 'FieldEdit'

const ItemForm = props => {
  const { table, eId, mod, dirty, invalid, error, submitting, reset, handleSubmit } = props
  const { fragments, hasEditable } = makeFields(props)
  return (
    <form onSubmit={handleSubmit(toDb(table, eId, mod))} >
      {hasEditable ? editStatus(dirty, invalid, submitting, reset, error) : null}
      <div className={'grid fragments'}>{
        fragments.map(({ field, label, fragment: { editable, table, myValues, ...props } }) => (
          <div
            key={field}
            className={'grid-row form'}
          >
            <div className={'grid-head-cell labelCol'}>{`${label}:`}</div>
            <div className={'grid-cell valueCol'} >{ editable ?
              <FieldEdit
                field={field}
                table={table}
                {...props}
              /> :
              <FieldRead
                field={field}
                table={table}
                myValues={myValues}
              />
            }
            </div>
          </div>
        ))
      }
      </div>
    </form>
  )
}

export default connect(getTables, { mod: modItem })(reduxForm({
  destroyOnUnmount: false,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  onSubmitSuccess,
})(ItemForm))
