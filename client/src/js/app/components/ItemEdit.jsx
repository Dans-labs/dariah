import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import { emptyO } from 'utils'

import { applyEditTemplate } from 'presentation'
import { onSubmitSuccess, itemEditField } from 'fields'
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
  const kind = masterTable ? 'detail' : 'main'
  return (
    applyEditTemplate(settings, tables, table, `${kind}Edit`, masterTable, eId, fieldFragments, editButton, submitValues)
    || <div>
        <form>
          {editButton}
          <div className={'grid fragments'}>{
            fieldFragments.map(({
              field, label, valType,
              fragment: { editable, table, myValues, ...fieldProps },
            }) => {
              const thisEditable = editable && (typeof valType != 'object' || !valType.fixed)
              return (
                <ErrorBoundary key={field}>
                  {
                    itemEditField(
                      field,
                      label,
                      thisEditable
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
                        />,
                      thisEditable,
                    )
                  }
                </ErrorBoundary>
              )
            })
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
