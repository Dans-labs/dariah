import React, { Component } from 'react'
import ContribField from 'ContribField.jsx'

import { getData } from 'data.js'
import { withContext, saveState } from 'hoc.js'

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
 */
class ContribItem extends Component {
/**
 *
 * @method
 * @param {Contrib[]} contribData (from *state*) The list of contribution records as it comes form mongo db,
 * plus a list of fields that is provided for each row (dependent on user permissions)
 * @returns {Fragment}
*/
  updMod(modifiedFieldData) {
    const newEditing = {}
    for (const n in modifiedFieldData) {
      newEditing[n] = false;
    }
    const newState = {
      ...this.state,
      fieldData: {
        ...this.state.fieldData,
        fields: {
          ...this.state.fieldData.fields,
          ...modifiedFieldData
        }
      },
    }
    this.setState(newState)
  }
  progIcon(noChange, allValid) {
    const { editStatus, contribId } = this.props;
    const statusClass = noChange?'info':(allValid?'warning':'error')
    const statusIcon = noChange?'':(allValid?'fa-pencil':'fa-close')
    editStatus[contribId].prog.className = `${statusClass} fa ${statusIcon}`;
  }

  updEdit(name, changed, valid, newVals) {
    const { editStatus, contribId } = this.props;
    const { saveConcern, fieldData } = this.state;
    if (name == 'title') {
      editStatus[contribId].title.innerHTML = newVals[0];
    }
    const newState = {
      ...this.state,
      changed: {...this.state.changed, [name]: changed},
      valid: {...this.state.valid, [name]: valid},
    }
    const { noChange, allValid, canSave } = this.saveStatus(newState);
    this.progIcon(noChange, allValid);
    if (!canSave) {
      newState.saveConcern = false;
    }
    this.setState(newState)
  }
  saveAll() {
    const { canSave } = this.saveStatus();
    if (canSave) {
      this.setState({...this.state, saveConcern: true})
    }
  }
  parseFields() {
    const { fieldData } = this.state;
    const { row, fields, fieldSpecs, fieldOrder, perm } = fieldData;
    const fragments = []
    let hasEditable = false;
    for (const name of fieldOrder) {
      const { label, initial, ...specs } = fieldSpecs[name];
      if (fields[name] == null) {continue}
      const editable = !!perm.update[name];
      if (editable) {hasEditable = true}
      const rowId = row._id;
      fragments.push(
        <ContribField
          key={name}
          tag={`field_${rowId}_${name}`}
          initValues={row[name]}
          rowId={rowId}
          editable={editable}
          name={name}
          label={label}
          initial={initial}
          saveConcern={this.state.saveConcern}
          updMod={this.updMod.bind(this)}
          updEdit={this.updEdit.bind(this)}
          {...specs}
        />
      )
    }
    return {fragments, hasEditable}
  }

  saveStatus(newState) {
    const { fieldData, changed, valid } = (newState == null)? this.state : newState;
    const noChange = Object.keys(changed).every(n=>!changed[n])
    const allValid = Object.keys(valid).every(n=>valid[n])
    const canSave = !Object.keys(changed).every(n=>(!changed[n] || !valid[n]))
    return { noChange, allValid, canSave }
  }

  render() {
    const { fieldData, changed, valid } = this.state;
    const { delCallback } = this.props;
    if (fieldData == null || fieldData.row == null) {
      return <div/>
    }
    const { noChange, allValid, canSave } = this.saveStatus(); 
    const statusClass = noChange?'info':(allValid?'warning':'error')
    const elemText = noChange?'all saved':(allValid?'save changes':'make corrections');
    const { row, perm } = fieldData;
    const rowId = row._id;
    const { fragments, hasEditable } = this.parseFields();
    return (
      <div className="widget-medium">
        <p>
          {hasEditable? [
            canSave? (
              <span
                key="1"
                className={`button-large ${statusClass}`}
                onClick={this.saveAll.bind(this)}
              >{elemText}</span>
            ) : (
              <span
                key="1"
                className={`save ${statusClass}`}
              >{elemText}</span>
            ),
            perm.delete? (
              <span
                key="2"
                className={'fa fa-trash button-large delete'}
                onClick={delCallback.contrib? delCallback.contrib.bind(null, rowId) : null}
                title="delete this contribution"
              />
            ) : null
          ] : null}
        </p>
        <table>
          <tbody>
            {fragments}
          </tbody>
        </table>
      </div>
    )
  }
/**
 * @method
 * @returns {Object} The data fetched from the server.
*/
  fetchRow() {
    const { fieldData } = this.state;
    const { contribId, ownOnly } = this.props;
    if (fieldData == null) {
      getData([
          {
            type: 'db',
            path: `/view_contrib?id=${contribId}${ownOnly?'&own=true':''}`,
            branch: 'fieldData',
          },
        ],
        this,
        this.props.notification.component
      );
    }
  }
  componentDidMount()  {this.fetchRow()}
  componentDidUpdate() {this.fetchRow()}

}

export default withContext(saveState(ContribItem, 'ContribItem', {
  fieldData: null,
  changed: {},
  valid: {},
  saveConcern: false,
}))

