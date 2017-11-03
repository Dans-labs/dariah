import React, { Component } from 'react'
import { connect } from 'react-redux'

import { emptyO } from 'utils'
import { dealWithProvenance } from 'fields'

import { getSettings } from 'settings'
import { needValues, fetchItem, headEntity } from 'tables'

import ItemForm from 'ItemForm'


class ItemContainer extends Component {
  render() {
    const {
      props: {
        settings, filters, tables, table, eId,
        masterId, linkField,
        isactive, startMode, fixed, border,
      },
    } = this
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
        masterId={masterId}
        linkField={linkField}
        alterSection={alterSection}
        isactive={isactive}
        startMode={startMode}
        key={`${table}-${eId}`}
        initialValues={initialValues}
        perm={perm}
        fields={dealWithProvenance(settings, fields)}
        fixed={fixed}
        border={border}
      />
    )
  }
  openItem() {
    const { props: { settings, tables, table, eId, inhibitFetch, dispatch } } = this
    const { [table]: { entities = emptyO } } = tables
    const head = headEntity(tables, table, eId, settings)
    if (!inhibitFetch && needValues(entities, eId)) {dispatch(fetchItem(table, eId, head))}
  }
  componentDidMount() {this.openItem()}
  componentDidUpdate() {this.openItem()}
}

export default connect(getSettings)(ItemContainer)
