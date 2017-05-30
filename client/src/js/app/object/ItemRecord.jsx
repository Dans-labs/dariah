import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withParams, editDelete } from 'utils'
import { getTables, needValues, changedItem, fetchItem, insertItem, delItem } from 'tables'

import ItemForm from 'ItemForm'
import ItemGrid from 'ItemGrid'

const NEW = 'new'

class ItemRecord extends Component {
  handleDelete = event => {
    event.preventDefault()
    const { props: { table, eId, del, router, select, location: { pathname } } } = this
    del(table, eId)
    const base = /^\/([^/]+)/.exec(pathname)[1]
    const verb = (select == 'my') ? 'mylist' : 'list'
    const locBase = `/${base}/${table}/${verb}`
    router.push(locBase)
  }
  render() {
    const { props: { tables, table, eId, select } } = this
    if (needValues({ tables, table, eId })) {return <div />}

    const { [table]: { fields, details, entities: { [eId]: entity } } } = tables
    const { values: initialValues, perm } = entity
    const detailTables = Object.entries(details || {}).map(([name, { label, table: detailTable, linkField }]) => {
      const { [detailTable]: { perm: detailPerm, entities: detailEntities, my: detailMy, order: detailOrder } } = tables
      const detailItems = (select == 'my') ? detailMy : detailOrder
      const filteredData = detailItems.filter(_id => detailEntities[_id].values[linkField] == eId)
      return (
        <ItemGrid
          key={`${name}-${eId}`}
          gridTitle={label}
          table={detailTable}
          perm={detailPerm}
          filteredData={filteredData}
          select={select}
          masterId={eId}
          linkField={linkField}
        />
      )
    })
    return (
      <div>
        {editDelete(perm, 'button-large', this.handleDelete)}
        <ItemForm
          table={table}
          eId={eId}
          initialValues={initialValues}
          perm={perm}
          fields={fields}
          form={`${table}-${eId}`}
          key={`${table}-${eId}`}
        />
        {detailTables}
      </div>
    )
    /* Note the key prop passed to ItemForm.
     * If you do not pass it, you get bugs caused by the mounting and unmounting of this component
     * due to react-router navigation.
     * In essence, the callback onChange that redux-form passes to input components, becomes bound to the wrong form!
     * This workaround is documented here: https://github.com/erikras/redux-form/issues/2886
    */
  }
  gotoNewItem() {
    const { props: { tables, table, router, insert, select, location: { pathname } } } = this
    const { [table]: tableInfo } = tables
    if (tableInfo == null) {return}
    const base = /^\/([^/]+)/.exec(pathname)[1]
    const verb = (select == 'my') ? 'mylist' : 'list'
    const locBase = `/${base}/${table}/${verb}`
    const { lastInserted = '' } = tableInfo
    const { prevInserted } = this
    if (prevInserted != null) {
      if (prevInserted != lastInserted) {
        this.prevInserted = null
        router.push(`${locBase}/${lastInserted}`)
      }
    }
    else {
      this.prevInserted = lastInserted
      insert(table, select == 'my')
    }
  }
  componentDidMount() {
    const { props, props: { table, eId, fetch } } = this
    if (eId == NEW) {this.gotoNewItem()}
    else if (changedItem(props, null)) {fetch(table, eId)}
  }
  componentDidUpdate() {
    const { props, props: { table, eId, fetch } } = this
    if (eId == NEW) {this.gotoNewItem()}
    else if (changedItem(props, null)) {fetch(table, eId)}
  }
}

export default connect(getTables, { fetch: fetchItem, insert: insertItem, del: delItem })(withParams(ItemRecord))

