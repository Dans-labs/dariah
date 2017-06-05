import React from 'react'
import { connect } from 'react-redux'

import { memoize } from 'memo'

import { getTables } from 'tables'
import { EditStatus, makeFields, makeDetails, someEditable } from 'fields'

import Alternative, { AltNext } from 'Alternative'
import FieldRead from 'FieldRead'
import ItemForm from 'ItemForm'
import ItemDetails from 'ItemDetails'

const putFieldFragments = (fieldFragments, widthStyles) => fieldFragments.map(({
  field, label,
  fragment: { editable, table, myValues },
}, i) => {
  const widthStyle = widthStyles[i]
  return (
    <div
      className={`grid-cell valueColGrid ${editable ? 'editable' : ''}`}
      style={widthStyle}
      key={field}
    >
      <FieldRead
        field={field}
        table={table}
        myValues={myValues}
      />
    </div>
  )
})

const putDetailFragments = (table, eId, detailFragments, widthStyles, nFields) => detailFragments.map(({
  name, label, nDetails,
}, i) => {
  const widthStyle = widthStyles[nFields + i]
  return (
    <div
      key={name}
      className={'grid-cell valueColGrid'}
      style={widthStyle}
    >
      <AltNext
        className={'link'}
        tag={`detail-${table}-${eId}-${name}`}
        nAlternatives={2}
        initial={1}
      >
        {`${nDetails} item${nDetails == 1 ? '' : 's'}`}
      </AltNext>
    </div>
  )
})

const editControl = memoize((table, eId, mayUpdate, withRow) => (
  mayUpdate ?
    <AltNext
      className={`link fa fa-angle-${withRow ? 'down' : 'up'}`}
      tag={`row-${table}-${eId}`}
      nAlternatives={2}
      initial={0}
      title={`${withRow ? 'open an' : 'close the'}edit form for this record`}
    /> :
    null
))

const ItemRow = ({
  tables, table, eId, initialValues, perm,
  fields,
  widthStyles,
}) => {
  const hasEditable = someEditable({ tables, table, eId, fields, perm })
  const fieldFragments = makeFields({
    tables, table, eId, initialValues, perm,
    fields,
  })
  const detailFragments = makeDetails({ tables, table, eId })
  const { update } = perm
  const nFields = fieldFragments.length
  return hasEditable ?
    <Alternative
      tag={`row-${table}-${eId}`}
      alternatives={[
        <div key={'row-control'}>
          <div className={'grid-row'}>
            <div className="grid-status-cell" >
              {editControl(table, eId, update, true)}
              {hasEditable ? <EditStatus form={`${table}-${eId}`} showNeutral={false} /> : null }
            </div>
            {putFieldFragments(fieldFragments, widthStyles)}
            {putDetailFragments(table, eId, detailFragments, widthStyles, nFields)}
          </div>
          <ItemDetails key={`details-${table}-${eId}`} table={table} eId={eId} />
        </div>,
        <div key={'form-control'}>
          <div className="grid-status-cell" >
            {editControl(table, eId, update, false)}
            {hasEditable ? <EditStatus form={`${table}-${eId}`} showNeutral={true} /> : null}
          </div>
          <ItemForm
            key={'form-body'}
            table={table}
            eId={eId}
            form={`${table}-${eId}`}
            initialValues={initialValues}
            perm={perm}
            fields={fields}
            fieldFragments={fieldFragments}
            detailFragments={detailFragments}
          />
        </div>,
      ]}
      initial={0}
    /> :
    <div>
      <div className="grid-row" >
        {putFieldFragments(fieldFragments, widthStyles)}
        {putDetailFragments(table, eId, detailFragments, widthStyles, nFields)}
      </div>
      <ItemDetails table={table} eId={eId} />
    </div>
}

export default connect(getTables)(ItemRow)
