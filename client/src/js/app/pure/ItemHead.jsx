import React from 'react'
import Alternative from 'Alternative.jsx'
import ItemRecord from 'ItemRecord.jsx'
import NavLink from 'NavLink.jsx'
import { withContext } from 'hoc.js'

/**
 * **purely functional** {@link external:Component|Component}
 *
 * Displays an item heading in a table row.
 * With a control to view the whole records.
 * Only the fields that the user is allowed to view.
 *
 * @class
 * @param {Object} row A record of data from the table
 * @returns {Fragment}
 */

const ItemHead = ({ table, row, title, inplace, editStatus }) => {
  const { _id: rowId, [title]: rowHeadPre } = row
  let rowHead
  if (!rowHeadPre) {rowHead = '-empty-'}
  else {
    [rowHead] = rowHeadPre
    if (typeof rowHead == 'object') {
      const { value } = rowHead
      rowHead = value
    }
  }

  const refProg = prog => {editStatus[table][rowId] = {...editStatus[table][rowId], prog}}
  const refTitle = title => {editStatus[table][rowId] = {...editStatus[table][rowId], title}}
  const control1 = handler => (<span className="button-small fa fa-chevron-down" onClick={handler} />)
  const control2 = handler => (<span className="button-small fa fa-chevron-right" onClick={handler} />)
  const controlPlacement = control => (
    <p>
      {control}
      <span ref={refProg} />{' '}
      <span ref={refTitle} >
        {rowHead}
      </span>
    </p>
  )

  return (
    <tr id={rowId} >
      <td>{
        inplace ? (
          <Alternative
            tag={`${table}_${rowId}`}
            controlPlacement={controlPlacement}
            controls={[control1, control2]}
            alternatives={[(
              <ItemRecord
                key="show"
                tag={`${table}_${rowId}`}
                table={table}
                recordId={rowId}
              />
            ), '']}
            initial={1}
          />
        ) : (
          <NavLink className="nav" to={`/${table}/mylist/${rowId}`} >
            <span ref={refProg} />{' '}
            <span ref={refTitle} >
              {rowHead}
            </span>
          </NavLink>
        )
      }
      </td>
    </tr>
  )
}

export default withContext(ItemHead)
