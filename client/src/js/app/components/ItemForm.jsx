import React from 'react'
import { connect } from 'react-redux'

import { combineSelectors, emptyS } from 'utils'

import { handle } from 'handle'
import { makeFields, makeDetails, someEditable } from 'fields'

import { delItem, headEntity, DETAILS } from 'tables'
import { getAltSection, compileAlternatives } from 'alter'
import { getSettings } from 'settings'

import ItemEdit from 'ItemEdit'
import ItemRead from 'ItemRead'
import ItemDetails from 'ItemDetails'
import { EditDelete } from 'EditControls'

const ItemForm = props => {
  const {
    settings,
    alter, alterSection,
    filters,
    tables, table, eId,
    masterId, linkField,
    isactive,
    startMode,
    fixed,
    border,
    initialValues,
    fields, perm,
    dispatch,
  } = props
  let { fieldFragments, detailFragments } = props
  if (fieldFragments == null) {fieldFragments = makeFields(props)}
  if (detailFragments == null) {detailFragments = makeDetails(props)}
  const hasEditable = someEditable(fields, perm)
  const { getAlt, nextAlt } = compileAlternatives(alterSection, 2, startMode, dispatch)('edit')
  const alt = getAlt(alter)

  const borderSwitch = border == null
  ? emptyS
  : hasEditable && alt === 1
    ? border.edit != null && !border.edit
      ? 'noBorder'
      : emptyS
    : border.read != null && !border.read
      ? 'noBorder'
      : emptyS

  const editSwitch = hasEditable && alt === 1
      ? 'edit'
      : emptyS

  const head = headEntity(tables, table, eId, settings)
  return (
    <div className={`itemRecord ${borderSwitch} ${editSwitch} ${isactive ? 'isactive' : emptyS}`} >
      {
        hasEditable && alt === 1
        ? <div>
            <EditDelete
              perm={perm}
              fixed={fixed}
              button={'button-medium'}
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
          </div>
        : <div>
            {
              hasEditable
              ? <span
                  className={`button-medium inlineL fa fa-pencil`}
                  data-rh={`open an edit form for this record`}
                  data-rh-at={'bottom'}
                  onClick={nextAlt}
                />
              : null
            }
            <EditDelete
              perm={perm}
              fixed={fixed}
              button={'button-medium'}
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
          </div>
      }
      <ItemDetails
        alterSection={`list-${table}-${DETAILS}`}
        detailFragments={detailFragments}
        filters={filters}
        tables={tables}
        table={table}
        eId={eId}
      />
    </div>
  )
}

const getInfo = combineSelectors(getSettings, getAltSection)

export default connect(getInfo)(ItemForm)
