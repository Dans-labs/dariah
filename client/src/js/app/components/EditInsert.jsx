import React from 'react'

import { DETAILS } from 'tables'

import Tooltip from 'Tooltip'

export default ({
  perm, select, fixed, item, button, onInsert,
}) => {
  const thing = item[0]
  return (!fixed && perm != null && perm.insert && (!perm.needMaster || select == DETAILS))
    ? <Tooltip
        tip={`make a new ${thing}`}
        at={'bottom'}
      >
        <span
          className={`fa fa-plus ${button}`}
          onClick={onInsert}
        />
      </Tooltip>
    : null
}
