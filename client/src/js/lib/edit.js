import React, { Fragment } from 'react'

import { memoize } from 'memo'
import { emptyS, emptyO } from 'utils'

import Tooltip from 'Tooltip'

export const editClass = (dirty, invalid) =>
  invalid ? 'invalid' : dirty ? 'dirty' : emptyS

export const editControl = canSubmit => ({
  active,
  dirty,
  invalid,
  submitting,
  error,
  handleSubmit,
  nextAlt,
}) => (
  <Fragment>
    {canSubmit && !dirty && !submitting ? (
      <Tooltip tip={'close the edit form'} at={'right'}>
        <span className={'button medium fa fa-eye'} onClick={nextAlt} />
      </Tooltip>
    ) : null}
    {dirty && !invalid && !submitting ? (
      canSubmit ? (
        <Tooltip tip={'save your changes to this record'} at={'right'}>
          <span
            className={'button medium edit-action fa fa-save'}
            onClick={handleSubmit}
          />
        </Tooltip>
      ) : (
        <Tooltip tip={'you have modified this record'} at={'right'}>
          <span className={'warning-o fa fa-pencil'} />
        </Tooltip>
      )
    ) : null}
    {dirty && invalid && !submitting ? (
      <Tooltip tip={'some fields contain invalid data'} at={'right'}>
        <span className={'error-o fa fa-exclamation-circle'} />
      </Tooltip>
    ) : null}
    {!dirty && invalid && !submitting && !canSubmit ? (
      <Tooltip tip={'some fields contain invalid data'} at={'right'}>
        <span className={'error-o fa fa-exclamation-circle'} />
      </Tooltip>
    ) : null}
    {!dirty && !invalid && !submitting && !canSubmit ? (
      <Tooltip tip={'you have visited this record'} at={'right'}>
        <span className={`fa fa-${active ? 'pencil' : 'check'}`} />
      </Tooltip>
    ) : null}
    {submitting ? (
      <Tooltip tip={'busy saving this record'} at={'right'}>
        <span className={'special-o fa fa-spinner fa-spin'} />
      </Tooltip>
    ) : null}{' '}
    {error && canSubmit && <span className={'invalid diag'}>{error}</span>}
  </Fragment>
)

export const makeSubmit = memoize(
  (dirty, invalid, submitting, submit) =>
    dirty && !invalid && !submitting ? submit : () => null,
)

export const makeSubmitTime = memoize(submit => () => setTimeout(submit, 10))

export const makeChangeSave = memoize((onChange, submit) => val => {
  onChange(val)
  submit()
})

export const makeChangeSaveVal = memoize((onChange, submit, val) => () => {
  onChange(val)
  submit()
})

export const makeReset = memoize(
  (type, reset) =>
    type == 'checkbox'
      ? emptyO
      : {
          onKeyUp: e => {
            if (e.keyCode == 27) {
              e.preventDefault()
              reset()
            }
          },
        },
)

/* Workaround (6.6.3) for issue https://github.com/erikras/redux-form/issues/2841
 * We do a mostly unnecessary reset() after a successful submit.
 * There is bug in redux-form: if you remove a field from a field array, a spurious
 * empty field will be present after a submit.
 * This reset removes that field.
 *
 * Still needed in 6.7.0
 *
 * No longer needed in 7.3.0

 export const onSubmitSuccess = (result, dispatch, { reset }) => reset()
 */
