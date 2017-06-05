import React from 'react'
import { connect } from 'react-redux'

import { emptyA } from 'utils'

import { getTables } from 'tables'
import Alternative from 'Alternative'
import ListGrid from 'ListGrid'
import ListPlain from 'ListPlain'
import ListFilter from 'ListFilter'

const ItemDetails = ({ tables, table, eId }) => {
  const { [table]: { details, detailOrder } } = tables
  return (
    <div>
      {
        (detailOrder || emptyA).map(name => {
          const { label, table: detailTable, linkField, mode } = details[name]
          const {
            [detailTable]: {
              title: detailTitle,
              perm: detailPerm,
              entities: detailEntities,
              allIds: detailAllIds,
            },
          } = tables
          const detailListIds = detailAllIds.filter(_id => detailEntities[_id].values[linkField] == eId)
          return (
            <Alternative
              key={name}
              tag={`detail-${table}-${eId}-${name}`}
              alternatives={[
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
                mode == 'filter' ?
                  <ListFilter
                    heading={label}
                    table={detailTable}
                    masterId={eId}
                    linkField={linkField}
                  /> :
                  <span>{`unknown display mode "${mode}" for item list`}</span>
                ,
                '',
              ]}
              initial={1}
            />
          )
        })
      }
    </div>
  )
}

export default connect(getTables)(ItemDetails)

