import React, { Component } from 'react'
import ContribField from './ContribField.jsx'

import { getData } from '../helpers/data.js'
import { withContext, saveState } from '../helpers/hoc.js'

/**
 * @class
 * @classdesc
 *
 * **stateful** {@link external:Component|Component}
 *
 * ## A single contribution record
 *
 * Displays all fields that the user is entitled to read.
 * With a control to edit the record.
 * 
 * For the actual editing I intend to use
 * {@link https://github.com/kaivi/riek|React Inline Edit Kit}
 *
 */
class ContribItem extends Component {
/**
 *
 * @method
 * @param {Contrib[]} contribdata (from *state*) The list of contribution records as it comes form mongo db,
 * plus a list of fields that is provided for each row (dependent on user permissions)
 * @returns {Fragment}
*/
  constructor(props) {
    super(props);
    this.state = {};
  }

  updMod(modifiedFieldData) {
    const newState = {
      ...this.state,
      fieldData: {
        ...this.state.fieldData,
        fields: {
          ...this.state.fieldData.fields,
          ...modifiedFieldData
        }
      }
    }
    this.setState(newState)
  }

  parseFields() {
    const { fieldData } = this.state;
    const { row, fields, fieldSpecs, fieldOrder, perm } = fieldData;
    const frags = []
    for (const name of fieldOrder) {
      const { label, ...specs } = fieldSpecs[name];
      if (fields[name] == null) {continue}
      const editable = !!perm.update[name];
      frags.push(
        <tr key={name}>
          <td className="label">{label}</td>
          <td>
            <ContribField
              tag={`${row._id}_${name}`}
              initValues={row[name]}
              rowId={row._id}
              editable={editable}
              name={name}
              updMod={this.updMod.bind(this)}
              {...specs}
            />
          </td>
        </tr>
      )
    }
    return frags
  }

  render() {
    const { fieldData } = this.state;
    if (fieldData == null) {
      return <div/>
    }
    return (
      <div className="item">
        <table>
          <tbody>
            {this.parseFields()}
          </tbody>
        </table>
      </div>
    )
  }
/**
 * @method
 * @param {Contrib[]} contribs (from *state*) The list of contribution records as it comes form mongo db
 * @returns {Object} The data fetched from the server.
*/
  componentDidMount() {
    const { fieldData } = this.state;
    const { row } = this.props;
    if (fieldData == null) {
      getData([
          {
            type: 'db',
            path: `/item_contrib?id=${row._id}`,
            branch: 'fieldData',
          },
        ],
        this,
        this.props.notification.component
      );
    }
  }
}

export default withContext(saveState(ContribItem, 'ContribItem', {fieldData: null}))

