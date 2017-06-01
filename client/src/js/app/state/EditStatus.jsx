import React from 'react'
import { reduxForm } from 'redux-form'

const EditStatus = ({ hasEditable, canSubmit, dirty, invalid, submitting, form, reset, error }) => (
  hasEditable ?
    <span>
      {
        (dirty && !invalid && !submitting) ? (
          canSubmit ?
            <button
              type="submit"
              className={'button-large edit-action fa fa-check'}
              title={'save'}
            /> :
            <span
              className={'warning-o fa fa-pencil'}
              title={'changed'}
            />
          ) : null
      }
      {' '}
      {
        (dirty && !submitting) ? (
          canSubmit ?
            <button
              type="button"
              className={'button-large error-o fa fa-close'}
              title={'reset values to last saved'}
              onClick={reset}
            /> : null
          ) : null
      }
      {' '}
      {
        (!dirty && !submitting) ?
          <span
            className={'good-o fa fa-circle'}
            title={'no changes'}
          /> : null
      }
      {' '}
      {
        submitting ?
          <span
            className={'special-o fa fa-spinner fa-spin'}
            title={'saving'}
          /> : null
      }
      {
        error && <span className={'invalid diag'}>{error}</span>
      }
    </span> :
   null
)

export default reduxForm({
  destroyOnUnmount: false,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(EditStatus)
