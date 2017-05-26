import React from 'react'
import { connect } from 'react-redux'

import { getTables } from 'tables'

import FieldRead from 'FieldRead'

const ItemGrid = ({ tables, table, filteredData }) => {
  const { [table]: { fieldOrder, entities } } = tables
  return (
    <div>
      <table>
        <tbody>
          <tr>{
            fieldOrder.map(field => <th key={field}>{field}</th>)
          }</tr>
          {
            filteredData.map(eId => {
              const { [eId]: { values } } = entities
              return (
                <tr key={eId} >{
                  fieldOrder.map(field => (
                    <td key={`${eId}-${field}`}>
                      <FieldRead
                        field={field}
                        tables={tables}
                        table={table}
                        myValues={values[field]}
                      />
                    </td>
                  ))
                }
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default connect(getTables)(ItemGrid)
