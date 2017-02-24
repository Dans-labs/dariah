import React from 'react'
import ItemHead from 'ItemHead.jsx'
import { withContext } from 'hoc.js'

/**
 * **purely functional** {@link external:Component|Component}
 *
 * Displays the list of items as a table.
 * Only the rows that have passed all filters.
 *
 * @class
 * @param {Object[]} filteredData The list of rows to be displayed
 * @returns {Fragment}
 */
const ItemList = ({ table, title, filteredData, inplace, editStatus }) => {
  if (editStatus[table] == null) {editStatus[table] = {}}
  return (
    <div>
      <table>
        <tbody>{
        filteredData.map(item => (
            <ItemHead key={item._id} table={table} title={title} row={item} inplace={inplace}/>
        ))
        }</tbody>
      </table>
    </div>
  )
}

export default withContext(ItemList)
