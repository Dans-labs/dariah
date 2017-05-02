import React from 'react'
import { connect } from 'react-redux'

import { getTables } from 'tables'

import ItemHead from 'ItemHead'

const ItemList = ({ tables, table, title, filteredData, inplace }) => {
  const { [table]: { entities } } = tables
  return (
    <div>
      <table>
        <tbody>{
        filteredData.map(eId => {
          const { [eId]: { values } } = entities
          return (
            <ItemHead key={eId} table={table} title={title} values={values} inplace={inplace} />
          )
        })
        }</tbody>
      </table>
    </div>
  )
}

export default connect(getTables)(ItemList)
