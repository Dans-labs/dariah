import { memoize } from 'memo'
import { emptyS, emptyA, emptyO, max, sum } from 'utils'

import { getDateTime, sortTimeInterval, sortStringTemplate } from 'fields'

/* DEFINITIONS */

export const PACKAGE_TABLE = 'package'
export const CRITERIA_TABLE = 'criteria'
export const TYPE_TABLE = 'typeContribution'
export const TYPE_FIELD = 'typeContribution'

/* CONFIGURATION */

export const loadExtra = {
  contrib: [
    ['package'],
    ['criteria'],
    ['typeContribution'],
  ],
}

/* ACTIONS */

/* REDUCER */

/* SELECTORS */

/* HELPERS */

const compileActiveItems = memoize((entitiesPkg, entitiesTyp, entitiesCri, field = null) => {
  if ([entitiesPkg, entitiesTyp, entitiesCri].some(x => x == null)) {
    return field ? null : emptyO
  }
  const resultSetPkg = new Set()
  const resultSetTyp = new Set()
  const resultSetCri = new Set()

  const now = Date.now()
  Object.entries(entitiesPkg).forEach(([_id, { values: { startDate, endDate, typeContribution } }]) => {
    const startAsDateTime = getDateTime(startDate)
    const endAsDateTime = getDateTime(endDate)
    const noStartDate = startAsDateTime == null
    const noEndDate = endAsDateTime == null
    if (!noStartDate || !noEndDate) {
      if ((noStartDate || startAsDateTime < now) && (noEndDate || now < endAsDateTime)) {
        resultSetPkg.add(_id);
        (typeContribution || emptyA).forEach(typ => resultSetTyp.add(typ))
      }
    }
  })
  Object.entries(entitiesCri).forEach(([_id, { values: { [PACKAGE_TABLE]: packageId } }]) => {
    if (resultSetPkg.has(packageId)) {
      resultSetCri.add(_id)
    }
  })
  return field
  ? field === TYPE_FIELD
    ? resultSetTyp
    : field === PACKAGE_TABLE
      ? resultSetPkg
      : field === CRITERIA_TABLE
      ? resultSetCri
        : null
  : {
    activeIdsPkg: Array.from(resultSetPkg)
      .map(eId => entitiesPkg[eId].values)
      .sort(sortTimeInterval('startDate', 'endDate'))
      .map(e => e._id),
    activeIdsTyp: Array.from(resultSetTyp)
      .map(eId => entitiesTyp[eId].values)
      .sort(sortStringTemplate(e => `${e.mainType || emptyS} / ${e.subType || emptyS}`))
      .map(e => e._id),
    activeIdsCri: Array.from(resultSetCri)
      .map(eId => entitiesCri[eId].values)
      .sort(sortStringTemplate(e => e.criterion))
      .map(e => e._id),
  }
}, emptyO, { debug: 'compileActiveItems' })

export const compileActive = (tables, field) => {
  if ([PACKAGE_TABLE, CRITERIA_TABLE, TYPE_TABLE].some(x => tables[x] == null)) {
    return field ? null : emptyO
  }
  const {
    [PACKAGE_TABLE]: { entities: entitiesPkg },
    [CRITERIA_TABLE]: { entities: entitiesCri },
    [TYPE_TABLE]: { entities: entitiesTyp },
  } = tables
  return compileActiveItems(entitiesPkg, entitiesTyp, entitiesCri, field)
}

export const assessmentScore = memoize((tables, aId) => {
  // get all loaded criteriaEntries and scores
  const { criteriaEntry: { entities: ceEntities } = emptyO } = tables
  const { score: { entities: sEntities } = emptyO } = tables

  // get all criteria entries for this assessment and distill relevant information
  const myCriteriaEntries = Object.keys(ceEntities)
  .filter(ceId => ceEntities[ceId].values.assessment == aId)
  .map(ceId => {
    const {
      [ceId]: {
        values: {
          criteria: thisCid,
          score: thisSid,
        },
      },
    } = ceEntities
    const {
      [thisSid]: {
        values: {
          score = 0,
        } = emptyO,
      } = emptyO,
    } = sEntities
    const maxScore = max(
      Object.keys(sEntities)
      .filter(sId => sEntities[sId].values.criteria == thisCid)
      .map(sId => sEntities[sId].values.score)
    )

    return { criteria: thisCid, score, maxScore }
  })

  const allMax = sum(myCriteriaEntries.map(x => x.maxScore))
  const allN = myCriteriaEntries.length

  // correct for criteria entries that are "non applicable" ( < 0 )

  const relevantCriteriaEntries = myCriteriaEntries
  .filter(x => x.score >= 0)
  const relevantMax = sum(relevantCriteriaEntries.map(x => x.maxScore))
  const relevantScore = sum(relevantCriteriaEntries.map(x => x.score))
  const relevantN = relevantCriteriaEntries.length
  const overall = relevantMax == 0
  ? 0
  : Math.round(relevantScore * 100 / relevantMax)

  return {
    overall,
    relevantScore,
    relevantMax,
    allMax,
    relevantN,
    allN,
  }
}, emptyO)

