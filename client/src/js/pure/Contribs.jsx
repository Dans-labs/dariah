import React from 'react'
import ContribTitle from './ContribTitle.jsx'

/**
 * **purely functional** {@link external:Component|Component}
 *
 * Displays the list of contributions as a table.
 * Only the rows that have passed all filters.
 *
 * @class
 * @param {Object[]} filteredData The list of rows to be displayed
 * @param {Object} fields - Contains the fields that mongo db has supplied for each row. This is 
 * dependent on the permissions of the current user.
 * @returns {Fragment}
 */
const Contribs = ({ filteredData, fields }) => (
  <div style={{height: '100%', overflow: 'auto'}}>
    <table>
      <tbody>{
      filteredData.map(item => (
          <ContribTitle key={item._id} row={item} fields={fields} />
      ))
      }</tbody>
    </table>
  </div>
)

export default Contribs
