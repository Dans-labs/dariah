import { memoize } from 'memo'
import { emptyO, max, sum } from 'utils'

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
  const average = relevantMax == 0
  ? 0
  : Math.round(relevantScore * 100 / relevantMax)

  return {
    average,
    relevantScore,
    relevantMax,
    allMax,
    relevantN,
    allN,
  }
}, emptyO)
