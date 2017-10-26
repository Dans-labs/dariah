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

export const EditDelete = ({ perm, fixed, button, onClick }) => (
  !fixed && perm.delete
  ? <div
      className={`grid-cell ${button} inlineR error-o fa fa-trash delete`}
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
        title={`new ${thing}`}
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
        title={`Open all ${itemsRep}`}
        onClick={handleOpenAll(alter, alterSection, nAlts, initial, table, listIds, dispatch)}
      />
    : null,
    !expand
    ? <div
        key="C"
        className={`fa fa-angle-double-up ${button}`}
        title={`Close all opened ${itemsRep}`}
        onClick={handleCloseAll(alter, alterSection, nAlts, initial, listIds, dispatch)}
      />
    : null,
  ]
}

export const OpenCloseAll = connect(getAltSection)(OpenCloseAllPure)
