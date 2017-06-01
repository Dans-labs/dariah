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

const delit = memoize((del, table, eId) => () => del(table, eId))

const ItemRow = props => {
  const { table, eId, perm, mod, del, handleSubmit, widths } = props
  const { fragments, hasEditable } = makeFields(props)
  return (
    <form
      className="grid-row"
      onSubmit={handleSubmit(toDb(table, eId, mod))}
    >
      <div className="grid-status-cell">
        {editDelete(perm, 'button-small', delit(del, table, eId))}
        <EditStatus form={`${table}-${eId}`} hasEditable={hasEditable} canSubmit={true} />
      </div>
      {
        fragments.map(({ field, label, fragment: { editable, table, myValues, ...props } }, i) => {
          const { width, shrink, grow } = widths[i]
          return (
            <div
                className="grid-cell valueColGrid"
                style={{
                  flexBasis: width,
                  flexShrink: shrink,
                  flexGrow: grow,
                  overflow: 'auto',
                }}
                key={`${eId}-${field}`}
            >{ editable ?
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
          )
        })
      }
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
})(ItemRow))
