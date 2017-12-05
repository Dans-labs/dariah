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
	const lockedDesc =
		(workflow && workflow.locked && workflow.locked.desc) || emptyS
	const tipInfo =
		doKeep || locked
			? (doKeep
					? `This item cannot deleted because related items exist: ${keepInfo}`
					: emptyS) +
				(locked ? `This item is locked because: ${lockedDesc}` : emptyS)
			: 'delete this record'
	const icon = doKeep ? 'puzzle-piece' : 'trash'
	const disabled = doKeep ? 'disabled' : 'error-o'
	const activate = doKeep ? emptyO : { onClick }
	return !fixed && perm.delete && !locked ? (
		<Tooltip tip={tipInfo} at={'left'} className={'inlineR'}>
			<div
				className={`grid-cell ${button} ${disabled} fa fa-${icon} delete`}
				{...activate}
			/>
		</Tooltip>
	) : null
}
