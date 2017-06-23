import React from 'react'
import { connect } from 'react-redux'

import { emptyS } from 'utils'
import { makeDetails } from 'fields'

import { getAltSection, compileAlternatives } from 'alter'

const ItemDetailHeads = ({ alterSection, tables, table, eId, detailFragments, dispatch }) => {
  const theFragments = detailFragments == null
  ? makeDetails(tables, table, eId)
  : detailFragments
  const makeAlternatives = compileAlternatives(alterSection, 2, 1, dispatch)
  return (
    <div className={'grid fragments'}>{
      theFragments.map(({ name, label, nDetails }) => {
        const { nextAlt } = makeAlternatives(name)
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

export default connect(getAltSection)(ItemDetailHeads)
