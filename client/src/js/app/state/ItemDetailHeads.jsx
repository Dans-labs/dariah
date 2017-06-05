import React from 'react'
import { connect } from 'react-redux'

import { makeDetails } from 'fields'

import { getTables } from 'tables'

import { AltNext } from 'Alternative'

const ItemDetailHeads = ({ tables, table, eId, detailFragments }) => {
  const theFragments = detailFragments == null ? makeDetails(tables, table, eId) : detailFragments
  return (
    <div className={'grid fragments'}>{
      theFragments.map(({ name, label, nDetails }) => (
        <div
          key={name}
          className={'grid-row form'}
        >
          <div className={'grid-head-cell labelCol'}>{`${label}:`}</div>
          <AltNext
            className={'link grid-cell valueCol'}
            tag={`detail-${table}-${eId}-${name}`}
            nAlternatives={2}
            initial={1}
          >
            {`${nDetails} item${nDetails == 1 ? '' : 's'}`}
          </AltNext>
        </div>
      ))
    }
    </div>
  )
}

export default connect(getTables)(ItemDetailHeads)
