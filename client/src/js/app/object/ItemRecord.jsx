import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getTables, needValues, changedItem, fetchItem } from 'tables.js'

import ItemField from 'ItemField.jsx'

class ItemRecord extends Component {
  parseFields() {
    const { props: { tables, table, eId } } = this
    const { [table]: { fieldSpecs, fieldOrder } } = tables
    const entity = this.getEntity()
    const { perm, fields, values } = entity

    const fragments = []
    let hasEditable = false
    for (const name of fieldOrder) {
      const { [name]: f } = fields
      if (f == null) {continue}
      const { [name]: { label, initial, ...specs } } = fieldSpecs
      const { update: { [name]: editable } } = perm
      if (editable) {hasEditable = true}
      fragments.push(
        <ItemField
          key={name}
          table={table}
          eId={eId}
          editable={!!editable}
          name={name}
          label={label}
          values={values[name]}
          initial={initial}
          {...specs}
        />
      )
    }
    return {fragments, hasEditable}
  }

  getEntity = () => {
    const { props: { tables, table, eId  } } = this
    const { [table]: { entities: { [eId]: entity } } } = tables
    return entity
  }

  render() {
    const { props: { tables, table, eId } } = this
    if (needValues(tables, table, eId)) {return <div />}

    const entity = this.getEntity()
    const { perm: perm } = entity
    const { fragments, hasEditable } = this.parseFields()
    return (
      <div className="widget-medium" >
        <p>record in {table}</p>
        <p>
          {hasEditable ? [
            <span
              key="save"
              className={`button-large`}
            >Save</span>,
            perm.delete ? (
              <span
                key="delete"
                className={'fa fa-trash button-large delete'}
                title="delete this item"
              />
            ) : null,
          ] : null}
        </p>
        <div>{fragments}</div>
      </div>
    )
  }
  componentDidMount() {
    const { props, props: { fetch } } = this
    fetch(props)
  }
  componentDidUpdate(prevProps) {
    const { props, props: { fetch } } = this
    if (changedItem(props, prevProps)) {
      fetch(props)
    }
  }
}

export default connect(getTables, { fetch: fetchItem })(ItemRecord)

