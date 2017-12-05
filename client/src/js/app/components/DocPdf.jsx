import React from 'react'

export default ({ docDir, docName, docExt }) => {
	const href = `/api/file${docDir}/${docName}.${docExt}`
	const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
	return iOS ? (
		<p>
			<a target={'_blank'} rel={'noopener noreferrer'} href={href}>
				{docName}
			</a>
			{' (open pdf in a new tab)'}
		</p>
	) : (
		<object height={'100%'} width={'100%'} data={href} type={'application/pdf'}>
			<a target={'_blank'} rel={'noopener noreferrer'} href={href}>
				{docName}
			</a>
			{' (open pdf in a new tab)'}
		</object>
	)
}
