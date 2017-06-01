import React from 'react'
import { reduxForm } from 'redux-form'

import { memoize } from 'memo'

import Alternative from 'Alternative'
import ItemContainer from 'ItemContainer'
import NavLink from 'NavLink'

const MyItemHeadPure = ({ table, eId, entityHead, dirty, base, verb }) => (
  <NavLink className={'list'} to={`/${base}/${table}/${verb}/${eId}`} >
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


const ItemHead = ({ table, values, title, inplace, base, verb }) => {
  const { _id: eId, [title]: entityHead = '-empty-' } = values

  return (
    <tr id={eId} >
      <td>{
        inplace ? (
          <Alternative
            tag={`${table}-${eId}`}
            controlPlacement={controlPlacement(entityHead)}
            controls={controls}
            alternatives={[(
              <ItemContainer
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
            base={base}
            verb={verb}
          />
        )
      }
      </td>
    </tr>
  )
}

export default ItemHead
