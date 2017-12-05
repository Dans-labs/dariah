import React from 'react'

import { emptyO } from 'utils'
import { makeSubmit, makeSubmitTime, makeReset, editClass } from 'edit'

import EditHelp from 'EditHelp'
import Tooltip from 'Tooltip'

export default ({
	meta: { dirty, invalid, submitting, error },
	input,
	type,
	reset,
	submitValues,
}) => {
	const submit =
		type === 'checkbox'
			? makeSubmitTime(submitValues)
			: makeSubmit(dirty, invalid, submitting, submitValues)
	const onCancel = makeReset(type, reset)
	const onAction =
		type === 'checkbox' ? { onClick: submit } : { onBlur: submit }
	const className = type == 'checkbox' ? emptyO : { className: 'wideInput' }
	return (
		<div {...className}>
			<Tooltip
				tip={<EditHelp type={'text'} dirty={dirty} />}
				at={'top'}
				focusOnly={true}
			>
				<input
					type={type}
					className={editClass(dirty, invalid)}
					{...input}
					{...onAction}
					{...onCancel}
				/>
			</Tooltip>
			{error && <span className={'invalid diag'}>{error}</span>}
		</div>
	)
}
