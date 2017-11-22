import React from 'react'

import Tooltip from 'Tooltip'

export default ({ perm, fixed, button, onClick }) => (
  !fixed && perm.delete
  ? <Tooltip
      tip={'delete this record'}
      at={'left'}
      className={'inlineR'}
    >
      <div
        className={`grid-cell ${button} error-o fa fa-trash delete`}
        onClick={onClick}
      />
    </Tooltip>
    : null
)
