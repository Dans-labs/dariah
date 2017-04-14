import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import { memoBind } from 'memo.js'
import { withParams } from 'utils.js'
import { getTables, needValues, changedItem, fetchItem, repr } from 'tables.js'

import RelSelect from 'RelSelect.jsx'

const ItemForm = reduxForm()(
  ({ fragments, handleSubmit }) => (
    <form
      onSubmit={handleSubmit}
    >
      <p>
        <button
          className={`button-large`}
        >{'Save'}</button>
      </p>
      <div>{fragments}</div>
    </form>
  )
)

class ItemRecord extends Component {
  handleSubmit = values => {
    console.warn(values)
  }

  selectWidget = (name, options) => (props) =>
    <RelSelect
      options={options}
      {...props}
    />

  makeFragmentRead = name => {
    const { props: { tables, table } } = this
    const { [table]: { fieldSpecs } } = tables
    const entity = this.getEntity()
    const { values } = entity
    const { [name]: myValues } = values
    const { [name]: { valType } } = fieldSpecs
    return myValues.map((value, i) => (
      <span key={i}>{(i != 0) ? ' | ' : ''}
        <span>{repr(tables, table, valType, value)}</span>
      </span>
    ))
  }
  makeFragmentEdit = name => {
    const { props: { tables, table } } = this
    const { [table]: { fieldSpecs, valueLists } } = tables
    const entity = this.getEntity()
    const { [name]: { valType, multiple } } = fieldSpecs
    if (typeof valType == 'string') {
      return (
        <Field
          name={name}
          component="input"
          type="text"
        />
      )
    }
    else {
      const { allowNew } = valType
      const options = valueLists[name].map(_id => [_id, repr(tables, table, valType, _id)])
      const { values } = entity
      const { [name]: myValues } = values
      return (
        <span>{
          !multiple ? null :
          myValues.map((value, i) => (
            <span key={i}>{(i != 0) ? ' | ' : ''}
              <span>{repr(tables, table, valType, value)}</span>
            </span>
          ))
        }{' '}
          <Field
            name={`${name}_!_other`}
            component={memoBind(this, 'selectWidget', [name], [name, options])}
          />
          {' '}
          {
            allowNew ?
              <Field
                name={`${name}_!_new`}
                component="input"
                type="text"
              /> :
            null
          }
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
      fragments.push(
        <div key={name}>
          <label><b>{`${label}:`}</b></label>{' '}
          {theFragment}
        </div>
      )
    }
    const itemForm = hasEditable ?
      <ItemForm
        form={form}
        fragments={fragments}
        initialValues={values}
        onSubmit={this.handleSubmit}
      /> :
      <div>{fragments}</div>
    return {itemForm, hasEditable}
  }

  getEntity = () => {
    const { props: { tables, table, eId } } = this
    const { [table]: { entities: { [eId]: entity } } } = tables
    return entity
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
            /> :
          null
        }
        </div>
        {itemForm}
      </div>
    )
  }
  componentDidMount() {
    const { props, props: { fetch } } = this
    if (changedItem(props, null)) {fetch(props)}
  }
  componentDidUpdate(prevProps) {
    const { props, props: { fetch } } = this
    if (changedItem(props, prevProps)) {fetch(props)}
  }
}

export default connect(getTables, { fetch: fetchItem })(withParams(ItemRecord))

