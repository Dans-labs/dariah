import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { memoize } from 'memo'
import { getUrlParts, emptyS, emptyO } from 'utils'

import { getAltSection, compileAlternatives } from 'alter'

const editStatusGeneric = canSubmit => ({ active, dirty, invalid, submitting, reset, error, handleSubmit, nextAlt }) => (
  <span>
    {
      (canSubmit && !dirty && !submitting)
      ? <span
          className={'button-medium fa fa-fw fa-eye'}
          title={'close the edit form'}
          onClick={nextAlt}
        />
      : null
    }
    {
      (dirty && !invalid && !submitting)
      ? canSubmit
        ? <span
            className={'button-medium edit-action fa fa-fw fa-save'}
            title={'save'}
            onClick={handleSubmit}
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
            className={'button-medium error-o fa fa-fw fa-close'}
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

const handleCloseAll = memoize((alter, alterSection, nAlts, initial, items, dispatch) => {
  const makeAlternatives = compileAlternatives(alterSection, nAlts, initial, dispatch)
  const base = getUrlParts(browserHistory)[0]
  return () => {
    browserHistory.push(`${base}/`)
    items.forEach(eId => {
      const { getAlt, initAlt } = makeAlternatives(eId)
      if (getAlt(alter) != initial) {
        initAlt()
      }
    })
  }
}, emptyO)

const handleOpenAll = memoize((alter, alterSection, nAlts, initial, items, dispatch) => {
  const makeAlternatives = compileAlternatives(alterSection, nAlts, initial, dispatch)
  const theAlt = (initial + 1) % nAlts
  return () => {
    items.forEach(eId => {
      const { getAlt, putAlt } = makeAlternatives(eId)
      if (getAlt(alter) != theAlt) {
        putAlt(theAlt)
      }
    })
  }
}, emptyO)

const EditInsertPure = ({
  alter, alterSection,
  perm, listIds, item, button, onInsert,
  nAlts, initial,
  openAll,
  dispatch,
}) => {
  const [thing, things] = item
  const nItemsRep = `${listIds.length} ${listIds.length == 1 ? thing : things} `
  return (
    <div>
      {nItemsRep}
      {
        (perm != null && perm.insert)
        ? <span
            className={`fa fa-plus ${button}`}
            title={`new ${thing}`}
            onClick={onInsert}
          />
        : null
      }
      {' '}
      {
        openAll
        ? <div
            className={`fa fa-angle-double-down ${button}`}
            title={`Open all ${things}`}
            onClick={handleOpenAll(alter, alterSection, nAlts, initial, listIds, dispatch)}
          />
        : emptyS
      }
      {' '}
      <div
        className={`fa fa-angle-double-up ${button}`}
        title={`Close all opened ${things}`}
        onClick={handleCloseAll(alter, alterSection, nAlts, initial, listIds, dispatch)}
      />
    </div>
  )
}

export const EditInsert = connect(getAltSection)(EditInsertPure)
