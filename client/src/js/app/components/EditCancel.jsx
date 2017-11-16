import React from 'react'

export default ({ dirty }) =>
  dirty
  ? <div className={'mddoc'} >
      <div className={'mditem'} >
        {'Press '}
        <span className={'mdcode'}>{'ESC'}</span>
        {' to cancel'}
      </div>
    </div>
  : null
