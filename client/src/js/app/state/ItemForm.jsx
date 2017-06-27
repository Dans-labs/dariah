import React from 'react'
import { connect } from 'react-redux'

import { makeFields, makeDetails, someEditable } from 'fields'

import { DETAILS } from 'tables'
import { getAltSection, compileAlternatives } from 'alter'

import ItemEdit from 'ItemEdit'
import ItemRead from 'ItemRead'
import ItemDetails from 'ItemDetails'

const ItemForm = props => {
  const { alter, alterSection, filters, tables, table, eId, isactive, initialValues, fields, perm, dispatch } = props
  let { fieldFragments, detailFragments } = props
  if (fieldFragments == null) {fieldFragments = makeFields(props)}
  if (detailFragments == null) {detailFragments = makeDetails(props)}
  const hasEditable = someEditable(fields, perm)
  const { getAlt, nextAlt } = compileAlternatives(alterSection, 2, 0, dispatch)('edit')
  const alt = getAlt(alter)
  return (
    <div className={`itemRecord ${isactive}`} >
      {
        hasEditable && alt == 1
        ? <div>
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
            <ItemRead
              tables={tables}
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

export default connect(getAltSection)(ItemForm)
