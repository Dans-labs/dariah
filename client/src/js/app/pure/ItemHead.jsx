import React from 'react'
import Alternative from 'Alternative.jsx'
import ItemRecord from 'ItemRecord.jsx'
import NavLink  from 'NavLink.jsx'
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
  const rowId = row._id;
  let rowHead = row[title];
  if (rowHead != null) {rowHead = rowHead[0]}
  if (typeof rowHead == 'object') {rowHead = rowHead.value}
  if (!rowHead) {rowHead = '-empty-'}

  return (
    <tr id={rowId}>
      <td>{
        inplace? (
          <Alternative tag={`${table}_${rowId}`}
            controlPlacement={control => (
            <p>
                {control}
                <span ref={ prog => { editStatus[table][rowId] = {...editStatus[table][rowId], prog}}}/>{' '}
                <span ref={ title => { editStatus[table][rowId] = {...editStatus[table][rowId], title}}}>
                    {rowHead}
                </span>
            </p>
            )}
            controls={[
              (handler => <span className='button-small fa fa-chevron-down' onClick={handler}/>),
              (handler => <span className='button-small fa fa-chevron-right' onClick={handler}/>),
            ]}
            alternatives={[
              (<ItemRecord tag={`${table}_${rowId}`} table={table} recordId={rowId}/>),
              '',
            ]}
            initial={1}
          />
        ) : (
        <NavLink className="nav" to={`/${table}/mylist/${rowId}`}>
            <span ref={ prog => { editStatus[table][rowId] = {...editStatus[table][rowId], prog}}}/>{' '}
            <span ref={ title => { editStatus[table][rowId] = {...editStatus[table][rowId], title}}}>
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
