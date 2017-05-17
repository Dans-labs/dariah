import React from 'react'
import { reduxForm } from 'redux-form'

import { memoize } from 'memo'

import Alternative from 'Alternative'
import ItemRecord from 'ItemRecord'
import NavLink from 'NavLink'

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

const controls = [
  handler => (<span className="button-small fa fa-chevron-down" onClick={handler} />),
  handler => (<span className="button-small fa fa-chevron-right" onClick={handler} />),
]
const controlPlacement = memoize(entityHead => control => (
  <p>
    {control}
    <span>
      {entityHead}
    </span>
  </p>
))


const ItemHead = ({ table, values, title, inplace }) => {
  const { _id: eId, [title]: entityHead = '-empty-' } = values

  return (
    <tr id={eId} >
      <td>{
        inplace ? (
          <Alternative
            tag={`${table}_${eId}`}
            controlPlacement={controlPlacement(entityHead)}
            controls={controls}
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
