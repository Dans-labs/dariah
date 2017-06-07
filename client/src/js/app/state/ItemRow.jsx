import React from 'react'
import { connect } from 'react-redux'

import { combineSelectors, memoize } from 'utils'

import { getTables } from 'tables'
import { EditStatus, makeFields, makeDetails, someEditable } from 'fields'
import { getAlts, makeAlt } from 'alter'

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

const putDetailFragments = (props, table, eId, detailFragments, widthStyles, nFields) => detailFragments.map(({
  name, label, nDetails,
}, i) => {
  const widthStyle = widthStyles[nFields + i]
  const { nextAlt } = makeAlt(props, { tag: `detail-${table}-${eId}-${name}`, nAlts: 2, initial: 1 })
  return (
    <div
      key={name}
      className={'grid-cell valueColGrid'}
      style={widthStyle}
    >
      <span
        className={'link'}
        onClick={nextAlt}
      >
        {`${nDetails} item${nDetails == 1 ? '' : 's'}`}
      </span>
    </div>
  )
})

const editControl = memoize((nextAlt, table, eId, mayUpdate, withRow) => (
  mayUpdate ?
    <span
      className={`link fa fa-angle-${withRow ? 'down' : 'up'}`}
      title={`${withRow ? 'open an' : 'close the'}edit form for this record`}
      onClick={nextAlt}
    /> :
    null
))

const ItemRow = ({
  tables, table, eId, initialValues, perm,
  fields,
  widthStyles,
  ...props
}) => {
  const hasEditable = someEditable({ tables, table, eId, fields, perm })
  const fieldFragments = makeFields({
    tables, table, eId, initialValues, perm,
    fields,
  })
  const detailFragments = makeDetails({ tables, table, eId })
  const { update } = perm
  const nFields = fieldFragments.length
  const tag = `row-${table}-${eId}`
  const { alt, nextAlt } = makeAlt(props, { tag, nAlts: 2, initial: 0 })
  return hasEditable ?
    <div>
      {
        alt == 0 ?
          <div>
            <div className={'grid-row'}>
              <div className="grid-status-cell" >
                {editControl(nextAlt, table, eId, update, true)}
                {hasEditable ? <EditStatus form={`${table}-${eId}`} showNeutral={false} /> : null }
              </div>
              {putFieldFragments(fieldFragments, widthStyles)}
              {putDetailFragments(props, table, eId, detailFragments, widthStyles, nFields)}
            </div>
            <ItemDetails table={table} eId={eId} />
          </div> :
          <div>
            <div className="grid-status-cell" >
              {editControl(nextAlt, table, eId, update, false)}
              {hasEditable ? <EditStatus form={`${table}-${eId}`} showNeutral={true} /> : null}
            </div>
            <ItemForm
              table={table}
              eId={eId}
              form={`${table}-${eId}`}
              initialValues={initialValues}
              perm={perm}
              fields={fields}
              fieldFragments={fieldFragments}
              detailFragments={detailFragments}
            />
          </div>
      }
    </div> :
    <div>
      <div className="grid-row" >
        {putFieldFragments(fieldFragments, widthStyles)}
        {putDetailFragments(props, table, eId, detailFragments, widthStyles, nFields)}
      </div>
      <ItemDetails table={table} eId={eId} />
    </div>
}

const getInfo = combineSelectors(getTables, getAlts)

export default connect(getInfo)(ItemRow)
