import React, { PropTypes } from 'react'

const style = {
  color: '#0000dd',
  fontSize: 'small',
  fontWeight: 'normal',
}

/**
 * **purely functional** {@link external:Component|Component}
 *
 * Displays a string of the form *subTotal* `of` *total*.
 * If one of the two is missing, the `of` will not display.
 *
 * @constructor
 * @param {number=} subTotal
 * @param {number=} total
 * @returns {Fragment}
 */
const Stats = ({subTotal, total}) => (
  <span style={style}>
    {subTotal == undefined? '' :`${subTotal}`}
    {(total == undefined || subTotal == undefined)? '' : ' of '}
    <strong>{total == undefined?'':`${total}`}</strong>
  </span>
)

Stats.propTypes = {
  subTotal: PropTypes.number,
  total: PropTypes.number,
}

export default Stats
