import React from 'react'

export default ({ perm, fixed, button, onClick }) => (
  !fixed && perm.delete
  ? <div
      className={`grid-cell ${button} inlineR error-o fa fa-trash delete`}
      data-rh={'delete this record'}
      data-rh-at={'bottom'}
      onClick={onClick}
    />
    : null
)
