import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchData } from 'server.js'
import { getTables } from 'tables.js'

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
    const {
      props: { tables, table, eId },
    } = this
    if (this.needValues()) {
      return <div />
    }

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
        <div>
          {fragments}
        </div>
      </div>
    )
  }
  fetchEntity() {
    const { props: { table, eId, ownOnly, fetch } } = this
    if (this.needValues()) {
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
    return (tables == null || tables[table] == null || tables[table].entities[eId] == null || !tables[table].entities[eId].complete)
  }
  componentDidMount() {
    if (this.needValues()) {this.fetchEntity()}
  }
  componentDidUpdate(prevProps) {
    const { table: prevTable, eId: prevEId } = prevProps
    const { props: { table, eId } } = this
    if ((table != prevTable || eId != prevEId) && this.needValues()) {this.fetchEntity()}
  }
}

export default connect(getTables, { fetch: fetchData })(ItemRecord)

