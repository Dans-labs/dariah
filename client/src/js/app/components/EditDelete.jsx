import React from 'react'

import { emptyO } from 'utils'

import Tooltip from 'Tooltip'

export default ({ perm, keep, fixed, button, onClick }) => {
  const doKeep = Object.keys(keep).length > 0
  const keepInfo = Object.keys(keep).sort().map(table => keep[table]).join(', ')
  const tipInfo = doKeep
  ? `This item cannot deleted because related item exist: ${keepInfo}`
  : 'delete this record'
  const icon = doKeep ? 'puzzle-piece' : 'trash'
  const disabled = doKeep ? 'disabled' : 'error-o'
  const activate = doKeep ? emptyO : { onClick }
  return (
    !fixed && perm.delete
    ? <Tooltip
        tip={tipInfo}
        at={'left'}
        className={'inlineR'}
      >
        <div
          className={`grid-cell ${button} ${disabled} fa fa-${icon} delete`}
          {...activate}
        />
      </Tooltip>
      : null
  )
}
