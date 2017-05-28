import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import { getTables, modItem, delItem, toDb } from 'tables'
import { makeFields } from 'fields'
import { onSubmitSuccess } from 'utils'
import { memoize } from 'memo'

import FieldRead from 'FieldRead'
import FieldEdit from 'FieldEdit'

const delit = memoize((del, table, eId) => () => del(table, eId))

const ItemRow = props => {
  const { table, eId, perm, mod, del, dirty, invalid, error, submitting, reset, handleSubmit, widths } = props
  const { fragments, hasEditable } = makeFields(props)
  return (
    <form
      className="grid-row"
      onSubmit={handleSubmit(toDb(table, eId, mod))}
    >
      <div className="grid-status-cell">
        {
          hasEditable ?
            <div>
              {
                (dirty && !invalid && !submitting) ? (
                  <button type="submit" className={'button-small edit-action-small fa fa-check'} />
                  ) : null
              }
              {' '}
              {
                (dirty && !submitting) ? (
                  <button type="button" className={'button-small reset-action-small fa fa-close'} onClick={reset} />
                ) : null
              }
              {' '}
              {
                (!dirty && !submitting) ? (
                  <span className={'good-o fa fa-circle'} />
                ) : null
              }
              {' '}
              {
                (submitting) ? (
                  <span className={'special-o fa fa-spinner fa-spin'} />
                ) : null
              }
              {
                error && <span className={'invalid diag'}>{error}</span>
              }
            </div> : null
        }
      </div>
      {
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
      {
        perm.delete ? (
          <div className="grid-cell">
            <span className={'button-small error fa fa-trash delete'} onClick={delit(del, table, eId)} />
          </div>
        ) : null
      }
    </form>
  )
}

export default connect(getTables, { mod: modItem, del: delItem })(reduxForm({
  destroyOnUnmount: false,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  onSubmitSuccess,
})(ItemRow))
