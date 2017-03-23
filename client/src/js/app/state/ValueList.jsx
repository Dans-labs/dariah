import React, { Component } from 'react'

import { getData } from 'data.js'
import { withContext, saveState } from 'hoc.js'

/**
 * @class
 * @classdesc
 *
 * **stateful** {@link external:Component|Component}
 *
 * ## A value list
 *
 * Displays all values for a field in the item list.
 *
 */
class ValueList extends Component {
/**
 *
 * @method
 * @param {string} fieldName The name of the field to obtain the values from.
 * @returns {Fragment}
*/
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { state: { fieldValues } } = this
    if (fieldValues == null) {
      return <div />
    }
    return (
      <table>
        <tbody>{
          fieldValues.map(x => (
            <tr key={x._id} ><td>{x._id}</td><td>{x.value}</td></tr>
          ))
        }
        </tbody>
      </table>
    )
  }
/**
 * @method
 * @param {Value[]} values (from *state*) The list of distinct field values as it comes form mongo db
 * @returns {Object} The data fetched from the server.
*/
  componentDidMount() {
    const {
      props: { fieldName, notification },
      state: { fieldValues },
    } = this
    if (fieldValues == null) {
      getData(
        [
          {
            type: 'db',
            path: `/value_list?list=${fieldName}`,
            branch: 'fieldValues',
          },
        ],
        this,
        notification.component
      )
    }
  }
}

export default withContext(saveState(ValueList, 'ValueList', {fieldValues: null}))


