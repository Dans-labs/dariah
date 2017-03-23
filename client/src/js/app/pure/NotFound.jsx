import React from 'react'

/**
 * **purely functional** {@link external:Component|Component}
 *
 * Displays a 404 if no
 * {@link external:Routing|route} matches.
 *
 * @class
 * @param {Object} params The {@link external:Routing|route} parameters,
 * among which the full path (`splat`)
 * @returns {Fragment}
 */
const NotFound = ({params: { splat } }) => (<h1>{'404: '}<code>{splat}</code>{' not found on this site.'}</h1>)

export default NotFound

