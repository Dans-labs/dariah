import React from 'react';

/**
 * @class
 * @classdesc
 * **purely functional** {@link external:Component|Component}
 */
const NotFound = ({params}) => (<h1>404: <code>{params.splat}</code> not found on this site.</h1>)

export default NotFound

