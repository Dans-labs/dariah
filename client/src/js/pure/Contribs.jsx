import React, { PropTypes } from 'react'
import Contrib from './Contrib.jsx'

/**
 * **purely functional** {@link external:Component|Component}
 *
 * Displays the list of contributions as a table.
 * Only the rows that have passed all filters.
 *
 * @constructor
 * @param {Object[]} filteredData The list of rows to be displayed
 * @returns {Fragment}
 */
const Contribs = ({ filteredData }) => (
  <div style={{height: '100%', overflow: 'auto'}}>
    <table>
      <tbody>{
      filteredData.map((item) => (
          <Contrib key={item._id} row={item} />
      ))
      }</tbody>
    </table>
  </div>
)

Contribs.propTypes = {
  filteredData: PropTypes.array.isRequired,
}

export default Contribs
