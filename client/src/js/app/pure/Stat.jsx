import React from 'react'

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
const Stat = ({subTotal, total}) => (
  <span className="good-o" >
    {subTotal == null ? '' : `${subTotal}`}
    {(total == null || subTotal == null) ? '' : ' of '}
    <strong>{total == null ? '' : `${total}`}</strong>
  </span>
)

export default Stat
