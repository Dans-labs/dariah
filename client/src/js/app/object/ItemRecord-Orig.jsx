import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import Select, { Creatable } from 'react-select'

import { memoBind } from 'memo.js'
import { withParams } from 'utils.js'
import { getTables, needValues, changedItem, fetchItem, insertItem, modItem, delItem, repr } from 'tables.js'

const NEW = 'new'
const valTypeMap = {
  text: { component: 'input', type: 'input' },
  datetime: { component: 'input', type: 'input' },
  email: { component: 'input', type: 'email' },
  url: { component: 'input', type: 'url' },
  textarea: { component: 'textarea' },
}
const { text: DEFAULT_TYPE } = valTypeMap

const ItemFormPure = ({ fragments, handleSubmit, dirty, submitting, reset, array }) => {
  return (
  <form
    onSubmit={handleSubmit}
  >
    <p>
      {
        (dirty && !submitting) ? (
          <button
            type="submit"
            className={'button-large edit-action'}
          >{'Save'}</button>
        ) : null
      }
      {' '}
      {
        (dirty && !submitting) ? (
          <button
            type="button"
            className={'button-large'}
            onClick={reset}
          >{'Reset'}</button>
        ) : null
      }
      {' '}
      {
        (!dirty && !submitting) ? (
          <span className="good">{'no changes'}</span>
        ) : null
      }
      {' '}
      {
        (submitting) ? (
          <span className="special">{'saving ...'}</span>
        ) : null
      }
    </p>
    <div>{
      fragments.map(({ name, label, fragment }, i) => {
        const theFragment = (typeof fragment == 'function') ? fragment(array.remove) : fragment
        return (
          <div key={name}>
            <label><b>{`${label}:`}</b></label>{' '}
            {theFragment}
          </div>
        )})
    }
    </div>
  </form>
)
}

const makeItemForm = initialValues => reduxForm({
  destroyOnUnmount: false,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  initialValues,
})(ItemFormPure)

class ItemRecord extends Component {
  handleSubmit = values => {
    const { props: { table, eId, mod } } = this
    mod(table, eId, values)
  }
  updateVal = (multi, onChange) => newVal => {
    const cleanVal = multi ?
      newVal.map(x => x.value) :
      newVal.value
    onChange(cleanVal)
  }

  selectWidget = ({ allowNew, multi, ...restParams }, options) => props => {
    const custom = {
      autosize: true,
    }
    const { input: { value, onChange } } = props
    return allowNew ? (
      <Creatable
        options={options}
        value={value}
        multi={multi}
        {...restParams}
        {...custom}
        {...props}
        onChange={this.updateVal(multi, onChange)}
      />
    ) : (
      <Select
        options={options}
        value={value}
        multi={multi}
        {...restParams}
        {...custom}
        {...props}
        onChange={this.updateVal(multi, onChange)}
      />
    )
  }

  makeFragmentRead = name => {
    const { props: { tables, table } } = this
    const { [table]: { fieldSpecs } } = tables
    const entity = this.getEntity()
    const { values } = entity
    let { [name]: myValues } = values
    const { [name]: { valType, multiple } } = fieldSpecs
    let myRepr
    if (multiple) {
      if (myValues == null) {myValues = []}
      myRepr = myValues.map(value => repr(tables, table, valType, value)).join(' | ')
    }
    else {
      myRepr = repr(tables, table, valType, myValues)
    }
    return <span>{myRepr}</span>
  }
  handleX = (remove, name, i) => event => {
    event.preventDefault()
    remove(name, i)
  }
  makeFragmentEdit = name => {
    const { props: { tables, table } } = this
    const { [table]: { fieldSpecs, valueLists } } = tables
    const { [name]: { valType, multiple } } = fieldSpecs
    if (typeof valType == 'string') {
      const { [valType]: typing = DEFAULT_TYPE } = valTypeMap
      if (multiple) {
        const entity = this.getEntity()
        const { values } = entity
        let { [name]: myValues } = values
        if (myValues == null || myValues.length == 0) {myValues = ['']}
        else if (myValues[myValues.length - 1] != '') {myValues.push('')}
        return remove => myValues.map((value, i) => (
          <div key={i}>
            <a
              href="#"
              onClick={this.handleX(remove, name, i)}
            >{'X'}</a>
            <Field
              name={`${name}[${i}`}
              {...typing}
            />
          </div>
        ))
      }
      else {
        return (
          <Field
            name={name}
            {...typing}
          />
        )
      }
    }
    else {
      const { allowNew } = valType
      const options = valueLists[name].map(_id => ({ value: _id, label: repr(tables, table, valType, _id) }))
      const params = {
        name,
        multi: multiple,
        allowNew,
        noResultsText: '--none--',
      }
      const SelectComp = memoBind(this, 'selectWidget', [name], [params, options])
      return (
        <span>
          <Field
            name={name}
            component={SelectComp}
          />
        </span>
      )
    }
  }

  makeForm() {
    const { props: { tables, table, eId } } = this
    const { [table]: { fieldSpecs, fieldOrder } } = tables
    const entity = this.getEntity()
    const { perm, fields, values } = entity
    const form = `${table}-${eId}`

    const fragments = []
    const hasEditable = fieldOrder.some(name => perm.update[name])
    for (const name of fieldOrder) {
      const { [name]: f } = fields
      if (f == null) {continue}
      const { [name]: { label } } = fieldSpecs
      const { update: { [name]: editable } } = perm
      const theFragment = (editable) ?
        this.makeFragmentEdit(name) :
        this.makeFragmentRead(name)
      fragments.push({ name, label, fragment: theFragment })
    }
    const ItemForm = makeItemForm(values)
    const itemForm = hasEditable ?
      <ItemForm
        tables={tables}
        table={table}
        eId={eId}
        form={form}
        fragments={fragments}
        onSubmit={this.handleSubmit}
      /> :
      <div>{
        fragments.map(({ name, label, fragment }, i) => (
          <div key={name}>
            <label><b>{`${label}:`}</b></label>{' '}
            {fragment}
          </div>
        ))
      }</div>
    return {itemForm, hasEditable}
  }

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
    const { perm } = entity
    const { itemForm, hasEditable } = this.makeForm()
    return (
      <div className="widget-medium" >
        <div>{
          hasEditable && perm.delete ?
            <span
              key="delete"
              className={'fa fa-trash button-large delete'}
              title="delete this item"
              onClick={this.handleDelete}
            /> :
          null
        }
        </div>
        {itemForm}
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

export default connect(getTables, { fetch: fetchItem, insert: insertItem, mod: modItem, del: delItem })(withParams(ItemRecord))

