import React, { Fragment } from 'react'

import { emptyS } from 'utils'

import Tooltip from 'Tooltip'

export const editClass = (dirty, invalid) => invalid ? 'invalid' : dirty ? 'dirty' : emptyS

export const editControl = canSubmit => ({
    active,
    dirty, invalid, submitting, error, handleSubmit,
    nextAlt,
}) => (
  <Fragment>
    {
      (canSubmit && !dirty && !submitting)
      ? <Tooltip
          tip={'close the edit form'}
          at={'right'}
        >
          <span
            className={'button medium fa fa-eye'}
            onClick={nextAlt}
          />
        </Tooltip>
      : null
    }
    {
      (dirty && !invalid && !submitting)
      ? canSubmit
        ? <Tooltip
            tip={'save your changes to this record'}
            at={'right'}
          >
            <span
              className={'button medium edit-action fa fa-save'}
              onClick={handleSubmit}
            />
          </Tooltip>
        : <Tooltip
            tip={'you have modified this record'}
            at={'right'}
          >
            <span
              className={'warning-o fa fa-pencil'}
            />
          </Tooltip>
      : null
    }
    {
      (dirty && invalid && !submitting)
      ? <Tooltip
          tip={'some fields contain invalid data'}
          at={'right'}
        >
          <span
            className={'error-o fa fa-exclamation-circle'}
          />
        </Tooltip>
      : null
    }
    {
      (!dirty && invalid && !submitting && !canSubmit)
      ? <Tooltip
          tip={'some fields contain invalid data'}
          at={'right'}
        >
          <span
            className={'error-o fa fa-exclamation-circle'}
          />
        </Tooltip>
      : null
    }
    {
      (!dirty && !invalid && !submitting && !canSubmit)
      ? <Tooltip
          tip={'you have visited this record'}
          at={'right'}
        >
          <span
            className={`fa fa-${active ? 'pencil' : 'check'}`}
          />
        </Tooltip>
      : null
    }
    {
      submitting
      ? <Tooltip
          tip={'busy saving this record'}
          at={'right'}
        >
          <span
            className={'special-o fa fa-spinner fa-spin'}
          />
        </Tooltip>
      : null
    }
    {' '}
    {
      error && canSubmit && <span className={'invalid diag'}>{error}</span>
    }
  </Fragment>
)

