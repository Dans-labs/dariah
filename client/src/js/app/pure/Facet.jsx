import React from 'react'

/**
 * **purely functional** {@link external:Component|Component}
 *
 * Displays a single facet. Just a checkbox and a value representation.
 * The clicks received by the checkbox are passed upwards by means of a callback.
 *
 * Note that we use the strategy of {@link external:ControlledComponent|controlled components} here.
 *
 * @class
 * @param {number} filterId The index of the filter in the filterList
 * @param {number} valueId The id of the value that is displayed in this facet
 * @param {string} valueRep The string representation of the value of this facet (the label next to the checkbox)
 * @param {boolean} cheked Whether the checkbox is checked
 * @param {FilterCompute#updFilter} updFilter Callback to update the state when user event has occurred 
 * @returns {Fragment}
 */
const Facet = ({ filterId, valueId, valueRep, checked, updFilter }) => (
  <span>
    <input
      type="checkbox"
      onChange={event => updFilter(filterId, [valueId, event.target.checked])}
      checked={checked}
      className="facet"
    />
    {` ${valueRep}`}
  </span>
)

export default Facet
