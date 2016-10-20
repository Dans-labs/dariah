import React, { PropTypes } from 'react'
import Contrib from './Contrib.jsx'

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
