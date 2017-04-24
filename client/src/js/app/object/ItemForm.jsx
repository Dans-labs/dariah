import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm } from 'redux-form'
import Select, { Creatable } from 'react-select'
import Markdown from 'react-markdown'

import { memoBind } from 'memo.js'
import { getTables, modItem, repr } from 'tables.js'
import { makeComponent } from 'utils.js'

import Alternative from 'Alternative.jsx'

const theClass = (dirty, invalid) => invalid ? 'invalid' : dirty ? 'dirty' : ''

const textAreaControlPlacement = control => <p className="stick" >{control}</p>
const textAreaControl1 = handler => <span className="button-medium fa fa-pencil" onClick={handler} />
const textAreaControl2 = handler => <span className="button-medium fa fa-hand-o-down" onClick={handler} />

const MarkDownArea = ({ table, eId, meta: { dirty, invalid, error }, input: { name, value }, input }) => (
  <Alternative
    tag={`md_${table}_${eId}_${name}`}
    controlPlacement={textAreaControlPlacement}
    controls={[textAreaControl1, textAreaControl2]}
    className="md-field"
    alternatives={[
      <Markdown
        className={theClass(dirty, invalid)}
        key="fmt"
        source={value}
      />,
      <span key="src" >
        <textarea
          className={`input ${theClass(dirty, invalid)}`}
          {...input}
          wrap="soft"
        />
        {error && <span className="invalid diag">{error}</span>}
      </span>,
    ]}
    initial={1}
  />
)

const Input = props => {
  const { meta: { dirty, invalid, error }, input, type } = props
  return (
    <span>
      <input type={type} className={theClass(dirty, invalid)} {...input} />
      {error && <span className="invalid diag">{error}</span>}
    </span>
  )
}

const valTypeMap = {
  text: { component: Input, type: 'text' },
  datetime: { component: Input, type: 'text' },
  email: { component: Input, type: 'text' },
  url: { component: Input, type: 'text' },
  textarea: { component: MarkDownArea, type: 'text' },
}
const validation = {
  datetime(val) {
    let times
    try {
      times = new Date(val)
    }
    catch (error) {
      return `not a valid date/time - ${error}`
    }
    if (isNaN(times)) {
      return `not a valid date/time`
    }
  },
  url(val) {
    if (!val.match(/^https?:\/\//)) {
      return `urls should start with http:// or https://`
    }
  },
  email(val) {
    if (val.match(/[^@a-zA-Z0-9_.-]/)) {
      return `email addresses may only contain alphanumeric characters, - _ and .`
    }
    if (!val.match(/@/)) {
      return `email addresses must contain one @`
    }
    if (val.match(/@.*@/)) {
      return `email addresses must contain exactly one @`
    }
    if (!val.match(/@[^.]+\.[^.]+.*$/)) {
      return `email addresses must end with a domain`
    }
  },
  number(val) {
    if (isNaN(val)) {
      return `value must be a number`
    }
  },
}

const normalization = {
  datetime(val) {
    try {
      const times = new Date(val)
      return times.toISOString()
    }
    catch (error) {
      return val
    }
  },
}

const { text: DEFAULT_TYPE } = valTypeMap

const fieldRemove = (fields, i) => () => {
  fields.remove(i)
}
const fieldPush = fields => () => {fields.push()}

const renderMulti = ({ component, type, validate, normalize }) => ({ fields, meta: { dirty, invalid, error } }) => (
  <div className={theClass(dirty, invalid)}>
    {fields.map((name, i) =>
      <p key={i}>
        <span
          className="button-small fa fa-close"
          title="remove"
          onClick={fieldRemove(fields, i)}
        />
        <Field
          name={name}
          type={type}
          component={component}
          validate={validate}
          normalize={normalize}
          label={i}
        />
      </p>
    )}
    <p>
      <span
        className="button-small fa fa-plus"
        onClick={fieldPush(fields)}
      />
    </p>
    {error && <p className="invalid diag">{error}</p>}
  </div>
)

class ItemForm extends Component {
  toDb = values => {
    const { props: { table, eId, mod } } = this
    return mod(table, eId, values)
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
    const { input: { value, onChange }, meta: { dirty, invalid } } = props
    const className = theClass(dirty, invalid)
    return allowNew ? (
      <Creatable
        className={className}
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
        className={className}
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
    const { props: { tables, table, initialValues: { [name]: myValues } } } = this
    const { [table]: { fieldSpecs } } = tables
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
    const { props: { tables, table } } = this
    const { [table]: { fieldSpecs, valueLists } } = tables
    const { [name]: { valType, multiple } } = fieldSpecs
    if (typeof valType == 'string') {
      const { [valType]: typing = DEFAULT_TYPE } = valTypeMap
      const { type } = typing
      let { component } = typing
      if (typeof component != 'string') {
        component = makeComponent(component, { name, type, ...this.props })
      }
      const { [valType]: validate } = validation
      const { [valType]: normalize } = normalization
      if (multiple) {
        return (
          <FieldArray
            name={name}
            component={renderMulti({ component, type, validate, normalize })}
          />
        )
      }
      else {
        return (
          <Field
            name={name}
            component={component}
            type={type}
            validate={validate}
            normalize={normalize}
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
    let hasEditable = false
    for (const name of fieldOrder) {
      const { [name]: f } = fields
      if (f == null) {continue}
      const { [name]: { label } } = fieldSpecs
      const { update: { [name]: editable } } = perm
      if (editable) {hasEditable = true}
      const theFragment = (editable) ?
        this.makeFragmentEdit(name) :
        this.makeFragmentRead(name)
      fragments.push({ name, label, fragment: theFragment })
    }
    return { fragments, hasEditable }
  }

  render() {
    const { props: { dirty, invalid, error, submitting, reset, handleSubmit } } = this
    const { fragments, hasEditable } = this.makeFragments()
    return (
      <form onSubmit={handleSubmit(this.toDb)} >
        {hasEditable ? (
          <div>
            <p>
              {
                (dirty && !invalid && !submitting) ? (
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
            {error && <p className="invalid diag">{error}</p>}
          </div>
          ) : null
        }
        <table className="fragments">
          <tbody>{
          fragments.map(({ name, label, fragment }) => (
            <tr key={name} >
              <th><label>{`${label}:`}</label></th>
              <td>{fragment}</td>
            </tr>
          ))
        }
          </tbody>
        </table>
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



