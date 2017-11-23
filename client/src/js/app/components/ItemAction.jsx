import React from 'react'

import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import { emptyO } from 'utils'

import { applyEditTemplate } from 'presentation'
import { onSubmitSuccess } from 'fields'
import { toDb, headEntity } from 'tables'

const ItemAction = ({
  settings,
  tables, table, eId,
  linkField,
  fieldFragments,
  handleSubmit,
  dispatch,
}) => {
  const head = headEntity(tables, table, eId, settings)
  const submitValues = handleSubmit(toDb(table, eId, head, dispatch))
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
    <div className={'item-workflow'}>
      {
        applyEditTemplate(
          settings, tables, table,
          `${kind}Action`,
          masterTable, eId,
          fieldFragments, null,
          submitValues,
        )
      }
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
})(ItemAction))
