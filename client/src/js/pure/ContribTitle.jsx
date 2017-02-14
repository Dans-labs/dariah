import React from 'react'
import Alternatives from '../state/Alternatives.jsx'
import ContribItem from '../state/ContribItem.jsx'
import NavLink  from './NavLink.jsx'
import { withContext } from '../helpers/hoc.js'

/**
 * **purely functional** {@link external:Component|Component}
 *
 * Displays a contribution title in a table row.
 * With a control to view the whole records.
 * Only the fields that the user is entitled to view.
 *
 * @class
 * @param {Object} row A record of data from the contributions table
 * @returns {Fragment}
 */

const ContribTitle = ({ row, inplace, editStatus }) => {
  const rowId = row._id;
  const rowTitle = row.title;
  return (
    <tr id={rowId}>
      <td>{
        inplace? (
          <Alternatives tag={`contrib_${rowId}`}
            controlPlacement={control => (
            <p>
                {control}
                <span ref={ prog => { editStatus[rowId] = {...editStatus[rowId], prog}}}/>{' '}
                <span ref={ title => { editStatus[rowId] = {...editStatus[rowId], title}}}>
                    {rowTitle[0]}
                </span>
            </p>
            )}
            controls={[
              (handler => <a className='fa fa-chevron-down' href='#' onClick={handler}/>),
              (handler => <a className='fa fa-chevron-right' href='#' onClick={handler}/>),
            ]}
            alternatives={[
              (<ContribItem tag={`contrib_${rowId}`} contribId={rowId}/>),
              '',
            ]}
            initial={1}
          />
        ) : (
          <NavLink className="nav" to={`/mycontrib/${rowId}`}>
            <span ref={ prog => { editStatus[rowId] = {...editStatus[rowId], prog}}}/>{' '}
            <span ref={ title => { editStatus[rowId] = {...editStatus[rowId], title}}}>
                {rowTitle[0]}
            </span>
          </NavLink>
        )
      }
      </td>
    </tr>
  )
}

export default withContext(ContribTitle)
