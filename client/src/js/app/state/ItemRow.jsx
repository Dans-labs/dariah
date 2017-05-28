import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import { getTables, modItem, toDb } from 'tables'
import { makeFields } from 'fields'
import { onSubmitSuccess } from 'utils'

import FieldRead from 'FieldRead'
import FieldEdit from 'FieldEdit'

const ItemRow = props => {
  const { table, eId, mod, dirty, invalid, error, submitting, reset, handleSubmit, widths } = props
  const { fragments, hasEditable } = makeFields(props)
  return (
    <form
      className="grid-row"
      onSubmit={handleSubmit(toDb(table, eId, mod))}
    >{
      fragments.map(({ field, label, fragment: { editable, table, myValues, ...props } }, i) => {
        const { width, shrink, grow } = widths[i]
        return (
        <div
            className="grid-cell"
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

export default connect(getTables, { mod: modItem })(reduxForm({
  destroyOnUnmount: false,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  onSubmitSuccess,
})(ItemRow))
