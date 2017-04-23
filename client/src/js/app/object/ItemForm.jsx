import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm } from 'redux-form'
import Select, { Creatable } from 'react-select'

import { memoBind } from 'memo.js'
import { getTables, modItem, repr } from 'tables.js'

const valTypeMap = {
  text: { component: 'input', type: 'input' },
  datetime: { component: 'input', type: 'input' },
  email: { component: 'input', type: 'email' },
  url: { component: 'input', type: 'url' },
  textarea: { component: 'textarea' },
}
const { text: DEFAULT_TYPE } = valTypeMap

const fieldRemove = (fields, i) => () => {
  fields.remove(i)
}
const fieldPush = fields => () => {fields.push()}

const renderMulti = ({ component, type }) => ({ fields }) => (
  <ul>
    {fields.map((name, i) =>
      <li key={i}>
        <button
          type="button"
          title="remove"
          className="fa fa-close"
          onClick={fieldRemove(fields, i)}
        />
        <Field
          name={name}
          type={type}
          component={component}
          label={i}
        />
      </li>
    )}
    <li>
      <button
        type="button"
        className="fa fa-plus"
        onClick={fieldPush(fields)}
      />
    </li>
  </ul>
)

class ItemForm extends Component {
  handleSubmit = values => {
    const { props: { table, eId, mod } } = this
    mod(table, eId, values)
  }
  handleSubmitSuccess = () => {
    const { props: reset } = this
    reset()
  }
  handleUpdate = (multi, onChange) => newVal => {
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
        onChange={this.handleUpdate(multi, onChange)}
      />
    ) : (
      <Select
        options={options}
        value={value}
        multi={multi}
        {...restParams}
        {...custom}
        {...props}
        onChange={this.handleUpdate(multi, onChange)}
      />
    )
  }
  makeFragmentRead = name => {
    const { props: { tables, table } } = this
    const { [table]: { fieldSpecs } } = tables
    const { initialValues: { [name]: myValues } } = this
    const { [name]: { valType, multiple } } = fieldSpecs
    let myRepr
    if (multiple) {
      myRepr = (myValues || []).map(value => repr(tables, table, valType, value)).join(' | ')
    }
    else {
      myRepr = repr(tables, table, valType, myValues)
    }
    return <span>{myRepr}</span>
  }
  makeFragmentEdit = name => {
    const { props: { tables, table, untouch } } = this
    const { [table]: { fieldSpecs, valueLists } } = tables
    const { [name]: { valType, multiple } } = fieldSpecs
    if (typeof valType == 'string') {
      const { [valType]: typing = DEFAULT_TYPE } = valTypeMap
      if (multiple) {
        return (
          <FieldArray
            name={name}
            component={renderMulti(typing, untouch)}
          />
        )
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
  makeFragments() {
    const { props: { tables, table, fields, perm } } = this
    const { [table]: { fieldSpecs, fieldOrder } } = tables

    const fragments = []
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
    return fragments
  }

  render() {
    const { props: { dirty, submitting, reset, handleSubmit } } = this
    const fragments = this.makeFragments()
    return (
      <form onSubmit={handleSubmit(this.handleSubmit)} >
        <p>
          {
            (dirty && !submitting) ? (
              <button type="submit" className={'button-large edit-action'} >{'Save'}</button>
            ) : null
          }
          {' '}
          {
            (dirty && !submitting) ? (
              <button type="button" className={'button-large'} onClick={reset} >{'Reset'}</button>
            ) : null
          }
          {' '}
          {
            (!dirty && !submitting) ? (
              <span className="good" >{'no changes'}</span>
            ) : null
          }
          {' '}
          {
            (submitting) ? (
              <span className="special" >{'saving ...'}</span>
            ) : null
          }
        </p>
        <div>{
          fragments.map(({ name, label, fragment }) => (
            <div key={name} >
              <label><b>{`${label}:`}</b></label>{' '}
              {fragment}
            </div>
          ))
        }
        </div>
      </form>
    )
  }
}

/* Workaround for issue https://github.com/erikras/redux-form/issues/2841
 * We do a mostly unnecessary reset() after a successful submit.
 * There is bug in redux-form: if you remove a field from a field array, a spurious
 * empty field will be present after a submit.
 * This reset removes that field.
 */
const onSubmitSuccess = (result, dispatch, { reset }) => {
  reset()
}

export default connect(getTables, { mod: modItem })(reduxForm({
  destroyOnUnmount: false,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  onSubmitSuccess,
})(ItemForm))



