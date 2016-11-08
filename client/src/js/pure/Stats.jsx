import React from 'react'

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
 * @class
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

export default Stats
