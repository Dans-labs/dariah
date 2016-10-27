import React from 'react';

const NotFound = ({params}) => (<h1>404: <code>{params.splat}</code> not found on this site.</h1>)

export default NotFound

