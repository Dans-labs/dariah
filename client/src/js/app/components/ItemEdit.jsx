import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import { emptyO } from 'utils'

import { applyEditTemplate } from 'templates'
import { onSubmitSuccess } from 'fields'
import { toDb, headEntity } from 'tables'

import ErrorBoundary from 'ErrorBoundary'
import FieldRead from 'FieldRead'
import FieldEdit from 'FieldEdit'
import { EditControl } from 'EditControls'

const ItemEdit = ({
  settings,
  tables, table, eId,
  linkField,
  dirty, invalid, submitting, reset, error,
  fieldFragments,
  handleSubmit,
  nextAlt,
  dispatch,
}) => {
  const head = headEntity(tables, table, eId, settings)
  const submitValues = handleSubmit(toDb(table, eId, head, dispatch))
  const editControlProps = {
    form: `${table}-${eId}`,
    dirty, invalid, submitting, reset, error,
    nextAlt, handleSubmit: submitValues,
  }
  const editButton = <EditControl {...editControlProps} />
  const {
    [table]: {
      fieldSpecs: {
        [linkField]: {
          valType: { relTable: masterTable } = emptyO,
        } = emptyO },
    },
  } = tables
  return (
    applyEditTemplate(settings, tables, table, 'detailEdit', masterTable, eId, fieldFragments, editButton)
    || <div>
        <form>
          {editButton}
          <div className={'grid fragments'}>{
            fieldFragments.map(({
              field, label, valType,
              fragment: { editable, table, myValues, ...fieldProps },
            }) => (
              <div
                key={field}
                className={'grid-row form'}
              >
                <div className={`grid-head-cell label-col ${editable ? 'edit' : ''}`}>{`${label}:`}</div>
                <div className={'grid-cell value-col edit'} >
                  <ErrorBoundary>
                    {
                      editable && (typeof valType != 'object' || !valType.fixed)
                      ? <FieldEdit
                          field={field}
                          tables={tables}
                          table={table}
                          eId={eId}
                          submitValues={submitValues}
                          {...fieldProps}
                        />
                      : <FieldRead
                          field={field}
                          tables={tables}
                          table={table}
                          eId={eId}
                          myValues={myValues}
                        />
                    }
                  </ErrorBoundary>
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
  keepDirtyOnReinitialize: false,
  touchOnBlur: true,
  touchOnChange: false,
  onSubmitSuccess,
})(ItemEdit))
