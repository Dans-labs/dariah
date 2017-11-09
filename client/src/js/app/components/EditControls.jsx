import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { memoize } from 'memo'
import { getUrlParts, emptyO } from 'utils'

import { getAltSection, compileAlternatives, closeItems } from 'alter'
import { DETAILS, handleOpenAll } from 'tables'

const editStatusGeneric = canSubmit => ({
    active,
    dirty, invalid, submitting, reset, error, handleSubmit,
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
      (dirty && !submitting)
      ? canSubmit
        ? <button
            type={'button'}
            className={'button-medium error-o fa fa-fw fa-close'}
            data-rh={'undo your changes since the last save'}
            data-rh-at={'bottom'}
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

export const EditDelete = ({ perm, fixed, button, onClick }) => (
  !fixed && perm.delete
  ? <div
      className={`grid-cell ${button} inlineR error-o fa fa-trash delete`}
      data-rh={'delete this record'}
      data-rh-at={'bottom'}
      onClick={onClick}
    />
    : null
)

const handleCloseAll = memoize((alter, alterSection, nAlts, initial, items, dispatch) => {
  const makeAlternatives = compileAlternatives(alterSection, nAlts, initial, dispatch)
  const base = getUrlParts(browserHistory)[0]
  return () => {
    browserHistory.push(`${base}/`)
    const alts = []
    items.forEach(eId => {
      const { getAlt } = makeAlternatives(eId)
      const alt = getAlt(alter)
      if (alt !== initial) {
        alts.push(eId)
      }
    })
    if (alts.length) {
      dispatch(closeItems(alts, alterSection, initial))
    }
  }
}, emptyO)

export const EditInsert = ({
  perm, select, fixed, item, button, onInsert,
}) => {
  const thing = item[0]
  return (!fixed && perm != null && perm.insert && (!perm.needMaster || select == DETAILS))
    ? <span
        className={`fa fa-plus ${button}`}
        data-rh={`make a new ${thing}`}
        data-rh-at={'bottom'}
        onClick={onInsert}
      />
    : null
}

const OpenCloseAllPure = ({
  alter, alterSection,
  table, listIds, item, button,
  nAlts, initial,
  openAll, expand,
  dispatch,
}) => {
  const [thing, things] = item
  const itemsRep = listIds.length === 1 ? thing : things
  const nItemsRep = `${listIds.length} ${itemsRep} `
  return [
    <span key="I">{nItemsRep}</span>,
    openAll && !expand
    ? <div
        key="O"
        className={`fa fa-angle-double-down ${button}`}
        data-rh={`open all ${itemsRep}`}
        data-rh-at={'bottom'}
        onClick={handleOpenAll(alter, alterSection, nAlts, initial, table, listIds, dispatch)}
      />
    : null,
    !expand
    ? <div
        key="C"
        className={`fa fa-angle-double-up ${button}`}
        data-rh={`close all opened ${itemsRep}`}
        data-rh-at={'bottom'}
        onClick={handleCloseAll(alter, alterSection, nAlts, initial, listIds, dispatch)}
      />
    : null,
  ]
}

export const OpenCloseAll = connect(getAltSection)(OpenCloseAllPure)
