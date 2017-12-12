import React from 'react'

import { emptyO, emptyA, sum } from 'utils'
import { ALLIDS } from 'tables'

const getSumCost = (entities, ids) =>
  Math.round(sum(Array.from(ids).map(eId => entities[eId].values.costTotal || 0)))

export default ({ tables, table }) => {
  const {
    [table]: { entities: cEntities = emptyO, item, [ALLIDS]: allIds = emptyA },
    assessment: { entities: aEntities = emptyO } = emptyO,
    review: { entities: rEntities = emptyO } = emptyO,
  } = tables

  const allContribIds = new Set(allIds)
  const assessedContribIds = new Set(
    Object.values(aEntities).map(e => e.values.contrib),
  )
  const reviewedAssessmentIds = new Set(
    Object.values(rEntities).map(e => e.values.assessment),
  )
  const reviewedContribIds = new Set(
    Array.from(reviewedAssessmentIds).map(
      eId => aEntities[eId].values.contrib,
    ),
  )
  const allContribCost = getSumCost(cEntities, allContribIds)
  const assessedContribCost = getSumCost(cEntities, assessedContribIds)
  const reviewedContribCost = getSumCost(cEntities, reviewedContribIds)

  return (
    <div className={'stats-section'}>
      <div className={'stats-title head'}>{item[1]}</div>
      <div className={'stats-line head'}>
        <div className={'stats-item head'}>{'# total'}</div>
        <div className={'stats-item head'}>{'€ total'}</div>
        <div className={'stats-item head'}>{'# assessed'}</div>
        <div className={'stats-item head'}>{'€ assessed'}</div>
        <div className={'stats-item head'}>{'# reviewed'}</div>
        <div className={'stats-item head'}>{'€ reviewed'}</div>
      </div>
      <div className={'stats-line'}>
        <div className={'stats-item'}>{allContribIds.size}</div>
        <div className={'stats-item'}>{allContribCost}</div>
        <div className={'stats-item'}>{assessedContribIds.size}</div>
        <div className={'stats-item'}>{assessedContribCost}</div>
        <div className={'stats-item'}>{reviewedContribIds.size}</div>
        <div className={'stats-item'}>{reviewedContribCost}</div>
      </div>
    </div>
  )
}
