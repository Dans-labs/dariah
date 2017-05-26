import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withParams } from 'utils'
import { getTables, needValues, changedItem, fetchItem, insertItem, delItem } from 'tables'

import ItemForm from 'ItemForm'

const NEW = 'new'

class ItemRecord extends Component {
  getEntity = () => {
    const { props: { tables, table, eId } } = this
    const { [table]: { entities: { [eId]: entity } } } = tables
    return entity
  }
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
          key={`${table}-${eId}`}
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

