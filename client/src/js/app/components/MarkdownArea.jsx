import React from 'react'
import { connect } from 'react-redux'
import Markdown from 'react-markdown'

import { emptyO } from 'utils'
import { makeSubmit, makeReset, editClass } from 'edit'

import { getAltSection, compileAlternatives } from 'alter'

import EditHelp from 'EditHelp'
import Tooltip from 'Tooltip'

const MarkdownArea = ({
	alter,
	alterSection,
	table,
	eId,
	meta: { dirty, invalid, submitting, error },
	input: { name, value },
	input,
	rh,
	reset,
	submitValues,
	dispatch,
}) => {
	const alterTag = `${table}-${eId}-${name}`
	const { getAlt, nextAlt } = compileAlternatives(alterSection, 2, 1, dispatch)(
		alterTag,
	)
	const alt = getAlt(alter)
	return (
		<div className={'md-field'} {...(alt == 0 ? emptyO : rh)}>
			<Tooltip
				tip={`${alt === 0 ? 'edit text' : 'preview formatted text'}`}
				at={'right'}
			>
				<span
					className={`button medium field-control fa fa-${
						alt === 0 ? 'pencil' : 'hand-o-down'
					}`}
					onClick={nextAlt}
				/>
			</Tooltip>
			{alt === 0 ? (
				<Markdown
					className={`${editClass(dirty, invalid)} field-content`}
					source={value}
				/>
			) : (
				<div className={'field-content'}>
					<Tooltip
						tip={<EditHelp dirty={dirty} type={'markdown'} />}
						at={'top'}
						focusOnly={true}
					>
						<div>
							<textarea
								className={`input ${editClass(dirty, invalid)}`}
								{...input}
								wrap={'soft'}
								onBlur={makeSubmit(dirty, invalid, submitting, submitValues)}
								{...makeReset('text', reset)}
							/>
						</div>
					</Tooltip>
					{error && <span className={'invalid diag'}>{error}</span>}
				</div>
			)}
		</div>
	)
}

export default connect(getAltSection)(MarkdownArea)
