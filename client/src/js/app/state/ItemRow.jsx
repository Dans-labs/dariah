import React from 'react'
import { connect } from 'react-redux'

import { memoize } from 'memo'

import { getTables } from 'tables'
import { makeFields, someEditable } from 'fields'

import Alternative, { AltNext } from 'Alternative'
import FieldRead from 'FieldRead'
import ItemForm from 'ItemForm'

const rowFields = (fragments, widthStyles) => (
  fragments.map(({
    name, field, label,
    fragment: { editable, table, myValues, nDetails },
  }, i) => {
    const widthStyle = widthStyles[i]
    return (
      name == null ?
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
        </div> :
        <div
          key={name}
          className={'grid-cell valueColGrid'}
          style={widthStyle}
        >
          {`${nDetails} item${nDetails == 1 ? '' : 's'}`}
        </div>
    )
  })
)

const editControl = memoize((table, eId, mayUpdate, withRow) => (
  mayUpdate ?
    <AltNext
      className={`link fa fa-${withRow ? 'pencil' : 'chevron-up'}`}
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
  const fragments = makeFields({
    tables, table, eId, initialValues, perm,
    fields,
  })
  const { update } = perm
  return hasEditable ?
    <Alternative
      className={'grid-row'}
      tag={`row-${table}-${eId}`}
      alternatives={[
        [
          <div key={'row-control'} className="grid-status-cell" >
            {editControl(table, eId, update, true)}
          </div>,
          rowFields(fragments, widthStyles),
        ], [
          <div key={'form-control'} className="grid-status-cell" >
            {editControl(table, eId, update, false)}
          </div>,
          <ItemForm
            key={'form-body'}
            table={table}
            eId={eId}
            form={`${table}-${eId}`}
            initialValues={initialValues}
            perm={perm}
            fields={fields}
            fragments={fragments}
          />,
        ],
      ]}
      initial={0}
    /> :
    <div className="grid-row" >
      {rowFields(fragments, widthStyles)}
    </div>
}

export default connect(getTables)(ItemRow)

    /*
    Object.entries(details || {}).forEach(([name, { label, table: detailTable, linkField, mode }]) => {
      const {
        [detailTable]: {
          title: detailTitle,
          perm: detailPerm,
          entities: detailEntities,
          allIds: detailAllIds,
        },
      } = tables
      const detailListIds = detailAllIds.filter(_id => detailEntities[_id].values[linkField] == eId)
      rows.push(
        <div key={`${name}-${eId}`} >
          {
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
            mode == 'plain' ?
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
            mode == 'filter' ?
              <ListFilter
                heading={label}
                table={detailTable}
                listIds={detailListIds}
                masterId={eId}
                linkField={linkField}
              /> :
              <span>{`unknown display mode "${mode}" for item list`}</span>
          }
        </div>
      )
    })
    */
