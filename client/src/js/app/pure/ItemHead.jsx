import React from 'react'
import { reduxForm } from 'redux-form'

import Alternative from 'Alternative.jsx'
import ItemRecord from 'ItemRecord.jsx'
import NavLink from 'NavLink.jsx'

const MyItemHeadPure = ({ table, eId, entityHead, dirty }) => (
  <NavLink className={'nav'} to={`/${table}/mylist/${eId}`} >
    {dirty ? <span className="fa fa-pencil" /> : null}
    <span className={`${dirty ? 'warning' : ''}`} >{entityHead}</span>
  </NavLink>
)

const MyItemHead = reduxForm({
  destroyOnUnmount: false,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(MyItemHeadPure)

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
          <MyItemHead
            form={`${table}-${eId}`}
            table={table}
            eId={eId}
            entityHead={entityHead}
          />
        )
      }
      </td>
    </tr>
  )
}

export default ItemHead
