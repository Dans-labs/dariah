import React from 'react'
import { connect } from 'react-redux'
import ItemHead from 'ItemHead.jsx'
import { getTables } from 'tables.js'

const ItemList = ({ tables, table, title, filteredData, inplace }) => {
  const { [table]: { entities } } = tables 
  return (
    <div>
      <table>
        <tbody>{
        filteredData.map(eId => {
          const { values } = entities[eId]
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
