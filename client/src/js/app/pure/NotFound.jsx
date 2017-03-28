import React from 'react'

const NotFound = ({params: { splat } }) => (<h1>{'404: '}<code>{splat}</code>{' not found on this site.'}</h1>)

export default NotFound

