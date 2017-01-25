import React from 'react'
import Alternatives from '../state/Alternatives.jsx'
import ContribItem from '../state/ContribItem.jsx'

/**
 * **purely functional** {@link external:Component|Component}
 *
 * Displays a contribution title in a table row.
 * With a control to view the whole records.
 * Only the fields that the user is entitled to view.
 *
 * @class
 * @param {Object} row A record of data from the contributions table
 * @param {Object} fields - Contains the fields that mongo db has supplied for each row. This is 
 * dependent on the permissions of the current user.
 * @returns {Fragment}
 */

const ContribTitle = ({ row, fields}) => (
  <tr id={row._id}>
    <td>
      <Alternatives tag={`contrib_${row._id}`}
        controlPlacement={control => (
          <p>{control} {row.title[0].value}</p>
        )}
        controls={[
          (handler => <a className='fa fa-chevron-down' href='#' onClick={handler}/>),
          (handler => <a className='fa fa-chevron-right' href='#' onClick={handler}/>),
        ]}
        alternatives={[
          (<ContribItem tag={`contrib_${row._id}`} row={row} fields={fields}/>),
          '',
        ]}
        initial={1}
      />
    </td>
  </tr>
)

export default ContribTitle
