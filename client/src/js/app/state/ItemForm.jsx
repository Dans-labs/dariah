import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import { getTables, modItem } from 'tables'

import FieldRead from 'FieldRead'
import FieldEdit from 'FieldEdit'

const toDb = (table, eId, mod) => values => mod(table, eId, values)

const makeFields = ({ tables, table, fields, perm, ...props }) => {
  const { initialValues } = props
  const { [table]: { fieldSpecs, fieldOrder } } = tables

  const fragments = []
  let hasEditable = false
  for (const field of fieldOrder) {
    const { [field]: f } = fields
    if (f == null) {continue}
    const { [field]: { label } } = fieldSpecs
    const { update: { [field]: editable } } = perm
    const { [field]: myValues } = initialValues
    if (editable) {hasEditable = true}
    const theField = (editable) ?
      <FieldEdit
        field={field}
        table={table}
        {...props}
      /> :
      <FieldRead
        field={field}
        table={table}
        myValues={myValues}
      />
    fragments.push({ field, label, fragment: theField })
  }
  return { fragments, hasEditable }
}

const ItemForm = props => {
  const { table, eId, mod, dirty, invalid, error, submitting, reset, handleSubmit } = props
  const { fragments, hasEditable } = makeFields(props)
  return (
    <form onSubmit={handleSubmit(toDb(table, eId, mod))} >
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
        fragments.map(({ field, label, fragment }) => (
          <tr key={field} >
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

/* Workaround (6.6.3) for issue https://github.com/erikras/redux-form/issues/2841
 * We do a mostly unnecessary reset() after a successful submit.
 * There is bug in redux-form: if you remove a field from a field array, a spurious
 * empty field will be present after a submit.
 * This reset removes that field.
 *
 * Still needed in 6.7.0
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



