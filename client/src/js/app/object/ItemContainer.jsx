import React, { Component } from 'react'
import { connect } from 'react-redux'

import { emptyO } from 'utils'

import { needValues, fetchItem } from 'tables'

import ItemForm from 'ItemForm'

class ItemContainer extends Component {
  render() {
    const { props: { filters, tables, table, eId } } = this
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

    return (
      <ItemForm
        filters={filters}
        tables={tables}
        table={table}
        eId={eId}
        key={`${table}-${eId}`}
        initialValues={initialValues}
        perm={perm}
        fields={fields}
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

export default connect()(ItemContainer)
