import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import { emptyO } from 'utils'

import { applyEditTemplate } from 'templates'
import { itemEditField } from 'fields'
import { toDb, headEntity } from 'tables'
import { getMe } from 'me'

import ErrorBoundary from 'ErrorBoundary'
import FieldRead from 'FieldRead'
import FieldEdit from 'FieldEdit'
import EditControl from 'EditControl'

const ItemEdit = ({
  settings,
  me,
  tables,
  table,
  eId,
  linkField,
  dirty,
  invalid,
  submitting,
  reset,
  error,
  fieldFragments,
  handleSubmit,
  nextAlt,
  dispatch,
}) => {
  const head = headEntity(tables, table, eId, settings)
  const submitValues = handleSubmit(toDb(table, eId, head, dispatch))
  const editControlProps = {
    form: `${table}-${eId}`,
    dirty,
    invalid,
    submitting,
    reset,
    error,
    nextAlt,
    handleSubmit: submitValues,
  }
  const editButton = <EditControl {...editControlProps} />
  const {
    [table]: {
      fieldSpecs: { [linkField]: { valType: { relTable } = emptyO } = emptyO },
    },
  } = tables
  const kind = relTable ? 'detail' : 'main'
  return (
    applyEditTemplate({
      settings,
      me,
      tables,
      table,
      eId,
      kind: `${kind}Edit`,
      relTable,
      fieldFragments,
      editButton,
      submitValues,
      reset,
    }) || (
      <form>
        {editButton}
        <div className={'grid fragments'}>
          {fieldFragments.map(
            ({
              field,
              label,
              valType,
              fragment: { editable, table, myValues, ...fieldProps },
            }) => {
              const thisEditable =
                editable && (typeof valType != 'object' || !valType.fixed)
              return (
                <ErrorBoundary key={field}>
                  {itemEditField(
                    field,
                    label,
                    thisEditable ? (
                      <FieldEdit
                        field={field}
                        tables={tables}
                        table={table}
                        eId={eId}
                        submitValues={submitValues}
                        reset={reset}
                        {...fieldProps}
                      />
                    ) : (
                      <FieldRead
                        field={field}
                        tables={tables}
                        table={table}
                        myValues={myValues}
                      />
                    ),
                    thisEditable,
                  )}
                </ErrorBoundary>
              )
            },
          )}
        </div>
      </form>
    )
  )
}

export default connect(getMe)(
  reduxForm({
    destroyOnUnmount: false,
    enableReinitialize: true,
    keepDirtyOnReinitialize: false,
    touchOnBlur: true,
    touchOnChange: false,
  })(ItemEdit),
)
