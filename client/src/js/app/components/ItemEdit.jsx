import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import { emptyO } from 'utils'

import { applyEditTemplate } from 'templates'
import { onSubmitSuccess } from 'fields'
import { toDb } from 'tables'

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
  const editControlProps = {
    form: `${table}-${eId}`,
    dirty, invalid, submitting, reset, error,
    nextAlt, handleSubmit: handleSubmit(toDb(table, eId, dispatch)),
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
                  {
                    editable && (typeof valType != 'object' || !valType.fixed)
                    ? <FieldEdit
                        field={field}
                        tables={tables}
                        table={table}
                        eId={eId}
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
