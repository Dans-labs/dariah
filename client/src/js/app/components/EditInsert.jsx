import React from 'react'

import { DETAILS } from 'tables'

export default ({
  perm, select, fixed, item, button, onInsert,
}) => {
  const thing = item[0]
  return (!fixed && perm != null && perm.insert && (!perm.needMaster || select == DETAILS))
    ? <span
        className={`fa fa-plus ${button}`}
        data-rh={`make a new ${thing}`}
        data-rh-at={'bottom'}
        onClick={onInsert}
      />
    : null
}
