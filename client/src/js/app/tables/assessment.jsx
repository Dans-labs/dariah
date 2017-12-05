import React, { Fragment } from 'react'

import { emptyS } from 'utils'
import { itemReadField, itemEditField } from 'fields'
import { assessmentScore } from 'workflow'

import Expand from 'Expand'
import Tooltip from 'Tooltip'

const rField = (field, l, f, key) =>
	itemReadField(field, l(field), f(field), key)
const eField = (field, l, fe, m, key) =>
	itemEditField(field, l(field), fe(field), m(field), key)

const templates = {
	main({ l, f }) {
		return (
			<div className={'grid fragments'}>
				{rField('title', l, f)}
				{rField('assessmentType', l, f)}
				{rField('contrib', l, f)}
				{rField('remarks', l, f)}
			</div>
		)
	},
	mainEdit({ l, fe, m, editButton }) {
		return (
			<Fragment>
				{editButton}
				<div className={'grid fragments'}>
					{eField('title', l, fe, m)}
					{eField('assessmentType', l, fe, m)}
					{eField('contrib', l, fe, m)}
					{eField('remarks', l, fe, m)}
				</div>
			</Fragment>
		)
	},
	mainAction({ tables, l, e, v, w, s, fe, fs, m }) {
		const {
			overall,
			relevantScore,
			relevantMax,
			allMax,
			relevantN,
			allN,
		} = assessmentScore(tables, v('_id'))
		const irrelevantN = allN - relevantN
		const isWithdrawn = !e('dateWithdrawn')
		const isSubmitted = !e('submitted')
		return (
			<Fragment>
				<div className={'ass-score-box'}>
					<Tooltip tip={'overall-score of this assessment'} at={'right'}>
						<span className={'ass-score'}>{`${overall} %`}</span>
					</Tooltip>
					<Expand
						alterSection={`assessment${v('_id')}`}
						alterTag={'score'}
						iconOpen={'calculator'}
						iconClose={'minus-circle'}
						titleOpen={'Show derivation'}
						titleClose={'Hide derivation'}
						headActive={emptyS}
						headLine={emptyS}
						full={
							<div className={'ass-score-deriv'}>
								<p>{`This contribution scores ${relevantScore} points.`}</p>
								<p>{`For this type of contribution there is a total of ${
									allMax
								} points,
                    divided over ${allN} criteria.`}</p>
								{irrelevantN ? (
									<p>
										{`However,
                        ${irrelevantN} rule${irrelevantN == 1 ? ' is' : 's are'}
                        not applicable to this contribution,
                        which leaves the total amount to
                        ${relevantMax} points,
                        divided over ${relevantN} criteria.`}
									</p>
								) : (
									emptyS
								)}
								<p>
									{`The total score is expressed as a percentage:
                    the fraction of ${
											relevantScore
										} scored points with respect to 
                    ${relevantMax} scorable points.`}
								</p>
							</div>
						}
					/>
				</div>
				<div className={'grid fragments'}>
					{m('submitted') ? null : eField('submitted', l, fe, m)}
					{itemEditField(
						'submitted',
						'Submission',
						<Fragment>
							{!isSubmitted && isWithdrawn
								? `${l('dateWithdrawn')}: ${s('dateWithdrawn')}`
								: null}
							{isSubmitted
								? `${l('dateSubmitted')}: ${s('dateSubmitted')}`
								: null}
							{w('incomplete').on || w('stalled').on
								? null
								: fs('submitted', e('submitted'), h => (
										<span
											className={`button large workflow ${
												e('submitted') ? 'info' : 'error'
											}`}
											onClick={h}
										>{`${
											e('submitted') ? 'Submit for' : 'Withdraw from'
										} review`}</span>
									))}
						</Fragment>,
						m('submitted'),
					)}
					{e('submitted') ? null : eField('reviewerE', l, fe, m)}
					{e('submitted') ? null : eField('reviewerF', l, fe, m)}
				</div>
				{w('stalled').on ? (
					<div className={'label large workflow error'}>
						{`This assessment cannot be submitted because: ${w('stalled').desc}.
              Either change the type of the contribution to the type of this assessment,
              or start a new assessment, copy over the relevant material form this
              assessment (by hand), and remove this assessment.
            `}
					</div>
				) : null}
				{w('incomplete').on ? (
					<div className={'label large workflow warning'}>
						{`This assessment cannot yet be submitted because: ${
							w('incomplete').desc
						}.
            `}
					</div>
				) : e('submitted') ? (
					<div className={'label large workflow good'}>
						{`All criteria filled: this assessment can be submitted.
              `}
					</div>
				) : null}
				{w('locked').on ? (
					<div className={'label large workflow info'}>
						{`This assessment is locked because it is ${w('locked').desc}.`}
					</div>
				) : null}
			</Fragment>
		)
	},
	insert: {
		contrib({ at, v, n, o, onInsert }) {
			return at.has(v('typeContribution')) ? (
				o ? (
					n == 0 ? (
						<span className={`button large workflow info`} onClick={onInsert}>
							{`Write a self-assessment`}
						</span>
					) : (
						<Tooltip
							tip={
								<Fragment>
									<p>
										{'Normally a contribution needs just one self-assessment.'}
									</p>
									<p>{'Only add an other one in the following cases'}</p>
									<ul>
										<li>
											{'The previous self-assessment has become obsolete'}
										</li>
										<li>
											{`The previous self-assessment is based on a contribution type,
                          but the contribution in question has been assigned another type.`}
										</li>
									</ul>
									<p>
										<b>
											{`In the last case, it is recommended to copy and paste the relevant parts
                        of the old assessment into the new one and delete the old one.`}
										</b>
									</p>
								</Fragment>
							}
							at={'top'}
						>
							<span
								className={`button large workflow warning`}
								onClick={onInsert}
							>
								{`Add another self-assessment`}
								<span className={'fa fa-exclamation'} />
							</span>
						</Tooltip>
					)
				) : (
					<span className={`label large workflow info`}>
						{`Only owners and editors can self-assess a contribution`}
					</span>
				)
			) : (
				<span className={`label large workflow error`}>
					{`Contributions with a legacy type cannot be assessed`}
				</span>
			)
		},
	},
	consolidated: {
		trail({ s }) {
			// consolidated assessment within a trail record
			return (
				<Fragment>
					<div>{s('title')}</div>
					<div>
						{s('vcc', ', ')} {s.year}
					</div>
				</Fragment>
			)
		},
	},
}

Object.assign(templates, {
	detail: {
		contrib: templates.main,
	},
	detailEdit: {
		contrib: templates.mainEdit,
	},
	detailAction: {
		contrib: templates.mainAction,
	},
})

export default templates
