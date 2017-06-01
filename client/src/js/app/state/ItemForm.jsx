import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import { getTables, modItem, delItem, toDb } from 'tables'
import { makeFields } from 'fields'
import { onSubmitSuccess, editDelete } from 'utils'
import { memoize } from 'memo'

import FieldRead from 'FieldRead'
import FieldEdit from 'FieldEdit'
import EditStatus from 'EditStatus'

const deleteit = memoize((del, table, eId) => event => {
  event.preventDefault()
  del(table, eId)
})

const ItemForm = props => {
  const { table, eId, perm, mod, del, handleSubmit } = props
  const { fragments, hasEditable } = makeFields(props)
  return (
    <form onSubmit={handleSubmit(toDb(table, eId, mod))} >
      <div>
        {editDelete(perm, 'button-large', deleteit(del, table, eId))}
        <EditStatus form={`${table}-${eId}`} hasEditable={hasEditable} canSubmit={true} />
      </div>
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

export default connect(getTables, {
  mod: modItem,
  del: delItem,
})(reduxForm({
  destroyOnUnmount: false,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  onSubmitSuccess,
})(ItemForm))
