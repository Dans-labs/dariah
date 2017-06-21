import React from 'react'
import { connect } from 'react-redux'

import { combineSelectors, emptyS } from 'utils'
import { makeDetails } from 'fields'

import { getTables, DETAILS } from 'tables'
import { getAlts, makeAlt } from 'alter'

const ItemDetailHeads = ({ tables, table, eId, detailFragments, ...props }) => {
  const theFragments = detailFragments == null
  ? makeDetails(tables, table, eId)
  : detailFragments
  return (
    <div className={'grid fragments'}>{
      theFragments.map(({ name, label, nDetails }) => {
        const alterTag = `${DETAILS}-${table}-${eId}-${name}`
        const { nextAlt } = makeAlt(props, { alterTag, nAlts: 2, initial: 1 })
        return (
          <div
            key={name}
            className={'grid-row form'}
          >
            <div className={'grid-head-cell label-col'} >{`${label}:`}</div>
            <div className={'grid-cell value-col'} >
              <span
                className={'link'}
                onClick={nextAlt}
              >
                {`${nDetails} item${nDetails == 1 ? emptyS : 's'}`}
              </span>
            </div>
          </div>
        )
      })
    }
    </div>
  )
}

const getInfo = combineSelectors(getTables, getAlts)

export default connect(getInfo)(ItemDetailHeads)
