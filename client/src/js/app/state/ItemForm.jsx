import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import { getTables, modItem, delItem, toDb } from 'tables'
import { makeFields, someEditable, onSubmitSuccess, editStatus, editDelete } from 'fields'
import { memoize } from 'memo'

import Alternative, { AltNext } from 'Alternative'
import FieldRead from 'FieldRead'
import FieldEdit from 'FieldEdit'
import ListGrid from 'ListGrid'
import ListPlain from 'ListPlain'
import ListFilter from 'ListFilter'

const deleteit = memoize((del, table, eId) => event => {
  event.preventDefault()
  del(table, eId)
})

const WrapForm = ({ children, submitFunction }) => (
  submitFunction ?
    <form onSubmit={submitFunction} >{children}</form> :
    <div>{children}</div>
)

const ItemForm = props => {
  const {
    tables, table, eId, perm,
    dirty, invalid, submitting, reset, error, mod, del,
    handleSubmit,
  } = props
  let { fragments } = props
  if (fragments == null) {fragments = makeFields(props)}
  const hasEditable = someEditable(props)
  const { [table]: { details, detailOrder } } = tables
  const detailTables = (detailOrder || []).map(name => {
    const { label, table: detailTable, linkField, mode } = details[name]
    const {
      [detailTable]: {
        title: detailTitle,
        perm: detailPerm,
        entities: detailEntities,
        allIds: detailAllIds,
      },
    } = tables
    const detailListIds = detailAllIds.filter(_id => detailEntities[_id].values[linkField] == eId)
    return (
      <Alternative
        key={name}
        tag={`detail-${table}-${eId}-${name}`}
        alternatives={[
          mode == 'list' ?
            <ListPlain
              heading={label}
              table={detailTable}
              listIds={detailListIds}
              perm={detailPerm}
              title={detailTitle}
              inplace={true}
              masterId={eId}
              linkField={linkField}
            /> :
          mode == 'grid' ?
            <ListGrid
              heading={label}
              table={detailTable}
              listIds={detailListIds}
              perm={detailPerm}
              tag={`${table}-${name}-${eId}`}
              masterId={eId}
              linkField={linkField}
            /> :
          mode == 'filter' ?
            <ListFilter
              heading={label}
              table={detailTable}
              masterId={eId}
              linkField={linkField}
            /> :
            <span>{`unknown display mode "${mode}" for item list`}</span>
          ,
          '',
        ]}
        initial={1}
      />
    )
  })
  return (
    <div>
      <WrapForm submitFunction={hasEditable ? handleSubmit(toDb(table, eId, mod)) : null} >
        <div>
          {editDelete(perm, 'button-large', deleteit(del, table, eId))}
          {editStatus({ form: `${table}-${eId}`, hasEditable, dirty, invalid, submitting, reset, error })}
        </div>
        <div className={'grid fragments'}>{
          fragments.map(({
            name, field, label,
            fragment: { editable, table: detailTable, myValues, nDetails, ...props },
          }) => (
            name == null ?
              <div
                key={field}
                className={'grid-row form'}
              >
                <div className={'grid-head-cell labelCol'}>{`${label}:`}</div>
                <div className={'grid-cell valueCol'} >{editable ?
                  <FieldEdit
                    field={field}
                    table={detailTable}
                    {...props}
                  /> :
                  <FieldRead
                    field={field}
                    table={detailTable}
                    myValues={myValues}
                  />
                }
                </div>
              </div> :
              <div
                key={name}
                className={'grid-row form'}
              >
                <div className={'grid-head-cell labelCol'}>{`${label}:`}</div>
                <AltNext
                  className={'link grid-cell valueCol'}
                  tag={`detail-${table}-${eId}-${name}`}
                  nAlternatives={2}
                  initial={1}
                >
                  {`${nDetails} item${nDetails == 1 ? '' : 's'}`}
                </AltNext>
              </div>
          ))
        }
        </div>
      </WrapForm>
      {detailTables}
    </div>
  )
}

export default connect(getTables, {
  mod: modItem,
  del: delItem,
})(reduxForm({
  destroyOnUnmount: false,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  onSubmitSuccess,
})(ItemForm))
