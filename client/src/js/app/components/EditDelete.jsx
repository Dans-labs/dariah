import React from 'react'

import { emptyO, emptyS } from 'utils'

import Tooltip from 'Tooltip'

export default ({ perm, workflow, keep, fixed, button, onClick }) => {
  const doKeep = Object.keys(keep).length > 0
  const keepInfo = Object.keys(keep)
    .sort()
    .map(table => keep[table])
    .join(', ')
  const locked = workflow && workflow.locked && workflow.locked.on
  const lockedDesc = workflow && workflow.locked && workflow.locked.desc || emptyS
  const completed = workflow && workflow.completed && workflow.completed.on
  const completedDesc = workflow && workflow.completed && workflow.completed.desc || emptyS
  const frozen = workflow && workflow.frozen && workflow.frozen.on
  const frozenDesc = workflow && workflow.frozen && workflow.frozen.desc || emptyS
  const tipInfo =
    frozen ? `This item cannot deleted because ${frozenDesc}` :
    completed ? `This item cannot deleted because ${completedDesc}` :
    locked ? `This item cannot deleted because ${lockedDesc}` :
    doKeep ? `This item cannot deleted because related items exist: ${keepInfo}` :
    'delete this record'
  const mayDelete = !doKeep && !locked && !completed && !frozen
  const icon = doKeep ? 'puzzle-piece' : 'trash'
  const disabled = mayDelete ? 'error-o' : 'disabled'
  const activate = mayDelete ? { onClick } : emptyO
  return !fixed && perm.delete ? (
    <Tooltip tip={tipInfo} at={'left'} className={'inlineR'}>
      <div
        className={`grid-cell ${button} ${disabled} fa fa-${icon} delete`}
        {...activate}
      />
    </Tooltip>
  ) : null
}
