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
    const classes = ['savei']
    classes.push(allValid?'valid':'invalid');
    classes.push(noChange?'clean':'dirty');
    if (!allValid) {classes.push('fa fa-close invalid')}
    else if (!noChange) {classes.push('fa fa-pencil changed')}
    editStatus[contribId].prog.className = classes.join(' ');
  }

  updEdit(name, changed, valid, newVals) {
    const { editStatus, contribId } = this.props;
    const { saveConcern, fieldData } = this.state;
    if (name == 'title' && changed) {
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
    const frags = []
    for (const name of fieldOrder) {
      const { label, ...specs } = fieldSpecs[name];
      if (fields[name] == null) {continue}
      const editable = !!perm.update[name];
      const rowId = row._id;
      frags.push(
        <ContribField
          key={name}
          tag={`field_${rowId}_${name}`}
          initValues={row[name]}
          rowId={rowId}
          editable={editable}
          name={name}
          label={label}
          saveConcern={this.state.saveConcern}
          updMod={this.updMod.bind(this)}
          updEdit={this.updEdit.bind(this)}
          {...specs}
        />
      )
    }
    return frags
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
    if (fieldData == null || fieldData.row == null) {
      return <div/>
    }
    const { noChange, allValid, canSave } = this.saveStatus(); 
    const allValidClass = allValid?'valid':'invalid';
    const noChangeClass = noChange?'clean':'dirty';
    const elemText = noChange?'all saved':(allValid?'save changes':'make corrections');
    return (
      <div className="item">
        <p>{
          canSave? (
            <a
              className={`save ${noChangeClass} ${allValidClass}`}
              href="#"
              onClick={this.saveAll.bind(this)}
            >{elemText}</a>
          ) : (
            <span className={`save ${noChangeClass} ${allValidClass}`}>{elemText}</span>
          )
        }</p>
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
  fetchRow() {
    const { fieldData } = this.state;
    const { contribId, ownOnly } = this.props;
    if (fieldData == null) {
      getData([
          {
            type: 'db',
            path: `/item_contrib?id=${contribId}${ownOnly?'&own=true':''}`,
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

export default withContext(saveState(ContribItem, 'ContribItem', {fieldData: null, changed: {}, valid: {}, saveConcern: false}))

