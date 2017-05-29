import React from 'react'
import { createSelector } from 'reselect'

export const editClass = (dirty, invalid) => invalid ? 'invalid' : dirty ? 'dirty' : ''

export const editStatus = (dirty, invalid, submitting, reset, error) => (
  <div>
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
        <span className="good-o fa fa-circle" title={'no changes'} />
      ) : null
    }
    {' '}
    {
      (submitting) ? (
        <span className="special-o fa fa-spinner fa-spin" title={'saving'} />
      ) : null
    }
    {
      error && <span className={'invalid diag'}>{error}</span>
    }
  </div>
)

export const propsChanged = (newProps, need, oldProps, keyPropNames) => {
  let result = false
  if (oldProps == null) {
    if (need(newProps)) {result = true}
  }
  else {
    if (keyPropNames.some(a => newProps[a] != oldProps[a]) && need(newProps)) {result = true}
  }
  return result
}

export const withParams = Component => ({ params, route, ...props }) => {
  const allProps = { ...props, ...params, ...route }
  return <Component {...allProps} />
}

export const makeReducer = (flows, init = {}) => (state = init, action) => {
  const { type } = action
  const { [type]: flow } = flows
  return flow ? flow(state, action) : state
}

const mergeObject = (...objects) => Object.assign({}, ...objects)
export const combineSelectors = (...selectors) => createSelector(...selectors, mergeObject)


/* Workaround (6.6.3) for issue https://github.com/erikras/redux-form/issues/2841
 * We do a mostly unnecessary reset() after a successful submit.
 * There is bug in redux-form: if you remove a field from a field array, a spurious
 * empty field will be present after a submit.
 * This reset removes that field.
 *
 * Still needed in 6.7.0
 */
export const onSubmitSuccess = (result, dispatch, { reset }) => reset()

