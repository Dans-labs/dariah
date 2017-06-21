import React from 'react'
import { connect } from 'react-redux'

import { combineSelectors, emptyA } from 'utils'

import { getTables, DETAILS } from 'tables'
import { makeTag } from 'filters'
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
          const filterTag = makeTag(DETAILS, eId, linkField)
          const gridTag = `${table}-${name}-${eId}`
          const alterTag = `${DETAILS}-${table}-${eId}-${name}`
          const { alt } = makeAlt(props, { alterTag, nAlts: 2, initial: 1 })
          return (
            <div key={name}>
              {
                alt == 0
                ? filtered
                  ? <ListFilter
                      heading={label}
                      table={detailTable}
                      listIds={detailListIds}
                      perm={detailPerm}
                      select={DETAILS}
                      mode={mode}
                      title={detailTitle}
                      gridTag={gridTag}
                      filterTag={filterTag}
                      masterId={eId}
                      linkField={linkField}
                    />
                  : mode == 'list'
                    ? <ListPlain
                        heading={label}
                        table={detailTable}
                        listIds={detailListIds}
                        perm={detailPerm}
                        title={detailTitle}
                        masterId={eId}
                        linkField={linkField}
                      />
                    : mode == 'grid'
                      ? <ListGrid
                          heading={label}
                          table={detailTable}
                          listIds={detailListIds}
                          perm={detailPerm}
                          gridTag={gridTag}
                          masterId={eId}
                          linkField={linkField}
                        />
                      : <span>{`unknown display mode "${mode}" for item list`}</span>
                : null
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

