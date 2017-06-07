import React from 'react'
import { connect } from 'react-redux'

import { combineSelectors } from 'utils'
import { makeDetails } from 'fields'

import { getTables } from 'tables'
import { getAlts, makeAlt } from 'alter'

const ItemDetailHeads = ({ tables, table, eId, detailFragments, ...props }) => {
  const theFragments = detailFragments == null ? makeDetails(tables, table, eId) : detailFragments
  return (
    <div className={'grid fragments'}>{
      theFragments.map(({ name, label, nDetails }) => {
        const tag = `detail-${table}-${eId}-${name}`
        const { nextAlt } = makeAlt(props, { tag, nAlts: 2, initial: 1 })
        return (
          <div
            key={name}
            className={'grid-row form'}
          >
            <div className={'grid-head-cell labelCol'} >{`${label}:`}</div>
            <div className={'grid-cell valueCol'} >
              <span
                className={'link'}
                onClick={nextAlt}
              >
                {`${nDetails} item${nDetails == 1 ? '' : 's'}`}
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
