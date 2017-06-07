import React from 'react'
import { connect } from 'react-redux'

import { combineSelectors, emptyA } from 'utils'

import { getTables } from 'tables'
import { getAlts, makeAlt } from 'alter'

import ListGrid from 'ListGrid'
import ListPlain from 'ListPlain'
import ListFilter from 'ListFilter'

const ItemDetails = ({ tables, table, eId, ...props }) => {
  const { [table]: { details, detailOrder } } = tables
  return (
    <div>
      {
        (detailOrder || emptyA).map(name => {
          const { label, table: detailTable, linkField, mode, filtered } = details[name]
          const {
            [detailTable]: {
              title: detailTitle,
              perm: detailPerm,
              entities: detailEntities,
              allIds: detailAllIds,
            },
          } = tables
          const detailListIds = detailAllIds.filter(_id => detailEntities[_id].values[linkField] == eId)
          const tag = `detail-${table}-${eId}-${name}`
          const { alt } = makeAlt(props, { tag, nAlts: 2, initial: 1 })
          return (
            <div key={name}>
              {
                alt == 0 ? (
                  filtered ?
                    <ListFilter
                      heading={label}
                      table={detailTable}
                      listIds={detailListIds}
                      perm={detailPerm}
                      select={'details'}
                      mode={mode}
                      title={detailTitle}
                      tag={`${table}-${name}-${eId}`}
                      masterId={eId}
                      linkField={linkField}
                    /> : (
                      mode == 'list' ?
                        <ListPlain
                          heading={label}
                          table={detailTable}
                          listIds={detailListIds}
                          perm={detailPerm}
                          title={detailTitle}
                          masterId={eId}
                          linkField={linkField}
                        /> :
                      mode == 'grid' ?
                        <ListGrid
                          heading={label}
                          table={detailTable}
                          listIds={detailListIds}
                          perm={detailPerm}
                          tag={`${table}-${name}-${eId}`}
                          masterId={eId}
                          linkField={linkField}
                        /> :
                        <span>{`unknown display mode "${mode}" for item list`}</span>
                    )
                ) : ''
              }
            </div>
          )
        })
      }
    </div>
  )
}

const getInfo = combineSelectors(getTables, getAlts)

export default connect(getInfo)(ItemDetails)

