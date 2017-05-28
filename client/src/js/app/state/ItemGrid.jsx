import React from 'react'
import { connect } from 'react-redux'

import { getTables } from 'tables'

import ItemRow from 'ItemRow'

const ItemGrid = ({ tables, table, filteredData }) => {
  const { [table]: { fields, fieldOrder, fieldSpecs, entities } } = tables
  const { length: nFields } = fieldOrder
  const avLength = `${100/nFields}%`
  const widths = fieldOrder.map(field => {
    const { [field]: { grid } } = fieldSpecs
    if (grid == null) {
      return { width: avLength, shrink: 0, grow: 1 }
    }
    const { width, grow, shrink } = grid
    return { width: width || avLength, shrink: shrink || 0, grow: grow || 1 }
  })
  return (
    <div className="grid">
      <div className="grid-head" >{
        fieldOrder.map((field, i) => {
          const { width, shrink, grow } = widths[i]
          return <div
            className="grid-head-cell"
            key={field}
            style={{
              flexBasis: width,
              flexShrink: shrink,
              flexGrow: grow,
              overflow: 'auto',
            }}
          >{field}</div>
        })
      }
      </div>
      {
        filteredData.map(eId => {
          const { [eId]: { values: initialValues, perm } } = entities
          return (
            <ItemRow
              key={`${table}-${eId}`}
              table={table}
              eId={eId}
              initialValues={initialValues}
              perm={perm}
              fields={fields}
              widths={widths}
              form={`${table}-${eId}`}
            />
          )
        })
      }
    </div>
  )
}

export default connect(getTables)(ItemGrid)
