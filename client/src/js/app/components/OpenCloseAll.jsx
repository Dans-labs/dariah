import React from 'react'
import { connect } from 'react-redux'

import { getAltSection } from 'alter'
import { handleOpenAll, handleCloseAll } from 'tables'

const OpenCloseAll = ({
  alter, alterSection,
  table, listIds, item, button,
  nAlts, initial,
  openAll, expand,
  dispatch,
}) => {
  const [thing, things] = item
  const itemsRep = listIds.length === 1 ? thing : things
  const nItemsRep = `${listIds.length} ${itemsRep} `
  return [
    <span key="I">{nItemsRep}</span>,
    openAll && !expand
    ? <div
        key="O"
        className={`fa fa-angle-double-down ${button}`}
        data-rh={`open all ${itemsRep}`}
        data-rh-at={'bottom'}
        onClick={handleOpenAll(alter, alterSection, nAlts, initial, table, listIds, dispatch)}
      />
    : null,
    !expand
    ? <div
        key="C"
        className={`fa fa-angle-double-up ${button}`}
        data-rh={`close all opened ${itemsRep}`}
        data-rh-at={'bottom'}
        onClick={handleCloseAll(alter, alterSection, nAlts, initial, listIds, dispatch)}
      />
    : null,
  ]
}

export default connect(getAltSection)(OpenCloseAll)
