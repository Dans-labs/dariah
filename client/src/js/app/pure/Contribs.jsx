import React from 'react'
import ContribTitle from 'ContribTitle.jsx'

/**
 * **purely functional** {@link external:Component|Component}
 *
 * Displays the list of contributions as a table.
 * Only the rows that have passed all filters.
 *
 * @class
 * @param {Object[]} filteredData The list of rows to be displayed
 * @returns {Fragment}
 */
const Contribs = ({ filteredData, inplace }) => (
  <div>
    <table>
      <tbody>{
      filteredData.map(item => (
          <ContribTitle key={item._id} row={item} inplace={inplace}/>
      ))
      }</tbody>
    </table>
  </div>
)

export default Contribs
