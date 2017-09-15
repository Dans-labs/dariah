import React from 'react'
import { connect } from 'react-redux'

import { combineSelectors } from 'utils'

import { handle } from 'handle'
import { makeFields, makeDetails, someEditable } from 'fields'

import { delItem, DETAILS } from 'tables'
import { getAltSection, compileAlternatives } from 'alter'
import { getSettings } from 'settings'

import ItemEdit from 'ItemEdit'
import ItemRead from 'ItemRead'
import ItemDetails from 'ItemDetails'
import { EditDelete } from 'EditControls'

const ItemForm = props => {
  const { settings, alter, alterSection, filters, tables, table, eId, isactive, fixed, initialValues, fields, perm, dispatch } = props
  let { fieldFragments, detailFragments } = props
  if (fieldFragments == null) {fieldFragments = makeFields(props)}
  if (detailFragments == null) {detailFragments = makeDetails(props)}
  const hasEditable = someEditable(fields, perm)
  const { getAlt, nextAlt } = compileAlternatives(alterSection, 2, 0, dispatch)('edit')
  const alt = getAlt(alter)
  return (
    <div className={`itemRecord ${isactive}`} >
      {
        hasEditable && alt === 1
        ? <div>
            <EditDelete
              perm={perm}
              fixed={fixed}
              button={'button-medium'}
              onClick={handle(dispatch, delItem, table, eId)}
            />
            <ItemEdit
              tables={tables}
              table={table}
              eId={eId}
              nextAlt={nextAlt}
              form={`${table}-${eId}`}
              initialValues={initialValues}
              perm={perm}
              fieldFragments={fieldFragments}
            />
          </div>
        : <div>
            {
              hasEditable
              ? <span
                  className={`button-medium fa fa-pencil`}
                  title={`open an edit form for this record`}
                  onClick={nextAlt}
                />
              : null
            }
            <EditDelete
              perm={perm}
              fixed={fixed}
              button={'button-medium'}
              onClick={handle(dispatch, delItem, table, eId)}
            />
            <ItemRead
              settings={settings}
              tables={tables}
              table={table}
              eId={eId}
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
