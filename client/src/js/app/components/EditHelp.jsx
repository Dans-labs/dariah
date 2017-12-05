import React from 'react'

export default ({ type, dirty }) => (
	<div className={'edit-help'}>
		<div className={'help-line'}>
			{dirty ? (
				<div className={'help-item'}>
					{'Press '}
					<span className={'help-code'}>{'ESC'}</span>
					{' to cancel'}
				</div>
			) : null}
			<div className={'help-item'}>
				{'Press '}
				<span className={'help-code'}>{'TAB'}</span>
				{' or click outside this field to save'}
			</div>
		</div>
		{type == 'markdown' ? (
			<div className={'help-line'}>
				<div className={'help-item'}>
					<span className={'help-code'}>{'['}</span>
					{'link text'}
					<span className={'help-code'}>{']('}</span>
					{'url'}
					<span className={'help-code'}>{')'}</span>
				</div>
				<div className={'help-item'}>
					<span className={'help-code'}>{'*'}</span>
					<i>{'italic'}</i>
					<span className={'help-code'}>{'*'}</span>
				</div>
				<div className={'help-item'}>
					<span className={'help-code'}>{'**'}</span>
					<b>{'bold'}</b>
					<span className={'help-code'}>{'**'}</span>
				</div>
				<div className={'help-item'}>
					<span className={'help-code'}>{'`'}</span>
					<code>{'code'}</code>
					<span className={'help-code'}>{'`'}</span>
				</div>
				<div className={'help-item'}>
					<span className={'help-code'}>{'# '}</span>
					<span className={'mdh1'}>{'Heading1'}</span>
				</div>
				<div className={'help-item'}>
					<span className={'help-code'}>{'## '}</span>
					<span className={'mdh2'}>{'Heading2'}</span>
				</div>
				<div className={'help-item'}>
					<span className={'help-code'}>{'* '}</span>
					<span className={'mduli'}>{'bullet item'}</span>
				</div>
				<div className={'help-item'}>
					<span className={'help-code'}>{'1. '}</span>
					<span className={'mdoli'}>{'numbered item'}</span>
				</div>
				<div className={'help-item'}>
					<span className={'help-code'}>{'> '}</span>
					<span className={'mdbq'}>{'block quote'}</span>
				</div>
			</div>
		) : null}
	</div>
)
