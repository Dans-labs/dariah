import React from 'react'
import { connect } from 'react-redux'

import { memoize } from 'memo'

import { getTables } from 'tables'
import { makeFields } from 'fields'

import Alternative from 'Alternative'
import FieldRead from 'FieldRead'

const editit = memoize(eId => event => {
  event.preventDefault()
})

const controlPlacement = control => <span>{control}</span>

const controls = [
  () => null,
  () => null,
]

const rowFields = (fragments, widths) => (
  fragments.map(({
    name, field, label,
    fragment: { editable, table, myValues, nDetails },
  }, i) => {
    const { width, shrink, grow } = widths[i]
    return (
      name == null ?
        <div
          className={`grid-cell valueColGrid ${editable ? 'editable' : ''}`}
          style={{
            flexBasis: width,
            flexShrink: shrink,
            flexGrow: grow,
            overflow: 'auto',
          }}
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
          style={{
            flexBasis: width,
            flexShrink: shrink,
            flexGrow: grow,
            overflow: 'auto',
          }}
        >
          {`${nDetails} item${nDetails == 1 ? '' : 's'}`}
        </div>
    )
  })
)

const editControl = memoize(eId => (
  <a
    href="#"
    className={'fa fa-pencil'}
    title={'open an edit form for this record'}
    onClick={editit(eId)}
  />
))

const ItemRow = ({
  tables, table, eId, initialValues, perm,
  fields,
  widths,
  form,
}) => {
  const { fragments, hasEditable } = makeFields({
    tables, table, eId, initialValues, perm,
    fields,
  })
  return hasEditable ?
    <Alternative
      tag={`row-${table}-${eId}`}
      controlPlacement={controlPlacement}
      controls={controls}
      alternatives={[
      (
        <div
          key={'row'}
          className="grid-row"
        >
          <div className="grid-status-cell" >
            {editControl(eId)}
          </div>
          {rowFields(fragments, widths)}
        </div>
      ), (
        <span key={'form'} />
        )
      ]}
      initial={0}
    /> :
    <div className="grid-row" >
      {rowFields(fragments, widths)}
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
