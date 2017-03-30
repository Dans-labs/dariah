import React, { Component } from 'react'

import { getData } from 'data.js'
import { withContext, saveState } from 'hoc.js'

class ValueList extends Component {
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


