import { memoize } from 'memo'
import { emptyS, emptyA, emptyO } from 'utils'

import { getDateTime, sortTimeInterval, sortStringTemplate } from 'fields'

/* DEFINITIONS */

export const PACKAGE_TABLE = 'package'
export const TYPE_TABLE = 'typeContribution'
export const TYPE_FIELD = 'typeContribution'

/* CONFIGURATION */

export const loadExtra = {
  contrib: [
    ['package'],
    ['typeContribution'],
  ],
}

/* ACTIONS */

/* REDUCER */

/* SELECTORS */

/* HELPERS */

const compileActiveItems = memoize((entitiesPkg, entitiesTyp, field = null) => {
  const resultSetPkg = new Set()
  const resultSetTyp = new Set()

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
  return field
  ? field == TYPE_FIELD
    ? resultSetTyp
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
  }
}, emptyO, { debug: 'compileActiveItems' })

export const compileActive = ({
  [PACKAGE_TABLE]: { entities: entitiesPkg },
  [TYPE_TABLE]: { entities: entitiesTyp },
}, field) => compileActiveItems(entitiesPkg, entitiesTyp, field)

