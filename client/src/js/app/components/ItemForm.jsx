import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { combineSelectors, emptyS } from 'utils'

import { handle } from 'handle'
import { makeFields, someEditable } from 'fields'
import { makeDetails, makeKeepInfo } from 'details'

import { delItem, headEntity, DETAILS } from 'tables'
import { getAltSection, compileAlternatives } from 'alter'
import { getSettings } from 'settings'

import ItemAction from 'ItemAction'
import ItemEdit from 'ItemEdit'
import ItemRead from 'ItemRead'
import ItemDetails from 'ItemDetails'
import EditDelete from 'EditDelete'
import Tooltip from 'Tooltip'

const ItemForm = props => {
  const {
    settings,
    alter,
    alterSection,
    filters,
    tables,
    table,
    eId,
    masterId,
    linkField,
    isactive,
    startMode,
    fixed,
    border,
    initialValues,
    fields,
    perm,
    workflow,
    dispatch,
  } = props
  /*
  let { fieldFragments, detailFragments } = props
  if (fieldFragments == null) {
    fieldFragments = makeFields(props)
  }
  if (detailFragments == null) {
    detailFragments = makeDetails(props)
  }
  */
  const fieldFragments = makeFields(props)
  const detailFragments = makeDetails(props)
  const keep = makeKeepInfo(detailFragments)
  const hasEditable = someEditable(fields, perm, workflow)
  const { getAlt, nextAlt } = compileAlternatives(
    alterSection,
    2,
    startMode,
    dispatch,
  )('edit')
  const alt = getAlt(alter)

  const borderSwitch =
    border == null
      ? emptyS
      : hasEditable && alt === 1
        ? border.edit != null && !border.edit ? 'noBorder' : emptyS
        : border.read != null && !border.read ? 'noBorder' : emptyS

  const editSwitch = hasEditable && alt === 1 ? 'edit' : emptyS

  const head = headEntity(tables, table, eId, settings)
  return (
    <div
      className={`itemRecord ${borderSwitch} ${editSwitch} ${
        isactive ? 'isactive' : emptyS
      }`}
    >
      {hasEditable && alt === 1 ? (
        <Fragment>
          <EditDelete
            perm={perm}
            workflow={workflow}
            keep={keep}
            fixed={fixed}
            button={'button medium'}
            onClick={handle(dispatch, delItem, table, eId, head)}
          />
          <ItemEdit
            settings={settings}
            tables={tables}
            table={table}
            eId={eId}
            nextAlt={nextAlt}
            form={`${table}-${eId}`}
            initialValues={initialValues}
            perm={perm}
            masterId={masterId}
            linkField={linkField}
            fieldFragments={fieldFragments}
          />
        </Fragment>
      ) : (
        <Fragment>
          {hasEditable ? (
            <Tooltip tip={`open an edit form for this record`} at={'right'}>
              <span
                className={`button medium fa fa-pencil`}
                onClick={nextAlt}
              />
            </Tooltip>
          ) : null}
          <EditDelete
            perm={perm}
            workflow={workflow}
            keep={keep}
            fixed={fixed}
            button={'button medium'}
            onClick={handle(dispatch, delItem, table, eId, head)}
          />
          <ItemRead
            settings={settings}
            tables={tables}
            table={table}
            eId={eId}
            masterId={masterId}
            linkField={linkField}
            fieldFragments={fieldFragments}
          />
        </Fragment>
      )}
      <ItemAction
        settings={settings}
        tables={tables}
        table={table}
        eId={eId}
        form={`${table}-${eId}`}
        initialValues={initialValues}
        linkField={linkField}
        fieldFragments={fieldFragments}
      />
      <ItemDetails
        alterSection={`list-${table}-${DETAILS}`}
        detailFragments={detailFragments}
        filters={filters}
        tables={tables}
        table={table}
        eId={eId}
        workflow={workflow}
      />
    </div>
  )
}

const getInfo = combineSelectors(getSettings, getAltSection)

export default connect(getInfo)(ItemForm)
