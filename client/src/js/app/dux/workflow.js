import update from 'immutability-helper'

import { accessData } from 'server'
import { memoize } from 'memo'
import { makeReducer, emptyS, emptyA, emptyO, emptySet } from 'utils'

import { getDateTime, sortTimeInterval, sortStringTemplate } from 'datatypes'

/* DEFINITIONS */

export const PACKAGE_TABLE = 'package'
export const CRITERIA_TABLE = 'criteria'
export const TYPE_TABLE = 'typeContribution'
export const TYPE_FIELD = 'typeContribution'

/* CONFIGURATION */

export const loadExtra = {
  contrib: [['package'], ['criteria'], ['typeContribution'], ['decision']],
}

/* ACTIONS */

export const fetchWorkflow = accessData({
  type: 'resetWorkflow',
  contentType: 'db',
  path: `/wf`,
  desc: `get workflow reset info`,
})
export const resetWorkflow = accessData({
  type: 'resetWorkflow',
  contentType: 'db',
  path: `/wf?reset=true`,
  desc: `reset workflow`,
})

/* REDUCER */

const flows = {
  resetWorkflow(state, { data }) {
    if (data == null) {
      return state
    }
    const { resets, stats, total } = data
    return update(state, {
      resets: { $set: resets },
      stats: { $set: stats },
      total: { $set: total },
    })
  },
}

export default makeReducer(flows, emptyO)

/* SELECTORS */

export const getWorkflow = ({ workflow }) => ({ workflow })

/* HELPERS */

export const decisions = memoize(tables => {
  const { decision: { entities: dEntities = emptyO } = emptyO } = tables
  const decisions = {}
  Object.entries(dEntities).forEach(([dId, { values: { rep } = emptyO }]) => {
    decisions[rep] = dId
  })
  return {
    dAccept: decisions['accept'],
    dReject: decisions['reject'],
    dRevise: decisions['revise'],
  }
}, emptyO)

export const finalDecision = memoize((wreviewers, wreviews) => {
  const { items: reviewers = emptyA } = wreviewers || emptyO
  const { items: reviews = emptyA } = wreviews || emptyO
  let finalDecision = null
  if (reviewers.length && reviews.length) {
    const reviewerSet = new Set(reviewers.map(x => x.reviewerF))
    reviews.forEach(({ creator, decision }) => {
      if (reviewerSet.has(creator)) {
        finalDecision = decision
      }
    })
  }
  return finalDecision
}, emptyO)

const compileActiveItems = memoize(
  (entitiesPkg, entitiesTyp, entitiesCri, field = null) => {
    if ([entitiesPkg, entitiesTyp, entitiesCri].some(x => x == null)) {
      return field ? emptySet : emptyO
    }
    const resultSetPkg = new Set()
    const resultSetTyp = new Set()
    const resultSetCri = new Set()

    const now = Date.now()
    Object.entries(entitiesPkg).forEach(
      ([_id, { values: { startDate, endDate, typeContribution } }]) => {
        const startAsDateTime = getDateTime(startDate)
        const endAsDateTime = getDateTime(endDate)
        const noStartDate = startAsDateTime == null
        const noEndDate = endAsDateTime == null
        if (!noStartDate || !noEndDate) {
          if (
            (noStartDate || startAsDateTime < now) &&
            (noEndDate || now < endAsDateTime)
          ) {
            resultSetPkg.add(_id)
            ;(typeContribution || emptyA).forEach(typ => resultSetTyp.add(typ))
          }
        }
      },
    )
    Object.entries(entitiesCri).forEach(
      ([_id, { values: { [PACKAGE_TABLE]: packageId } }]) => {
        if (resultSetPkg.has(packageId)) {
          resultSetCri.add(_id)
        }
      },
    )
    return field
      ? field === TYPE_FIELD
        ? resultSetTyp
        : field === PACKAGE_TABLE
          ? resultSetPkg
          : field === CRITERIA_TABLE ? resultSetCri : null
      : {
          activeIdsPkg: Array.from(resultSetPkg)
            .map(eId => entitiesPkg[eId].values)
            .sort(sortTimeInterval('startDate', 'endDate'))
            .map(e => e._id),
          activeIdsTyp: Array.from(resultSetTyp)
            .map(eId => entitiesTyp[eId].values)
            .sort(
              sortStringTemplate(
                e => `${e.mainType || emptyS} / ${e.subType || emptyS}`,
              ),
            )
            .map(e => e._id),
          activeIdsCri: Array.from(resultSetCri)
            .map(eId => entitiesCri[eId].values)
            .sort(sortStringTemplate(e => e.criterion))
            .map(e => e._id),
        }
  },
  emptyO,
  { debug: 'compileActiveItems' },
)

export const compileActive = (tables, field) => {
  if (
    [PACKAGE_TABLE, CRITERIA_TABLE, TYPE_TABLE].some(x => tables[x] == null)
  ) {
    return field ? emptySet : emptyO
  }
  const {
    [PACKAGE_TABLE]: { entities: entitiesPkg },
    [CRITERIA_TABLE]: { entities: entitiesCri },
    [TYPE_TABLE]: { entities: entitiesTyp },
  } = tables
  return compileActiveItems(entitiesPkg, entitiesTyp, entitiesCri, field)
}

export const getItem = (workflowData, multiple = false) => {
  const { items = emptyA } = workflowData || emptyO
  return multiple ? items : items.length == 0 ? emptyO : items[0]
}

export const isReviewerType = (creator, rE, rF) =>
  creator === rE ? 'E' : creator === rF ? 'F' : null

export const reviewerRole = {
  E: 'first reviewer (expert)',
  F: 'second reviewer (final say)',
  [null]: 'not a reviewer',
}
