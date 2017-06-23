import React from 'react'
import { connect } from 'react-redux'

import { memoize } from 'memo'
import { emptyS } from 'utils'
import { makeFields, makeDetails, someEditable } from 'fields'

import { DETAILS } from 'tables'
import { getForms } from 'forms'

import { EditStatus } from 'EditControls'
import FieldRead from 'FieldRead'
import ItemForm from 'ItemForm'
import ItemDetails from 'ItemDetails'

const putFieldFragments = (tables, fieldFragments, widthStyles) => fieldFragments.map(({
  field, label,
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

const putDetailFragments = (table, eId, detailFragments, widthStyles, nFields, nextAlt) => detailFragments.map(({
  name, label, nDetails,
}, i) => {
  const widthStyle = widthStyles[nFields + i]
  return (
    <div
      key={name}
      className={'grid-cell value-col-grid'}
      style={widthStyle}
    >
      <span
        className={'link'}
        onClick={nextAlt}
      >
        {`${nDetails} item${nDetails == 1 ? emptyS : 's'}`}
      </span>
    </div>
  )
})

const editControl = memoize((nextAlt, table, eId, mayUpdate, withRow) => (
  mayUpdate
  ? <span
      className={`link fa fa-angle-${withRow ? 'down' : 'up'}`}
      title={`${withRow ? 'open an' : 'close the'}edit form for this record`}
      onClick={nextAlt}
    />
  : null
))

const ItemRow = ({
  alt, nextAlt, filters, tables, form, table, eId, initialValues, perm,
  fields,
  widthStyles,
}) => {
  const hasEditable = someEditable(fields, perm)
  const fieldFragments = makeFields({
    tables, table, eId, initialValues, perm,
    fields,
  })
  const detailFragments = makeDetails({ tables, table, eId })
  const { update } = perm
  const nFields = fieldFragments.length
  const formTag = `${table}-${eId}`
  const hasForm = form.has(formTag)
  return hasEditable
  ? <div>
      {
        alt == 0
        ? <div>
            <div className={'grid-row'}>
              <div className={'grid-status-cell'} >
                {editControl(nextAlt, table, eId, update, true)}
                {hasForm ? <EditStatus form={`${table}-${eId}`} active={false} /> : null}
              </div>
              {putFieldFragments(tables, fieldFragments, widthStyles)}
              {putDetailFragments(table, eId, detailFragments, widthStyles, nFields, nextAlt)}
            </div>
          </div>
        : <div>
            <div className={'grid-status-cell'} >
              {editControl(nextAlt, table, eId, update, false)}
              {hasForm ? <EditStatus form={`${table}-${eId}`} active={true} /> : null}
            </div>
            <ItemForm
              filters={filters}
              tables={tables}
              table={table}
              eId={eId}
              initialValues={initialValues}
              perm={perm}
              fields={fields}
              fieldFragments={fieldFragments}
              detailFragments={detailFragments}
            />
          </div>
      }
    </div>
  : <div>
      <div className={'grid-row'} >
        {putFieldFragments(tables, fieldFragments, widthStyles)}
        {putDetailFragments(table, eId, detailFragments, widthStyles, nFields, nextAlt)}
      </div>
      <ItemDetails
        alterSection={`${DETAILS}-${table}-${eId}`}
        filters={filters}
        tables={tables}
        table={table}
        eId={eId}
      />
    </div>
}

export default connect(getForms)(ItemRow)
