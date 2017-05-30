import React from 'react'
import { connect } from 'react-redux'
//import omit from 'lodash/omit'

import { memoize } from 'memo'
import { getTables, insertItem } from 'tables'

import ItemRow from 'ItemRow'

const insertit = memoize((insert, table, my, masterId, linkField) => () => insert(my, table, masterId, linkField))

const ItemGrid = ({ tables, table, filteredData, perm: tablePerm, gridTitle, masterId, linkField, insert, select }) => {
  const theTitle = gridTitle ? `${gridTitle}: ` : ''
  const { [table]: { fields, fieldOrder, fieldSpecs, details, entities } } = tables
  //const xfields = linkField ? omit(fields, linkField) : fields
  const xfields = fields
  const { length: nFields } = fieldOrder
  const avLength = `${90 / nFields}%`
  const widths = fieldOrder.map(field => {
    const { [field]: { grid } } = fieldSpecs
    if (grid == null) {
      return { width: avLength, shrink: 0.5, grow: 1 }
    }
    const { width, grow, shrink } = grid
    return { width: width || avLength, shrink: shrink || 0, grow: grow || 1 }
  })
  const rows = []
  for (const eId of filteredData) {
    const { [eId]: { values: initialValues, perm } } = entities
    rows.push(
      <ItemRow
        key={`${table}-${eId}`}
        table={table}
        eId={eId}
        initialValues={initialValues}
        perm={perm}
        fields={xfields}
        widths={widths}
        form={`${table}-${eId}`}
      />
    )
    Object.entries(details || {}).forEach(([name, { label, table: detailTable, linkField }]) => {
      const { [detailTable]: { perm: detailPerm, entities: detailEntities, my: detailMy, order: detailOrder } } = tables
      const detailItems = (select == 'my') ? detailMy : detailOrder
      const filteredData = detailItems.filter(_id => detailEntities[_id].values[linkField] == eId)
      rows.push(
        <XItemGrid
          key={`${name}-${eId}`}
          gridTitle={label}
          table={detailTable}
          perm={detailPerm}
          filteredData={filteredData}
          select={select}
          masterId={eId}
          linkField={linkField}
        />
      )
    })
  }
  return (
    <div>
      <p>
        <span className={'detailTitle'}>{theTitle}</span>{`${filteredData.length} items `}
        {(tablePerm != null && tablePerm.insert) ? (
          <span
            className="fa fa-plus button-large"
            title={`new ${table}`}
            onClick={insertit(insert, table, select == 'my', masterId, linkField)}
          />
        ) : null}
      </p>
      <div className="grid" >
        <div className="grid-head" >
          <div className="grid-status-cell" />
          {
            fieldOrder.filter(field => field != linkField).map((field, i) => {
              const { width, shrink, grow } = widths[i]
              return (
                <div
                  className="grid-head-cell labelColGrid"
                  key={field}
                  style={{
                    flexBasis: width,
                    flexShrink: shrink,
                    flexGrow: grow,
                    overflow: 'auto',
                  }}
                >
                  {field}
                </div>
              )
            })
          }
        </div>
        {rows}
      </div>
    </div>
  )
}

const XItemGrid = connect(getTables, { insert: insertItem })(ItemGrid)
export default XItemGrid
