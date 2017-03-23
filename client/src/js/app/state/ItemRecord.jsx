import React, { Component } from 'react'
import ItemField from 'ItemField.jsx'

import { getData } from 'data.js'
import { withContext, saveState } from 'hoc.js'
import memoBind from 'memoBind.js'

/**
 * @class
 * @classdesc
 *
 * **stateful** {@link external:Component|Component}
 *
 * ## A single record
 *
 * Displays all fields that the user is allowed to read.
 * With a control to edit the record.
 *
 */

class ItemRecord extends Component {
/**
 *
 * @method
 * @param {Item[]} listData (from *state*) The list of records as it comes form mongo db,
 * plus a list of fields that is provided for each row (dependent on user permissions)
 * @returns {Fragment}
*/
  updMod = modifiedRowData => {
    const updRow = ({ fieldData: { row, ...oldFieldData } }) => ({
      ...oldFieldData,
      row: { row, ...modifiedRowData },
    })

    this.setState(updRow)
  }
  progIcon(noChange, allValid) {
    const { props: { editStatus, table, recordId } } = this
    const statusClass = noChange ? 'info' : (allValid ? 'warning' : 'error')
    const statusIcon = noChange ? '' : (allValid ? 'fa-pencil' : 'fa-close')
    const { [table]: { [recordId]: { prog: domProg } } } = editStatus
    domProg.className = `${statusClass} fa ${statusIcon}`
  }

  updEdit = (name, changed, valid, newVals) => {
    const {
      props: { editStatus, table, recordId },
      state: {
        fieldData: { title },
        changed: prevChanged,
        valid: prevValid,
      },
    } = this
    if (name == title) {
      const { [table]: { [recordId]: { title: domTitle } } } = editStatus;
      [domTitle.innerHTML] = newVals
    }
    const newState = {
      changed: {...prevChanged, [name]: changed},
      valid: {...prevValid, [name]: valid},
    }
    const { noChange, allValid, canSave } = this.saveStatus(newState)
    this.progIcon(noChange, allValid)
    if (!canSave) {
      newState.saveConcern = false
    }
    this.setState(newState)
  }
  handleSaveAll = () => {
    const { canSave } = this.saveStatus()
    if (canSave) {
      this.setState({saveConcern: true})
    }
  }
  parseFields() {
    const {
      props: { table },
      state: {
        fieldData: { row, fields, fieldSpecs, fieldOrder, perm },
        saveConcern,
      },
    } = this
    const { _id: rowId } = row
    const fragments = []
    let hasEditable = false
    for (const name of fieldOrder) {
      const { [name]: { label, initial, ...specs } } = fieldSpecs
      const { [name]: f } = fields
      if (f == null) {continue}
      const { update: { [name]: editable } } = perm
      if (editable) {hasEditable = true}
      const { [name]: initValues } = row
      fragments.push(
        <ItemField
          key={name}
          tag={`field_${table}_${rowId}_${name}`}
          table={table}
          initValues={initValues}
          rowId={rowId}
          editable={!!editable}
          name={name}
          label={label}
          initial={initial}
          saveConcern={saveConcern}
          updMod={this.updMod}
          updEdit={this.updEdit}
          {...specs}
        />
      )
    }
    return {fragments, hasEditable}
  }

  saveStatus(newState) {
    const { state } = this
    const { changed, valid } = (newState == null) ? state : newState
    const noChange = Object.keys(changed).every(n => !changed[n])
    const allValid = Object.keys(valid).every(n => valid[n])
    const canSave = !Object.keys(changed).every(n => (!changed[n] || !valid[n]))
    return { noChange, allValid, canSave }
  }

  render() {
    const {
      props: { table, parentList },
      state: { fieldData: { row, perm } },
    } = this
    if (row == null) {
      return <div />
    }
    const { noChange, allValid, canSave } = this.saveStatus()
    const statusClass = noChange ? 'special' : (allValid ? 'warning' : 'error')
    const elemText = noChange ? 'all saved' : (allValid ? 'save changes' : 'make corrections')
    const { _id: rowId } = row
    const { fragments, hasEditable } = this.parseFields()
    const { [table]: parent } = parentList
    return (
      <div className="widget-medium" >
        <p>
          {hasEditable ? [
            canSave ? (
              <span
                key="save"
                className={`button-large ${statusClass}`}
                onClick={this.handleSaveAll}
              >{elemText}</span>
            ) : (
              <span
                key="nosave"
                className={`button-large ${statusClass}`}
              >{elemText}</span>
            ),
            perm.delete ? (
              <span
                key="delete"
                className={'fa fa-trash button-large delete'}
                title="delete this item"
                onClick={parent ? memoBind(parent, 'deleteRow', [rowId]) : null}
              />
            ) : null,
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
    const {
      props: { table, recordId, ownOnly, notification },
      state: { fieldData },
    } = this
    if (Object.keys(fieldData).length == 0) {
      getData(
        [
          {
            type: 'db',
            path: `/view?table=${table}&id=${recordId}${ownOnly ? '&own=true' : ''}`,
            branch: 'fieldData',
          },
        ],
        this,
        notification.component
      )
    }
  }
  componentDidMount() {this.fetchRow()}
  componentDidUpdate() {this.fetchRow()}
}

export default withContext(saveState(ItemRecord, 'ItemRecord', {
  fieldData: {},
  changed: {},
  valid: {},
  saveConcern: false,
}))

