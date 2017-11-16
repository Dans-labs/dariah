import React from 'react'

export const editControl = canSubmit => ({
    active,
    dirty, invalid, submitting, error, handleSubmit,
    nextAlt,
}) => (
  <span>
    {
      (canSubmit && !dirty && !submitting)
      ? <span
          className={'button-medium fa fa-fw fa-eye'}
          data-rh={'close the edit form'}
          data-rh-at={'bottom'}
          onClick={nextAlt}
        />
      : null
    }
    {
      (dirty && !invalid && !submitting)
      ? canSubmit
        ? <span
            className={'button-medium edit-action fa fa-fw fa-save'}
            data-rh={'save your changes to this record'}
            data-rh-at={'bottom'}
            onClick={handleSubmit}
          />
        : <span
            className={'warning-o fa fa-fw fa-pencil'}
            data-rh={'you have modified this record'}
            data-rh-at={'bottom'}
          />
      : null
    }
    {
      (dirty && invalid && !submitting)
      ? <span
          className={'error-o fa fa-fw fa-exclamation-circle'}
          data-rh={'some fields contain invalid data'}
            data-rh-at={'bottom'}
        />
      : null
    }
    {
      (!dirty && invalid && !submitting && !canSubmit)
      ? <span
          className={'error-o fa fa-fw fa-exclamation-circle'}
          data-rh={'some fields contain invalid data'}
          data-rh-at={'bottom'}
        />
      : null
    }
    {
      (!dirty && !invalid && !submitting && !canSubmit)
      ? <span
          className={`fa fa-fw fa-${active ? 'pencil' : 'check'}`}
          data-rh={'you have not changed this record'}
          data-rh-at={'bottom'}
        />
      : null
    }
    {
      submitting
      ? <span
          className={'special-o fa fa-fw fa-spinner fa-spin'}
          data-rh={'busy saving this record'}
          data-rh-at={'bottom'}
        />
      : null
    }
    {' '}
    {
      error && canSubmit && <span className={'invalid diag'}>{error}</span>
    }
  </span>
)

