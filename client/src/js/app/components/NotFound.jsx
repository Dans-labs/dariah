import React from 'react'

export default ({ splat }) => (
	<h1>
		{'404: '}
		<code>{splat}</code>
		{' not found on this site.'}
	</h1>
)
