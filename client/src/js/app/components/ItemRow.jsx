import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { memoize } from 'memo'
import { emptyS } from 'utils'
import { makeFields } from 'fields'
import { makeDetails } from 'details'

import { getForms } from 'forms'

import EditStatus from 'EditStatus'
import FieldRead from 'FieldRead'
import ItemForm from 'ItemForm'
import Tooltip from 'Tooltip'

const putFieldFragments = (tables, eId, fieldFragments, widthStyles) => fieldFragments.map(({
  field,
  fragment: { editable, table, myValues },
}, i) => {
  const widthStyle = widthStyles[i]
  return (
    <div
      className={`grid-cell valueColGrid ${editable ? 'edit' : emptyS}`}
      style={widthStyle}
      key={field}
    >
      <FieldRead
        field={field}
        tables={tables}
        table={table}
        eId={eId}
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
  ? <Tooltip
        tip={`${on ? 'show' : 'close'} details of this record`}
        at={'left'}
    >
      <span
        className={`button small fa fa-angle-${on ? 'down' : 'up'}`}
        onClick={nextAlt}
      />
    </Tooltip>
  : null
))

const ItemRow = ({
  alt, nextAlt, filters, tables, form, table, eId, initialValues,
  perm, workflow,
  masterId, linkField,
  isactive, fixed,
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
    <div className={isactive ? 'isactive' : emptyS}>
      {
        alt === 0
        ? <div className={'grid-row'}>
            <div className={'grid-status-cell'} >
              {fieldsButton(nextAlt, table, eId, update, true)}
              {hasForm ? <EditStatus form={`${table}-${eId}`} active={false} /> : null}
            </div>
            {putFieldFragments(tables, eId, fieldFragments, widthStyles)}
            {putDetailFragments(table, eId, detailFragments, widthStyles, nFields)}
          </div>
        : <Fragment>
            <div className={'grid-status-cell'} >
              {fieldsButton(nextAlt, table, eId, update, false)}
            </div>
            <ItemForm
              filters={filters}
              tables={tables}
              table={table}
              eId={eId}
              masterId={masterId}
              linkField={linkField}
              alterSection={alterSection}
              isactive={isactive}
              startMode={0}
              initialValues={initialValues}
              perm={perm}
              workflow={workflow}
              fields={fields}
              fieldFragments={fieldFragments}
              detailFragments={detailFragments}
              fixed={fixed}
            />
          </Fragment>
      }
    </div>
  )
}

export default connect(getForms)(ItemRow)
