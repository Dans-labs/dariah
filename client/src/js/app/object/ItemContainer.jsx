import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getTable, needValues, fetchItem } from 'tables'

import ItemForm from 'ItemForm'

class ItemContainer extends Component {
  render() {
    const { props: { tableData, table, eId } } = this
    if (needValues({ tableData, eId })) {return <div />}

    const { entities: { [eId]: { fields, values: initialValues, perm } } } = tableData
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
    const { props: { tableData, table, eId, dispatch } } = this
    if (needValues({ tableData, eId })) {dispatch(fetchItem(table, eId))}
  }
  componentDidUpdate() {
    const { props: { tableData, table, eId, dispatch } } = this
    if (needValues({ tableData, eId })) {dispatch(fetchItem(table, eId))}
  }
}

export default connect(getTable)(ItemContainer)
