import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import { getTables, modItem, toDb } from 'tables'
import { makeFields } from 'fields'
import { onSubmitSuccess } from 'utils'

import FieldRead from 'FieldRead'
import FieldEdit from 'FieldEdit'

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
        fragments.map(({ field, label, fragment: { editable, table, myValues, ...props } }) => (
          <tr key={field} >
            <th><label>{`${label}:`}</label></th>
            <td>{ editable ?
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
            }
            </td>
          </tr>
        ))
      }
        </tbody>
      </table>
    </form>
  )
}

export default connect(getTables, { mod: modItem })(reduxForm({
  destroyOnUnmount: false,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  onSubmitSuccess,
})(ItemForm))
