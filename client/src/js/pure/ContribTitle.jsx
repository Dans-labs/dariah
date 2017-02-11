import React from 'react'
import Alternatives from '../state/Alternatives.jsx'
import ContribItem from '../state/ContribItem.jsx'
import NavLink  from './NavLink.jsx'

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

const ContribTitle = ({ row, inplace, progs }) => (
  <tr id={row._id}>
    <td>{
      inplace? (
        <Alternatives tag={`contrib_${row._id}`}
          controlPlacement={control => (
            <p> {control} {row.title[0]}</p>
          )}
          controls={[
            (handler => <a className='fa fa-chevron-down' href='#' onClick={handler}/>),
            (handler => <a className='fa fa-chevron-right' href='#' onClick={handler}/>),
          ]}
          alternatives={[
            (<ContribItem tag={`contrib_${row._id}`} contribId={row._id}/>),
            '',
          ]}
          initial={1}
        />
      ) : (
        <NavLink className="nav" to={`/mycontrib/${row._id}`}>
          <span ref={ prog => { progs[row._id] = prog }}/>{' '}
          {row.title}
        </NavLink>
      )
    }
    </td>
  </tr>
)

export default ContribTitle
