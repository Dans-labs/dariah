import React, { Component } from 'react'
import { connect } from 'react-redux'

import { emptyO } from 'utils'
import { dealWithProvenance } from 'fields'

import { getSettings } from 'settings'
import { needValues, fetchItem } from 'tables'

import ItemForm from 'ItemForm'

class ItemContainer extends Component {
  render() {
    const { props: { settings, filters, tables, table, eId, isactive } } = this
    const {
      [table]: {
          entities = emptyO,
          entities: {
            [eId]: {
                fields,
                values: initialValues,
                perm,
            } = emptyO,
          },
      } = emptyO,
    } = tables
    if (needValues(entities, eId)) {return <div />}

    const alterSection = `edit-${table}-${eId}`
    return (
      <ItemForm
        filters={filters}
        tables={tables}
        table={table}
        eId={eId}
        alterSection={alterSection}
        isactive={isactive}
        key={`${table}-${eId}`}
        initialValues={initialValues}
        perm={perm}
        fields={dealWithProvenance(settings, fields)}
      />
    )
  }
  componentDidMount() {
    const { props: { tables, table, eId, dispatch } } = this
    const { [table]: { entities = emptyO } } = tables
    if (needValues(entities, eId)) {dispatch(fetchItem(table, eId))}
  }
  componentDidUpdate() {
    const { props: { tables, table, eId, dispatch } } = this
    const { [table]: { entities = emptyO } } = tables
    if (needValues(entities, eId)) {dispatch(fetchItem(table, eId))}
  }
}

export default connect(getSettings)(ItemContainer)
