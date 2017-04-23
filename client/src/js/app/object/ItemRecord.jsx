import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withParams } from 'utils.js'
import { getTables, needValues, changedItem, fetchItem, insertItem, delItem } from 'tables.js'

import ItemForm from 'ItemForm.jsx'

const NEW = 'new'

class ItemRecord extends Component {
  getEntity = () => {
    const { props: { tables, table, eId } } = this
    const { [table]: { entities: { [eId]: entity } } } = tables
    return entity
  }
  handleDelete = event => {
    event.preventDefault()
    const { props: { table, eId, del, router } } = this
    del(table, eId)
    const locBase = `/${table}/mylist#`
    router.push(locBase)
  }
  render() {
    const { props: { tables, table, eId } } = this
    if (needValues({ tables, table, eId })) {return <div />}

    const entity = this.getEntity()
    const { values: initialValues, perm, fields } = entity
    return (
      <div>
        <p>{
          perm.delete ?
            <span
              key="delete"
              className={'fa fa-trash button-large delete'}
              title="delete this item"
              onClick={this.handleDelete}
            /> :
          null
        }
        </p>
        <ItemForm
          table={table}
          eId={eId}
          initialValues={initialValues}
          perm={perm}
          fields={fields}
          form={`${table}-${eId}`}
        />
      </div>
    )

  }
  gotoNewItem() {
    const { props: { tables, table, router, insert } } = this
    const { [table]: tableInfo } = tables
    if (tableInfo == null) {return}
    const locBase = `/${table}/mylist`
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
      insert(table)
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

