import React from 'react'
import { connect } from 'react-redux'

import { memoize } from 'memo'
import { emptyS } from 'utils'
import { makeFields, makeDetails } from 'fields'

import { getForms } from 'forms'

import { EditStatus } from 'EditControls'
import FieldRead from 'FieldRead'
import ItemForm from 'ItemForm'

const putFieldFragments = (tables, fieldFragments, widthStyles) => fieldFragments.map(({
  field,
  fragment: { editable, table, myValues },
}, i) => {
  const widthStyle = widthStyles[i]
  return (
    <div
      className={`grid-cell valueColGrid ${editable ? 'editable' : emptyS}`}
      style={widthStyle}
      key={field}
    >
      <FieldRead
        field={field}
        tables={tables}
        table={table}
        myValues={myValues}
      />
    </div>
  )
})

const putDetailFragments = (table, eId, detailFragments, widthStyles, nFields) => detailFragments.map(({
  name, detailListIds,
}, i) => {
  const widthStyle = widthStyles[nFields + i]
  const nDetails = detailListIds.length
  return (
    <div
      key={name}
      className={'grid-cell value-col-grid'}
      style={widthStyle}
    >
      {nDetails}
    </div>
  )
})

const fieldsButton = memoize((nextAlt, table, eId, mayUpdate, on) => (
  mayUpdate
  ? <span
      className={`link fa fa-angle-${on ? 'down' : 'up'}`}
      title={`${on ? 'show' : 'close'} details of this record`}
      onClick={nextAlt}
    />
  : null
))

const ItemRow = ({
  alt, nextAlt, filters, tables, form, table, eId, initialValues, perm,
  isactive,
  fields,
  widthStyles,
}) => {
  const fieldFragments = makeFields({
    tables, table, eId, initialValues, perm,
    fields,
  })
  const detailFragments = makeDetails({ tables, table, eId })
  const { update } = perm
  const nFields = fieldFragments.length
  const formTag = `${table}-${eId}`
  const hasForm = form.has(formTag)
  const alterSection = `edit-${table}-${eId}`
  return (
    <div className={isactive}>
      {
        alt == 0
        ? <div>
            <div className={'grid-row'}>
              <div className={'grid-status-cell'} >
                {fieldsButton(nextAlt, table, eId, update, true)}
                {hasForm ? <EditStatus form={`${table}-${eId}`} active={false} /> : null}
              </div>
              {putFieldFragments(tables, fieldFragments, widthStyles)}
              {putDetailFragments(table, eId, detailFragments, widthStyles, nFields)}
            </div>
          </div>
        : <div>
            <div className={'grid-status-cell'} >
              {fieldsButton(nextAlt, table, eId, update, false)}
            </div>
            <ItemForm
              filters={filters}
              tables={tables}
              table={table}
              eId={eId}
              alterSection={alterSection}
              isactive={isactive}
              initialValues={initialValues}
              perm={perm}
              fields={fields}
              fieldFragments={fieldFragments}
              detailFragments={detailFragments}
            />
          </div>
      }
    </div>
  )
}

export default connect(getForms)(ItemRow)
