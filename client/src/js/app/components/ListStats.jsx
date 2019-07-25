import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { emptyO, emptyA, sum, updateAuto } from 'utils'
import { ALLIDS, repr1Head } from 'tables'
import { getSettings } from 'settings'

const statKeyOrder = ['all', 'assessed', 'reviewed']
const statKeys = {
  all: 'all',
  assessed: 'assessed',
  reviewed: 'reviewed',
}

const getSumCost = (entities, ids) =>
  Math.round(
    sum(
      Array.from(ids).map(
        eId => (entities[eId] && entities[eId].values.costTotal) || 0,
      ),
    ),
  )

const breakDownBy = (settings, tables, table, field, theIds) => {
  const {
    [table]: {
      fieldSpecs: {
        [field]: { valType = 'text', multiple = false, label } = emptyO,
      } = emptyO,
      entities = emptyO,
    },
  } = tables

  let results = {}

  Object.entries(theIds).forEach(([key, ids]) => {
    const sets = {}
    for (const eId of ids) {
      const {
        [eId]: { values: { [field]: value } = emptyO } = emptyO,
      } = entities
      if (multiple) {
        for (const val of value || emptyA) {
          if (sets[val] == null) {
            sets[val] = new Set()
          }
          sets[val].add(eId)
        }
      } else {
        if (sets[value] == null) {
          sets[value] = new Set()
        }
        sets[value].add(eId)
      }
    }
    Object.entries(sets).forEach(([value, idsSet]) => {
      const repValue = repr1Head(tables, table, field, valType, value, settings)
      const number = idsSet.size
      const cost = getSumCost(entities, idsSet)
      results = updateAuto(results, [repValue, key], { $set: [number, cost] })
    })
  })
  return [label, results]
}

const noData = [' ', ' ']

const ListStats = ({ settings, tables, table }) => {
  const {
    [table]: { entities = emptyO, [ALLIDS]: allIds = emptyA },
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
    Array.from(reviewedAssessmentIds).map(eId => aEntities[eId].values.contrib),
  )

  const theIds = {
    all: allContribIds,
    assessed: assessedContribIds,
    reviewed: reviewedContribIds,
  }
  let allResults = {}
  Object.entries(theIds).forEach(([key, ids]) => {
    allResults = updateAuto(allResults, ['All', key], {
      $set: [theIds[key].size, getSumCost(entities, ids)],
    })
  })

  const results = [
    ['', allResults],
    breakDownBy(settings, tables, table, 'year', theIds),
    breakDownBy(settings, tables, table, 'country', theIds),
    breakDownBy(settings, tables, table, 'typeContribution', theIds),
    breakDownBy(settings, tables, table, 'discipline', theIds),
  ]

  return (
    <>
      <div className={'stats-section head'}>
        <div className={'stats-line head'}>
          <div className={'stats-item value head'}>{'value'}</div>
          {statKeyOrder.map(statKey => (
            <Fragment key={statKey}>
              <div className={'stats-item ncost head'}>{statKeys[statKey]}</div>
            </Fragment>
          ))}
        </div>
        <div className={'stats-line head'}>
          <div className={'stats-item value head'}>{` `}</div>
          {statKeyOrder.map(statKey => (
            <Fragment key={statKey}>
              <div className={'stats-item n head'}>{'#'}</div>
              <div className={'stats-item cost head'}>{'€'}</div>
            </Fragment>
          ))}
        </div>
      </div>
      {results.map(([name, values]) => (
        <div key={name} className={'stats-section'}>
          {name ? <div className={'stats-title head'}>{name}</div> : null}
          {Object.entries(values)
            .sort()
            .map(([value, keys]) => (
              <div key={value} className={'stats-line'}>
                <div className={'stats-item value'}>{value}</div>
                {statKeyOrder.map(statKey => {
                  const thisData = keys[statKey] || noData
                  return (
                    <Fragment key={statKey}>
                      <div className={'stats-item n'}>{thisData[0]}</div>
                      <div className={'stats-item cost'}>{thisData[1]}</div>
                    </Fragment>
                  )
                })}
              </div>
            ))}
        </div>
      ))}
    </>
  )
}

export default connect(getSettings)(ListStats)
