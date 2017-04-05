import React from 'react'
import Alternative from 'Alternative.jsx'
import ItemRecord from 'ItemRecord.jsx'
import NavLink from 'NavLink.jsx'

const ItemHead = ({ table, values, title, inplace }) => {
  const { _id: eId, [title]: entityHead = '-empty-' } = values

  const control1 = handler => (<span className="button-small fa fa-chevron-down" onClick={handler} />)
  const control2 = handler => (<span className="button-small fa fa-chevron-right" onClick={handler} />)
  const controlPlacement = control => (
    <p>
      {control}
      <span>
        {entityHead}
      </span>
    </p>
  )

  return (
    <tr id={eId} >
      <td>{
        inplace ? (
          <Alternative
            tag={`${table}_${eId}`}
            controlPlacement={controlPlacement}
            controls={[control1, control2]}
            alternatives={[(
              <ItemRecord
                key="show"
                table={table}
                eId={eId}
              />
            ), '']}
            initial={1}
          />
        ) : (
          <NavLink className="nav" to={`/${table}/mylist/${eId}`} >
            <span>{entityHead}</span>
          </NavLink>
        )
      }
      </td>
    </tr>
  )
}

export default ItemHead
