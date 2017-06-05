import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getTables, needValues, fetchItem } from 'tables'

import ItemForm from 'ItemForm'

class ItemContainer extends Component {
  render() {
    //console.warn('ITEMCONTAINER RENDER')
    const { props: { tables, table, eId } } = this
    if (needValues({ tables, table, eId })) {return <div />}

    const { [table]: { fields, entities: { [eId]: entity } } } = tables
    const { values: initialValues, perm } = entity
    return (
      <div>
        <ItemForm
          table={table}
          eId={eId}
          form={`${table}-${eId}`}
          key={`${table}-${eId}`}
          initialValues={initialValues}
          perm={perm}
          fields={fields}
        />
      </div>
    )
    /* Note the key prop passed to ItemForm.
     * If you do not pass it, you get bugs caused by the mounting and unmounting of this component
     * due to react-router navigation.
     * In essence, the callback onChange that redux-form passes to input components, becomes bound to the wrong form!
     * This workaround is documented here: https://github.com/erikras/redux-form/issues/2886
    */
  }
  componentDidMount() {
    const { props: { tables, table, eId, fetch } } = this
    if (needValues({ tables, table, eId })) {fetch(table, eId)}
  }
  componentDidUpdate() {
    const { props: { tables, table, eId, fetch } } = this
    if (needValues({ tables, table, eId })) {fetch(table, eId)}
  }
}

export default connect(getTables, { fetch: fetchItem })(ItemContainer)
