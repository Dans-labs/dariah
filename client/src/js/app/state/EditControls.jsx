import React from 'react'
import { reduxForm } from 'redux-form'

const editStatusGeneric = canSubmit => ({ active, dirty, invalid, submitting, reset, error }) => (
  <span>
    {
      (dirty && !invalid && !submitting)
      ? canSubmit
        ? <button
            type={'submit'}
            className={'button-large edit-action fa fa-fw fa-check'}
            title={'save'}
          />
        : <span
            className={'warning-o fa fa-fw fa-pencil'}
            title={'changed'}
          />
      : null
    }
    {
      (dirty && invalid && !submitting)
      ? <span
          className={'error-o fa fa-fw fa-exclamation-circle'}
          title={'invalid data'}
        />
      : null
    }
    {
      (!dirty && invalid && !submitting && !canSubmit)
      ? <span
          className={'error-o fa fa-fw fa-exclamation-circle'}
          title={'invalid data'}
        />
      : null
    }
    {
      (!dirty && !invalid && !submitting && !canSubmit)
      ? <span
          className={`fa fa-fw fa-${active ? 'pencil' : 'check'}`}
          title={'no changes'}
        />
      : null
    }
    {
      submitting
      ? <span
          className={'special-o fa fa-fw fa-spinner fa-spin'}
          title={'saving'}
        />
      : null
    }
    {' '}
    {
      (dirty && !submitting)
      ? canSubmit
        ? <button
            type={'button'}
            className={'button-large error-o fa fa-fw fa-close'}
            title={'reset values to last saved'}
            onClick={reset}
          />
        : null
      : null
    }
    {' '}
    {
      error && canSubmit && <span className={'invalid diag'}>{error}</span>
    }
  </span>
)

export const EditControl = editStatusGeneric(true)

export const EditStatus = reduxForm({
  destroyOnUnmount: false,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(editStatusGeneric(false))


export const EditDelete = ({ perm, button, onClick }) => (
  perm.delete
  ? <div
      className={`grid-cell ${button} error-o fa fa-trash delete`}
      title={'delete this record'}
      onClick={onClick}
    />
  : null
)

