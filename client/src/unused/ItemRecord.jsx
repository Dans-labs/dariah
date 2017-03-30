import React, { Component } from 'react'
import { connect } from 'react-redux'
import ItemField from 'ItemField.jsx'

import { getData } from 'data.js'
import { fetchData } from 'server.js'
import { withContext, saveState } from 'hoc.js'
import memoBind from 'memoBind.js'

class ItemRecord extends Component {
  updMod = modifiedEntityData => {
    const updEntity = ({ fieldData: { entity, ...oldFieldData } }) => ({
      ...oldFieldData,
      entity: { entity, ...modifiedEntityData },
    })

    this.setState(updEntity)
  }
  progIcon(noChange, allValid) {
    const { props: { editStatus, table, eId } } = this
    const statusClass = noChange ? 'info' : (allValid ? 'warning' : 'error')
    const statusIcon = noChange ? '' : (allValid ? 'fa-pencil' : 'fa-close')
    const { [table]: { [eId]: { prog: domProg } } } = editStatus
    domProg.className = `${statusClass} fa ${statusIcon}`
  }

  updEdit = (name, changed, valid, newVals) => {
    const {
      props: { editStatus, table, eId },
      state: {
        fieldData: { title },
        changed: prevChanged,
        valid: prevValid,
      },
    } = this
    if (name == title) {
      const { [table]: { [eId]: { title: domTitle } } } = editStatus;
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
      props: { tables, table, eId },
      state: {
        saveConcern,
      },
    } = this
    const { [table]: { fieldSpecs, fieldOrder } } = tables
    const entity = this.getEntity()
    const { _perm: perm, _fields: fields } = entity

    const fragments = []
    let hasEditable = false
    for (const name of fieldOrder) {
      const { [name]: { label, initial, ...specs } } = fieldSpecs
      const { [name]: f } = fields
      if (f == null) {continue}
      const { update: { [name]: editable } } = perm
      if (editable) {hasEditable = true}
      fragments.push(
        <ItemField
          key={name}
          tag={`field_${table}_${eId}_${name}`}
          table={table}
          eId={eId}
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

  getEntity = () => {
    const { props: { tables, table, eId  } } = this
    const { [table]: { entities: { [eId]: entity } } } = tables
    return entity
  }

  render() {
    const {
      props: { tables, table, eId, lists },
    } = this
    if (this.needValues()) {
      return <div />
    }

    const entity = this.getEntity()
    const { _perm: perm } = entity
    const { noChange, allValid, canSave } = this.saveStatus()
    const statusClass = noChange ? 'special' : (allValid ? 'warning' : 'error')
    const elemText = noChange ? 'all saved' : (allValid ? 'save changes' : 'make corrections')
    const { fragments, hasEditable } = this.parseFields()
    const { [table]: parent } = lists
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
                onClick={parent ? memoBind(parent, 'deleteEntity', [eId]) : null}
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
  fetchEntity() {
    const { props: { table, eId, ownOnly, fetch } } = this
    if (this.needValues()) {
      console.warn('FETCH ENTITY', name)
      fetch({
        type: 'fetchItem',
        contentType: 'db',
        path: `/view?table=${table}&id=${eId}${ownOnly ? '&own=true' : ''}`,
        desc: `${table} record ${eId}`,
        table,
      })
    }
  }
  needValues() {
    const { props: { tables, table, eId } } = this
    return (tables == null || tables[name] == null || tables[name].entities[eId] == null)
  }
  componentDidMount() {
    if (this.needValues()) {
      this.fetchEntity()
    }
  }
}

const mapStateToProps = ({ tables, lists }) => ({ tables, lists })

export default connect(mapStateToProps, { fetch: fetchData })(
  withContext(saveState(ItemRecord, 'ItemRecord', {
    changed: {},
    valid: {},
    saveConcern: false,
  }))
)

