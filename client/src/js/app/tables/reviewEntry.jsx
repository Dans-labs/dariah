import React from 'react'

import { emptyS } from 'utils'

import Expand from 'Expand'
import Tooltip from 'Tooltip'

const templates = {
	editMode: {
		review({ e }) {
			return e('comments') ? 1 : 0
		},
	},
	detail: {
		review({ l, v, e, s, f }) {
			const statusClass = e('comments') ? 'incomplete' : 'complete'
			return (
				<div className={`review entryRead ${statusClass}`}>
					<div className={'review entry'}>
						<div>{s('seq')}</div>
						<Expand
							alterSection={`criteriaEntry${v('_id')}`}
							alterTag={l('remarks')}
							iconOpen={'info-circle'}
							iconClose={'minus-circle'}
							titleOpen={'Show criteria details'}
							titleClose={'Hide criteria details'}
							headActive={emptyS}
							headLine={f('criteria')}
							full={
								<div className={'criteria comments'}>
									{f('criteria', 'remarks')}
								</div>
							}
							className={'fat'}
						/>
					</div>
					{assessment(f)}
					<div className={'review comments'}>
						<b>{l('comments')}</b>
						{f('comments')}
					</div>
				</div>
			)
		},
	},
	detailEdit: {
		review({ l, e, s, f, fe, editButton }) {
			const statusClass = e('comments') ? 'incomplete' : 'complete'
			return (
				<div className={`review entryEdit ${statusClass}`}>
					<div className={'review entry'}>
						{editButton}
						{s('seq')}
						<div className={'fat'}>
							<div className={'fat'}>{f('criteria')}</div>
							<div className={'criteria comments'}>
								{f('criteria', 'remarks')}
							</div>
						</div>
					</div>
					{assessment(f)}
					<p>
						<b>{l('comments')}</b>
					</p>
					<Tooltip tip={'Enter review comments'} at={'top'}>
						{fe('comments')}
					</Tooltip>
				</div>
			)
		},
	},
}

const assessment = f => (
	<div className={'assessment comments'}>
		<div>
			<Tooltip tip={'Score by self-assessment'} at={'right'}>
				{f('criteriaEntry', 'score')}
			</Tooltip>
		</div>
		<div>
			<b>{'Evidence'}</b>
		</div>
		<div>{f('criteriaEntry', 'evidence')}</div>
	</div>
)

export default templates
