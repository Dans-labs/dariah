import React from 'react'

import { applyInsertTemplate } from 'templates'

import { DETAILS } from 'tables'

import Tooltip from 'Tooltip'

export default ({
  table, perm, select, masterTable, nItems, fixed, item, button, onInsert,
}) => {
  const thing = item[0]
  return (!fixed && perm != null && perm.insert && (!perm.needMaster || select == DETAILS))
  ? applyInsertTemplate(table, masterTable, nItems, onInsert)
    || <Tooltip
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
